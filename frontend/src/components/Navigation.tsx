import { Link, useLocation } from 'react-router-dom'
import { Music2, Compass, Plus, User, Wallet } from 'lucide-react'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Navigation() {
  const location = useLocation()
  const isMobile = useIsMobile()

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

            {/* Connect Wallet Button - Far Right */}
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2 text-lg" style={{ marginLeft: 'auto', padding: '0.75rem 1.875rem' }}>
              <Wallet className="h-5 w-5" />
              <span>Connect Wallet</span>
            </button>
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

          {/* Compact Connect Button */}
          <button style={{
            background: 'linear-gradient(135deg, #9333ea, #db2777)',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}>
            <Wallet style={{ width: '16px', height: '16px', color: 'white' }} />
            <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>Connect</span>
          </button>
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
