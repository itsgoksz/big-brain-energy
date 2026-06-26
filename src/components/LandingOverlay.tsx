import { motion } from 'framer-motion'
import { useScroll } from '@react-three/drei'
import GameCard from './GameCard'
import type { RouteType } from '../App'

interface LandingOverlayProps {
  onNavigate: (route: RouteType) => void
}

export default function LandingOverlay({ onNavigate }: LandingOverlayProps) {
  const scroll = useScroll();

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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col items-center gap-4 mt-8"
          >
            <p className="text-[#b377ff] font-bold tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-[0_0_10px_rgba(179,119,255,0.5)]">
              Scroll to unlock your potential
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#b377ff] text-xl drop-shadow-[0_0_10px_rgba(179,119,255,0.5)]"
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PAGE 2: Story 1 */}
      <section className="h-screen w-full flex items-center justify-center">
        <div className="max-w-6xl px-8 text-center pointer-events-auto drop-shadow-[0_0_30px_rgba(0,0,0,1)]">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-[8rem] leading-none font-heading font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#50d7ff] to-[#b377ff] pb-4"
          >
            We don't just build games.
          </motion.h2>
        </div>
      </section>
      
      {/* PAGE 3: Story 2 */}
      <section className="h-screen w-full flex items-center justify-center">
        <div className="max-w-6xl px-8 text-center pointer-events-auto drop-shadow-[0_0_30px_rgba(0,0,0,1)]">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-[8rem] leading-none font-heading font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#b377ff] to-[#50ff77] pb-4"
          >
            We engineer adrenaline.
          </motion.h2>
        </div>
      </section>

      {/* PAGE 4: Our Worlds */}
      <section id="our-worlds" className="h-screen w-full flex flex-col items-center justify-center pointer-events-auto">
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
      <section className="min-h-screen w-full flex flex-col items-center justify-end pointer-events-auto">
        <div className="w-full pt-20 pb-12 px-8 flex flex-col items-center gap-8 text-center bg-black/60 backdrop-blur-lg border-t border-white/20" style={{ boxShadow: '0 -20px 40px rgba(0,0,0,0.5)' }}>
          
          {/* Main Brand */}
          <div className="font-heading text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#9d00ff] drop-shadow-lg">
            BIG BRAIN ENERGY
          </div>

          {/* Links */}
          <div className="flex gap-6 md:gap-12 flex-wrap justify-center text-sm md:text-base font-bold tracking-[0.15em] text-white/80">
            <a href="#" className="hover:text-[#00f0ff] transition-colors">TWITTER</a>
            <a href="#" className="hover:text-[#9d00ff] transition-colors">DISCORD</a>
            <a href="#" className="hover:text-[#39ff14] transition-colors">CAREERS</a>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('word-rush')}>WORD RUSH</span>
            <span className="hover:text-white transition-colors cursor-pointer">LAKE DRIFT</span>
          </div>

          {/* Divider */}
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent my-4" />

          {/* Tagline & Copyright (Namma Universe Inspiration) */}
          <div>
            <p className="font-sans text-base font-medium italic text-white/70 mb-4 drop-shadow-md">
              Engineering adrenaline. Rewiring reality.
            </p>
            <p className="font-sans text-xs md:text-sm font-semibold text-white/50 tracking-widest uppercase">
              © {new Date().getFullYear()} BIG BRAIN ENERGY. <a href="https://nammauniverse.in" target="_blank" rel="noopener noreferrer" className="text-[#00f0ff]/80 hover:text-white transition-colors cursor-pointer">A NAMMA UNIVERSE STUDIO.</a> ALL RIGHTS RESERVED.
            </p>
          </div>
          
        </div>
      </section>
    </div>
  )
}
