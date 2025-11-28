import { walletClient } from './walletClient'

// Identity key = User ID (root identity from wallet)
export async function getIdentityKey(): Promise<string> {
  const result = await walletClient.getPublicKey({ identityKey: true })
  return result.publicKey
}

// Check if wallet is available
export async function isWalletAvailable(): Promise<boolean> {
  try {
    await getIdentityKey()
    return true
  } catch {
    return false
  }
}
