import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Heart, Coins, Crown, TrendingUp, Clock, Search } from 'lucide-react'

// Mock data
const mockSongs = [
  {
    id: '1',
    title: 'Cosmic Dreams',
    artist: '0x7a...b3c2',
    genre: 'Lofi',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
    streamPrice: 0.10,
    totalStreams: 1234,
    earnings: 74.04,
    isExclusive: false,
  },
  {
    id: '2',
    title: 'Neon Nights',
    artist: '0x9f...d4e1',
    genre: 'Synthwave',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    streamPrice: 0.15,
    totalStreams: 856,
    earnings: 76.82,
    isExclusive: true,
    exclusivePrice: 150,
  },
  {
    id: '3',
    title: 'Rainfall Meditation',
    artist: '0x2c...a9b8',
    genre: 'Ambient',
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    streamPrice: 0.08,
    totalStreams: 2341,
    earnings: 112.37,
    isExclusive: false,
  },
  {
    id: '4',
    title: 'Trap City Vibes',
    artist: '0x5b...c7d2',
    genre: 'Trap',
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    streamPrice: 0.12,
    totalStreams: 3421,
    earnings: 246.31,
    isExclusive: false,
  },
  {
    id: '5',
    title: 'Jazz Cafe Mornings',
    artist: '0x8d...f3a1',
    genre: 'Jazz',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    streamPrice: 0.10,
    totalStreams: 987,
    earnings: 59.22,
    isExclusive: true,
    exclusivePrice: 200,
  },
  {
    id: '6',
    title: 'Electric Pulse',
    artist: '0x4a...e2b9',
    genre: 'House',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    streamPrice: 0.20,
    totalStreams: 4567,
    earnings: 548.04,
    isExclusive: false,
  },
]

const genres = ['All', 'Lofi', 'Trap', 'House', 'Ambient', 'Jazz', 'Synthwave', 'Classical']

export default function Discover() {
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [sortBy, setSortBy] = useState<'trending' | 'new' | 'top'>('trending')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSongs = mockSongs.filter(song => {
    const matchesGenre = selectedGenre === 'All' || song.genre === selectedGenre
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesGenre && matchesSearch
  })

  return (
    <div className="min-h-screen pt-8 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Discover AI Music</h1>
          <p className="text-gray-600 text-lg">Explore unique AI-generated tracks from creators worldwide</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4 animate-slide-up">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search songs or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
            />
          </div>

          {/* Genre Filter */}
          <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedGenre === genre
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-200'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex space-x-2">
            <SortButton
              icon={<TrendingUp className="h-4 w-4" />}
              label="Trending"
              active={sortBy === 'trending'}
              onClick={() => setSortBy('trending')}
            />
            <SortButton
              icon={<Clock className="h-4 w-4" />}
              label="New"
              active={sortBy === 'new'}
              onClick={() => setSortBy('new')}
            />
            <SortButton
              icon={<Coins className="h-4 w-4" />}
              label="Top Earning"
              active={sortBy === 'top'}
              onClick={() => setSortBy('top')}
            />
          </div>
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map((song, index) => (
            <SongCard key={song.id} song={song} delay={index * 100} />
          ))}
        </div>

        {filteredSongs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No songs found. Try a different search or filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function SortButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        active
          ? 'bg-purple-100 text-purple-700'
          : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function SongCard({ song, delay }: { song: typeof mockSongs[0]; delay: number }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Link
      to={`/song/${song.id}`}
      className="group animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="rounded-2xl glass overflow-hidden hover-lift">
        {/* Cover Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={song.coverUrl}
            alt={song.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="h-8 w-8 text-purple-600 fill-purple-600" />
            </div>
          </div>

          {/* Exclusive Badge */}
          {song.isExclusive && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
              <Crown className="h-3 w-3" />
              <span>Exclusive</span>
            </div>
          )}

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
            className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
        </div>

        {/* Song Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-purple-600 transition-colors">
            {song.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3">{song.artist}</p>

          <div className="flex items-center justify-between text-sm">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
              {song.genre}
            </span>
            <div className="flex items-center space-x-1 text-gray-600">
              <Coins className="h-4 w-4" />
              <span className="font-semibold">${song.streamPrice}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <span>{song.totalStreams.toLocaleString()} streams</span>
            {song.isExclusive && song.exclusivePrice && (
              <span className="text-orange-600 font-semibold">${song.exclusivePrice} exclusive</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
