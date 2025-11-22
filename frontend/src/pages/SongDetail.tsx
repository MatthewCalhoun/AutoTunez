import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Play, Pause, Heart, Share2, Crown, Coins, BarChart3, User, ArrowLeft } from 'lucide-react'

// Mock song data
const mockSong = {
  id: '1',
  title: 'Cosmic Dreams',
  artist: '0x7a...b3c2',
  artistFull: '0x7a9f3b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
  genre: 'Lofi',
  coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop',
  streamPrice: 0.10,
  totalStreams: 1234,
  earnings: 74.04,
  isExclusive: false,
  exclusivePrice: 150,
  description: 'A dreamy lo-fi track perfect for studying, relaxing, or late-night coding sessions. Created with advanced AI to capture the essence of cosmic exploration.',
  duration: '2:34',
  createdAt: '2025-01-15',
  tags: ['lofi', 'chill', 'study', 'relax', 'cosmic'],
}

export default function SongDetail() {
  const { id } = useParams()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [showPurchaseModal, setShowPurchaseModal] = useState<'stream' | 'exclusive' | null>(null)

  const totalDuration = 154 // seconds
  const progress = (currentTime / totalDuration) * 100

  return (
    <div className="min-h-screen pt-8 pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/discover"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Discover</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
          {/* Left Column - Cover & Player */}
          <div className="space-y-6">
            {/* Album Art */}
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={mockSong.coverUrl}
                alt={mockSong.title}
                className="w-full h-full object-cover"
              />

              {/* Play/Pause Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white rounded-full p-5 hover:scale-110 transition-transform shadow-2xl"
                >
                  {isPlaying ? (
                    <Pause className="h-10 w-10 text-purple-600 fill-purple-600" />
                  ) : (
                    <Play className="h-10 w-10 text-purple-600 fill-purple-600 ml-1" />
                  )}
                </button>
              </div>

              {/* Exclusive Badge */}
              {mockSong.isExclusive && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg">
                  <Crown className="h-4 w-4" />
                  <span>Available for Exclusive Purchase</span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                <span>{mockSong.duration}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl border-2 border-gray-200 hover:border-purple-600 hover:bg-purple-50 transition-all"
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                <span className="font-medium">Like</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl border-2 border-gray-200 hover:border-purple-600 hover:bg-purple-50 transition-all">
                <Share2 className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* Right Column - Info & Purchase */}
          <div className="space-y-6">
            {/* Song Info */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  {mockSong.genre}
                </span>
                <span className="text-gray-500 text-sm">{mockSong.createdAt}</span>
              </div>
              <h1 className="text-4xl font-bold mb-2">{mockSong.title}</h1>
              <Link
                to={`/profile/${mockSong.artist}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="font-medium">{mockSong.artist}</span>
              </Link>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{mockSong.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {mockSong.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={<BarChart3 className="h-5 w-5 text-purple-600" />}
                label="Total Streams"
                value={mockSong.totalStreams.toLocaleString()}
              />
              <StatCard
                icon={<Coins className="h-5 w-5 text-purple-600" />}
                label="Creator Earned"
                value={`$${mockSong.earnings.toFixed(2)}`}
              />
            </div>

            {/* Purchase Options */}
            <div className="space-y-4 pt-4">
              {/* Stream Purchase */}
              <div className="p-6 rounded-2xl glass border-2 border-purple-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Stream This Song</h3>
                    <p className="text-sm text-gray-600">Pay once, listen unlimited times</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">${mockSong.streamPrice}</div>
                    <div className="text-xs text-gray-500">per stream</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowPurchaseModal('stream')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Purchase Stream Access
                </button>
              </div>

              {/* Exclusive Purchase */}
              {mockSong.isExclusive && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Crown className="h-5 w-5 text-orange-600" />
                        <h3 className="font-semibold text-lg">Exclusive Ownership</h3>
                      </div>
                      <p className="text-sm text-gray-600">Own this unique piece, commercial rights included</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">${mockSong.exclusivePrice}</div>
                      <div className="text-xs text-gray-500">one-time</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPurchaseModal('exclusive')}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Purchase Exclusive Rights
                  </button>
                  <div className="mt-3 text-xs text-gray-600">
                    <ul className="space-y-1">
                      <li>✓ Full commercial usage rights</li>
                      <li>✓ Unique ownership NFT</li>
                      <li>✓ Creator royalties included</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <PurchaseModal
          type={showPurchaseModal}
          price={showPurchaseModal === 'stream' ? mockSong.streamPrice : mockSong.exclusivePrice!}
          onClose={() => setShowPurchaseModal(null)}
        />
      )}
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl glass">
      <div className="flex items-center space-x-2 mb-2">
        {icon}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

function PurchaseModal({ type, price, onClose }: { type: 'stream' | 'exclusive'; price: number; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-slide-up">
        <h2 className="text-2xl font-bold mb-4">
          {type === 'stream' ? 'Purchase Stream Access' : 'Purchase Exclusive Rights'}
        </h2>
        <p className="text-gray-600 mb-6">
          {type === 'stream'
            ? 'Connect your wallet to purchase streaming access to this song.'
            : 'Connect your wallet to purchase exclusive ownership rights to this unique piece.'}
        </p>

        <div className="bg-purple-50 p-4 rounded-xl mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Price</span>
            <span className="text-2xl font-bold text-purple-600">${price}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Platform fee (40%)</span>
            <span className="text-gray-700">${(price * 0.4).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Creator receives (60%)</span>
            <span className="text-gray-700">${(price * 0.6).toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
            Connect Wallet
          </button>
          <button
            onClick={onClose}
            className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
