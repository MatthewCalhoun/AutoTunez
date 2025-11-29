import { useState, useEffect, useCallback, useRef } from 'react'
import { Wallet, Copy, Check, Music, DollarSign, Heart, LogOut, TrendingUp, Play, Clock, Settings, Bell, Eye, Shield, Zap, Loader2, User, RefreshCw } from 'lucide-react'
import { IdentityClient, Utils } from '@bsv/sdk'
import { useIsMobile } from '../hooks/useIsMobile'
import { useWallet } from '../contexts/WalletContext'
import { abbreviateIdentityKey } from '../lib/identity'
import { walletClient } from '../lib/walletClient'

// Helper to decode base64 to byte array
function base64ToBytes(base64: string): number[] {
  const binary = atob(base64)
  const bytes: number[] = []
  for (let i = 0; i < binary.length; i++) {
    bytes.push(binary.charCodeAt(i))
  }
  return bytes
}

// Decrypt a field value using a revelation key (AES-256-GCM)
// Per BRC-52: "The 256-bit initialization vector used is prepended to the beginning of the data"
async function decryptFieldWithKey(encryptedValue: string, revelationKeyBase64: string): Promise<string | null> {
  // Decode the revelation key (256-bit AES key)
  const keyBytes = base64ToBytes(revelationKeyBase64)

  // Decode the encrypted value (IV prepended to ciphertext)
  const encryptedBytes = base64ToBytes(encryptedValue)

  // Try different IV sizes - BRC-52 says 256-bit (32 bytes) but some use 12 bytes for GCM
  const ivSizes = [32, 16, 12]

  for (const ivSize of ivSizes) {
    if (encryptedBytes.length <= ivSize) continue

    try {
      const iv = new Uint8Array(encryptedBytes.slice(0, ivSize))
      const ciphertext = new Uint8Array(encryptedBytes.slice(ivSize))

      // Import the key for AES-GCM
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        new Uint8Array(keyBytes),
        { name: 'AES-GCM' },
        false,
        ['decrypt']
      )

      // Decrypt
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        ciphertext
      )

      const result = new TextDecoder().decode(decrypted)
      console.log(`[Profile] Successfully decrypted field with IV size ${ivSize}:`, result)
      return result
    } catch {
      // Try next IV size
    }
  }

  console.warn('[Profile] Failed to decrypt with revelation key - tried all IV sizes')
  return null
}

// Try to decrypt revelation key from keyring using wallet
async function decryptRevelationKey(
  encryptedKey: string,
  fieldName: string,
  serialNumber: string,
  certifier: string
): Promise<string | null> {
  const protocolID: [number, string] = [2, 'certificate field encryption']
  const ciphertext = base64ToBytes(encryptedKey)

  // Try different keyID formats for revelation key decryption
  const keyIDFormats = [
    `${serialNumber} ${fieldName}`,  // Revelation key format
    fieldName,
  ]

  for (const keyID of keyIDFormats) {
    try {
      console.log(`[Profile] Trying to decrypt revelation key for "${fieldName}" with keyID: "${keyID}"`)

      const result = await walletClient.decrypt({
        ciphertext,
        protocolID,
        keyID,
        counterparty: certifier,
        privilegedReason: 'Display your identity on your profile'
      })

      // Convert to base64 string for use as AES key
      const keyBase64 = btoa(String.fromCharCode(...result.plaintext))
      console.log(`[Profile] Successfully decrypted revelation key for "${fieldName}"`)
      return keyBase64
    } catch {
      // Try next format
    }
  }

  return null
}

// Helper to decrypt a certificate field using the wallet
async function decryptCertificateField(
  encryptedValue: string,
  fieldName: string,
  serialNumber: string,
  certifier: string
): Promise<string | null> {
  // Get the encryption parameters for this field
  const protocolID: [number, string] = [2, 'certificate field encryption']

  // Decode the base64 encrypted value
  const ciphertext = base64ToBytes(encryptedValue)

  // Try multiple keyID formats - the original encryption may have used just fieldName
  const keyIDFormats = [
    fieldName,                           // Original master certificate encryption uses just fieldName
    `${serialNumber} ${fieldName}`,      // Verifiable certificate format
  ]

  for (const keyID of keyIDFormats) {
    try {
      console.log(`[Profile] Trying to decrypt field "${fieldName}" with keyID: "${keyID}"`)

      // Decrypt using the wallet with certifier as counterparty
      const result = await walletClient.decrypt({
        ciphertext,
        protocolID,
        keyID,
        counterparty: certifier,
        privilegedReason: 'Display your identity on your profile'
      })

      // Convert decrypted bytes to UTF-8 string
      const decrypted = Utils.toUTF8(result.plaintext)
      console.log(`[Profile] Successfully decrypted "${fieldName}":`, decrypted)
      return decrypted
    } catch (error) {
      console.log(`[Profile] Decrypt attempt with keyID "${keyID}" failed, trying next...`)
    }
  }

  console.warn(`[Profile] Failed to decrypt field "${fieldName}" with all keyID formats`)
  return null
}

interface SocialCertIdentity {
  name: string
  avatarURL: string | null
}

// Create IdentityClient with our shared walletClient for proper decryption
const identityClient = new IdentityClient(walletClient)

export default function Profile() {
  const [copied, setCopied] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(null)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  // Identity resolution state
  const [socialCertIdentity, setSocialCertIdentity] = useState<SocialCertIdentity | null>(null)
  const [isResolvingIdentity, setIsResolvingIdentity] = useState(false)

  const isMobile = useIsMobile()
  const { identityKey, isConnected, isConnecting, connect, disconnect } = useWallet()

  // Track if we've already attempted resolution
  const hasAttemptedResolution = useRef(false)

  // Load cached identity from localStorage on mount AND auto-resolve if not cached
  useEffect(() => {
    if (!identityKey) {
      setSocialCertIdentity(null)
      hasAttemptedResolution.current = false
      return
    }

    // Clear any old/incomplete cache and always fetch fresh
    const cacheKey = `socialcert_${identityKey}`
    localStorage.removeItem(cacheKey) // Always clear cache to get fresh data

    // Auto-resolve identity (only once per identity key)
    if (!hasAttemptedResolution.current) {
      hasAttemptedResolution.current = true
      autoResolveIdentity(identityKey)
    }
  }, [identityKey])

  // Auto-resolve identity using multiple methods
  const autoResolveIdentity = async (key: string) => {
    setIsResolvingIdentity(true)
    console.log('[Profile] Auto-resolving identity for:', key)

    const xCertType = 'vdDWvftf1H+5+ZprUw123kjHlywH+v20aPQTuXgMpNc='

    try {
      // Method 1: Get user's OWN certificates and decrypt fields manually
      console.log('[Profile] Method 1: Trying walletClient.listCertificates with manual decryption...')
      try {
        const listResult = await walletClient.listCertificates({
          certifiers: [],
          types: [xCertType],
          privileged: true,
          privilegedReason: 'Display your identity on your profile'
        })
        console.log('[Profile] listCertificates result:', listResult)

        if (listResult?.certificates?.length > 0) {
          for (const cert of listResult.certificates) {
            console.log('[Profile] Certificate found:', cert)
            console.log('[Profile] cert.fields:', cert.fields)
            console.log('[Profile] cert.fields keys:', cert.fields ? Object.keys(cert.fields) : 'none')
            console.log('[Profile] cert.serialNumber:', cert.serialNumber)
            console.log('[Profile] cert.certifier:', cert.certifier)
            console.log('[Profile] cert.subject:', cert.subject)
            console.log('[Profile] cert.keyring:', cert.keyring)
            console.log('[Profile] cert.keyring keys:', cert.keyring ? Object.keys(cert.keyring) : 'none')

            // Try to decrypt the fields using multiple approaches
            if (cert.serialNumber && cert.certifier && cert.fields) {
              let userName: string | null = null
              let avatarURL: string | null = null

              // APPROACH 1: If keyring exists, use revelation keys to decrypt
              const keyring = cert.keyring as Record<string, string> | undefined
              if (keyring && Object.keys(keyring).length > 0) {
                console.log('[Profile] Attempting decryption using keyring revelation keys...')

                // Try to decrypt userName using keyring
                if (cert.fields.userName && keyring.userName) {
                  // First decrypt the revelation key, then use it to decrypt the field
                  const revelationKey = await decryptRevelationKey(
                    keyring.userName,
                    'userName',
                    cert.serialNumber,
                    cert.certifier
                  )
                  if (revelationKey) {
                    userName = await decryptFieldWithKey(cert.fields.userName, revelationKey)
                  }
                }

                // Try to decrypt profilePhoto/icon using keyring
                const photoField = cert.fields.profilePhoto || cert.fields.icon
                const photoKeyringKey = keyring.profilePhoto || keyring.icon
                if (photoField && photoKeyringKey) {
                  const fieldName = cert.fields.profilePhoto ? 'profilePhoto' : 'icon'
                  const revelationKey = await decryptRevelationKey(
                    photoKeyringKey,
                    fieldName,
                    cert.serialNumber,
                    cert.certifier
                  )
                  if (revelationKey) {
                    avatarURL = await decryptFieldWithKey(photoField, revelationKey)
                  }
                }
              }

              // APPROACH 2: Try direct wallet decryption if keyring approach didn't work
              if (!userName) {
                console.log('[Profile] Attempting direct wallet decryption...')

                if (cert.fields.userName) {
                  userName = await decryptCertificateField(
                    cert.fields.userName,
                    'userName',
                    cert.serialNumber,
                    cert.certifier
                  )
                }

                if (!avatarURL) {
                  const photoField = cert.fields.profilePhoto || cert.fields.icon
                  const fieldName = cert.fields.profilePhoto ? 'profilePhoto' : 'icon'
                  if (photoField) {
                    avatarURL = await decryptCertificateField(
                      photoField,
                      fieldName,
                      cert.serialNumber,
                      cert.certifier
                    )
                  }
                }
              }

              if (userName) {
                console.log('[Profile] Successfully decrypted identity:', userName, avatarURL)
                const identity = { name: userName, avatarURL }
                setSocialCertIdentity(identity)
                localStorage.setItem(`socialcert_${key}`, JSON.stringify(identity))
                return
              }
            }

            // APPROACH 3: Try proveCertificate to get revelation keys, then decrypt fields
            if (!userName && cert.serialNumber) {
              console.log('[Profile] Attempting proveCertificate for revelation keys...')
              try {
                // Get the list of field names to reveal
                const fieldsToReveal = Object.keys(cert.fields || {}).filter(f =>
                  ['userName', 'profilePhoto', 'icon', 'name'].includes(f)
                )
                console.log('[Profile] Fields to reveal:', fieldsToReveal)

                if (fieldsToReveal.length > 0) {
                  const proveResult = await walletClient.proveCertificate({
                    certificate: cert,
                    fieldsToReveal: fieldsToReveal,
                    verifier: key
                  })
                  console.log('[Profile] proveCertificate result:', proveResult)

                  // proveCertificate returns keyringForVerifier with revelation keys
                  const keyringForVerifier = proveResult.keyringForVerifier
                  if (keyringForVerifier) {
                    console.log('[Profile] Got keyringForVerifier:', Object.keys(keyringForVerifier))

                    // Use revelation keys to decrypt field values
                    if (cert.fields.userName && keyringForVerifier.userName) {
                      userName = await decryptFieldWithKey(cert.fields.userName, keyringForVerifier.userName)
                    }
                    if (!userName && cert.fields.name && keyringForVerifier.name) {
                      userName = await decryptFieldWithKey(cert.fields.name, keyringForVerifier.name)
                    }

                    if (cert.fields.profilePhoto && keyringForVerifier.profilePhoto) {
                      avatarURL = await decryptFieldWithKey(cert.fields.profilePhoto, keyringForVerifier.profilePhoto)
                    }
                    if (!avatarURL && cert.fields.icon && keyringForVerifier.icon) {
                      avatarURL = await decryptFieldWithKey(cert.fields.icon, keyringForVerifier.icon)
                    }
                  }
                }
              } catch (proveErr) {
                console.warn('[Profile] proveCertificate failed:', proveErr)
              }
            }

            // Fallback: check if decryptedFields already exists (maybe from a newer SDK version)
            if (!userName && cert.decryptedFields) {
              const fields = cert.decryptedFields as Record<string, string>
              userName = fields.userName || fields.name || null
              avatarURL = fields.profilePhoto || fields.icon || null
            }

            if (userName) {
              console.log('[Profile] Successfully resolved identity:', userName, avatarURL)
              const identity = { name: userName, avatarURL }
              setSocialCertIdentity(identity)
              localStorage.setItem(`socialcert_${key}`, JSON.stringify(identity))
              return
            }
          }
        }
      } catch (e) {
        console.warn('[Profile] listCertificates failed:', e)
      }

      // Method 2: Try IdentityClient (uses overlay network for publicly revealed certs)
      console.log('[Profile] Method 2: Trying IdentityClient...')
      try {
        const matchingIdentities = await identityClient.resolveByIdentityKey({ identityKey: key })
        console.log('[Profile] IdentityClient results:', matchingIdentities)

        if (matchingIdentities?.length > 0) {
          const socialCert = matchingIdentities.find(id =>
            id.badgeClickURL === 'https://socialcert.net'
          ) || matchingIdentities[0]

          console.log('[Profile] Found via IdentityClient:', socialCert)
          const identity = {
            name: socialCert.name,
            avatarURL: socialCert.avatarURL || null
          }
          setSocialCertIdentity(identity)
          localStorage.setItem(`socialcert_${key}`, JSON.stringify(identity))
          return
        }
      } catch (e) {
        console.warn('[Profile] IdentityClient failed:', e)
      }

      // Method 3: Try discoverByIdentityKey (for publicly revealed certs)
      console.log('[Profile] Method 3: Trying walletClient.discoverByIdentityKey...')
      try {
        const discoverResult = await walletClient.discoverByIdentityKey({ identityKey: key })
        console.log('[Profile] discoverByIdentityKey result:', discoverResult)

        if (discoverResult?.certificates?.length > 0) {
          for (const cert of discoverResult.certificates) {
            console.log('[Profile] Discovered certificate:', cert)
            const fields = (cert as { decryptedFields?: Record<string, string> }).decryptedFields || {}
            const name = fields.userName || fields.name
            const avatarURL = fields.profilePhoto || fields.icon

            if (name) {
              console.log('[Profile] Found discovered identity:', name, avatarURL)
              const identity = { name, avatarURL: avatarURL || null }
              setSocialCertIdentity(identity)
              localStorage.setItem(`socialcert_${key}`, JSON.stringify(identity))
              return
            }
          }
        }
      } catch (e) {
        console.warn('[Profile] discoverByIdentityKey failed:', e)
      }

      console.log('[Profile] No identity found via any method')
    } catch (error) {
      console.error('[Profile] Identity resolution failed:', error)
    } finally {
      setIsResolvingIdentity(false)
    }
  }

  // Manual identity resolution function - forces a fresh lookup
  const handleResolveIdentity = useCallback(async () => {
    if (!identityKey) return
    hasAttemptedResolution.current = true
    await autoResolveIdentity(identityKey)
  }, [identityKey])

  const shortAddress = identityKey ? abbreviateIdentityKey(identityKey) : ''

  const balance = 125.50
  const likedSongs = 23
  const uploadedSongs = 8
  const totalEarned = 248.67
  const totalStreams = 1247

  const handleCopyAddress = () => {
    if (identityKey) {
      navigator.clipboard.writeText(identityKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const recentActivity = [
    { type: 'stream', title: "Your song 'Cosmic Dreams' was streamed", amount: '+$0.06', time: '2 hours ago', plays: 3 },
    { type: 'purchase', title: "Someone purchased 'Neon Nights'", amount: '+$2.99', time: '5 hours ago', plays: 1 },
    { type: 'upload', title: "You uploaded 'Midnight Vibes'", amount: '-$0.20', time: '1 day ago', plays: 0 },
    { type: 'stream', title: "Your song 'Rainfall Meditation' was streamed", amount: '+$0.05', time: '2 days ago', plays: 5 },
    { type: 'like', title: "You liked 'Synthwave Sunset'", amount: '', time: '3 days ago', plays: 0 },
  ]

  if (!isConnected) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0f',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: isMobile ? '100px' : '0',
      }}>
        {/* Animated Background Orbs */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '20%',
            width: isMobile ? '250px' : '500px',
            height: isMobile ? '250px' : '500px',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }} className="animate-pulse-slow" />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            right: '15%',
            width: isMobile ? '200px' : '400px',
            height: isMobile ? '200px' : '400px',
            background: 'radial-gradient(circle, rgba(219, 39, 119, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }} className="animate-pulse-slow animation-delay-2000" />
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '30%',
            width: isMobile ? '150px' : '300px',
            height: isMobile ? '150px' : '300px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }} className="animate-pulse-slow animation-delay-4000" />
        </div>

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: isMobile ? '40px' : '120px',
          paddingLeft: isMobile ? '16px' : '20px',
          paddingRight: isMobile ? '16px' : '20px',
        }}>
          <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
            {/* Wallet Icon */}
            <div style={{ marginBottom: isMobile ? '32px' : '40px' }}>
              <div style={{
                width: isMobile ? '90px' : '120px',
                height: isMobile ? '90px' : '120px',
                margin: '0 auto 24px',
                borderRadius: isMobile ? '24px' : '32px',
                background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 60px rgba(147, 51, 234, 0.4)',
              }}>
                <Wallet style={{ width: isMobile ? '40px' : '56px', height: isMobile ? '40px' : '56px', color: 'white' }} />
              </div>
              <h1 style={{
                fontSize: isMobile ? '28px' : '42px',
                fontWeight: '800',
                margin: '0 0 16px 0',
                background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Connect Your Wallet</h1>
              <p style={{
                fontSize: isMobile ? '15px' : '18px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6',
                margin: 0,
              }}>
                Connect your wallet to start earning from your AI music or purchase songs
              </p>
            </div>

            {/* Connect Button */}
            <button
              onClick={connect}
              disabled={isConnecting}
              onMouseEnter={() => setHoveredButton('connect')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                width: '100%',
                padding: isMobile ? '16px 24px' : '20px 32px',
                borderRadius: isMobile ? '14px' : '16px',
                border: 'none',
                background: isConnecting ? 'rgba(147, 51, 234, 0.5)' : 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
                color: 'white',
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: '700',
                cursor: isConnecting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                boxShadow: hoveredButton === 'connect' && !isConnecting
                  ? '0 20px 60px rgba(147, 51, 234, 0.5)'
                  : '0 10px 40px rgba(147, 51, 234, 0.3)',
                transform: hoveredButton === 'connect' && !isConnecting ? 'translateY(-4px) scale(1.02)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                opacity: isConnecting ? 0.7 : 1,
              }}
            >
              {isConnecting ? (
                <>
                  <Loader2 style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', animation: 'spin 1s linear infinite' }} />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Wallet style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px' }} />
                  <span>Connect Wallet</span>
                </>
              )}
            </button>

            <p style={{ fontSize: isMobile ? '13px' : '14px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '16px' }}>
              BSV wallet required
            </p>

            {/* Benefits Card */}
            <div style={{
              marginTop: isMobile ? '32px' : '48px',
              padding: isMobile ? '24px' : '32px',
              borderRadius: isMobile ? '20px' : '24px',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <h3 style={{
                fontSize: isMobile ? '18px' : '20px',
                fontWeight: '700',
                color: 'white',
                marginBottom: isMobile ? '20px' : '24px',
              }}>Why connect?</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '20px', textAlign: 'left' }}>
                {[
                  { icon: Music, title: 'Upload & Monetize', desc: 'Create and sell AI-generated music', color: '#a855f7' },
                  { icon: DollarSign, title: 'Instant Payments', desc: 'Receive earnings directly to your wallet', color: '#22c55e' },
                  { icon: Heart, title: 'Build Library', desc: 'Save and own your favorite tracks', color: '#ec4899' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: isMobile ? '12px' : '16px' }}>
                    <div style={{
                      width: isMobile ? '40px' : '48px',
                      height: isMobile ? '40px' : '48px',
                      borderRadius: isMobile ? '12px' : '14px',
                      background: `${item.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <item.icon style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', color: item.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{item.title}</div>
                      <div style={{ fontSize: isMobile ? '13px' : '14px', color: 'rgba(255, 255, 255, 0.5)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      position: 'relative',
      overflow: 'hidden',
      paddingBottom: isMobile ? '100px' : '0',
    }}>
      {/* Animated Background Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '-5%',
          right: '10%',
          width: isMobile ? '300px' : '600px',
          height: isMobile ? '300px' : '600px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} className="animate-pulse-slow" />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: isMobile ? '250px' : '500px',
          height: isMobile ? '250px' : '500px',
          background: 'radial-gradient(circle, rgba(219, 39, 119, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} className="animate-pulse-slow animation-delay-2000" />
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '30%',
          width: isMobile ? '200px' : '400px',
          height: isMobile ? '200px' : '400px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} className="animate-pulse-slow animation-delay-4000" />
        <div style={{
          position: 'absolute',
          bottom: '30%',
          right: '20%',
          width: isMobile ? '175px' : '350px',
          height: isMobile ? '175px' : '350px',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} className="animate-pulse-slow" />
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        paddingTop: isMobile ? '24px' : '100px',
        paddingBottom: isMobile ? '24px' : '100px',
        paddingLeft: isMobile ? '16px' : '20px',
        paddingRight: isMobile ? '16px' : '20px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Profile Header with IdentityCard */}
          <div style={{
            padding: isMobile ? '20px' : '40px',
            borderRadius: isMobile ? '20px' : '32px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: isMobile ? '20px' : '32px',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              gap: isMobile ? '16px' : '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '14px' : '24px' }}>
                {/* Profile Avatar - SocialCert or Default */}
                <div style={{
                  width: isMobile ? '70px' : '90px',
                  height: isMobile ? '70px' : '90px',
                  borderRadius: isMobile ? '18px' : '24px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 48px rgba(147, 51, 234, 0.35)',
                  background: socialCertIdentity?.avatarURL
                    ? 'transparent'
                    : 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                  {isResolvingIdentity ? (
                    <Loader2 style={{
                      width: isMobile ? '28px' : '36px',
                      height: isMobile ? '28px' : '36px',
                      color: 'white',
                      animation: 'spin 1s linear infinite'
                    }} />
                  ) : socialCertIdentity?.avatarURL ? (
                    <img
                      src={socialCertIdentity.avatarURL}
                      alt={socialCertIdentity.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <User style={{
                      width: isMobile ? '32px' : '40px',
                      height: isMobile ? '32px' : '40px',
                      color: 'white'
                    }} />
                  )}
                </div>

                {/* User Info & Actions */}
                <div>
                  {/* Username or Identity Actions */}
                  {socialCertIdentity ? (
                    <div style={{
                      fontSize: isMobile ? '20px' : '26px',
                      fontWeight: '700',
                      color: 'white',
                      marginBottom: '8px',
                    }}>
                      {socialCertIdentity.name}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      {/* Load Identity Button */}
                      <button
                        onClick={handleResolveIdentity}
                        disabled={isResolvingIdentity}
                        onMouseEnter={() => setHoveredButton('resolve')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '10px',
                          border: '1px solid rgba(34, 197, 94, 0.4)',
                          background: hoveredButton === 'resolve' ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
                          color: '#22c55e',
                          fontSize: isMobile ? '13px' : '14px',
                          fontWeight: '600',
                          cursor: isResolvingIdentity ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.2s ease',
                          opacity: isResolvingIdentity ? 0.6 : 1,
                        }}
                      >
                        {isResolvingIdentity ? (
                          <Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} />
                        ) : (
                          <RefreshCw style={{ width: 16, height: 16 }} />
                        )}
                        {isResolvingIdentity ? 'Loading...' : 'Load Identity'}
                      </button>
                    </div>
                  )}

                  {/* Wallet Address */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: isMobile ? '13px' : '16px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: isMobile ? '6px 10px' : '8px 16px',
                      borderRadius: isMobile ? '8px' : '10px',
                    }}>{shortAddress}</span>
                    <button
                      onClick={handleCopyAddress}
                      onMouseEnter={() => setHoveredButton('copy')}
                      onMouseLeave={() => setHoveredButton(null)}
                      style={{
                        width: isMobile ? '34px' : '40px',
                        height: isMobile ? '34px' : '40px',
                        borderRadius: isMobile ? '8px' : '10px',
                        border: 'none',
                        background: hoveredButton === 'copy' ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {copied ? (
                        <Check style={{ width: isMobile ? '16px' : '18px', height: isMobile ? '16px' : '18px', color: '#22c55e' }} />
                      ) : (
                        <Copy style={{ width: isMobile ? '16px' : '18px', height: isMobile ? '16px' : '18px', color: 'rgba(255, 255, 255, 0.6)' }} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Disconnect Button */}
              <button
                onClick={disconnect}
                onMouseEnter={() => setHoveredButton('disconnect')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '8px' : '10px',
                  padding: isMobile ? '10px 16px' : '14px 24px',
                  borderRadius: isMobile ? '10px' : '14px',
                  border: '2px solid rgba(239, 68, 68, 0.3)',
                  background: hoveredButton === 'disconnect' ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                  color: '#ef4444',
                  fontSize: isMobile ? '13px' : '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  alignSelf: isMobile ? 'flex-start' : 'auto',
                }}
              >
                <LogOut style={{ width: isMobile ? '16px' : '18px', height: isMobile ? '16px' : '18px' }} />
                <span>Disconnect</span>
              </button>
            </div>
          </div>

          {/* Balance Card */}
          <div
            onMouseEnter={() => setHoveredCard('balance')}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              padding: isMobile ? '24px' : '40px',
              borderRadius: isMobile ? '20px' : '32px',
              background: 'linear-gradient(135deg, #9333ea 0%, #db2777 50%, #ec4899 100%)',
              marginBottom: isMobile ? '20px' : '32px',
              boxShadow: hoveredCard === 'balance'
                ? '0 30px 80px rgba(147, 51, 234, 0.5)'
                : '0 20px 60px rgba(147, 51, 234, 0.3)',
              transform: hoveredCard === 'balance' ? 'translateY(-8px)' : 'translateY(0)',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: isMobile ? '-30px' : '-50px',
              right: isMobile ? '-30px' : '-50px',
              width: isMobile ? '120px' : '200px',
              height: isMobile ? '120px' : '200px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
            }} />
            <div style={{
              position: 'absolute',
              bottom: isMobile ? '-20px' : '-30px',
              left: '20%',
              width: isMobile ? '80px' : '120px',
              height: isMobile ? '80px' : '120px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '50%',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: isMobile ? '8px' : '12px' }}>
                <DollarSign style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', color: 'rgba(255, 255, 255, 0.8)' }} />
                <span style={{ fontSize: isMobile ? '14px' : '16px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '500' }}>Balance</span>
              </div>
              <div style={{
                fontSize: isMobile ? '42px' : '64px',
                fontWeight: '800',
                color: 'white',
                marginBottom: isMobile ? '20px' : '32px',
                letterSpacing: '-2px',
              }}>${balance.toFixed(2)}</div>
              <div style={{ display: 'flex', gap: isMobile ? '10px' : '16px', flexWrap: 'wrap' }}>
                <button
                  onMouseEnter={() => setHoveredButton('add')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    flex: '1 1 140px',
                    padding: isMobile ? '14px 20px' : '18px 32px',
                    borderRadius: isMobile ? '12px' : '16px',
                    border: 'none',
                    background: 'white',
                    color: '#9333ea',
                    fontSize: isMobile ? '15px' : '17px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: hoveredButton === 'add' ? '0 12px 32px rgba(0, 0, 0, 0.3)' : '0 8px 24px rgba(0, 0, 0, 0.2)',
                    transform: hoveredButton === 'add' ? 'translateY(-3px)' : 'translateY(0)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Add Funds
                </button>
                <button
                  onMouseEnter={() => setHoveredButton('withdraw')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    flex: '1 1 140px',
                    padding: isMobile ? '14px 20px' : '18px 32px',
                    borderRadius: isMobile ? '12px' : '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: hoveredButton === 'withdraw' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: isMobile ? '15px' : '17px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transform: hoveredButton === 'withdraw' ? 'translateY(-3px)' : 'translateY(0)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: isMobile ? '12px' : '24px',
            marginBottom: isMobile ? '32px' : '48px',
          }}>
            {[
              { icon: Music, label: 'Uploaded', value: uploadedSongs, color: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.15)' },
              { icon: Heart, label: 'Liked', value: likedSongs, color: '#ec4899', bgColor: 'rgba(236, 72, 153, 0.15)' },
              { icon: Play, label: 'Streams', value: totalStreams.toLocaleString(), color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.15)' },
              { icon: TrendingUp, label: 'Earned', value: `$${totalEarned.toFixed(2)}`, color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.15)' },
            ].map((stat, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(`stat-${idx}`)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: isMobile ? '16px' : '28px',
                  borderRadius: isMobile ? '16px' : '24px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: hoveredCard === `stat-${idx}`
                    ? `0 20px 50px ${stat.color}30`
                    : '0 4px 20px rgba(0, 0, 0, 0.2)',
                  transform: hoveredCard === `stat-${idx}` ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px', marginBottom: isMobile ? '10px' : '16px' }}>
                  <div style={{
                    width: isMobile ? '36px' : '48px',
                    height: isMobile ? '36px' : '48px',
                    borderRadius: isMobile ? '10px' : '14px',
                    background: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <stat.icon style={{ width: isMobile ? '18px' : '24px', height: isMobile ? '18px' : '24px', color: stat.color }} />
                  </div>
                  <span style={{ fontSize: isMobile ? '12px' : '15px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '500' }}>{stat.label}</span>
                </div>
                <div style={{
                  fontSize: isMobile ? '24px' : '36px',
                  fontWeight: '800',
                  color: stat.color,
                }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div style={{ marginBottom: isMobile ? '32px' : '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px', marginBottom: isMobile ? '16px' : '24px' }}>
              <Clock style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', color: '#a855f7' }} />
              <h2 style={{
                fontSize: isMobile ? '20px' : '28px',
                fontWeight: '700',
                margin: 0,
                color: 'white',
              }}>Recent Activity</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '12px' }}>
              {recentActivity.map((activity, idx) => {
                const isPositive = activity.amount.startsWith('+')
                const typeConfig: Record<string, { icon: typeof Music; color: string; bg: string }> = {
                  stream: { icon: Play, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)' },
                  purchase: { icon: DollarSign, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
                  upload: { icon: Music, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)' },
                  like: { icon: Heart, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' },
                }
                const config = typeConfig[activity.type] || typeConfig.stream
                const IconComponent = config.icon

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredActivity(idx)}
                    onMouseLeave={() => setHoveredActivity(null)}
                    style={{
                      padding: isMobile ? '14px 16px' : '20px 24px',
                      borderRadius: isMobile ? '14px' : '18px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      boxShadow: hoveredActivity === idx
                        ? '0 12px 32px rgba(147, 51, 234, 0.15)'
                        : '0 2px 10px rgba(0, 0, 0, 0.1)',
                      transform: hoveredActivity === idx ? 'translateY(-3px) scale(1.01)' : 'translateY(0)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '16px', flex: 1, minWidth: 0 }}>
                      <div style={{
                        width: isMobile ? '40px' : '48px',
                        height: isMobile ? '40px' : '48px',
                        borderRadius: isMobile ? '12px' : '14px',
                        background: config.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <IconComponent style={{ width: isMobile ? '18px' : '22px', height: isMobile ? '18px' : '22px', color: config.color }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          fontSize: isMobile ? '13px' : '16px',
                          fontWeight: '600',
                          color: 'white',
                          marginBottom: '4px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: isMobile ? 'nowrap' : 'normal',
                        }}>{isMobile ? activity.title.slice(0, 30) + (activity.title.length > 30 ? '...' : '') : activity.title}</div>
                        <div style={{ fontSize: isMobile ? '12px' : '14px', color: 'rgba(255, 255, 255, 0.5)' }}>{activity.time}</div>
                      </div>
                    </div>
                    {activity.amount && (
                      <div style={{
                        fontSize: isMobile ? '15px' : '18px',
                        fontWeight: '700',
                        color: isPositive ? '#22c55e' : 'rgba(255, 255, 255, 0.6)',
                        flexShrink: 0,
                      }}>
                        {activity.amount}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Settings */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px', marginBottom: isMobile ? '16px' : '24px' }}>
              <Settings style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', color: '#a855f7' }} />
              <h2 style={{
                fontSize: isMobile ? '20px' : '28px',
                fontWeight: '700',
                margin: 0,
                color: 'white',
              }}>Settings</h2>
            </div>

            <div style={{
              padding: isMobile ? '20px' : '32px',
              borderRadius: isMobile ? '16px' : '24px',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '24px' }}>
                {[
                  { icon: Bell, title: 'Email Notifications', desc: 'Get notified about streams and sales', color: '#f59e0b' },
                  { icon: Eye, title: 'Public Profile', desc: 'Show your profile to other users', color: '#06b6d4' },
                  { icon: Shield, title: 'Two-Factor Auth', desc: 'Add extra security to your account', color: '#22c55e' },
                  { icon: Zap, title: 'Auto-Withdraw', desc: isMobile ? 'Auto withdraw at $100' : 'Automatically withdraw when balance exceeds $100', color: '#a855f7' },
                ].map((setting, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '16px', flex: 1, minWidth: 0 }}>
                      <div style={{
                        width: isMobile ? '38px' : '44px',
                        height: isMobile ? '38px' : '44px',
                        borderRadius: isMobile ? '10px' : '12px',
                        background: `${setting.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <setting.icon style={{ width: isMobile ? '18px' : '22px', height: isMobile ? '18px' : '22px', color: setting.color }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '600', color: 'white', marginBottom: '2px' }}>{setting.title}</div>
                        <div style={{
                          fontSize: isMobile ? '12px' : '14px',
                          color: 'rgba(255, 255, 255, 0.5)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>{setting.desc}</div>
                      </div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
                      <input type="checkbox" defaultChecked={idx < 2} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                      <div style={{
                        width: isMobile ? '44px' : '52px',
                        height: isMobile ? '24px' : '28px',
                        background: idx < 2 ? 'linear-gradient(135deg, #9333ea, #db2777)' : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: isMobile ? '12px' : '14px',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '2px',
                          left: idx < 2 ? (isMobile ? '22px' : '26px') : '2px',
                          width: isMobile ? '20px' : '24px',
                          height: isMobile ? '20px' : '24px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        }} />
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
