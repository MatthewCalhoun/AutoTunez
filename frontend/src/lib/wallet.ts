import { walletClient } from './walletClient'

// Identity key = User ID (root identity from wallet)
export async function getIdentityKey(): Promise<string> {
  console.log('[Wallet] Getting identity key...')
  try {
    const result = await walletClient.getPublicKey({ identityKey: true })
    console.log('[Wallet] Got identity key:', result.publicKey)
    return result.publicKey
  } catch (error) {
    console.error('[Wallet] Failed to get identity key:', error)
    throw error
  }
}

// Check if wallet is available and authenticated
export async function isWalletAvailable(): Promise<boolean> {
  try {
    const auth = await walletClient.isAuthenticated()
    console.log('[Wallet] isAuthenticated result:', auth)
    return auth?.authenticated === true
  } catch (error) {
    console.error('[Wallet] isAuthenticated failed:', error)
    return false
  }
}
