import { Transaction, Utils, IdentityClient } from '@bsv/sdk'

// Create a singleton IdentityClient for searching
let identityClientInstance: IdentityClient | null = null
function getIdentityClient(): IdentityClient {
  if (!identityClientInstance) {
    identityClientInstance = new IdentityClient()
  }
  return identityClientInstance
}

// Known certificate types
const XCERT_TYPE = 'vdDWvftf1H+5+ZprUw123kjHlywH+v20aPQTuXgMpNc='

// Local identity cache (persisted to localStorage)
const IDENTITY_CACHE_KEY = 'autotunez_identity_cache'

interface CachedIdentity extends ResolvedIdentity {
  cachedAt: number
}

function getIdentityCache(): Map<string, CachedIdentity> {
  try {
    const cached = localStorage.getItem(IDENTITY_CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      // Handle both array of entries format and old object format
      if (Array.isArray(parsed)) {
        // Validate that entries are in correct format [key, value]
        const validEntries = parsed.filter((entry): entry is [string, CachedIdentity] =>
          Array.isArray(entry) && entry.length === 2 && typeof entry[0] === 'string'
        )
        return new Map(validEntries)
      } else if (typeof parsed === 'object' && parsed !== null) {
        // Handle plain object format {key: value}
        return new Map(Object.entries(parsed) as [string, CachedIdentity][])
      }
    }
  } catch (e) {
    console.warn('[IdentityResolver] Failed to load cache, clearing:', e)
    // Clear corrupted cache
    localStorage.removeItem(IDENTITY_CACHE_KEY)
  }
  return new Map()
}

function saveIdentityCache(cache: Map<string, CachedIdentity>): void {
  try {
    const entries = Array.from(cache.entries())
    localStorage.setItem(IDENTITY_CACHE_KEY, JSON.stringify(entries))
  } catch (e) {
    console.warn('[IdentityResolver] Failed to save cache:', e)
  }
}

/**
 * Add an identity to the local cache (call this when identities are resolved)
 */
export function cacheIdentity(identity: ResolvedIdentity): void {
  console.log('[IdentityResolver] *** CACHING IDENTITY ***', identity)
  const cache = getIdentityCache()
  cache.set(identity.identityKey, {
    ...identity,
    cachedAt: Date.now()
  })
  saveIdentityCache(cache)
  console.log('[IdentityResolver] Cache now has', cache.size, 'identities')
  // Verify it was saved
  const verifyCache = getIdentityCache()
  console.log('[IdentityResolver] Verified cache size:', verifyCache.size)
}

/**
 * Search cached identities by username
 */
export function searchCachedIdentities(searchQuery: string): ResolvedIdentity[] {
  console.log('[IdentityResolver] *** SEARCHING CACHE for:', searchQuery)
  const cache = getIdentityCache()
  console.log('[IdentityResolver] Cache has', cache.size, 'identities')

  // Log all cached identities for debugging
  cache.forEach((identity, key) => {
    console.log('[IdentityResolver] Cached:', identity.name, '| key:', key.slice(0, 20) + '...')
  })

  const searchLower = searchQuery.toLowerCase()
  const results: ResolvedIdentity[] = []

  cache.forEach((identity) => {
    if (identity.name?.toLowerCase().includes(searchLower)) {
      console.log('[IdentityResolver] MATCH FOUND:', identity.name)
      results.push({
        name: identity.name,
        avatarURL: identity.avatarURL,
        identityKey: identity.identityKey,
        certifier: identity.certifier,
        certificateType: identity.certificateType
      })
    }
  })

  console.log('[IdentityResolver] Search results:', results.length)
  return results
}

// Known SocialCert certifier public keys
const SOCIALCERT_CERTIFIERS = [
  '0294c479f762f3571c4c34de23a1b5df7121545f7edad39399b5c96ccfc8328c99', // SocialCert main
  '02bc97de0abe5b7e3da5c8858de0ac078e9c4c1a7a6e9b6f5f4d5e5c5a5b5c5d5e', // Alternative
]

// Public overlay hosts to try
const OVERLAY_HOSTS = [
  'https://overlay.babbage.systems',
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

/**
 * Search for users by username/handle using the overlay network
 * This queries SocialCert identity certificates
 */
export async function searchUsersByUsername(searchQuery: string): Promise<ResolvedIdentity[]> {
  console.log('[IdentityResolver] Searching users for:', searchQuery)

  if (!searchQuery || searchQuery.length < 2) {
    return []
  }

  // First, check the local cache (fastest)
  const cachedResults = searchCachedIdentities(searchQuery)
  if (cachedResults.length > 0) {
    console.log('[IdentityResolver] Found in cache:', cachedResults.length, 'results')
    return cachedResults
  }

  const results: ResolvedIdentity[] = []
  const searchLower = searchQuery.toLowerCase()

  // Try each overlay host
  for (const host of OVERLAY_HOSTS) {
    try {
      console.log(`[IdentityResolver] Searching ${host} for username:`, searchQuery)

      // Try multiple query approaches
      const queries = [
        // Query with SocialCert certifiers
        { service: 'ls_identity', query: { certifiers: SOCIALCERT_CERTIFIERS } },
        // Query all identities
        { service: 'ls_identity', query: {} },
        // Try certificate lookup
        { service: 'ls_certificate', query: { certifiers: SOCIALCERT_CERTIFIERS } },
      ]

      for (const queryObj of queries) {
        try {
          const response = await fetch(`${host}/lookup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(queryObj)
          })

          const result = await response.json()
          console.log(`[IdentityResolver] ${host} query result:`, result?.type, result?.outputs?.length || 0)

          if (result.status === 'error') {
            continue
          }

          if (result.type === 'output-list' && result.outputs?.length > 0) {
            console.log(`[IdentityResolver] Found ${result.outputs.length} outputs to search`)

            for (const output of result.outputs) {
              try {
                const identity = parseCertificateForSearch(output.beef, output.outputIndex, searchLower)
                if (identity) {
                  // Avoid duplicates
                  if (!results.find(r => r.identityKey === identity.identityKey)) {
                    results.push(identity)
                    console.log(`[IdentityResolver] Found matching user:`, identity.name)
                  }
                }
              } catch (e) {
                // Continue to next output
              }
            }
          }

          // If we found results, stop trying more queries
          if (results.length > 0) break
        } catch (e) {
          // Try next query
        }
      }

      // If we got results from this host, don't try others
      if (results.length > 0) {
        break
      }
    } catch (error) {
      console.warn(`[IdentityResolver] ${host} search failed:`, error)
    }
  }

  // Fallback: Try IdentityClient to get all known identities
  if (results.length === 0) {
    console.log('[IdentityResolver] Trying IdentityClient fallback...')
    try {
      const identityClient = getIdentityClient()
      // Try to discover identities - IdentityClient may cache known identities
      // Unfortunately IdentityClient doesn't have a "search all" method,
      // so this is limited, but we try anyway

      // As a last resort, try querying the socialcert.net API directly
      try {
        const response = await fetch('https://socialcert.net/api/identities/search?' + new URLSearchParams({
          q: searchQuery,
          limit: '10'
        }))
        if (response.ok) {
          const data = await response.json()
          console.log('[IdentityResolver] SocialCert API response:', data)
          if (Array.isArray(data)) {
            for (const item of data) {
              if (item.userName?.toLowerCase().includes(searchLower) ||
                  item.name?.toLowerCase().includes(searchLower)) {
                results.push({
                  name: item.userName || item.name,
                  avatarURL: item.icon || item.profilePhoto || null,
                  identityKey: item.identityKey || item.subject,
                  certifier: item.certifier || 'socialcert',
                  certificateType: XCERT_TYPE
                })
              }
            }
          }
        }
      } catch (e) {
        console.log('[IdentityResolver] SocialCert API not available')
      }
    } catch (e) {
      console.warn('[IdentityResolver] IdentityClient fallback failed:', e)
    }
  }

  console.log('[IdentityResolver] Search results:', results)
  return results
}

/**
 * Parse certificate output and check if name matches search query
 */
function parseCertificateForSearch(beef: number[], outputIndex: number, searchLower: string): ResolvedIdentity | null {
  try {
    const tx = Transaction.fromBEEF(beef)
    const output = tx.outputs[outputIndex]

    if (!output?.lockingScript) {
      return null
    }

    const script = output.lockingScript
    const chunks = script.chunks

    for (const chunk of chunks) {
      if (chunk.data && chunk.data.length > 10) {
        try {
          const dataStr = Utils.toUTF8(chunk.data)
          if (dataStr.startsWith('{')) {
            const cert = JSON.parse(dataStr)
            const fields = cert.decryptedFields || cert.fields || {}

            // Get username from various possible field names
            const name = fields.userName || fields.name || fields.displayName || fields.handle || ''
            const nameLower = name.toLowerCase()

            // Check if name matches search query
            if (name && nameLower.includes(searchLower)) {
              const avatarURL = fields.profilePhoto || fields.icon || fields.avatar || fields.profilePicture || fields.image || null

              return {
                name,
                avatarURL,
                identityKey: cert.subject,
                certifier: cert.certifier || 'unknown',
                certificateType: cert.type || XCERT_TYPE
              }
            }
          }
        } catch {
          // Not valid JSON
        }
      }
    }

    return null
  } catch {
    return null
  }
}
