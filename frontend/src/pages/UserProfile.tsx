import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { User, Music, Play, TrendingUp, Copy, Check, ArrowLeft, Loader2 } from 'lucide-react'
import { useIsMobile } from '../hooks/useIsMobile'
import { resolveIdentityFromOverlay } from '../lib/identityResolver'
import type { ResolvedIdentity } from '../lib/identityResolver'
import { abbreviateIdentityKey } from '../lib/identity'

// Mock songs for this artist (in reality, would fetch from backend)
const mockArtistSongs = [
  {
    id: '101',
    title: 'Digital Dreams',
    genre: 'Synthwave',
    coverUrl: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&h=400&fit=crop',
    streamPrice: 0.12,
    totalStreams: 2341,
    duration: '3:42',
  },
  {
    id: '102',
    title: 'Neon Streets',
    genre: 'Electronic',
    coverUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
    streamPrice: 0.10,
    totalStreams: 1876,
    duration: '4:18',
  },
  {
    id: '103',
    title: 'Midnight Run',
    genre: 'Lofi',
    coverUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&h=400&fit=crop',
    streamPrice: 0.08,
    totalStreams: 3421,
    duration: '2:58',
  },
]

export default function UserProfile() {
  const { identityKey } = useParams<{ identityKey: string }>()
  const [identity, setIdentity] = useState<ResolvedIdentity | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [hoveredSong, setHoveredSong] = useState<string | null>(null)
  const isMobile = useIsMobile()

  // Decode the identityKey from URL
  const decodedIdentityKey = identityKey ? decodeURIComponent(identityKey) : ''

  useEffect(() => {
    async function loadIdentity() {
      if (!decodedIdentityKey) return

      setIsLoading(true)
      try {
        const resolved = await resolveIdentityFromOverlay(decodedIdentityKey)
        setIdentity(resolved)
      } catch (error) {
        console.error('Failed to resolve identity:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadIdentity()
  }, [decodedIdentityKey])

  const handleCopyAddress = () => {
    if (decodedIdentityKey) {
      navigator.clipboard.writeText(decodedIdentityKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shortAddress = decodedIdentityKey ? abbreviateIdentityKey(decodedIdentityKey) : ''

  // Mock stats
  const totalStreams = 7638
  const totalTracks = 3
  const followers = 156

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      position: 'relative',
      overflow: 'hidden',
      paddingBottom: isMobile ? '100px' : '40px',
    }}>
      {/* Animated Background Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: isMobile ? '250px' : '500px',
          height: isMobile ? '250px' : '500px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} className="animate-pulse-slow" />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: isMobile ? '200px' : '400px',
          height: isMobile ? '200px' : '400px',
          background: 'radial-gradient(circle, rgba(219, 39, 119, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} className="animate-pulse-slow animation-delay-2000" />
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '30%',
          width: isMobile ? '150px' : '300px',
          height: isMobile ? '150px' : '300px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} className="animate-pulse-slow animation-delay-4000" />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        paddingTop: isMobile ? '24px' : '100px',
        paddingLeft: isMobile ? '16px' : '40px',
        paddingRight: isMobile ? '16px' : '40px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Back Button */}
        <Link
          to="/discover"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.6)',
            textDecoration: 'none',
            fontSize: '14px',
            marginBottom: isMobile ? '24px' : '32px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
        >
          <ArrowLeft style={{ width: '18px', height: '18px' }} />
          Back to Discover
        </Link>

        {isLoading ? (
          /* Loading State */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px',
          }}>
            <Loader2
              style={{
                width: '48px',
                height: '48px',
                color: '#a855f7',
                animation: 'spin 1s linear infinite',
              }}
            />
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '16px' }}>
              Loading profile...
            </p>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'center' : 'flex-start',
              gap: isMobile ? '24px' : '40px',
              marginBottom: isMobile ? '40px' : '60px',
            }}>
              {/* Avatar */}
              <div
                style={{
                  width: isMobile ? '120px' : '180px',
                  height: isMobile ? '120px' : '180px',
                  borderRadius: '50%',
                  background: identity?.avatarURL
                    ? `url(${identity.avatarURL}) center/cover`
                    : 'linear-gradient(135deg, #9333ea, #db2777)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '4px solid rgba(147, 51, 234, 0.3)',
                  boxShadow: '0 20px 60px rgba(147, 51, 234, 0.3)',
                }}
              >
                {!identity?.avatarURL && (
                  <User style={{ width: isMobile ? '48px' : '72px', height: isMobile ? '48px' : '72px', color: 'white' }} />
                )}
              </div>

              {/* User Info */}
              <div style={{
                flex: 1,
                textAlign: isMobile ? 'center' : 'left',
              }}>
                <h1 style={{
                  fontSize: isMobile ? '28px' : '42px',
                  fontWeight: '800',
                  margin: '0 0 8px 0',
                  background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {identity?.name || 'Unknown Artist'}
                </h1>

                {/* Identity Key */}
                <button
                  onClick={handleCopyAddress}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', fontFamily: 'monospace' }}>
                    {shortAddress}
                  </span>
                  {copied ? (
                    <Check style={{ width: '14px', height: '14px', color: '#22c55e' }} />
                  ) : (
                    <Copy style={{ width: '14px', height: '14px', color: 'rgba(255, 255, 255, 0.4)' }} />
                  )}
                </button>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '24px' : '40px',
                  justifyContent: isMobile ? 'center' : 'flex-start',
                }}>
                  <div>
                    <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: '700', color: 'white' }}>
                      {totalStreams.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }}>Total Streams</div>
                  </div>
                  <div>
                    <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: '700', color: 'white' }}>
                      {totalTracks}
                    </div>
                    <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }}>Tracks</div>
                  </div>
                  <div>
                    <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: '700', color: 'white' }}>
                      {followers}
                    </div>
                    <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }}>Followers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracks Section */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: isMobile ? '20px' : '28px',
              }}>
                <Music style={{ width: '24px', height: '24px', color: '#a855f7' }} />
                <h2 style={{
                  fontSize: isMobile ? '20px' : '24px',
                  fontWeight: '700',
                  color: 'white',
                  margin: 0,
                }}>
                  Tracks by {identity?.name || 'this artist'}
                </h2>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? 'repeat(2, 1fr)'
                  : 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: isMobile ? '12px' : '20px',
              }}>
                {mockArtistSongs.map((song) => (
                  <Link
                    key={song.id}
                    to={`/song/${song.id}`}
                    style={{ textDecoration: 'none' }}
                    onMouseEnter={() => setHoveredSong(song.id)}
                    onMouseLeave={() => setHoveredSong(null)}
                  >
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: isMobile ? '12px' : '16px',
                        overflow: 'hidden',
                        background: 'linear-gradient(145deg, rgba(30, 30, 35, 0.9), rgba(15, 15, 20, 0.95))',
                        border: hoveredSong === song.id
                          ? '1px solid rgba(147, 51, 234, 0.3)'
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        transition: 'all 0.4s ease',
                        boxShadow: hoveredSong === song.id
                          ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 60px rgba(147, 51, 234, 0.1)'
                          : '0 4px 20px rgba(0, 0, 0, 0.2)',
                        transform: hoveredSong === song.id ? 'translateY(-4px)' : 'translateY(0)',
                      }}
                    >
                      {/* Cover Image */}
                      <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
                        <img
                          src={song.coverUrl}
                          alt={song.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.6s ease',
                            transform: hoveredSong === song.id ? 'scale(1.08)' : 'scale(1)',
                          }}
                        />

                        {/* Gradient Overlay */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                          }}
                        />

                        {/* Play Button */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: hoveredSong === song.id ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                          }}
                        >
                          <div
                            style={{
                              width: isMobile ? '36px' : '44px',
                              height: isMobile ? '36px' : '44px',
                              borderRadius: '50%',
                              background: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                            }}
                          >
                            <Play style={{ width: isMobile ? '14px' : '18px', height: isMobile ? '14px' : '18px', color: '#111', marginLeft: '2px' }} fill="currentColor" />
                          </div>
                        </div>

                        {/* Price Tag */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: isMobile ? '8px' : '10px',
                            right: isMobile ? '8px' : '10px',
                            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(219, 39, 119, 0.9))',
                            padding: isMobile ? '4px 8px' : '6px 12px',
                            borderRadius: isMobile ? '8px' : '10px',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          <span style={{ color: 'white', fontSize: isMobile ? '11px' : '13px', fontWeight: '700' }}>
                            ${song.streamPrice}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div style={{ padding: isMobile ? '12px' : '16px' }}>
                        <h3
                          style={{
                            fontSize: isMobile ? '14px' : '16px',
                            fontWeight: '600',
                            color: 'white',
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            margin: 0,
                          }}
                        >
                          {song.title}
                        </h3>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '8px',
                        }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #9333ea, #db2777)',
                            fontSize: '10px',
                            fontWeight: '600',
                            color: 'white',
                            textTransform: 'uppercase',
                          }}>
                            {song.genre}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280' }}>
                            <TrendingUp style={{ width: '12px', height: '12px' }} />
                            {song.totalStreams.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* No tracks message if empty */}
              {mockArtistSongs.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}>
                  <Music style={{ width: '48px', height: '48px', color: '#4b5563', marginBottom: '16px' }} />
                  <p style={{ color: '#6b7280', fontSize: '16px' }}>No tracks yet</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
