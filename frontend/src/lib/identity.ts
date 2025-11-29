/**
 * Identity utilities - display helpers for identity keys
 * The @bsv/identity-react library handles all identity resolution and caching
 */

/**
 * Abbreviate an identity key for display
 */
export function abbreviateIdentityKey(identityKey: string, prefixLength = 6, suffixLength = 4): string {
  if (identityKey.length <= prefixLength + suffixLength + 3) {
    return identityKey
  }
  return `${identityKey.slice(0, prefixLength)}...${identityKey.slice(-suffixLength)}`
}
