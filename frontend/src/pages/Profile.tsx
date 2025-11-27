import { useState } from 'react'
import { Wallet, Copy, Check, ExternalLink, Music, DollarSign, Heart, LogOut, TrendingUp, Play, Clock, Settings, Bell, Eye, Shield, Zap } from 'lucide-react'

export default function Profile() {
  const [copied, setCopied] = useState(false)
  const [isConnected] = useState(true) // Change to false to see connect state
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(null)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const walletAddress = '0x7a9f3b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a'
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`

  const balance = 125.50
  const likedSongs = 23
  const uploadedSongs = 8
  const totalEarned = 248.67
  const totalStreams = 1247

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const recentActivity = [
    { type: 'stream', title: "Your song 'Cosmic Dreams' was streamed", amount: '+$0.06', time: '2 hours ago', plays: 3 },
    { type: 'purchase', title: "Someone purchased 'Neon Nights'", amount: '+$2.99', time: '5 hours ago', plays: 1 },
    { type: 'upload', title: "You uploaded 'Midnight Vibes'", amount: '-$0.20', time: '1 day ago', plays: 0 },
    { type: 'stream', title: "Your song 'Rainfall Meditation' was streamed", amount: '+$0.05', time: '2 days ago', plays: 5 },
    { type: 'like', title: "You liked 'Synthwave Sunset'", amount: '', time: '3 days ago', plays: 0 },
  ]

  if (!isConnected) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0f', position: 'relative', overflow: 'hidden' }}>
        {/* Animated Background Orbs */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '20%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }} className="animate-pulse-slow" />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            right: '15%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(219, 39, 119, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }} className="animate-pulse-slow animation-delay-2000" />
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '30%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }} className="animate-pulse-slow animation-delay-4000" />
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, paddingTop: '120px', paddingLeft: '20px', paddingRight: '20px' }}>
          <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
            {/* Wallet Icon */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{
                width: '120px',
                height: '120px',
                margin: '0 auto 32px',
                borderRadius: '32px',
                background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 60px rgba(147, 51, 234, 0.4)',
              }}>
                <Wallet style={{ width: '56px', height: '56px', color: 'white' }} />
              </div>
              <h1 style={{
                fontSize: '42px',
                fontWeight: '800',
                margin: '0 0 16px 0',
                background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Connect Your Wallet</h1>
              <p style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6',
                margin: 0,
              }}>
                Connect your wallet to start earning from your AI music or purchase songs
              </p>
            </div>

            {/* Connect Button */}
            <button
              onMouseEnter={() => setHoveredButton('connect')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                width: '100%',
                padding: '20px 32px',
                borderRadius: '16px',
                border: 'none',
                background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
                color: 'white',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                boxShadow: hoveredButton === 'connect'
                  ? '0 20px 60px rgba(147, 51, 234, 0.5)'
                  : '0 10px 40px rgba(147, 51, 234, 0.3)',
                transform: hoveredButton === 'connect' ? 'translateY(-4px) scale(1.02)' : 'translateY(0)',
                transition: 'all 0.3s ease',
              }}
            >
              <Wallet style={{ width: '24px', height: '24px' }} />
              <span>Connect Wallet</span>
            </button>

            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '16px' }}>
              We support MetaMask, Coinbase Wallet, and more
            </p>

            {/* Benefits Card */}
            <div style={{
              marginTop: '48px',
              padding: '32px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'white',
                marginBottom: '24px',
              }}>Why connect?</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                {[
                  { icon: Music, title: 'Upload & Monetize', desc: 'Create and sell AI-generated music', color: '#a855f7' },
                  { icon: DollarSign, title: 'Instant Payments', desc: 'Receive earnings directly to your wallet', color: '#22c55e' },
                  { icon: Heart, title: 'Build Library', desc: 'Save and own your favorite tracks', color: '#ec4899' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: `${item.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <item.icon style={{ width: '24px', height: '24px', color: item.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{item.title}</div>
                      <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '-5%',
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
          left: '30%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} className="animate-pulse-slow animation-delay-4000" />
        <div style={{
          position: 'absolute',
          bottom: '30%',
          right: '20%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} className="animate-pulse-slow" />
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '100px', paddingBottom: '100px', paddingLeft: '20px', paddingRight: '20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Profile Header */}
          <div style={{
            padding: '40px',
            borderRadius: '32px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '32px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  {/* Avatar */}
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '28px',
                    background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 16px 48px rgba(147, 51, 234, 0.35)',
                  }}>
                    <Wallet style={{ width: '48px', height: '48px', color: 'white' }} />
                  </div>

                  {/* Info */}
                  <div>
                    <h1 style={{
                      fontSize: '36px',
                      fontWeight: '800',
                      margin: '0 0 8px 0',
                      background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>My Profile</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontFamily: 'monospace',
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '8px 16px',
                        borderRadius: '10px',
                      }}>{shortAddress}</span>
                      <button
                        onClick={handleCopyAddress}
                        onMouseEnter={() => setHoveredButton('copy')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          border: 'none',
                          background: hoveredButton === 'copy' ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {copied ? (
                          <Check style={{ width: '18px', height: '18px', color: '#22c55e' }} />
                        ) : (
                          <Copy style={{ width: '18px', height: '18px', color: 'rgba(255, 255, 255, 0.6)' }} />
                        )}
                      </button>
                      <a
                        href={`https://etherscan.io/address/${walletAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredButton('link')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background: hoveredButton === 'link' ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <ExternalLink style={{ width: '18px', height: '18px', color: 'rgba(255, 255, 255, 0.6)' }} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Disconnect Button */}
                <button
                  onMouseEnter={() => setHoveredButton('disconnect')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 24px',
                    borderRadius: '14px',
                    border: '2px solid rgba(239, 68, 68, 0.3)',
                    background: hoveredButton === 'disconnect' ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                    color: '#ef4444',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <LogOut style={{ width: '18px', height: '18px' }} />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          </div>

          {/* Balance Card */}
          <div
            onMouseEnter={() => setHoveredCard('balance')}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              padding: '40px',
              borderRadius: '32px',
              background: 'linear-gradient(135deg, #9333ea 0%, #db2777 50%, #ec4899 100%)',
              marginBottom: '32px',
              boxShadow: hoveredCard === 'balance'
                ? '0 30px 80px rgba(147, 51, 234, 0.5)'
                : '0 20px 60px rgba(147, 51, 234, 0.3)',
              transform: hoveredCard === 'balance' ? 'translateY(-8px)' : 'translateY(0)',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '20%',
              width: '120px',
              height: '120px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '50%',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <DollarSign style={{ width: '24px', height: '24px', color: 'rgba(255, 255, 255, 0.8)' }} />
                <span style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '500' }}>USDC Balance</span>
              </div>
              <div style={{
                fontSize: '64px',
                fontWeight: '800',
                color: 'white',
                marginBottom: '32px',
                letterSpacing: '-2px',
              }}>${balance.toFixed(2)}</div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  onMouseEnter={() => setHoveredButton('add')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    flex: '1 1 180px',
                    padding: '18px 32px',
                    borderRadius: '16px',
                    border: 'none',
                    background: 'white',
                    color: '#9333ea',
                    fontSize: '17px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: hoveredButton === 'add' ? '0 12px 32px rgba(0, 0, 0, 0.3)' : '0 8px 24px rgba(0, 0, 0, 0.2)',
                    transform: hoveredButton === 'add' ? 'translateY(-3px)' : 'translateY(0)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Add Funds
                </button>
                <button
                  onMouseEnter={() => setHoveredButton('withdraw')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    flex: '1 1 180px',
                    padding: '18px 32px',
                    borderRadius: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: hoveredButton === 'withdraw' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '17px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transform: hoveredButton === 'withdraw' ? 'translateY(-3px)' : 'translateY(0)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {[
              { icon: Music, label: 'Songs Uploaded', value: uploadedSongs, color: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.15)' },
              { icon: Heart, label: 'Liked Songs', value: likedSongs, color: '#ec4899', bgColor: 'rgba(236, 72, 153, 0.15)' },
              { icon: Play, label: 'Total Streams', value: totalStreams.toLocaleString(), color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.15)' },
              { icon: TrendingUp, label: 'Total Earned', value: `$${totalEarned.toFixed(2)}`, color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.15)' },
            ].map((stat, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(`stat-${idx}`)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: '28px',
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: hoveredCard === `stat-${idx}`
                    ? `0 20px 50px ${stat.color}30`
                    : '0 4px 20px rgba(0, 0, 0, 0.2)',
                  transform: hoveredCard === `stat-${idx}` ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <stat.icon style={{ width: '24px', height: '24px', color: stat.color }} />
                  </div>
                  <span style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '500' }}>{stat.label}</span>
                </div>
                <div style={{
                  fontSize: '36px',
                  fontWeight: '800',
                  color: stat.color,
                }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Clock style={{ width: '24px', height: '24px', color: '#a855f7' }} />
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                margin: 0,
                color: 'white',
              }}>Recent Activity</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentActivity.map((activity, idx) => {
                const isPositive = activity.amount.startsWith('+')
                const typeConfig: Record<string, { icon: typeof Music; color: string; bg: string }> = {
                  stream: { icon: Play, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)' },
                  purchase: { icon: DollarSign, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
                  upload: { icon: Music, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)' },
                  like: { icon: Heart, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' },
                }
                const config = typeConfig[activity.type] || typeConfig.stream
                const IconComponent = config.icon

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredActivity(idx)}
                    onMouseLeave={() => setHoveredActivity(null)}
                    style={{
                      padding: '20px 24px',
                      borderRadius: '18px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: hoveredActivity === idx
                        ? '0 12px 32px rgba(147, 51, 234, 0.15)'
                        : '0 2px 10px rgba(0, 0, 0, 0.1)',
                      transform: hoveredActivity === idx ? 'translateY(-3px) scale(1.01)' : 'translateY(0)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: config.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <IconComponent style={{ width: '22px', height: '22px', color: config.color }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{activity.title}</div>
                        <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }}>{activity.time}</div>
                      </div>
                    </div>
                    {activity.amount && (
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: isPositive ? '#22c55e' : 'rgba(255, 255, 255, 0.6)',
                      }}>
                        {activity.amount}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Settings */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Settings style={{ width: '24px', height: '24px', color: '#a855f7' }} />
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                margin: 0,
                color: 'white',
              }}>Settings</h2>
            </div>

            <div style={{
              padding: '32px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { icon: Bell, title: 'Email Notifications', desc: 'Get notified about streams and sales', color: '#f59e0b' },
                  { icon: Eye, title: 'Public Profile', desc: 'Show your profile to other users', color: '#06b6d4' },
                  { icon: Shield, title: 'Two-Factor Auth', desc: 'Add extra security to your account', color: '#22c55e' },
                  { icon: Zap, title: 'Auto-Withdraw', desc: 'Automatically withdraw when balance exceeds $100', color: '#a855f7' },
                ].map((setting, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: `${setting.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <setting.icon style={{ width: '22px', height: '22px', color: setting.color }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '2px' }}>{setting.title}</div>
                        <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }}>{setting.desc}</div>
                      </div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked={idx < 2} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                      <div style={{
                        width: '52px',
                        height: '28px',
                        background: idx < 2 ? 'linear-gradient(135deg, #9333ea, #db2777)' : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '14px',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '2px',
                          left: idx < 2 ? '26px' : '2px',
                          width: '24px',
                          height: '24px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        }} />
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
