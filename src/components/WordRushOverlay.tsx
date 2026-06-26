import { motion } from 'framer-motion'
import { ArrowLeft, Play } from 'lucide-react'
import type { RouteType } from '../App'

interface WordRushOverlayProps {
  onNavigate: (route: RouteType) => void
}

export default function WordRushOverlay({ onNavigate }: WordRushOverlayProps) {
  return (
    <div className="w-full h-screen text-white font-sans overflow-y-auto selection:bg-[#00f0ff] selection:text-white pb-20 pointer-events-auto">
      <div className="max-w-5xl mx-auto px-8 pt-12">
        {/* Back Button */}
        <button 
          onClick={() => onNavigate('home')}
          className="inline-flex items-center text-white/50 hover:text-[#00f0ff] transition-colors mb-12 uppercase tracking-widest text-sm"
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
          <div className="text-[#00f0ff] font-bold tracking-widest uppercase mb-4 opacity-80">
            Multiplayer Word Game
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-black tracking-tighter mb-6" style={{ textShadow: '0 0 40px rgba(0, 240, 255, 0.4)' }}>
            WORD RUSH
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed mb-12">
            A fast-paced, real-time multiplayer word game that blends strategic thinking, expansive vocabulary, and lightning-fast reflexes.
          </p>

          <a 
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-5 bg-[#00f0ff] text-black font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 rounded-full"
            style={{ boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)' }}
          >
            <Play className="w-5 h-5 mr-3 fill-current" />
            Try Now
          </a>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-xl border border-[#00f0ff]/30 bg-black/40 backdrop-blur-md"
          >
            <h3 className="text-xl font-heading font-bold mb-4 text-[#00f0ff]">Strategic Letter Selection</h3>
            <p className="text-white/60 leading-relaxed">
              Pick common vowels for an easier round, or obscure consonants to trap your opponent. The start and end letters swap each round to keep you on your toes.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-xl border border-[#9d00ff]/30 bg-black/40 backdrop-blur-md"
          >
            <h3 className="text-xl font-heading font-bold mb-4 text-[#9d00ff]">The 60-Second Dash</h3>
            <p className="text-white/60 leading-relaxed">
              You have just 60 seconds to construct and type a valid English word matching the constraints. Think fast or lose your streak.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 rounded-xl border border-[#39ff14]/30 bg-black/40 backdrop-blur-md"
          >
            <h3 className="text-xl font-heading font-bold mb-4 text-[#39ff14]">Dynamic Scoring</h3>
            <p className="text-white/60 leading-relaxed">
              Earn massive multipliers for longer words and a +5 speed bonus for being the first to submit. Consistency is key to victory.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
