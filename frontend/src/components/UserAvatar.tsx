import { IdentityCard } from '@bsv/identity-react'

interface UserAvatarProps {
  identityKey: string
  themeMode?: 'light' | 'dark'
}

/**
 * Displays a user's identity using the @bsv/identity-react IdentityCard.
 * Automatically resolves and caches identity information from the blockchain.
 */
export function UserAvatar({ identityKey, themeMode = 'dark' }: UserAvatarProps) {
  return <IdentityCard identityKey={identityKey} themeMode={themeMode} />
}
