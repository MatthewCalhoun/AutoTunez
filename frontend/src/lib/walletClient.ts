import { WalletClient } from '@bsv/sdk'

// Use XDM substrate which uses cross-domain messaging via iframe
// This is what Thryll uses to communicate with MetaNet Client
export const walletClient = new WalletClient('xdm')
