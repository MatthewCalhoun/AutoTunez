import { useState } from 'react'
import { Play, Pause, Heart, Grid3x3, List, Search, SortAsc, Music, Clock, Calendar, MoreHorizontal } from 'lucide-react'

// Mock library data
const mockLibrarySongs = [
  {
    id: '1',
    title: 'Cosmic Dreams',
    artist: '0x7a...b3c2',
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
  const [sortBy, setSortBy] = useState('dateAdded')

  const filteredSongs = mockLibrarySongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* Sidebar */}
        <div className="w-64 border-r border-white/10 p-6" style={{ backgroundColor: 'rgba(20, 20, 20, 0.5)' }}>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Library</h2>

          <div className="space-y-1">
            <SidebarItem
              icon={<Music className="h-5 w-5" />}
              label="Songs"
              active={selectedCategory === 'songs'}
              count={mockLibrarySongs.length}
              onClick={() => setSelectedCategory('songs')}
            />
            <SidebarItem
              icon={<Heart className="h-5 w-5" />}
              label="Liked Songs"
              active={selectedCategory === 'liked'}
              count={mockLibrarySongs.filter(s => s.isLiked).length}
              onClick={() => setSelectedCategory('liked')}
            />
            <SidebarItem
              icon={<Calendar className="h-5 w-5" />}
              label="Recently Added"
              active={selectedCategory === 'recent'}
              onClick={() => setSelectedCategory('recent')}
            />
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Playlists</h3>
            <div className="space-y-1">
              <SidebarItem
                icon={<Music className="h-5 w-5" />}
                label="Chill Vibes"
                onClick={() => {}}
              />
              <SidebarItem
                icon={<Music className="h-5 w-5" />}
                label="Workout Mix"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header Controls */}
          <div className="border-b border-white/10 p-6" style={{ backgroundColor: 'rgba(20, 20, 20, 0.3)' }}>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">
                {selectedCategory === 'songs' && 'All Songs'}
                {selectedCategory === 'liked' && 'Liked Songs'}
                {selectedCategory === 'recent' && 'Recently Added'}
              </h1>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search library..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    style={{ width: '300px' }}
                  />
                </div>

                {/* View Toggle */}
                <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600' : 'hover:bg-white/10'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600' : 'hover:bg-white/10'}`}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              {filteredSongs.length} songs
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {viewMode === 'list' ? (
              <ListView songs={filteredSongs} playingId={playingId} setPlayingId={setPlayingId} />
            ) : (
              <GridView songs={filteredSongs} playingId={playingId} setPlayingId={setPlayingId} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, active, count, onClick }: { icon: React.ReactNode; label: string; active?: boolean; count?: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
        active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-gray-500">{count}</span>
      )}
    </button>
  )
}

function ListView({ songs, playingId, setPlayingId }: { songs: typeof mockLibrarySongs; playingId: string | null; setPlayingId: (id: string | null) => void }) {
  return (
    <div className="space-y-1">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs text-gray-400 uppercase tracking-wider border-b border-white/10">
        <div className="col-span-1">#</div>
        <div className="col-span-5">Title</div>
        <div className="col-span-2">Album</div>
        <div className="col-span-2">Date Added</div>
        <div className="col-span-1"><Clock className="h-4 w-4" /></div>
        <div className="col-span-1"></div>
      </div>

      {/* Song Rows */}
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
  )
}

function SongRow({ song, index, isPlaying, onPlay }: { song: typeof mockLibrarySongs[0]; index: number; isPlaying: boolean; onPlay: () => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(song.isLiked)

  return (
    <div
      className="grid grid-cols-12 gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Index / Play Button */}
      <div className="col-span-1 flex items-center">
        {isHovered || isPlaying ? (
          <button onClick={onPlay} className="hover:scale-110 transition-transform">
            {isPlaying ? (
              <Pause className="h-4 w-4 text-purple-400 fill-purple-400" />
            ) : (
              <Play className="h-4 w-4 text-white fill-white" />
            )}
          </button>
        ) : (
          <span className="text-sm text-gray-400">{index + 1}</span>
        )}
      </div>

      {/* Title & Artist */}
      <div className="col-span-5 flex items-center space-x-3">
        <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded" />
        <div>
          <div className="text-sm font-medium text-white">{song.title}</div>
          <div className="text-xs text-gray-400">{song.artist}</div>
        </div>
      </div>

      {/* Album */}
      <div className="col-span-2 flex items-center">
        <span className="text-sm text-gray-400">{song.album}</span>
      </div>

      {/* Date Added */}
      <div className="col-span-2 flex items-center">
        <span className="text-sm text-gray-400">{new Date(song.dateAdded).toLocaleDateString()}</span>
      </div>

      {/* Duration */}
      <div className="col-span-1 flex items-center">
        <span className="text-sm text-gray-400">{song.duration}</span>
      </div>

      {/* Actions */}
      <div className="col-span-1 flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="hover:scale-110 transition-transform"
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-purple-500 text-purple-500' : 'text-gray-400'}`} />
        </button>
        <button className="hover:scale-110 transition-transform">
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  )
}

function GridView({ songs, playingId, setPlayingId }: { songs: typeof mockLibrarySongs; playingId: string | null; setPlayingId: (id: string | null) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-white/5">
        <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />

        {/* Play Button Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              onClick={onPlay}
              className="bg-purple-600 rounded-full p-4 hover:bg-purple-700 hover:scale-110 transition-all"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 text-white fill-white" />
              ) : (
                <Play className="h-6 w-6 text-white fill-white ml-1" />
              )}
            </button>
          </div>
        )}
      </div>

      <h3 className="text-sm font-medium text-white truncate">{song.title}</h3>
      <p className="text-xs text-gray-400 truncate">{song.artist}</p>
    </div>
  )
}
