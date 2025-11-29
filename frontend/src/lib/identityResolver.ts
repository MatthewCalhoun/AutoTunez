import { Transaction, Utils } from '@bsv/sdk'

// Known certificate types
const XCERT_TYPE = 'vdDWvftf1H+5+ZprUw123kjHlywH+v20aPQTuXgMpNc='

// Public overlay hosts to try
const OVERLAY_HOSTS = [
  'https://overlay-us-1.bsvb.tech',
  'https://overlay-eu-1.bsvb.tech',
  'https://overlay-ap-1.bsvb.tech',
]

export interface ResolvedIdentity {
  name: string
  avatarURL: string | null
  identityKey: string
  certifier: string
  certificateType: string
}

/**
 * Directly query the overlay network for identity certificates
 * This bypasses the WalletClient/MNC requirement
 */
export async function resolveIdentityFromOverlay(identityKey: string): Promise<ResolvedIdentity | null> {
  console.log('[IdentityResolver] Resolving identity for:', identityKey)

  // Try multiple overlay hosts
  for (const host of OVERLAY_HOSTS) {
    // The overlay API requires certifiers array (can be empty to match all)
    // Query by identityKey with empty certifiers array to find all certificates for this identity
    const query = {
      identityKey,
      certifiers: [] // Empty array matches all certifiers
    }

    try {
      console.log(`[IdentityResolver] Trying ${host} with query:`, query)

      const response = await fetch(`${host}/lookup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: 'ls_identity', query })
      })

      const result = await response.json()
      console.log(`[IdentityResolver] ${host} result:`, result)

      // Check for API error
      if (result.status === 'error') {
        console.warn(`[IdentityResolver] ${host} API error:`, result.message)
        continue
      }

      if (result.type === 'output-list' && result.outputs?.length > 0) {
        console.log(`[IdentityResolver] Found ${result.outputs.length} outputs`)
        // Parse certificates and find one for our identity key
        for (const output of result.outputs) {
          try {
            const identity = parseCertificateOutput(output.beef, output.outputIndex, identityKey)
            if (identity) {
              console.log('[IdentityResolver] Found identity:', identity)
              return identity
            }
          } catch (e) {
            console.warn('[IdentityResolver] Error parsing output:', e)
            // Continue to next output
          }
        }
      }

      // If we got a response (even empty), don't try other hosts
      if (result.type === 'output-list') {
        console.log('[IdentityResolver] Got valid response from', host, 'but no matching identity found')
        break
      }
    } catch (error) {
      console.warn(`[IdentityResolver] ${host} query failed:`, error)
    }
  }

  console.log('[IdentityResolver] No identity found via overlay')
  return null
}

/**
 * Parse a certificate from BEEF output
 */
function parseCertificateOutput(beef: number[], outputIndex: number, expectedSubject: string): ResolvedIdentity | null {
  try {
    const tx = Transaction.fromBEEF(beef)
    const output = tx.outputs[outputIndex]

    if (!output?.lockingScript) {
      return null
    }

    // Try to decode as PushDrop token
    // The locking script should contain certificate data
    const script = output.lockingScript
    const chunks = script.chunks

    // Look for OP_RETURN or data pushes that might contain certificate JSON
    for (const chunk of chunks) {
      if (chunk.data && chunk.data.length > 10) {
        try {
          const dataStr = Utils.toUTF8(chunk.data)
          // Check if it looks like JSON
          if (dataStr.startsWith('{')) {
            const cert = JSON.parse(dataStr)

            // Verify this certificate is for the expected subject
            if (cert.subject === expectedSubject) {
              const fields = cert.decryptedFields || cert.fields || {}
              console.log('[IdentityResolver] Certificate fields:', fields)
              console.log('[IdentityResolver] Full certificate:', cert)

              // Try various field names for username
              const name = fields.userName || fields.name || fields.displayName || fields.handle
              // Try various field names for avatar - SocialCert uses 'icon' for X profile pics
              const avatarURL = fields.profilePhoto || fields.icon || fields.avatar || fields.profilePicture || fields.image || null

              console.log('[IdentityResolver] Extracted name:', name, 'avatarURL:', avatarURL)

              if (name) {
                return {
                  name,
                  avatarURL,
                  identityKey: cert.subject,
                  certifier: cert.certifier || 'unknown',
                  certificateType: cert.type || XCERT_TYPE
                }
              }
            }
          }
        } catch {
          // Not valid JSON, continue
        }
      }
    }

    return null
  } catch (error) {
    console.warn('[IdentityResolver] Error parsing certificate:', error)
    return null
  }
}

/**
 * Alternative: Fetch identity from a known Thryll-style API
 * This is a fallback if direct overlay queries don't work
 */
export async function resolveIdentityFromAPI(identityKey: string, apiUrl: string): Promise<ResolvedIdentity | null> {
  try {
    const response = await fetch(`${apiUrl}/identity?identityKey=${encodeURIComponent(identityKey)}`)

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    if (data.username || data.profilePicture) {
      return {
        name: data.username || 'Unknown',
        avatarURL: data.profilePicture || null,
        identityKey,
        certifier: 'api',
        certificateType: 'cached'
      }
    }

    return null
  } catch (error) {
    console.warn('[IdentityResolver] API fetch failed:', error)
    return null
  }
}
