import { useState } from 'react'
import { Upload, Sparkles, Crown, Play, TrendingUp } from 'lucide-react'

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
  {
    id: '3',
    title: 'Neon Nights',
    genre: 'Synthwave',
    streamPrice: 0.15,
    totalStreams: 2341,
    earnings: 210.69,
    isExclusive: false,
    createdAt: '2025-01-20',
  },
]

export default function CreateDashboard() {
  const [showUploadModal, setShowUploadModal] = useState(false)

  const totalEarnings = mockCreatorSongs.reduce((sum, song) => sum + song.earnings, 0)
  const totalStreams = mockCreatorSongs.reduce((sum, song) => sum + song.totalStreams, 0)

  return (
    <div className="h-screen bg-black text-white overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Hero Header with Gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl" />

        <div className="relative px-8 py-6">
          <div className="text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Creator Studio
            </h1>
            <p className="text-lg text-gray-400">
              Create, publish, and earn from your AI-generated music
            </p>
          </div>

          <div className="flex justify-center gap-20 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">${totalEarnings.toFixed(2)}</div>
              <div className="text-xs text-gray-400 mt-1">Total Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{totalStreams.toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-1">Total Streams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{mockCreatorSongs.length}</div>
              <div className="text-xs text-gray-400 mt-1">Tracks</div>
            </div>
          </div>

        </div>
      </div>

      {/* ========== MAIN CONTENT AREA ========== */}
      <div className="w-full px-8 lg:px-16 xl:px-24 py-4">

        {/* QUICK ACTIONS - 3 cards centered and spread */}
        <div className="w-full flex justify-center mb-6" style={{ marginTop: '4rem' }}>
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-12">

            {/* Generate with AI */}
            <div
              onClick={() => setShowUploadModal(true)}
              className="w-full md:w-72 lg:w-80 p-6 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 cursor-pointer hover:border-purple-500/60 hover:scale-[1.02] transition-all group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div className="font-bold text-lg mb-1">Generate with AI</div>
                <div className="text-gray-400 text-sm">$0.20 per track</div>
              </div>
            </div>

            {/* Upload Track */}
            <div className="w-full md:w-72 lg:w-80 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:scale-[1.02] transition-all cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                  <Upload className="h-7 w-7 text-gray-400" />
                </div>
                <div className="font-bold text-lg mb-1">Upload Track</div>
                <div className="text-gray-400 text-sm">Your own music</div>
              </div>
            </div>

            {/* Analytics */}
            <div className="w-full md:w-72 lg:w-80 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:scale-[1.02] transition-all cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                  <TrendingUp className="h-7 w-7 text-gray-400" />
                </div>
                <div className="font-bold text-lg mb-1">Analytics</div>
                <div className="text-gray-400 text-sm">View insights</div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN SECTION - Tracks & Sidebar spread across full width */}
        <div className="w-full flex flex-col xl:flex-row justify-center gap-12" style={{ marginTop: '8rem' }}>

          {/* YOUR TRACKS - Left/Main section */}
          <div className="w-full xl:flex-1 xl:max-w-4xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 text-center">
              <h2 className="text-xl font-bold">Your Tracks</h2>
            </div>

            <div className="divide-y divide-white/10">
              {mockCreatorSongs.map((song, index) => (
                <div
                  key={song.id}
                  className="p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Left side - number, play, info */}
                    <div className="flex items-center gap-4">
                      <div className="w-6 text-center text-gray-500 font-bold">
                        {index + 1}
                      </div>

                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-105 transition-transform">
                        <Play className="h-4 w-4 text-white ml-0.5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-bold">{song.title}</h3>
                          {song.isExclusive && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                              <Crown className="h-2.5 w-2.5" />
                              Exclusive
                            </span>
                          )}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {song.genre} • ${song.streamPrice}/stream
                        </div>
                      </div>
                    </div>

                    {/* Right side - stats */}
                    <div className="hidden md:flex items-center gap-16">
                      <div className="text-center">
                        <div className="font-bold text-lg">{song.totalStreams.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">streams</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg text-green-400">${song.earnings.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">earned</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full xl:w-80 flex flex-col gap-6">

            {/* Available Balance */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-green-600/15 to-emerald-600/15 border border-green-500/30 text-center">
              <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">Available Balance</h3>
              <div className="text-3xl font-bold text-green-400 mb-4">
                ${totalEarnings.toFixed(2)}
              </div>
              <button className="w-full bg-green-500 text-black py-2.5 rounded-full font-bold hover:bg-green-400 transition-colors">
                Withdraw
              </button>
            </div>

            {/* Top Performing */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-medium text-center">Top Performing</h3>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-2">
                  <Play className="h-4 w-4 text-white ml-0.5" />
                </div>
                <div className="font-bold">Neon Nights</div>
                <div className="text-gray-400 text-sm mb-2">2,341 streams</div>
                <div className="w-full pt-2 border-t border-white/10 flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Growth</span>
                  <span className="text-green-400 font-bold">+127%</span>
                </div>
              </div>
            </div>

            {/* This Month Stats */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-medium text-center">This Month</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">New Streams</span>
                  <span className="font-bold">+1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Revenue</span>
                  <span className="font-bold text-green-400">+$89.40</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">New Followers</span>
                  <span className="font-bold">+23</span>
                </div>
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

function UploadModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'generate' | 'details' | 'pricing'>('generate')
  const [prompt, setPrompt] = useState('')
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [streamPrice, setStreamPrice] = useState('0.10')
  const [offerExclusive, setOfferExclusive] = useState(false)
  const [exclusivePrice, setExclusivePrice] = useState('100')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((num) => {
            const stepIndex = ['generate', 'details', 'pricing'].indexOf(step)
            const isActive = num - 1 === stepIndex
            const isComplete = num - 1 < stepIndex
            return (
              <div key={num} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-110'
                    : isComplete
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-gray-500'
                }`}>
                  {num}
                </div>
                {num < 3 && <div className={`w-8 h-0.5 ${isComplete ? 'bg-purple-600' : 'bg-white/10'}`} />}
              </div>
            )
          })}
        </div>

        {step === 'generate' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Describe Your Track</h2>
            <p className="text-gray-400 mb-6">What kind of music do you want to create?</p>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Chill lofi beats with warm piano and soft drums..."
              className="w-full px-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 resize-none mb-4 text-center"
              rows={3}
            />

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-gray-400 text-sm mb-6">
              <Sparkles className="h-4 w-4" />
              Generation cost: <span className="text-white font-semibold">$0.20</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep('details')}
                disabled={!prompt}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Generate
              </button>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-1 text-center">Track Details</h2>
            <p className="text-gray-400 mb-6 text-center">Name your creation</p>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Track title"
                className="w-full px-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500"
              />
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white"
              >
                <option value="" className="bg-zinc-900">Select genre</option>
                <option value="lofi" className="bg-zinc-900">Lofi</option>
                <option value="trap" className="bg-zinc-900">Trap</option>
                <option value="house" className="bg-zinc-900">House</option>
                <option value="ambient" className="bg-zinc-900">Ambient</option>
                <option value="jazz" className="bg-zinc-900">Jazz</option>
                <option value="synthwave" className="bg-zinc-900">Synthwave</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('generate')}
                className="flex-1 px-6 py-4 border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('pricing')}
                disabled={!title || !genre}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 'pricing' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-1 text-center">Set Pricing</h2>
            <p className="text-gray-400 mb-6 text-center">How much per stream?</p>

            <div className="space-y-4 mb-6">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={streamPrice}
                  onChange={(e) => setStreamPrice(e.target.value)}
                  step="0.01"
                  min="0.01"
                  className="w-full pl-8 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white text-lg"
                />
              </div>

              <div
                onClick={() => setOfferExclusive(!offerExclusive)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  offerExclusive ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Crown className={`h-5 w-5 ${offerExclusive ? 'text-amber-400' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <div className="font-semibold text-white">Exclusive Rights</div>
                    <div className="text-sm text-gray-400">Allow purchase of full ownership</div>
                  </div>
                  <div className={`w-12 h-7 rounded-full p-1 transition-colors ${offerExclusive ? 'bg-amber-500' : 'bg-white/20'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${offerExclusive ? 'translate-x-5' : ''}`} />
                  </div>
                </div>
                {offerExclusive && (
                  <div className="relative mt-4">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      value={exclusivePrice}
                      onChange={(e) => setExclusivePrice(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-black/30 border border-amber-500/30 text-white"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 text-sm">
                <span className="text-gray-400">You earn</span>
                <span className="text-white font-bold text-lg">60%</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('details')}
                className="flex-1 px-6 py-4 border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-colors"
              >
                Back
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-white text-black py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="h-5 w-5" />
                Publish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
