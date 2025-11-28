import { useState } from 'react'
import { Wallet, Copy, Check, ExternalLink, Music, DollarSign, Heart, LogOut, TrendingUp, Play, Clock, Settings, Bell, Eye, Shield, Zap } from 'lucide-react'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Profile() {
  const [copied, setCopied] = useState(false)
  const [isConnected] = useState(true) // Change to false to see connect state
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(null)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const isMobile = useIsMobile()

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
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0f',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: isMobile ? '100px' : '0',
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
          paddingTop: isMobile ? '40px' : '120px',
          paddingLeft: isMobile ? '16px' : '20px',
          paddingRight: isMobile ? '16px' : '20px',
        }}>
          <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
            {/* Wallet Icon */}
            <div style={{ marginBottom: isMobile ? '32px' : '40px' }}>
              <div style={{
                width: isMobile ? '90px' : '120px',
                height: isMobile ? '90px' : '120px',
                margin: '0 auto 24px',
                borderRadius: isMobile ? '24px' : '32px',
                background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 60px rgba(147, 51, 234, 0.4)',
              }}>
                <Wallet style={{ width: isMobile ? '40px' : '56px', height: isMobile ? '40px' : '56px', color: 'white' }} />
              </div>
              <h1 style={{
                fontSize: isMobile ? '28px' : '42px',
                fontWeight: '800',
                margin: '0 0 16px 0',
                background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Connect Your Wallet</h1>
              <p style={{
                fontSize: isMobile ? '15px' : '18px',
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
                padding: isMobile ? '16px 24px' : '20px 32px',
                borderRadius: isMobile ? '14px' : '16px',
                border: 'none',
                background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
                color: 'white',
                fontSize: isMobile ? '16px' : '18px',
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
              <Wallet style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px' }} />
              <span>Connect Wallet</span>
            </button>

            <p style={{ fontSize: isMobile ? '13px' : '14px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '16px' }}>
              We support MetaMask, Coinbase Wallet, and more
            </p>

            {/* Benefits Card */}
            <div style={{
              marginTop: isMobile ? '32px' : '48px',
              padding: isMobile ? '24px' : '32px',
              borderRadius: isMobile ? '20px' : '24px',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <h3 style={{
                fontSize: isMobile ? '18px' : '20px',
                fontWeight: '700',
                color: 'white',
                marginBottom: isMobile ? '20px' : '24px',
              }}>Why connect?</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '20px', textAlign: 'left' }}>
                {[
                  { icon: Music, title: 'Upload & Monetize', desc: 'Create and sell AI-generated music', color: '#a855f7' },
                  { icon: DollarSign, title: 'Instant Payments', desc: 'Receive earnings directly to your wallet', color: '#22c55e' },
                  { icon: Heart, title: 'Build Library', desc: 'Save and own your favorite tracks', color: '#ec4899' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: isMobile ? '12px' : '16px' }}>
                    <div style={{
                      width: isMobile ? '40px' : '48px',
                      height: isMobile ? '40px' : '48px',
                      borderRadius: isMobile ? '12px' : '14px',
                      background: `${item.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <item.icon style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', color: item.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{item.title}</div>
                      <div style={{ fontSize: isMobile ? '13px' : '14px', color: 'rgba(255, 255, 255, 0.5)' }}>{item.desc}</div>
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
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      position: 'relative',
      overflow: 'hidden',
      paddingBottom: isMobile ? '100px' : '0',
    }}>
      {/* Animated Background Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '-5%',
          right: '10%',
          width: isMobile ? '300px' : '600px',
          height: isMobile ? '300px' : '600px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} className="animate-pulse-slow" />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: isMobile ? '250px' : '500px',
          height: isMobile ? '250px' : '500px',
          background: 'radial-gradient(circle, rgba(219, 39, 119, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} className="animate-pulse-slow animation-delay-2000" />
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '30%',
          width: isMobile ? '200px' : '400px',
          height: isMobile ? '200px' : '400px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} className="animate-pulse-slow animation-delay-4000" />
        <div style={{
          position: 'absolute',
          bottom: '30%',
          right: '20%',
          width: isMobile ? '175px' : '350px',
          height: isMobile ? '175px' : '350px',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} className="animate-pulse-slow" />
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        paddingTop: isMobile ? '24px' : '100px',
        paddingBottom: isMobile ? '24px' : '100px',
        paddingLeft: isMobile ? '16px' : '20px',
        paddingRight: isMobile ? '16px' : '20px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Profile Header */}
          <div style={{
            padding: isMobile ? '20px' : '40px',
            borderRadius: isMobile ? '20px' : '32px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: isMobile ? '20px' : '32px',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              gap: isMobile ? '16px' : '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '14px' : '24px' }}>
                {/* Avatar */}
                <div style={{
                  width: isMobile ? '64px' : '100px',
                  height: isMobile ? '64px' : '100px',
                  borderRadius: isMobile ? '18px' : '28px',
                  background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 16px 48px rgba(147, 51, 234, 0.35)',
                  flexShrink: 0,
                }}>
                  <Wallet style={{ width: isMobile ? '28px' : '48px', height: isMobile ? '28px' : '48px', color: 'white' }} />
                </div>

                {/* Info */}
                <div>
                  <h1 style={{
                    fontSize: isMobile ? '22px' : '36px',
                    fontWeight: '800',
                    margin: '0 0 8px 0',
                    background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>My Profile</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: isMobile ? '13px' : '16px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: isMobile ? '6px 10px' : '8px 16px',
                      borderRadius: isMobile ? '8px' : '10px',
                    }}>{shortAddress}</span>
                    <button
                      onClick={handleCopyAddress}
                      onMouseEnter={() => setHoveredButton('copy')}
                      onMouseLeave={() => setHoveredButton(null)}
                      style={{
                        width: isMobile ? '34px' : '40px',
                        height: isMobile ? '34px' : '40px',
                        borderRadius: isMobile ? '8px' : '10px',
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
                        <Check style={{ width: isMobile ? '16px' : '18px', height: isMobile ? '16px' : '18px', color: '#22c55e' }} />
                      ) : (
                        <Copy style={{ width: isMobile ? '16px' : '18px', height: isMobile ? '16px' : '18px', color: 'rgba(255, 255, 255, 0.6)' }} />
                      )}
                    </button>
                    <a
                      href={`https://etherscan.io/address/${walletAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredButton('link')}
                      onMouseLeave={() => setHoveredButton(null)}
                      style={{
                        width: isMobile ? '34px' : '40px',
                        height: isMobile ? '34px' : '40px',
                        borderRadius: isMobile ? '8px' : '10px',
                        background: hoveredButton === 'link' ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <ExternalLink style={{ width: isMobile ? '16px' : '18px', height: isMobile ? '16px' : '18px', color: 'rgba(255, 255, 255, 0.6)' }} />
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
                  gap: isMobile ? '8px' : '10px',
                  padding: isMobile ? '10px 16px' : '14px 24px',
                  borderRadius: isMobile ? '10px' : '14px',
                  border: '2px solid rgba(239, 68, 68, 0.3)',
                  background: hoveredButton === 'disconnect' ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                  color: '#ef4444',
                  fontSize: isMobile ? '13px' : '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  alignSelf: isMobile ? 'flex-start' : 'auto',
                }}
              >
                <LogOut style={{ width: isMobile ? '16px' : '18px', height: isMobile ? '16px' : '18px' }} />
                <span>Disconnect</span>
              </button>
            </div>
          </div>

          {/* Balance Card */}
          <div
            onMouseEnter={() => setHoveredCard('balance')}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              padding: isMobile ? '24px' : '40px',
              borderRadius: isMobile ? '20px' : '32px',
              background: 'linear-gradient(135deg, #9333ea 0%, #db2777 50%, #ec4899 100%)',
              marginBottom: isMobile ? '20px' : '32px',
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
              top: isMobile ? '-30px' : '-50px',
              right: isMobile ? '-30px' : '-50px',
              width: isMobile ? '120px' : '200px',
              height: isMobile ? '120px' : '200px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
            }} />
            <div style={{
              position: 'absolute',
              bottom: isMobile ? '-20px' : '-30px',
              left: '20%',
              width: isMobile ? '80px' : '120px',
              height: isMobile ? '80px' : '120px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '50%',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: isMobile ? '8px' : '12px' }}>
                <DollarSign style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', color: 'rgba(255, 255, 255, 0.8)' }} />
                <span style={{ fontSize: isMobile ? '14px' : '16px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '500' }}>Balance</span>
              </div>
              <div style={{
                fontSize: isMobile ? '42px' : '64px',
                fontWeight: '800',
                color: 'white',
                marginBottom: isMobile ? '20px' : '32px',
                letterSpacing: '-2px',
              }}>${balance.toFixed(2)}</div>
              <div style={{ display: 'flex', gap: isMobile ? '10px' : '16px', flexWrap: 'wrap' }}>
                <button
                  onMouseEnter={() => setHoveredButton('add')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    flex: '1 1 140px',
                    padding: isMobile ? '14px 20px' : '18px 32px',
                    borderRadius: isMobile ? '12px' : '16px',
                    border: 'none',
                    background: 'white',
                    color: '#9333ea',
                    fontSize: isMobile ? '15px' : '17px',
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
                    flex: '1 1 140px',
                    padding: isMobile ? '14px 20px' : '18px 32px',
                    borderRadius: isMobile ? '12px' : '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: hoveredButton === 'withdraw' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: isMobile ? '15px' : '17px',
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: isMobile ? '12px' : '24px',
            marginBottom: isMobile ? '32px' : '48px',
          }}>
            {[
              { icon: Music, label: 'Uploaded', value: uploadedSongs, color: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.15)' },
              { icon: Heart, label: 'Liked', value: likedSongs, color: '#ec4899', bgColor: 'rgba(236, 72, 153, 0.15)' },
              { icon: Play, label: 'Streams', value: totalStreams.toLocaleString(), color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.15)' },
              { icon: TrendingUp, label: 'Earned', value: `$${totalEarned.toFixed(2)}`, color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.15)' },
            ].map((stat, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(`stat-${idx}`)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: isMobile ? '16px' : '28px',
                  borderRadius: isMobile ? '16px' : '24px',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px', marginBottom: isMobile ? '10px' : '16px' }}>
                  <div style={{
                    width: isMobile ? '36px' : '48px',
                    height: isMobile ? '36px' : '48px',
                    borderRadius: isMobile ? '10px' : '14px',
                    background: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <stat.icon style={{ width: isMobile ? '18px' : '24px', height: isMobile ? '18px' : '24px', color: stat.color }} />
                  </div>
                  <span style={{ fontSize: isMobile ? '12px' : '15px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '500' }}>{stat.label}</span>
                </div>
                <div style={{
                  fontSize: isMobile ? '24px' : '36px',
                  fontWeight: '800',
                  color: stat.color,
                }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div style={{ marginBottom: isMobile ? '32px' : '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px', marginBottom: isMobile ? '16px' : '24px' }}>
              <Clock style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', color: '#a855f7' }} />
              <h2 style={{
                fontSize: isMobile ? '20px' : '28px',
                fontWeight: '700',
                margin: 0,
                color: 'white',
              }}>Recent Activity</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '12px' }}>
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
                      padding: isMobile ? '14px 16px' : '20px 24px',
                      borderRadius: isMobile ? '14px' : '18px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      boxShadow: hoveredActivity === idx
                        ? '0 12px 32px rgba(147, 51, 234, 0.15)'
                        : '0 2px 10px rgba(0, 0, 0, 0.1)',
                      transform: hoveredActivity === idx ? 'translateY(-3px) scale(1.01)' : 'translateY(0)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '16px', flex: 1, minWidth: 0 }}>
                      <div style={{
                        width: isMobile ? '40px' : '48px',
                        height: isMobile ? '40px' : '48px',
                        borderRadius: isMobile ? '12px' : '14px',
                        background: config.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <IconComponent style={{ width: isMobile ? '18px' : '22px', height: isMobile ? '18px' : '22px', color: config.color }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          fontSize: isMobile ? '13px' : '16px',
                          fontWeight: '600',
                          color: 'white',
                          marginBottom: '4px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: isMobile ? 'nowrap' : 'normal',
                        }}>{isMobile ? activity.title.slice(0, 30) + (activity.title.length > 30 ? '...' : '') : activity.title}</div>
                        <div style={{ fontSize: isMobile ? '12px' : '14px', color: 'rgba(255, 255, 255, 0.5)' }}>{activity.time}</div>
                      </div>
                    </div>
                    {activity.amount && (
                      <div style={{
                        fontSize: isMobile ? '15px' : '18px',
                        fontWeight: '700',
                        color: isPositive ? '#22c55e' : 'rgba(255, 255, 255, 0.6)',
                        flexShrink: 0,
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
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px', marginBottom: isMobile ? '16px' : '24px' }}>
              <Settings style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', color: '#a855f7' }} />
              <h2 style={{
                fontSize: isMobile ? '20px' : '28px',
                fontWeight: '700',
                margin: 0,
                color: 'white',
              }}>Settings</h2>
            </div>

            <div style={{
              padding: isMobile ? '20px' : '32px',
              borderRadius: isMobile ? '16px' : '24px',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '24px' }}>
                {[
                  { icon: Bell, title: 'Email Notifications', desc: 'Get notified about streams and sales', color: '#f59e0b' },
                  { icon: Eye, title: 'Public Profile', desc: 'Show your profile to other users', color: '#06b6d4' },
                  { icon: Shield, title: 'Two-Factor Auth', desc: 'Add extra security to your account', color: '#22c55e' },
                  { icon: Zap, title: 'Auto-Withdraw', desc: isMobile ? 'Auto withdraw at $100' : 'Automatically withdraw when balance exceeds $100', color: '#a855f7' },
                ].map((setting, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '16px', flex: 1, minWidth: 0 }}>
                      <div style={{
                        width: isMobile ? '38px' : '44px',
                        height: isMobile ? '38px' : '44px',
                        borderRadius: isMobile ? '10px' : '12px',
                        background: `${setting.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <setting.icon style={{ width: isMobile ? '18px' : '22px', height: isMobile ? '18px' : '22px', color: setting.color }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '600', color: 'white', marginBottom: '2px' }}>{setting.title}</div>
                        <div style={{
                          fontSize: isMobile ? '12px' : '14px',
                          color: 'rgba(255, 255, 255, 0.5)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>{setting.desc}</div>
                      </div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
                      <input type="checkbox" defaultChecked={idx < 2} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                      <div style={{
                        width: isMobile ? '44px' : '52px',
                        height: isMobile ? '24px' : '28px',
                        background: idx < 2 ? 'linear-gradient(135deg, #9333ea, #db2777)' : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: isMobile ? '12px' : '14px',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '2px',
                          left: idx < 2 ? (isMobile ? '22px' : '26px') : '2px',
                          width: isMobile ? '20px' : '24px',
                          height: isMobile ? '20px' : '24px',
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
