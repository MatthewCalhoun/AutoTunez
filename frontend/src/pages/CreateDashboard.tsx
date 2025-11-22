import { useState } from 'react'
import { Plus, Upload, DollarSign, TrendingUp, Music, Sparkles, Crown } from 'lucide-react'

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
  },
]

export default function CreateDashboard() {
  const [showUploadModal, setShowUploadModal] = useState(false)

  const totalEarnings = mockCreatorSongs.reduce((sum, song) => sum + song.earnings, 0)
  const totalStreams = mockCreatorSongs.reduce((sum, song) => sum + song.totalStreams, 0)

  return (
    <div className="min-h-screen pt-8 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Creator Dashboard</h1>
            <p className="text-gray-600 text-lg">Upload AI music and track your earnings</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Upload New Song</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
          <StatCard
            icon={<DollarSign className="h-6 w-6 text-green-600" />}
            label="Total Earnings"
            value={`$${totalEarnings.toFixed(2)}`}
            sublabel="60% revenue share"
            gradient="from-green-50 to-emerald-50"
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
            label="Total Streams"
            value={totalStreams.toLocaleString()}
            sublabel="Across all songs"
            gradient="from-purple-50 to-pink-50"
          />
          <StatCard
            icon={<Music className="h-6 w-6 text-blue-600" />}
            label="Total Songs"
            value={mockCreatorSongs.length.toString()}
            sublabel="Published tracks"
            gradient="from-blue-50 to-cyan-50"
          />
        </div>

        {/* Your Songs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Songs</h2>
          <div className="space-y-4">
            {mockCreatorSongs.map((song, index) => (
              <SongRow key={song.id} song={song} delay={index * 100} />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl glass">
            <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span>Performance Overview</span>
            </h3>
            <div className="space-y-3">
              <PerformanceBar label="Lofi" percentage={65} streams={1234} />
              <PerformanceBar label="Trap" percentage={35} streams={856} />
            </div>
          </div>

          <div className="p-6 rounded-2xl glass">
            <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>Earnings Breakdown</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Streaming Revenue</span>
                <span className="font-semibold">${(totalEarnings * 0.8).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Exclusive Sales</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                <span className="font-semibold">Total Available</span>
                <span className="text-2xl font-bold text-green-600">${totalEarnings.toFixed(2)}</span>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                Withdraw to Wallet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
    </div>
  )
}

function StatCard({ icon, label, value, sublabel, gradient }: { icon: React.ReactNode; label: string; value: string; sublabel: string; gradient: string }) {
  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${gradient} border border-gray-200`}>
      <div className="flex items-center space-x-3 mb-3">
        {icon}
        <span className="text-gray-600 font-medium">{label}</span>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-500">{sublabel}</div>
    </div>
  )
}

function SongRow({ song, delay }: { song: typeof mockCreatorSongs[0]; delay: number }) {
  return (
    <div
      className="p-6 rounded-2xl glass hover-lift animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-lg">{song.title}</h3>
            {song.isExclusive && (
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                <Crown className="h-3 w-3" />
                <span>Exclusive</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{song.genre}</span>
            <span>${song.streamPrice} per stream</span>
            <span>{song.createdAt}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{song.totalStreams}</div>
            <div className="text-xs text-gray-500">Streams</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">${song.earnings.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Earned</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-400">
              {song.isExclusive && !song.soldExclusive ? `$${song.exclusivePrice}` : '—'}
            </div>
            <div className="text-xs text-gray-500">Exclusive Price</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PerformanceBar({ label, percentage, streams }: { label: string; percentage: number; streams: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-gray-600">{streams} streams</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
          style={{ width: `${percentage}%` }}
        />
      </div>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Upload New Song</h2>

        {/* Step 1: Generate */}
        {step === 'generate' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your music
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Lofi hip hop beats for studying, chill vibes, relaxing atmosphere"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition-colors resize-none"
                rows={4}
              />
            </div>

            <div className="p-4 bg-purple-50 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Generation cost</span>
                <span className="text-2xl font-bold text-purple-600">$0.20</span>
              </div>
              <p className="text-xs text-gray-500">One-time fee for AI music generation</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep('details')}
                disabled={!prompt}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Sparkles className="h-5 w-5" />
                <span>Generate Music</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 'details' && (
          <div className="space-y-6">
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center space-x-2 text-green-700 mb-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Music generated successfully!</span>
              </div>
              <p className="text-sm text-green-600">Preview your track and add details</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Song Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter song title"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition-colors"
              >
                <option value="">Select genre</option>
                <option value="lofi">Lofi</option>
                <option value="trap">Trap</option>
                <option value="house">House</option>
                <option value="ambient">Ambient</option>
                <option value="jazz">Jazz</option>
                <option value="synthwave">Synthwave</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep('pricing')}
                disabled={!title || !genre}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                Next: Set Pricing
              </button>
              <button
                onClick={() => setStep('generate')}
                className="px-6 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Pricing */}
        {step === 'pricing' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stream Price (USDC per play)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">$</span>
                <input
                  type="number"
                  value={streamPrice}
                  onChange={(e) => setStreamPrice(e.target.value)}
                  step="0.01"
                  min="0.01"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition-colors"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Recommended: $0.10 - $0.25</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-xl">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={offerExclusive}
                  onChange={(e) => setOfferExclusive(e.target.checked)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-medium mb-1 flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-orange-600" />
                    <span>Offer Exclusive Ownership</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Allow collectors to purchase exclusive rights to this song
                  </p>
                  {offerExclusive && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exclusive Price (USDC)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">$</span>
                        <input
                          type="number"
                          value={exclusivePrice}
                          onChange={(e) => setExclusivePrice(e.target.value)}
                          step="10"
                          min="10"
                          className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl text-sm">
              <div className="font-semibold mb-2">Revenue Split</div>
              <div className="space-y-1 text-gray-600">
                <div className="flex justify-between">
                  <span>You receive:</span>
                  <span className="font-semibold text-green-600">60%</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform fee:</span>
                  <span>40%</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  // Upload logic here
                  onClose()
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>Publish Song</span>
              </button>
              <button
                onClick={() => setStep('details')}
                className="px-6 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
