import { motion } from 'framer-motion'
import { ArrowLeft, Play } from 'lucide-react'
import type { RouteType } from '../App'

interface LakeDriftOverlayProps {
  onNavigate: (route: RouteType) => void
}

export default function LakeDriftOverlay({ onNavigate }: LakeDriftOverlayProps) {
  return (
    <div className="w-full h-screen text-white font-mono overflow-y-auto selection:bg-white selection:text-black pb-20 pointer-events-auto relative bg-black">
      {/* Premium Tactical Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        {/* Architectural Grid */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}
        />
        {/* Deep Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)]" />
        {/* Subtle Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
      </div>

      <div className="max-w-5xl mx-auto px-8 pt-12 relative z-10">
        {/* Back Button */}
        <button 
          onClick={() => onNavigate('home')}
          className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12 uppercase tracking-widest text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hub
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-white/50 tracking-widest uppercase mb-4 text-sm">
            multiplayer boat combat
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-[0.2em] mb-6 text-white uppercase">
            LAKE DRIFT
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed mb-12 lowercase">
            A fast-paced multiplayer boat brawler where every drift, dodge, and perfectly timed cannon shot can turn the tide of battle. Master momentum, outmaneuver your rivals, and dominate the lake.
          </p>

          <a 
            href="https://lakedrift.bigbrainenergy.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-5 bg-transparent border border-white/30 text-white tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 rounded-none"
          >
            <Play className="w-5 h-5 mr-3 fill-current" />
            Play Now
          </a>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-none border border-white/20 bg-black/80"
          >
            <h3 className="text-lg tracking-widest uppercase mb-4 text-white">Drift to Victory</h3>
            <p className="text-white/50 leading-relaxed text-sm lowercase">
              Use realistic boat momentum to slide through tight turns, weave around islands, and outplay opponents. Every movement feels rewarding, making skillful drifting the key to survival.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-none border border-white/20 bg-black/80"
          >
            <h3 className="text-lg tracking-widest uppercase mb-4 text-white">Cannon Combat</h3>
            <p className="text-white/50 leading-relaxed text-sm lowercase">
              Choose your moment, line up the perfect shot, and unleash powerful cannon fire. Outsmart your enemies with precise aim, clever positioning, and split-second reactions.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 rounded-none border border-white/20 bg-black/80"
          >
            <h3 className="text-lg tracking-widest uppercase mb-4 text-white">Every Match is Different</h3>
            <p className="text-white/50 leading-relaxed text-sm lowercase">
              Dynamic arenas, obstacles, and unpredictable player battles ensure no two matches ever feel the same. Whether you're chasing, escaping, or pulling off an impossible comeback, the lake is always alive.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
