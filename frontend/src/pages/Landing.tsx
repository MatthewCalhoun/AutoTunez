import { Link } from 'react-router-dom'
import { Play, Sparkles, Coins, TrendingUp, Music, Zap } from 'lucide-react'

export default function Landing() {
  return (
    <div className="h-screen bg-black text-white flex flex-col items-center overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Hero Section */}
      <section className="relative flex-shrink-0 w-full flex items-center justify-center px-6 sm:px-8 pb-8" style={{ paddingTop: '4rem' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-6xl w-full mx-auto px-4">
          {/* Badge */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center space-x-3 bg-purple-600/20 border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full animate-fade-in">
              <Sparkles className="h-6 w-6" />
              <span className="text-base font-medium tracking-wide">The Future of AI Music</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-bold leading-tight animate-fade-in text-center" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '2rem' }}>
            Create. Share.{' '}
            <span className="gradient-text">Earn.</span>
          </h1>

          {/* Subheadline */}
          <div className="flex justify-center mb-8" style={{ marginTop: '2rem' }}>
            <p className="text-gray-400 animate-fade-in max-w-3xl text-center px-4" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: '1.6' }}>
              The first marketplace for AI-generated music. Upload your creations,
              earn from every stream, or sell exclusive ownership rights.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-slide-up" style={{ marginTop: '6rem' }}>
            <Link
              to="/discover"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-24 py-8 rounded-full font-semibold text-2xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center space-x-5 group"
            >
              <Play className="h-8 w-8 group-hover:scale-110 transition-transform" />
              <span>Discover Music</span>
            </Link>
            <Link
              to="/create"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-24 py-8 rounded-full font-semibold text-2xl hover:bg-white/20 hover:border-purple-500 hover:shadow-lg transition-all duration-300 flex items-center space-x-5"
            >
              <Zap className="h-8 w-8" />
              <span>Start Creating</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="flex-grow w-full px-6 sm:px-8 bg-gradient-to-b from-black via-gray-950 to-gray-900 flex flex-col items-center justify-center overflow-y-auto" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div className="max-w-6xl w-full">
          <div className="text-center mb-10">
            <h2 className="font-bold mb-3" style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)' }}>
              How It Works
            </h2>
            <p className="text-gray-400" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}>
              Three simple steps to start earning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {/* Step 1 */}
            <div className="relative p-7 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <div className="absolute -top-3 -left-3 bg-gradient-to-br from-purple-600 to-pink-600 text-white w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg shadow-2xl shadow-purple-500/50">
                1
              </div>
              <div className="text-purple-400 mb-3 mt-1">
                <Music className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2.5">Create Your Music</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Use AI to generate unique tracks in any genre. Pay just $0.20 per song.</p>
            </div>

            {/* Step 2 */}
            <div className="relative p-7 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <div className="absolute -top-3 -left-3 bg-gradient-to-br from-purple-600 to-pink-600 text-white w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg shadow-2xl shadow-purple-500/50">
                2
              </div>
              <div className="text-purple-400 mb-3 mt-1">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2.5">Upload & Price</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Set your per-stream price or offer exclusive ownership. You control the pricing.</p>
            </div>

            {/* Step 3 */}
            <div className="relative p-7 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <div className="absolute -top-3 -left-3 bg-gradient-to-br from-purple-600 to-pink-600 text-white w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg shadow-2xl shadow-purple-500/50">
                3
              </div>
              <div className="text-purple-400 mb-3 mt-1">
                <Coins className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2.5">Earn Instantly</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Get paid every time someone plays your song. 60% goes directly to you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex-shrink-0 w-full px-6 sm:px-8 py-8 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
        <div className="max-w-4xl w-full text-center">
          <h2 className="font-bold mb-3 text-white" style={{ fontSize: 'clamp(1.625rem, 2.75vw, 2.25rem)' }}>
            Ready to Turn AI Music into Income?
          </h2>
          <p className="mb-6 text-white/95 max-w-2xl mx-auto" style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', lineHeight: '1.5' }}>
            Join thousands of creators already earning from their AI-generated music.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 bg-white text-purple-600 px-7 py-3 rounded-full font-semibold text-sm hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="h-4 w-4" />
            <span>Get Started Free</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
