import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Landing from './pages/Landing'
import Discover from './pages/Discover'
import Library from './pages/Library'
import SongDetail from './pages/SongDetail'
import CreateDashboard from './pages/CreateDashboard'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import { WalletProvider } from './contexts/WalletContext'

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Navigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/library" element={<Library />} />
            <Route path="/song/:id" element={<SongDetail />} />
            <Route path="/create" element={<CreateDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/:identityKey" element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  )
}

export default App
