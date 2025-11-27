import { Link, useLocation } from 'react-router-dom'
import { Music2, Compass, Plus, User, Wallet } from 'lucide-react'

export default function Navigation() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

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

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass border-t py-2 px-4">
        <div className="flex justify-around items-center">
          <MobileNavLink to="/create" active={isActive('/create')}>
            <Plus className="h-5 w-5" />
            <span className="text-xs mt-1">Create</span>
          </MobileNavLink>
          <MobileNavLink to="/discover" active={isActive('/discover')}>
            <Compass className="h-5 w-5" />
            <span className="text-xs mt-1">Discover</span>
          </MobileNavLink>
          <MobileNavLink to="/library" active={isActive('/library')}>
            <Music2 className="h-5 w-5" />
            <span className="text-xs mt-1">Library</span>
          </MobileNavLink>
          <MobileNavLink to="/profile" active={isActive('/profile')}>
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </MobileNavLink>
        </div>
      </div>
    </nav>
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

function MobileNavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center transition-all duration-200 ${
        active ? 'text-purple-400' : 'text-gray-400 hover:text-purple-400'
      }`}
    >
      {children}
    </Link>
  )
}
