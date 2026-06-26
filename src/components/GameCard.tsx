import { motion } from 'framer-motion'
import type { RouteType } from '../App'

interface GameCardProps {
  title: string
  status: string
  color: string
  link?: RouteType
  onNavigate?: (route: RouteType) => void
}

export default function GameCard({ title, status, color, link, onNavigate }: GameCardProps) {
  const cardContent = (
    <motion.div 
      onClick={() => link && onNavigate && onNavigate(link)}
      whileHover={{ y: -10 }}
      className="w-72 h-96 rounded-xl border border-white/10 flex flex-col justify-end p-6 relative overflow-hidden group cursor-pointer"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Glitch/Glow Overlay on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ 
          background: `radial-gradient(circle at center, ${color} 0%, transparent 80%)`,
          mixBlendMode: 'screen'
        }}
      />
      
      <div className="relative z-10">
        <div className="text-xs tracking-widest uppercase mb-2 opacity-60" style={{ color }}>
          {status}
        </div>
        <h4 className="text-2xl font-heading font-bold tracking-wider">
          {title}
        </h4>
      </div>
    </motion.div>
  )

  return cardContent
}
