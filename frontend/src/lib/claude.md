# Lib Directory

Utility libraries for wallet integration with BSV (Bitcoin SV) blockchain.

## Files

### walletClient.ts
Singleton instance of BSV SDK's WalletClient:
```typescript
import { WalletClient } from '@bsv/sdk'
export const walletClient = new WalletClient()
```

### wallet.ts
Wallet utility functions:

```typescript
// Get user's identity key (public key from wallet)
export async function getIdentityKey(): Promise<string>

// Check if wallet extension is available
export async function isWalletAvailable(): Promise<boolean>
```

## BSV SDK Reference

The `WalletClient` connects to the user's BSV wallet browser extension (e.g., Yours Wallet, HandCash Connect).

**Key methods used:**
- `getPublicKey({ identityKey: true })` - Returns user's root identity public key

**Future methods to use:**
- `createAction()` - Create BSV transactions
- `signMessage()` - Sign data with wallet key
- `encrypt()` / `decrypt()` - Encryption with wallet keys

## Usage in App

```typescript
// In WalletContext.tsx
import { getIdentityKey } from '../lib/wallet'

const connect = async () => {
  const key = await getIdentityKey()
  setIdentityKey(key)  // Store in context
}
```

## Adding New Wallet Features

1. Add function to `wallet.ts`
2. Use `walletClient` singleton
3. Handle errors appropriately
4. Export from this module

Example for future payment:
```typescript
export async function streamPayment(amount: number, recipient: string) {
  // Use walletClient.createAction() for micropayment
}
```
