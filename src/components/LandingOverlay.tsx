import { motion } from 'framer-motion'
import GameCard from './GameCard'
import type { RouteType } from '../App'

interface LandingOverlayProps {
  onNavigate: (route: RouteType) => void
}

export default function LandingOverlay({ onNavigate }: LandingOverlayProps) {
  return (
    <div className="w-full text-white font-sans pointer-events-none selection:bg-[#9d00ff] selection:text-white">
      {/* PAGE 1: Hero */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative">
        <div className="text-center z-10 pointer-events-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-8xl font-heading font-black tracking-tighter mb-8"
            style={{ textShadow: '0 0 40px rgba(0, 240, 255, 0.5)' }}
          >
            GAMES THAT <br /> REWIRE YOUR BRAIN.
          </motion.h1>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="px-10 py-5 bg-transparent border border-[#00f0ff] text-[#00f0ff] font-bold tracking-widest uppercase hover:bg-[#00f0ff] hover:text-black transition-all duration-300 rounded-full"
            style={{ boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)' }}
          >
            Play the Future
          </motion.button>
        </div>
      </section>

      {/* PAGE 2: Story 1 */}
      <section className="h-screen w-full flex items-center justify-center">
        <div className="max-w-4xl px-8 text-center pointer-events-auto">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-7xl font-heading font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#00f0ff] to-[#9d00ff]"
          >
            We don't just build games.
          </motion.h2>
        </div>
      </section>
      
      {/* PAGE 3: Story 2 */}
      <section className="h-screen w-full flex items-center justify-center">
        <div className="max-w-4xl px-8 text-center pointer-events-auto">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-7xl font-heading font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#9d00ff] to-[#39ff14]"
          >
            We engineer adrenaline.
          </motion.h2>
        </div>
      </section>

      {/* PAGE 4: Our Worlds */}
      <section className="h-screen w-full flex flex-col items-center justify-center pointer-events-auto">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-heading mb-12 tracking-[0.2em] uppercase opacity-80"
        >
          Our Worlds
        </motion.h3>
        <div className="flex gap-8 flex-wrap justify-center px-4">
          <GameCard title="WORD RUSH" status="Multiplayer Word Game" color="#00f0ff" link="word-rush" onNavigate={onNavigate} />
          <GameCard title="LAKE DRIFT" status="Dark Theme Boat Shooter" color="#39ff14" />
        </div>
      </section>

      {/* PAGE 5: Footer */}
      <section className="h-screen w-full flex flex-col items-center justify-end pb-12 pointer-events-auto">
        <div className="w-full max-w-5xl border-t border-white/10 pt-16 px-8 flex flex-col items-center gap-8 text-center bg-gradient-to-t from-black/50 to-transparent">
          
          {/* Main Brand */}
          <div className="font-heading text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#9d00ff]">
            BIG BRAIN ENERGY
          </div>

          {/* Links */}
          <div className="flex gap-6 md:gap-12 flex-wrap justify-center text-sm tracking-[0.15em] text-white/40">
            <a href="#" className="hover:text-[#00f0ff] transition-colors">TWITTER</a>
            <a href="#" className="hover:text-[#9d00ff] transition-colors">DISCORD</a>
            <a href="#" className="hover:text-[#39ff14] transition-colors">CAREERS</a>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('word-rush')}>WORD RUSH</span>
            <span className="hover:text-white transition-colors cursor-pointer">LAKE DRIFT</span>
          </div>

          {/* Divider */}
          <div className="w-16 h-[1px] bg-white/10 my-2" />

          {/* Tagline & Copyright (Namma Universe Inspiration) */}
          <div>
            <p className="font-sans text-sm font-light italic text-white/30 mb-3">
              Engineering adrenaline. Rewiring reality.
            </p>
            <p className="font-sans text-xs font-normal text-white/20 tracking-widest uppercase">
              © {new Date().getFullYear()} BIG BRAIN ENERGY. <span className="text-[#00f0ff]/50">A NAMMA UNIVERSE STUDIO.</span> ALL RIGHTS RESERVED.
            </p>
          </div>
          
        </div>
      </section>
    </div>
  )
}
