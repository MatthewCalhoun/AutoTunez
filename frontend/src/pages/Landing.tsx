import { Link } from 'react-router-dom'
import { Play, Sparkles, Zap } from 'lucide-react'

export default function Landing() {
  return (
    <div className="h-screen bg-black text-white flex flex-col items-center overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Hero Section */}
      <section className="relative flex-shrink-0 w-full flex items-center justify-center px-6 sm:px-8 pb-16" style={{ paddingTop: '6rem', minHeight: '80vh' }}>
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
          <h1 className="font-bold leading-tight animate-fade-in text-center mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Create. Share.{' '}
            <span className="gradient-text">Earn.</span>
          </h1>

          {/* Subheadline */}
          <div className="flex justify-center mb-6">
            <p className="text-gray-400 animate-fade-in max-w-3xl text-center px-4" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: '1.6' }}>
              The first marketplace for AI-generated music. Upload your creations,
              earn from every stream, or sell exclusive ownership rights.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style={{ marginTop: '12rem' }}>
            <Link
              to="/discover"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-2xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center space-x-4 group"
              style={{ padding: '2rem 5rem' }}
            >
              <Play className="h-7 w-7 group-hover:scale-110 transition-transform" />
              <span>Discover</span>
            </Link>
            <Link
              to="/create"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-full font-semibold text-2xl hover:bg-white/20 hover:border-purple-500 hover:shadow-lg transition-all duration-300 flex items-center space-x-4"
              style={{ padding: '2rem 5rem' }}
            >
              <Zap className="h-7 w-7" />
              <span>Create</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
