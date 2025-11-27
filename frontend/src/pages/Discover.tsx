import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Heart, Coins, Crown, TrendingUp, Search, Headphones, ChevronRight, Music2, Zap, Sparkles } from 'lucide-react'

// Mock data
const mockSongs = [
  {
    id: '1',
    title: 'Cosmic Dreams',
    artist: '0x7a...b3c2',
    artistName: 'Luna Waves',
    genre: 'Lofi',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
    streamPrice: 0.10,
    totalStreams: 1234,
    earnings: 74.04,
    isExclusive: false,
    duration: '3:42',
    bpm: 85,
  },
  {
    id: '2',
    title: 'Neon Nights',
    artist: '0x9f...d4e1',
    artistName: 'SynthMaster',
    genre: 'Synthwave',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    streamPrice: 0.15,
    totalStreams: 856,
    earnings: 76.82,
    isExclusive: true,
    exclusivePrice: 150,
    duration: '4:18',
    bpm: 118,
  },
  {
    id: '3',
    title: 'Rainfall Meditation',
    artist: '0x2c...a9b8',
    artistName: 'Zen Garden',
    genre: 'Ambient',
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    streamPrice: 0.08,
    totalStreams: 2341,
    earnings: 112.37,
    isExclusive: false,
    duration: '5:22',
    bpm: 60,
  },
  {
    id: '4',
    title: 'Trap City Vibes',
    artist: '0x5b...c7d2',
    artistName: 'BeatDrop',
    genre: 'Trap',
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    streamPrice: 0.12,
    totalStreams: 3421,
    earnings: 246.31,
    isExclusive: false,
    duration: '2:58',
    bpm: 140,
  },
  {
    id: '5',
    title: 'Jazz Cafe Mornings',
    artist: '0x8d...f3a1',
    artistName: 'Smooth Keys',
    genre: 'Jazz',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    streamPrice: 0.10,
    totalStreams: 987,
    earnings: 59.22,
    isExclusive: true,
    exclusivePrice: 200,
    duration: '4:45',
    bpm: 95,
  },
  {
    id: '6',
    title: 'Electric Pulse',
    artist: '0x4a...e2b9',
    artistName: 'Voltage',
    genre: 'House',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    streamPrice: 0.20,
    totalStreams: 4567,
    earnings: 548.04,
    isExclusive: false,
    duration: '3:33',
    bpm: 128,
  },
]

const genres = ['All', 'Lofi', 'Trap', 'House', 'Ambient', 'Jazz', 'Synthwave', 'Classical']

const genreColors: Record<string, string> = {
  'All': 'from-violet-500 to-fuchsia-500',
  'Lofi': 'from-cyan-400 to-blue-500',
  'Trap': 'from-red-500 to-orange-500',
  'House': 'from-yellow-400 to-orange-500',
  'Ambient': 'from-emerald-400 to-cyan-500',
  'Jazz': 'from-amber-400 to-yellow-500',
  'Synthwave': 'from-purple-500 to-pink-500',
  'Classical': 'from-slate-400 to-slate-600',
}

export default function Discover() {
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [sortBy, setSortBy] = useState<'trending' | 'new' | 'top'>('trending')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const filteredSongs = mockSongs.filter(song => {
    const matchesGenre = selectedGenre === 'All' || song.genre === selectedGenre
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesGenre && matchesSearch
  })

  return (
    <div className="min-h-screen pb-32 relative overflow-hidden w-full">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[128px] animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[128px] animate-pulse-slow animation-delay-4000" />
      </div>


      {/* Search & Filter Section */}
      <section className="px-4 mb-12 w-full flex justify-center" style={{ paddingTop: '100px' }}>
        <div className="w-full" style={{ maxWidth: '1400px' }}>
          {/* Search Bar */}
          <div
            style={{
              position: 'relative',
              marginBottom: '32px',
              transition: 'transform 0.3s ease',
              transform: isSearchFocused ? 'scale(1.01)' : 'scale(1)',
            }}
          >
            {/* Glow Effect */}
            <div
              style={{
                position: 'absolute',
                inset: '-4px',
                background: 'linear-gradient(135deg, #9333ea, #ec4899, #8b5cf6)',
                borderRadius: '24px',
                filter: 'blur(20px)',
                opacity: isSearchFocused ? 0.4 : 0,
                transition: 'opacity 0.4s ease',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, rgba(30, 30, 40, 0.9), rgba(20, 20, 30, 0.95))',
                border: isSearchFocused ? '1px solid rgba(147, 51, 234, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
                boxShadow: isSearchFocused
                  ? '0 20px 40px rgba(147, 51, 234, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
                  : '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
                zIndex: 1,
              }}
            >
              <div style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                borderRight: '1px solid rgba(255,255,255,0.05)',
              }}>
                <Search
                  style={{
                    width: '24px',
                    height: '24px',
                    color: isSearchFocused ? '#a855f7' : '#6b7280',
                    transition: 'color 0.3s ease',
                  }}
                />
              </div>
              <input
                type="text"
                placeholder="Search tracks, artists, or vibes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                style={{
                  flex: 1,
                  padding: '22px 20px',
                  background: 'transparent',
                  color: 'white',
                  fontSize: '17px',
                  fontWeight: '400',
                  border: 'none',
                  outline: 'none',
                }}
                className="placeholder-gray-500"
              />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingRight: '20px',
              }}>
                <kbd style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#9ca3af',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  fontWeight: '500',
                }}>⌘K</kbd>
              </div>
            </div>
          </div>

          {/* Genre Pills */}
          <div style={{ marginBottom: '60px', marginTop: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <Music2 className="w-6 h-6 text-purple-400" />
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: 'white', margin: 0 }}>Browse by Genre</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  style={{
                    position: 'relative',
                    padding: '14px 28px',
                    borderRadius: '16px',
                    fontWeight: '500',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    border: selectedGenre === genre ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    background: selectedGenre === genre ? undefined : 'rgba(255,255,255,0.05)',
                    color: selectedGenre === genre ? 'white' : '#9ca3af',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                  className={selectedGenre === genre ? 'shadow-lg' : 'hover:text-white hover:border-white/20'}
                >
                  {selectedGenre === genre && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${genreColors[genre]}`} style={{ zIndex: 0 }} />
                  )}
                  <span style={{ position: 'relative', zIndex: 10 }}>{genre}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', marginBottom: '80px' }}>
            <span style={{ color: '#6b7280', fontSize: '16px' }}>Sort by:</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <SortButton
                icon={<TrendingUp className="h-5 w-5" />}
                label="Trending"
                active={sortBy === 'trending'}
                onClick={() => setSortBy('trending')}
              />
              <SortButton
                icon={<Zap className="h-5 w-5" />}
                label="New"
                active={sortBy === 'new'}
                onClick={() => setSortBy('new')}
              />
              <SortButton
                icon={<Coins className="h-5 w-5" />}
                label="Top Earning"
                active={sortBy === 'top'}
                onClick={() => setSortBy('top')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Songs Grid */}
      <section className="px-4 pt-8 w-full flex justify-center">
        <div className="w-full" style={{ maxWidth: '1400px' }}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
              All Tracks
            </h3>
            <span className="text-gray-500">{filteredSongs.length} tracks</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredSongs.map((song, index) => (
              <SongCard key={song.id} song={song} delay={index * 100} />
            ))}
          </div>

          {filteredSongs.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
                <Music2 className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No tracks found</p>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Floating CTA */}
      <div className="fixed bottom-24 right-6 z-40">
        <Link
          to="/create"
          className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105"
        >
          <Sparkles className="w-5 h-5" />
          <span className="hidden sm:inline">Create Music</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

function SortButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 24px',
        borderRadius: '14px',
        fontWeight: '500',
        fontSize: '15px',
        transition: 'all 0.3s ease',
        background: active ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
        color: active ? '#c084fc' : '#6b7280',
        border: active ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid transparent',
        cursor: 'pointer',
      }}
      className={active ? '' : 'hover:text-gray-300 hover:bg-white/5'}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function SongCard({ song, delay }: { song: typeof mockSongs[0]; delay: number }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      to={`/song/${song.id}`}
      className="group block"
      style={{
        animationDelay: `${delay}ms`,
        animation: 'fadeIn 0.6s ease-out forwards',
        opacity: 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, rgba(30, 30, 35, 0.9), rgba(15, 15, 20, 0.95))',
          border: isHovered ? '1px solid rgba(147, 51, 234, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'all 0.4s ease',
          boxShadow: isHovered
            ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 60px rgba(147, 51, 234, 0.1)'
            : '0 4px 20px rgba(0, 0, 0, 0.2)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
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
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
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
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                transform: isHovered ? 'scale(1)' : 'scale(0.8)',
                transition: 'transform 0.3s ease',
              }}
            >
              <Play style={{ width: '18px', height: '18px', color: '#111', marginLeft: '2px' }} fill="currentColor" />
            </div>
          </div>

          {/* Top Badges Row */}
          <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {/* Like Button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsLiked(!isLiked)
              }}
              style={{
                padding: '10px',
                borderRadius: '50%',
                background: isLiked
                  ? 'linear-gradient(135deg, #ec4899, #f43f5e)'
                  : 'rgba(0, 0, 0, 0.6)',
                border: isLiked ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isLiked ? 'scale(1.1)' : 'scale(1)',
                boxShadow: isLiked
                  ? '0 4px 15px rgba(236, 72, 153, 0.5)'
                  : '0 2px 8px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Heart
                style={{
                  width: '16px',
                  height: '16px',
                  color: 'white',
                  fill: isLiked ? 'white' : 'none',
                  strokeWidth: isLiked ? 0 : 2,
                  filter: 'none',
                }}
              />
            </button>

            {/* Exclusive Badge */}
            {song.isExclusive && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
                }}
              >
                <Crown style={{ width: '10px', height: '10px' }} />
                Exclusive
              </div>
            )}
          </div>

          {/* Price Tag - Top Right Corner */}
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(219, 39, 119, 0.9))',
              padding: '6px 12px',
              borderRadius: '10px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)',
            }}
          >
            <span style={{ color: 'white', fontSize: '13px', fontWeight: '700' }}>
              ${song.streamPrice}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div style={{ padding: '14px' }}>
          {/* Title & Artist */}
          <div style={{ marginBottom: '12px' }}>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '4px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {song.title}
            </h3>
            <p style={{ fontSize: '12px', color: '#9ca3af' }}>{song.artistName}</p>
          </div>

          {/* Genre & Stats Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              className={`bg-gradient-to-r ${genreColors[song.genre] || genreColors['All']}`}
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: '600',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {song.genre}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#6b7280' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Headphones style={{ width: '12px', height: '12px' }} />
                {song.totalStreams.toLocaleString()}
              </span>
              <span>{song.duration}</span>
            </div>
          </div>

          {/* Exclusive Price */}
          {song.isExclusive && song.exclusivePrice && (
            <div
              style={{
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '11px', color: '#6b7280' }}>Buy Exclusive</span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ${song.exclusivePrice}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
