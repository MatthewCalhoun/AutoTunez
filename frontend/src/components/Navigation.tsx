import { Link, useLocation } from 'react-router-dom'
import { Music2, Compass, Plus, User, Wallet, LogOut, Loader2 } from 'lucide-react'
import { useIsMobile } from '../hooks/useIsMobile'
import { useWallet } from '../contexts/WalletContext'

export default function Navigation() {
  const location = useLocation()
  const isMobile = useIsMobile()
  const { identityKey, isConnecting, isConnected, connect, disconnect } = useWallet()

  const truncatedKey = identityKey ? `${identityKey.slice(0, 6)}...${identityKey.slice(-4)}` : ''

  const isActive = (path: string) => location.pathname === path

  // Desktop Navigation
  if (!isMobile) {
    return (
      <nav className="sticky top-0 z-50 glass border-b">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="flex items-center h-16" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl transform transition-transform group-hover:scale-110">
                <Music2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold gradient-text">Autotune</span>
            </Link>

            {/* Main Navigation - Centered with more spacing */}
            <div className="hidden md:flex items-center" style={{ display: 'flex', gap: '3rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <NavLink to="/create" active={isActive('/create')}>
                <Plus className="h-4 w-4" />
                Create
              </NavLink>
              <NavLink to="/discover" active={isActive('/discover')}>
                <Compass className="h-4 w-4" />
                Discover
              </NavLink>
              <NavLink to="/library" active={isActive('/library')}>
                <Music2 className="h-4 w-4" />
                Library
              </NavLink>
              <NavLink to="/profile" active={isActive('/profile')}>
                <User className="h-4 w-4" />
                Profile
              </NavLink>
            </div>

            {/* Wallet Button - Far Right */}
            {isConnected ? (
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '8px 14px',
                  borderRadius: '10px',
                }}>{truncatedKey}</span>
                <button
                  onClick={disconnect}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full font-medium transition-all duration-200 flex items-center space-x-2"
                  style={{ padding: '0.75rem 1.25rem' }}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={isConnecting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ marginLeft: 'auto', padding: '0.75rem 1.875rem' }}
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="h-5 w-5" />
                    <span>Connect Wallet</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </nav>
    )
  }

  // Mobile Navigation - Top Header Only (Bottom nav is separate)
  return (
    <>
      {/* Mobile Top Header */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg, #9333ea, #db2777)',
              padding: '8px',
              borderRadius: '12px',
            }}>
              <Music2 style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <span style={{
              fontSize: '18px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #9333ea, #db2777)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Autotune</span>
          </Link>

          {/* Compact Wallet Button */}
          {isConnected ? (
            <button
              onClick={disconnect}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px', fontFamily: 'monospace' }}>{truncatedKey}</span>
            </button>
          ) : (
            <button
              onClick={connect}
              disabled={isConnecting}
              style={{
                background: isConnecting ? 'rgba(147, 51, 234, 0.5)' : 'linear-gradient(135deg, #9333ea, #db2777)',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: isConnecting ? 'not-allowed' : 'pointer',
                opacity: isConnecting ? 0.7 : 1,
              }}
            >
              {isConnecting ? (
                <>
                  <Loader2 style={{ width: '16px', height: '16px', color: 'white', animation: 'spin 1s linear infinite' }} />
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>...</span>
                </>
              ) : (
                <>
                  <Wallet style={{ width: '16px', height: '16px', color: 'white' }} />
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>Connect</span>
                </>
              )}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(10, 10, 15, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '8px 0 24px 0', // Extra bottom padding for iOS safe area
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
          <MobileNavItem to="/create" active={isActive('/create')} icon={Plus} label="Create" />
          <MobileNavItem to="/discover" active={isActive('/discover')} icon={Compass} label="Discover" />
          <MobileNavItem to="/library" active={isActive('/library')} icon={Music2} label="Library" />
          <MobileNavItem to="/profile" active={isActive('/profile')} icon={User} label="Profile" />
        </div>
      </div>
    </>
  )
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        active
          ? 'bg-purple-600 text-white'
          : 'text-gray-300 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavItem({
  to,
  active,
  icon: Icon,
  label
}: {
  to: string
  active: boolean
  icon: React.ComponentType<{ style?: React.CSSProperties }>
  label: string
}) {
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        padding: '8px 16px',
        borderRadius: '16px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        background: active ? 'rgba(147, 51, 234, 0.15)' : 'transparent',
      }}
    >
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: active ? 'linear-gradient(135deg, #9333ea, #db2777)' : 'transparent',
        boxShadow: active ? '0 4px 16px rgba(147, 51, 234, 0.4)' : 'none',
        transition: 'all 0.2s ease',
      }}>
        <Icon style={{
          width: '22px',
          height: '22px',
          color: active ? 'white' : 'rgba(255, 255, 255, 0.5)',
        }} />
      </div>
      <span style={{
        fontSize: '11px',
        fontWeight: active ? '600' : '500',
        color: active ? 'white' : 'rgba(255, 255, 255, 0.5)',
        transition: 'all 0.2s ease',
      }}>{label}</span>
    </Link>
  )
}
