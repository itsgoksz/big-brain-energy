import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import NeuralCore from './components/NeuralCore'
import LandingOverlay from './components/LandingOverlay'
import WordRushOverlay from './components/WordRushOverlay'

export type RouteType = 'home' | 'word-rush'

function ScrollResetter({ route }: { route: string }) {
  const scroll = useScroll();
  useEffect(() => {
    if (scroll.el) {
      scroll.el.scrollTop = 0;
    }
  }, [route, scroll]);
  return null;
}

function App() {
  const [route, setRoute] = useState<RouteType>('home')

  // We keep pages={5} constant to prevent ScrollControls from crashing on dynamic page changes.
  // The overlays handle their own overflow and pointer events.
  return (
    <div className="w-full h-full bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]} // Support retina displays
      >
        <color attach="background" args={['#050505']} />
        <Suspense fallback={null}>
          <ScrollControls pages={route === 'home' ? 5 : 1} damping={0.1}>
            <ScrollResetter route={route} />
            
            {/* The 3D WebGL Scene */}
            <NeuralCore />

            {/* The DOM Overlay Layer */}
            <Scroll html style={{ width: '100%', height: '100%' }}>
              {route === 'home' ? (
                <LandingOverlay onNavigate={setRoute} />
              ) : (
                <WordRushOverlay onNavigate={setRoute} />
              )}
            </Scroll>

          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
