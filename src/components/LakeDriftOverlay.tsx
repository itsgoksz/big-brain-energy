import { motion } from 'framer-motion'
import { ArrowLeft, Play } from 'lucide-react'
import type { RouteType } from '../App'

interface LakeDriftOverlayProps {
  onNavigate: (route: RouteType) => void
}

export default function LakeDriftOverlay({ onNavigate }: LakeDriftOverlayProps) {
  return (
    <div className="w-full h-screen text-white font-sans overflow-y-auto selection:bg-[#00a8ff] selection:text-white pb-20 pointer-events-auto">
      <div className="max-w-5xl mx-auto px-8 pt-12">
        {/* Back Button */}
        <button 
          onClick={() => onNavigate('home')}
          className="inline-flex items-center text-white/50 hover:text-[#00a8ff] transition-colors mb-12 uppercase tracking-widest text-sm"
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
          <div className="text-[#00a8ff] font-bold tracking-widest uppercase mb-4 opacity-80">
            Multiplayer Boat Combat
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-black tracking-tighter mb-6" style={{ textShadow: '0 0 40px rgba(0, 168, 255, 0.4)' }}>
            LAKE DRIFT
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed mb-12">
            A fast-paced multiplayer boat brawler where every drift, dodge, and perfectly timed cannon shot can turn the tide of battle. Master momentum, outmaneuver your rivals, and dominate the lake.
          </p>

          <a 
            href="https://lakedrift.bigbrainenergy.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-5 bg-[#00a8ff] text-black font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 rounded-full"
            style={{ boxShadow: '0 0 20px rgba(0, 168, 255, 0.4)' }}
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
            className="p-8 rounded-xl border border-[#00a8ff]/30 bg-black/40 backdrop-blur-md"
          >
            <h3 className="text-xl font-heading font-bold mb-4 text-[#00a8ff]">Drift to Victory</h3>
            <p className="text-white/60 leading-relaxed">
              Use realistic boat momentum to slide through tight turns, weave around islands, and outplay opponents. Every movement feels rewarding, making skillful drifting the key to survival.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-xl border border-[#0078ff]/30 bg-black/40 backdrop-blur-md"
          >
            <h3 className="text-xl font-heading font-bold mb-4 text-[#0078ff]">Cannon Combat</h3>
            <p className="text-white/60 leading-relaxed">
              Choose your moment, line up the perfect shot, and unleash powerful cannon fire. Outsmart your enemies with precise aim, clever positioning, and split-second reactions.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 rounded-xl border border-[#00ffa8]/30 bg-black/40 backdrop-blur-md"
          >
            <h3 className="text-xl font-heading font-bold mb-4 text-[#00ffa8]">Every Match is Different</h3>
            <p className="text-white/60 leading-relaxed">
              Dynamic arenas, obstacles, and unpredictable player battles ensure no two matches ever feel the same. Whether you're chasing, escaping, or pulling off an impossible comeback, the lake is always alive.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
