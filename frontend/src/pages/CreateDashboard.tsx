import { useState } from 'react'
import { Upload, Sparkles, Crown, Play, TrendingUp, Music, DollarSign, Headphones, ChevronRight, Zap, BarChart3 } from 'lucide-react'

const mockCreatorSongs = [
  {
    id: '1',
    title: 'Cosmic Dreams',
    genre: 'Lofi',
    streamPrice: 0.10,
    totalStreams: 1234,
    earnings: 74.04,
    isExclusive: false,
    createdAt: '2025-01-15',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Midnight Vibes',
    genre: 'Trap',
    streamPrice: 0.12,
    totalStreams: 856,
    earnings: 61.63,
    isExclusive: true,
    exclusivePrice: 100,
    soldExclusive: false,
    createdAt: '2025-01-18',
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Neon Nights',
    genre: 'Synthwave',
    streamPrice: 0.15,
    totalStreams: 2341,
    earnings: 210.69,
    isExclusive: false,
    createdAt: '2025-01-20',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
  },
]

export default function CreateDashboard() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const totalEarnings = mockCreatorSongs.reduce((sum, song) => sum + song.earnings, 0)
  const totalStreams = mockCreatorSongs.reduce((sum, song) => sum + song.totalStreams, 0)

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} className="animate-pulse-slow" />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(219, 39, 119, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} className="animate-pulse-slow animation-delay-2000" />
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '40%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} className="animate-pulse-slow animation-delay-4000" />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '40px' }}>
        {/* Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '100px',
            background: 'rgba(147, 51, 234, 0.15)',
            border: '1px solid rgba(147, 51, 234, 0.3)',
            marginBottom: '20px',
          }}>
            <Sparkles style={{ width: '16px', height: '16px', color: '#a855f7' }} />
            <span style={{ fontSize: '13px', color: '#c4b5fd', fontWeight: '500' }}>AI-Powered Creator Tools</span>
          </div>

          <h1 style={{
            fontSize: '52px',
            fontWeight: '800',
            margin: '0 0 12px 0',
            background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Creator Studio
          </h1>
          <p style={{ fontSize: '18px', color: '#9ca3af', margin: 0 }}>
            Create, publish, and earn from your AI-generated music
          </p>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginBottom: '48px',
          flexWrap: 'wrap',
        }}>
          <StatCard
            icon={<DollarSign style={{ width: '24px', height: '24px' }} />}
            value={`$${totalEarnings.toFixed(2)}`}
            label="Total Earnings"
            gradient="from-green-500 to-emerald-500"
            valueColor="#4ade80"
          />
          <StatCard
            icon={<Headphones style={{ width: '24px', height: '24px' }} />}
            value={totalStreams.toLocaleString()}
            label="Total Streams"
            gradient="from-purple-500 to-pink-500"
            valueColor="#e879f9"
          />
          <StatCard
            icon={<Music style={{ width: '24px', height: '24px' }} />}
            value={mockCreatorSongs.length.toString()}
            label="Published Tracks"
            gradient="from-cyan-500 to-blue-500"
            valueColor="#22d3ee"
          />
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '20px',
            textAlign: 'center',
          }}>Quick Actions</h2>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            {/* Generate with AI */}
            <ActionCard
              icon={<Sparkles style={{ width: '28px', height: '28px' }} />}
              title="Generate with AI"
              subtitle="$0.20 per track"
              gradient="linear-gradient(135deg, #9333ea, #db2777)"
              isHovered={hoveredCard === 'generate'}
              onHover={() => setHoveredCard('generate')}
              onLeave={() => setHoveredCard(null)}
              onClick={() => setShowUploadModal(true)}
              isPrimary
            />

            {/* Upload Track */}
            <ActionCard
              icon={<Upload style={{ width: '28px', height: '28px' }} />}
              title="Upload Track"
              subtitle="Your own music"
              isHovered={hoveredCard === 'upload'}
              onHover={() => setHoveredCard('upload')}
              onLeave={() => setHoveredCard(null)}
              onClick={() => {}}
            />

            {/* Analytics */}
            <ActionCard
              icon={<BarChart3 style={{ width: '28px', height: '28px' }} />}
              title="Analytics"
              subtitle="View insights"
              isHovered={hoveredCard === 'analytics'}
              onHover={() => setHoveredCard('analytics')}
              onLeave={() => setHoveredCard(null)}
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '32px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          {/* Your Tracks */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(30, 30, 35, 0.8), rgba(20, 20, 25, 0.9))',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '24px 28px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #9333ea, #db2777)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Music style={{ width: '20px', height: '20px', color: 'white' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'white' }}>Your Tracks</h2>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{mockCreatorSongs.length} published</p>
                </div>
              </div>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#9ca3af',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }} className="hover:bg-white/10">
                View All
                <ChevronRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>

            <div>
              {mockCreatorSongs.map((song, index) => (
                <TrackRow key={song.id} song={song} index={index} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Available Balance */}
            <div style={{
              padding: '28px',
              borderRadius: '24px',
              background: 'linear-gradient(145deg, rgba(34, 197, 94, 0.12), rgba(16, 185, 129, 0.08))',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                background: 'rgba(34, 197, 94, 0.15)',
                borderRadius: '50%',
                filter: 'blur(30px)',
              }} />
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <DollarSign style={{ width: '18px', height: '18px', color: '#4ade80' }} />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#86efac', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Available Balance
                  </span>
                </div>
                <div style={{
                  fontSize: '42px',
                  fontWeight: '800',
                  color: '#4ade80',
                  marginBottom: '20px',
                  lineHeight: 1,
                }}>
                  ${totalEarnings.toFixed(2)}
                </div>
                <button style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #22c55e, #10b981)',
                  border: 'none',
                  color: 'black',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
                }}>
                  Withdraw Funds
                </button>
              </div>
            </div>

            {/* Top Performing */}
            <div style={{
              padding: '24px',
              borderRadius: '24px',
              background: 'linear-gradient(145deg, rgba(30, 30, 35, 0.8), rgba(20, 20, 25, 0.9))',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Zap style={{ width: '18px', height: '18px', color: '#fbbf24' }} />
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Top Performing
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop"
                    alt="Neon Nights"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>Neon Nights</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>2,341 streams</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
              }}>
                <span style={{ fontSize: '13px', color: '#9ca3af' }}>Weekly Growth</span>
                <span style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#4ade80',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <TrendingUp style={{ width: '16px', height: '16px' }} />
                  +127%
                </span>
              </div>
            </div>

            {/* This Month Stats */}
            <div style={{
              padding: '24px',
              borderRadius: '24px',
              background: 'linear-gradient(145deg, rgba(30, 30, 35, 0.8), rgba(20, 20, 25, 0.9))',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <BarChart3 style={{ width: '18px', height: '18px', color: '#a855f7' }} />
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  This Month
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <MonthStatRow label="New Streams" value="+1,247" />
                <MonthStatRow label="Revenue" value="+$89.40" isGreen />
                <MonthStatRow label="New Followers" value="+23" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
    </div>
  )
}

function StatCard({ icon, value, label, gradient, valueColor }: {
  icon: React.ReactNode
  value: string
  label: string
  gradient: string
  valueColor: string
}) {
  return (
    <div style={{
      padding: '24px 32px',
      borderRadius: '20px',
      background: 'linear-gradient(145deg, rgba(30, 30, 35, 0.8), rgba(20, 20, 25, 0.9))',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      minWidth: '200px',
      textAlign: 'center',
    }}>
      <div
        className={`bg-gradient-to-r ${gradient}`}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          color: 'white',
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: '32px', fontWeight: '800', color: valueColor, marginBottom: '4px' }}>
        {value}
      </div>
      <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>
        {label}
      </div>
    </div>
  )
}

function ActionCard({ icon, title, subtitle, gradient, isHovered, onHover, onLeave, onClick, isPrimary }: {
  icon: React.ReactNode
  title: string
  subtitle: string
  gradient?: string
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  isPrimary?: boolean
}) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        width: '240px',
        padding: '32px 24px',
        borderRadius: '24px',
        background: isPrimary
          ? 'linear-gradient(145deg, rgba(147, 51, 234, 0.15), rgba(219, 39, 119, 0.1))'
          : 'linear-gradient(145deg, rgba(30, 30, 35, 0.8), rgba(20, 20, 25, 0.9))',
        border: isPrimary
          ? '1px solid rgba(147, 51, 234, 0.3)'
          : '1px solid rgba(255, 255, 255, 0.08)',
        cursor: 'pointer',
        transition: 'all 0.4s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered
          ? isPrimary
            ? '0 20px 40px rgba(147, 51, 234, 0.25)'
            : '0 20px 40px rgba(0, 0, 0, 0.3)'
          : 'none',
        textAlign: 'center',
      }}
    >
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '20px',
        background: isPrimary ? gradient : 'rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        color: isPrimary ? 'white' : '#9ca3af',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isPrimary ? '0 8px 24px rgba(147, 51, 234, 0.4)' : 'none',
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: '0 0 6px 0' }}>
        {title}
      </h3>
      <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
        {subtitle}
      </p>
    </div>
  )
}

function TrackRow({ song, index }: { song: typeof mockCreatorSongs[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{
        padding: '16px 28px',
        borderBottom: index < mockCreatorSongs.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
        background: isHovered ? 'rgba(147, 51, 234, 0.05)' : 'transparent',
        transition: 'background 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ width: '24px', fontSize: '14px', color: '#6b7280', fontWeight: '500', textAlign: 'center' }}>
            {index + 1}
          </span>

          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}>
            <img src={song.coverUrl} alt={song.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}>
              <Play style={{ width: '20px', height: '20px', color: 'white', fill: 'white' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'white', margin: 0 }}>{song.title}</h3>
              {song.isExclusive && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(234, 88, 12, 0.1))',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  fontSize: '10px',
                  fontWeight: '700',
                  color: '#fbbf24',
                  textTransform: 'uppercase',
                }}>
                  <Crown style={{ width: '10px', height: '10px' }} />
                  Exclusive
                </span>
              )}
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
              {song.genre} • ${song.streamPrice}/stream
            </p>
          </div>
        </div>

        {/* Right side - Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '17px', fontWeight: '700', color: 'white' }}>{song.totalStreams.toLocaleString()}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>streams</div>
          </div>
          <div style={{ textAlign: 'right', minWidth: '80px' }}>
            <div style={{ fontSize: '17px', fontWeight: '700', color: '#4ade80' }}>${song.earnings.toFixed(2)}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>earned</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MonthStatRow({ label, value, isGreen }: { label: string; value: string; isGreen?: boolean }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 14px',
      borderRadius: '10px',
      background: 'rgba(255, 255, 255, 0.03)',
    }}>
      <span style={{ fontSize: '13px', color: '#9ca3af' }}>{label}</span>
      <span style={{ fontSize: '15px', fontWeight: '700', color: isGreen ? '#4ade80' : 'white' }}>{value}</span>
    </div>
  )
}

function UploadModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'generate' | 'details' | 'pricing'>('generate')
  const [prompt, setPrompt] = useState('')
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [streamPrice, setStreamPrice] = useState('0.10')
  const [offerExclusive, setOfferExclusive] = useState(false)
  const [exclusivePrice, setExclusivePrice] = useState('100')

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{
        background: 'linear-gradient(145deg, rgba(30, 30, 35, 0.98), rgba(20, 20, 25, 0.99))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '32px',
        padding: '40px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 40px 80px rgba(0, 0, 0, 0.5), 0 0 100px rgba(147, 51, 234, 0.1)',
      }}>
        {/* Progress Steps */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
          {[1, 2, 3].map((num) => {
            const stepIndex = ['generate', 'details', 'pricing'].indexOf(step)
            const isActive = num - 1 === stepIndex
            const isComplete = num - 1 < stepIndex
            return (
              <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  fontWeight: '700',
                  transition: 'all 0.3s ease',
                  background: isActive
                    ? 'linear-gradient(135deg, #9333ea, #db2777)'
                    : isComplete
                      ? '#9333ea'
                      : 'rgba(255, 255, 255, 0.08)',
                  color: isActive || isComplete ? 'white' : '#6b7280',
                  transform: isActive ? 'scale(1.15)' : 'scale(1)',
                  boxShadow: isActive ? '0 8px 24px rgba(147, 51, 234, 0.4)' : 'none',
                }}>
                  {num}
                </div>
                {num < 3 && (
                  <div style={{
                    width: '40px',
                    height: '3px',
                    borderRadius: '2px',
                    background: isComplete ? 'linear-gradient(90deg, #9333ea, #db2777)' : 'rgba(255, 255, 255, 0.1)',
                  }} />
                )}
              </div>
            )
          })}
        </div>

        {step === 'generate' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #9333ea, #db2777)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 12px 32px rgba(147, 51, 234, 0.4)',
            }}>
              <Sparkles style={{ width: '36px', height: '36px', color: 'white' }} />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: '0 0 8px 0' }}>Describe Your Track</h2>
            <p style={{ fontSize: '15px', color: '#9ca3af', margin: '0 0 28px 0' }}>What kind of music do you want to create?</p>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Chill lofi beats with warm piano and soft drums..."
              style={{
                width: '100%',
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '15px',
                resize: 'none',
                outline: 'none',
                marginBottom: '20px',
                textAlign: 'center',
                lineHeight: 1.6,
              }}
              rows={3}
              className="placeholder-gray-500 focus:border-purple-500"
            />

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '100px',
              background: 'rgba(147, 51, 234, 0.1)',
              border: '1px solid rgba(147, 51, 234, 0.2)',
              marginBottom: '28px',
            }}>
              <Sparkles style={{ width: '16px', height: '16px', color: '#a855f7' }} />
              <span style={{ fontSize: '14px', color: '#9ca3af' }}>Generation cost:</span>
              <span style={{ fontSize: '14px', color: 'white', fontWeight: '700' }}>$0.20</span>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setStep('details')}
                disabled={!prompt}
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #9333ea, #db2777)',
                  border: 'none',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: prompt ? 'pointer' : 'not-allowed',
                  opacity: prompt ? 1 : 0.4,
                  transition: 'all 0.3s ease',
                  boxShadow: prompt ? '0 8px 24px rgba(147, 51, 234, 0.3)' : 'none',
                }}
              >
                Generate
              </button>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: '0 0 8px 0', textAlign: 'center' }}>Track Details</h2>
            <p style={{ fontSize: '15px', color: '#9ca3af', margin: '0 0 28px 0', textAlign: 'center' }}>Name your creation</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Track title"
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                }}
                className="placeholder-gray-500 focus:border-purple-500"
              />
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: genre ? 'white' : '#6b7280',
                  fontSize: '15px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="" style={{ background: '#1a1a1f' }}>Select genre</option>
                <option value="lofi" style={{ background: '#1a1a1f' }}>Lofi</option>
                <option value="trap" style={{ background: '#1a1a1f' }}>Trap</option>
                <option value="house" style={{ background: '#1a1a1f' }}>House</option>
                <option value="ambient" style={{ background: '#1a1a1f' }}>Ambient</option>
                <option value="jazz" style={{ background: '#1a1a1f' }}>Jazz</option>
                <option value="synthwave" style={{ background: '#1a1a1f' }}>Synthwave</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setStep('generate')}
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
              <button
                onClick={() => setStep('pricing')}
                disabled={!title || !genre}
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #9333ea, #db2777)',
                  border: 'none',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: title && genre ? 'pointer' : 'not-allowed',
                  opacity: title && genre ? 1 : 0.4,
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 'pricing' && (
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: '0 0 8px 0', textAlign: 'center' }}>Set Pricing</h2>
            <p style={{ fontSize: '15px', color: '#9ca3af', margin: '0 0 28px 0', textAlign: 'center' }}>How much per stream?</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: '18px' }}>$</span>
                <input
                  type="number"
                  value={streamPrice}
                  onChange={(e) => setStreamPrice(e.target.value)}
                  step="0.01"
                  min="0.01"
                  style={{
                    width: '100%',
                    padding: '18px 20px 18px 40px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '18px',
                    outline: 'none',
                  }}
                />
              </div>

              <div
                onClick={() => setOfferExclusive(!offerExclusive)}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: offerExclusive ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  border: offerExclusive ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Crown style={{ width: '22px', height: '22px', color: offerExclusive ? '#fbbf24' : '#6b7280' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Exclusive Rights</div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>Allow purchase of full ownership</div>
                  </div>
                  <div style={{
                    width: '48px',
                    height: '28px',
                    borderRadius: '14px',
                    padding: '3px',
                    background: offerExclusive ? '#fbbf24' : 'rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                  }}>
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'white',
                      transform: offerExclusive ? 'translateX(20px)' : 'translateX(0)',
                      transition: 'transform 0.3s ease',
                    }} />
                  </div>
                </div>
                {offerExclusive && (
                  <div style={{ position: 'relative', marginTop: '16px' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }}>$</span>
                    <input
                      type="number"
                      value={exclusivePrice}
                      onChange={(e) => setExclusivePrice(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: '100%',
                        padding: '14px 16px 14px 36px',
                        borderRadius: '12px',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        color: 'white',
                        fontSize: '16px',
                        outline: 'none',
                      }}
                    />
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.05)',
              }}>
                <span style={{ fontSize: '14px', color: '#9ca3af' }}>Platform fee</span>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>40%</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.05))',
                border: '1px solid rgba(34, 197, 94, 0.2)',
              }}>
                <span style={{ fontSize: '14px', color: '#4ade80' }}>You earn</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#4ade80' }}>60%</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setStep('details')}
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'white',
                  border: 'none',
                  color: 'black',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Upload style={{ width: '18px', height: '18px' }} />
                Publish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
