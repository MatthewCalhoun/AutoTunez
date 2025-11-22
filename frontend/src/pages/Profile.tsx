import { useState } from 'react'
import { Wallet, Copy, Check, ExternalLink, Music, DollarSign, Heart, LogOut } from 'lucide-react'

export default function Profile() {
  const [copied, setCopied] = useState(false)
  const [isConnected] = useState(false) // Change to true to see connected state

  const walletAddress = '0x7a9f3b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a'
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`

  const balance = 125.50 // USDC balance
  const likedSongs = 23
  const uploadedSongs = 8

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-3">Connect Your Wallet</h1>
            <p className="text-gray-600 text-lg">
              Connect your wallet to start earning from your AI music or purchase songs
            </p>
          </div>

          <div className="space-y-3 animate-slide-up">
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2">
              <Wallet className="h-5 w-5" />
              <span>Connect Wallet</span>
            </button>

            <div className="text-sm text-gray-500">
              We support MetaMask, Coinbase Wallet, and more
            </div>
          </div>

          <div className="mt-12 p-6 rounded-2xl glass">
            <h3 className="font-semibold mb-3">Why connect?</h3>
            <div className="space-y-3 text-sm text-left">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Music className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Upload & Monetize</div>
                  <div className="text-gray-600">Create and sell AI-generated music</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Instant Payments</div>
                  <div className="text-gray-600">Receive earnings directly to your wallet</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Heart className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Build Library</div>
                  <div className="text-gray-600">Save and own your favorite tracks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-8 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8 animate-fade-in">
          <div className="p-8 rounded-3xl glass">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center">
                  <Wallet className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-1">My Profile</h1>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 font-mono">{shortAddress}</span>
                    <button
                      onClick={handleCopyAddress}
                      className="p-1 hover:bg-purple-100 rounded transition-colors"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-600" />
                      )}
                    </button>
                    <a
                      href={`https://etherscan.io/address/${walletAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:bg-purple-100 rounded transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 text-gray-600" />
                    </a>
                  </div>
                </div>
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                <LogOut className="h-4 w-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="mb-8 animate-slide-up">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5" />
              <span className="text-purple-100">USDC Balance</span>
            </div>
            <div className="text-5xl font-bold mb-6">${balance.toFixed(2)}</div>
            <div className="flex space-x-3">
              <button className="flex-1 bg-white text-purple-600 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Add Funds
              </button>
              <button className="flex-1 bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition-all">
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Music className="h-6 w-6 text-purple-600" />}
            label="Songs Uploaded"
            value={uploadedSongs.toString()}
          />
          <StatCard
            icon={<Heart className="h-6 w-6 text-red-500" />}
            label="Liked Songs"
            value={likedSongs.toString()}
          />
          <StatCard
            icon={<DollarSign className="h-6 w-6 text-green-600" />}
            label="Total Earned"
            value="$248.67"
          />
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <ActivityItem
              type="stream"
              title="Your song 'Cosmic Dreams' was streamed"
              amount="+$0.06"
              time="2 hours ago"
            />
            <ActivityItem
              type="upload"
              title="You uploaded 'Midnight Vibes'"
              amount="-$0.20"
              time="1 day ago"
            />
            <ActivityItem
              type="stream"
              title="Your song 'Rainfall Meditation' was streamed"
              amount="+$0.05"
              time="2 days ago"
            />
          </div>
        </div>

        {/* Settings */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <div className="p-6 rounded-2xl glass space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-gray-600">Get notified about streams and sales</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Public Profile</div>
                <div className="text-sm text-gray-600">Show your profile to other users</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-6 rounded-2xl glass">
      <div className="flex items-center space-x-2 mb-2">
        {icon}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  )
}

function ActivityItem({ type, title, amount, time }: { type: string; title: string; amount: string; time: string }) {
  const isPositive = amount.startsWith('+')

  return (
    <div className="p-4 rounded-xl glass flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${type === 'stream' ? 'bg-green-100' : 'bg-purple-100'}`}>
          {type === 'stream' ? (
            <Music className="h-4 w-4 text-green-600" />
          ) : (
            <DollarSign className="h-4 w-4 text-purple-600" />
          )}
        </div>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-gray-600">{time}</div>
        </div>
      </div>
      <div className={`font-semibold ${isPositive ? 'text-green-600' : 'text-gray-600'}`}>
        {amount}
      </div>
    </div>
  )
}
