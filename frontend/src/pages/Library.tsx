import { useState } from 'react'
import { Play, Pause, Heart, Grid3x3, List, Search, Music, Clock, Calendar, MoreHorizontal, Library as LibraryIcon, Disc3, Sparkles } from 'lucide-react'

// Mock library data
const mockLibrarySongs = [
  {
    id: '1',
    title: 'Cosmic Dreams',
    artist: '0x7a...b3c2',
    artistName: 'Luna Waves',
    album: 'AI Sessions Vol. 1',
    duration: '2:34',
    dateAdded: '2025-01-15',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop',
    isLiked: true,
  },
  {
    id: '2',
    title: 'Neon Nights',
    artist: '0x9f...d4e1',
    artistName: 'SynthMaster',
    album: 'Synthwave Collection',
    duration: '3:45',
    dateAdded: '2025-01-18',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    isLiked: false,
  },
  {
    id: '3',
    title: 'Rainfall Meditation',
    artist: '0x2c...a9b8',
    artistName: 'Zen Garden',
    album: 'Ambient Soundscapes',
    duration: '4:12',
    dateAdded: '2025-01-20',
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    isLiked: true,
  },
  {
    id: '4',
    title: 'Trap City Vibes',
    artist: '0x5b...c7d2',
    artistName: 'BeatDrop',
    album: 'Urban Beats',
    duration: '2:58',
    dateAdded: '2025-01-22',
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    isLiked: false,
  },
  {
    id: '5',
    title: 'Jazz Cafe Mornings',
    artist: '0x8d...f3a1',
    artistName: 'Smooth Keys',
    album: 'Coffee Shop Jazz',
    duration: '3:21',
    dateAdded: '2025-01-25',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    isLiked: true,
  },
  {
    id: '6',
    title: 'Electric Pulse',
    artist: '0x4a...e2b9',
    artistName: 'Voltage',
    album: 'House Party',
    duration: '3:08',
    dateAdded: '2025-01-28',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    isLiked: false,
  },
]

export default function Library() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('songs')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const filteredSongs = mockLibrarySongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const displayedSongs = selectedCategory === 'liked'
    ? filteredSongs.filter(s => s.isLiked)
    : filteredSongs

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '60%',
          width: '500px',
          height: '500px',
          background: 'rgba(147, 51, 234, 0.15)',
          borderRadius: '50%',
          filter: 'blur(120px)',
        }} className="animate-pulse-slow" />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: '400px',
          height: '400px',
          background: 'rgba(219, 39, 119, 0.1)',
          borderRadius: '50%',
          filter: 'blur(120px)',
        }} className="animate-pulse-slow animation-delay-2000" />
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)', position: 'relative', zIndex: 1 }}>
        {/* Sidebar */}
        <div style={{
          width: '280px',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '32px 24px',
          background: 'linear-gradient(180deg, rgba(20, 20, 25, 0.8) 0%, rgba(10, 10, 15, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
        }}>
          {/* Library Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #9333ea, #db2777)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <LibraryIcon style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: 0 }}>Your Library</h2>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{mockLibrarySongs.length} tracks</p>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
              Browse
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <SidebarItem
                icon={<Music style={{ width: '18px', height: '18px' }} />}
                label="All Songs"
                active={selectedCategory === 'songs'}
                count={mockLibrarySongs.length}
                onClick={() => setSelectedCategory('songs')}
              />
              <SidebarItem
                icon={<Heart style={{ width: '18px', height: '18px' }} />}
                label="Liked Songs"
                active={selectedCategory === 'liked'}
                count={mockLibrarySongs.filter(s => s.isLiked).length}
                onClick={() => setSelectedCategory('liked')}
                accentColor="#ec4899"
              />
              <SidebarItem
                icon={<Clock style={{ width: '18px', height: '18px' }} />}
                label="Recently Played"
                active={selectedCategory === 'recent'}
                onClick={() => setSelectedCategory('recent')}
              />
              <SidebarItem
                icon={<Disc3 style={{ width: '18px', height: '18px' }} />}
                label="Albums"
                active={selectedCategory === 'albums'}
                onClick={() => setSelectedCategory('albums')}
              />
            </div>
          </div>

          {/* Playlists */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                Playlists
              </p>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#9333ea',
                fontSize: '20px',
                cursor: 'pointer',
                lineHeight: 1,
              }}>+</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <PlaylistItem label="Chill Vibes" count={12} gradient="from-cyan-500 to-blue-500" />
              <PlaylistItem label="Workout Mix" count={8} gradient="from-orange-500 to-red-500" />
              <PlaylistItem label="Late Night Coding" count={15} gradient="from-purple-500 to-pink-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{
            padding: '32px 40px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'linear-gradient(180deg, rgba(20, 20, 25, 0.6) 0%, transparent 100%)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <Sparkles style={{ width: '20px', height: '20px', color: '#a855f7' }} />
                  <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>Your Collection</span>
                </div>
                <h1 style={{
                  fontSize: '42px',
                  fontWeight: '800',
                  margin: 0,
                  background: selectedCategory === 'liked'
                    ? 'linear-gradient(135deg, #ec4899, #f43f5e)'
                    : 'linear-gradient(135deg, #ffffff, #a1a1aa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {selectedCategory === 'songs' && 'All Songs'}
                  {selectedCategory === 'liked' && 'Liked Songs'}
                  {selectedCategory === 'recent' && 'Recently Played'}
                  {selectedCategory === 'albums' && 'Albums'}
                </h1>
                <p style={{ fontSize: '15px', color: '#6b7280', marginTop: '8px' }}>
                  {displayedSongs.length} tracks • {Math.floor(displayedSongs.reduce((acc, s) => {
                    const [min, sec] = s.duration.split(':').map(Number)
                    return acc + min * 60 + sec
                  }, 0) / 60)} min total
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Search Bar */}
                <div style={{
                  position: 'relative',
                  transition: 'transform 0.3s ease',
                  transform: isSearchFocused ? 'scale(1.02)' : 'scale(1)',
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: '-3px',
                    background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                    borderRadius: '16px',
                    filter: 'blur(12px)',
                    opacity: isSearchFocused ? 0.3 : 0,
                    transition: 'opacity 0.3s ease',
                  }} />
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(30, 30, 35, 0.9)',
                    border: isSearchFocused ? '1px solid rgba(147, 51, 234, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    padding: '0 16px',
                    transition: 'all 0.3s ease',
                    width: '280px',
                  }}>
                    <Search style={{
                      width: '18px',
                      height: '18px',
                      color: isSearchFocused ? '#a855f7' : '#6b7280',
                      transition: 'color 0.3s ease',
                    }} />
                    <input
                      type="text"
                      placeholder="Search your library..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      style={{
                        flex: 1,
                        padding: '14px 12px',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'white',
                        fontSize: '14px',
                      }}
                      className="placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* View Toggle */}
                <div style={{
                  display: 'flex',
                  background: 'rgba(30, 30, 35, 0.8)',
                  borderRadius: '12px',
                  padding: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}>
                  <button
                    onClick={() => setViewMode('list')}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: viewMode === 'list' ? 'linear-gradient(135deg, #9333ea, #db2777)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <List style={{ width: '18px', height: '18px', color: 'white' }} />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: viewMode === 'grid' ? 'linear-gradient(135deg, #9333ea, #db2777)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Grid3x3 style={{ width: '18px', height: '18px', color: 'white' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div style={{ flex: 1, padding: '24px 40px', overflowY: 'auto' }}>
            {viewMode === 'list' ? (
              <ListView songs={displayedSongs} playingId={playingId} setPlayingId={setPlayingId} />
            ) : (
              <GridView songs={displayedSongs} playingId={playingId} setPlayingId={setPlayingId} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, active, count, onClick, accentColor }: {
  icon: React.ReactNode
  label: string
  active?: boolean
  count?: number
  onClick: () => void
  accentColor?: string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 14px',
        borderRadius: '12px',
        background: active
          ? accentColor
            ? `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`
            : 'rgba(147, 51, 234, 0.15)'
          : 'transparent',
        border: active
          ? `1px solid ${accentColor || 'rgba(147, 51, 234, 0.3)'}`
          : '1px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      className={active ? '' : 'hover:bg-white/5'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: active ? (accentColor || '#a855f7') : '#9ca3af' }}>{icon}</span>
        <span style={{
          fontSize: '14px',
          fontWeight: active ? '600' : '500',
          color: active ? 'white' : '#9ca3af',
        }}>{label}</span>
      </div>
      {count !== undefined && (
        <span style={{
          fontSize: '12px',
          fontWeight: '600',
          color: active ? (accentColor || '#a855f7') : '#6b7280',
          background: active ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
          padding: '2px 8px',
          borderRadius: '6px',
        }}>{count}</span>
      )}
    </button>
  )
}

function PlaylistItem({ label, count, gradient }: { label: string; count: number; gradient: string }) {
  return (
    <button
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 14px',
        borderRadius: '10px',
        background: 'transparent',
        border: '1px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      className="hover:bg-white/5"
    >
      <div
        className={`bg-gradient-to-br ${gradient}`}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Music style={{ width: '16px', height: '16px', color: 'white' }} />
      </div>
      <div style={{ flex: 1, textAlign: 'left' }}>
        <p style={{ fontSize: '13px', fontWeight: '500', color: 'white', margin: 0 }}>{label}</p>
        <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>{count} songs</p>
      </div>
    </button>
  )
}

function ListView({ songs, playingId, setPlayingId }: { songs: typeof mockLibrarySongs; playingId: string | null; setPlayingId: (id: string | null) => void }) {
  return (
    <div>
      {/* Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '50px 2fr 1.5fr 1fr 80px 60px',
        gap: '16px',
        padding: '12px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        marginBottom: '8px',
      }}>
        <span style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>#</span>
        <span style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Title</span>
        <span style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Album</span>
        <span style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date Added</span>
        <span style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>
          <Clock style={{ width: '14px', height: '14px' }} />
        </span>
        <span></span>
      </div>

      {/* Song Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {songs.map((song, index) => (
          <SongRow
            key={song.id}
            song={song}
            index={index}
            isPlaying={playingId === song.id}
            onPlay={() => setPlayingId(playingId === song.id ? null : song.id)}
          />
        ))}
      </div>
    </div>
  )
}

function SongRow({ song, index, isPlaying, onPlay }: { song: typeof mockLibrarySongs[0]; index: number; isPlaying: boolean; onPlay: () => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(song.isLiked)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '50px 2fr 1.5fr 1fr 80px 60px',
        gap: '16px',
        padding: '12px 20px',
        borderRadius: '12px',
        background: isHovered
          ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.08), rgba(219, 39, 119, 0.05))'
          : isPlaying
            ? 'rgba(147, 51, 234, 0.1)'
            : 'transparent',
        border: isPlaying ? '1px solid rgba(147, 51, 234, 0.2)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onPlay}
    >
      {/* Index / Play Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isHovered || isPlaying ? (
          <button
            onClick={(e) => { e.stopPropagation(); onPlay(); }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isPlaying ? (
              <Pause style={{ width: '18px', height: '18px', color: '#a855f7', fill: '#a855f7' }} />
            ) : (
              <Play style={{ width: '18px', height: '18px', color: 'white', fill: 'white' }} />
            )}
          </button>
        ) : (
          <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>{index + 1}</span>
        )}
      </div>

      {/* Title & Artist */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: isPlaying ? '0 4px 20px rgba(147, 51, 234, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.3)',
          transition: 'box-shadow 0.3s ease',
        }}>
          <img src={song.coverUrl} alt={song.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <p style={{
            fontSize: '15px',
            fontWeight: '600',
            color: isPlaying ? '#a855f7' : 'white',
            margin: 0,
            marginBottom: '4px',
            transition: 'color 0.3s ease',
          }}>{song.title}</p>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{song.artistName}</p>
        </div>
      </div>

      {/* Album */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: '#9ca3af' }}>{song.album}</span>
      </div>

      {/* Date Added */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: '#6b7280' }}>{new Date(song.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>

      {/* Duration */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '14px', color: '#6b7280', fontFamily: 'monospace' }}>{song.duration}</span>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '8px',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <button
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
          }}
        >
          <Heart style={{
            width: '18px',
            height: '18px',
            color: isLiked ? '#ec4899' : '#6b7280',
            fill: isLiked ? '#ec4899' : 'none',
            transition: 'all 0.2s ease',
          }} />
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px',
          }}
        >
          <MoreHorizontal style={{ width: '18px', height: '18px', color: '#6b7280' }} />
        </button>
      </div>
    </div>
  )
}

function GridView({ songs, playingId, setPlayingId }: { songs: typeof mockLibrarySongs; playingId: string | null; setPlayingId: (id: string | null) => void }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '24px',
    }}>
      {songs.map((song) => (
        <AlbumCard
          key={song.id}
          song={song}
          isPlaying={playingId === song.id}
          onPlay={() => setPlayingId(playingId === song.id ? null : song.id)}
        />
      ))}
    </div>
  )
}

function AlbumCard({ song, isPlaying, onPlay }: { song: typeof mockLibrarySongs[0]; isPlaying: boolean; onPlay: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        position: 'relative',
        aspectRatio: '1',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '14px',
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 40px rgba(147, 51, 234, 0.15)'
          : '0 4px 20px rgba(0, 0, 0, 0.3)',
        transition: 'box-shadow 0.3s ease',
      }}>
        <img
          src={song.coverUrl}
          alt={song.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Play Button Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <button
            onClick={onPlay}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #9333ea, #db2777)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(147, 51, 234, 0.4)',
              transform: isHovered ? 'scale(1)' : 'scale(0.8)',
              transition: 'transform 0.3s ease',
            }}
          >
            {isPlaying ? (
              <Pause style={{ width: '22px', height: '22px', color: 'white', fill: 'white' }} />
            ) : (
              <Play style={{ width: '22px', height: '22px', color: 'white', fill: 'white', marginLeft: '2px' }} />
            )}
          </button>
        </div>

        {/* Playing Indicator */}
        {isPlaying && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '3px',
            height: '16px',
          }}>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="animate-sound-wave"
                style={{
                  width: '3px',
                  background: '#a855f7',
                  borderRadius: '2px',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <h3 style={{
        fontSize: '15px',
        fontWeight: '600',
        color: isPlaying ? '#a855f7' : 'white',
        margin: 0,
        marginBottom: '6px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>{song.title}</h3>
      <p style={{
        fontSize: '13px',
        color: '#6b7280',
        margin: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>{song.artistName}</p>
    </div>
  )
}
