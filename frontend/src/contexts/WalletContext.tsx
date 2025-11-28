import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { getIdentityKey } from '../lib/wallet'

interface WalletContextType {
  identityKey: string | null
  isConnecting: boolean
  isConnected: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [identityKey, setIdentityKey] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connect = useCallback(async () => {
    setIsConnecting(true)
    try {
      const key = await getIdentityKey()
      setIdentityKey(key)
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setIdentityKey(null)
  }, [])

  const isConnected = identityKey !== null

  return (
    <WalletContext.Provider value={{ identityKey, isConnecting, isConnected, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
