import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

// --- Shaders ---
const vertexShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  
  attribute float aSize;
  attribute vec3 aRandomness;
  
  varying vec3 vColor;
  
  void main() {
    vec3 pos = position;
    
    // 1. Organic Breathing & Floating
    // The neurons constantly drift and pulse like living tissue
    pos.x += sin(uTime * 1.5 + pos.y * 2.0) * aRandomness.x * 0.08;
    pos.y += cos(uTime * 1.2 + pos.z * 2.0) * aRandomness.y * 0.08;
    pos.z += sin(uTime * 1.8 + pos.x * 2.0) * aRandomness.z * 0.08;
    
    // 2. Interactive Mouse Gravity
    vec2 mouseWorld = uMouse * 15.0; 
    vec2 dirToMouse = mouseWorld - pos.xy;
    float distToMouse = length(dirToMouse);
    float pullFactor = smoothstep(10.0, 0.0, distToMouse);
    pos.xy += dirToMouse * pullFactor * 0.15; // Gentle biological pull
    
    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    
    // Point size scales with distance so it feels immersive when we fly through
    gl_PointSize = aSize * (1.0 / -viewPosition.z);
    
    // 3. Cinematic Biological Coloring
    vec3 coreColor = vec3(1.0, 0.1, 0.8); // Hot Magenta/Pink (Big Brain Energy Core)
    vec3 synapseColor = vec3(0.0, 0.9, 1.0); // Electric Cyan
    
    // Distance from the core (0,0,0) determines the base color
    float distFromCore = length(position);
    float coreGlow = smoothstep(1.5, 0.0, distFromCore);
    vec3 baseColor = mix(synapseColor, coreColor, coreGlow);
    
    // 4. Electrical Pulses (Action Potentials)
    // Create traveling waves of light moving through the neural network
    float pulse = sin(distFromCore * 8.0 - uTime * 4.0 + aRandomness.x * 3.0) * 0.5 + 0.5;
    float intensePulse = pow(pulse, 4.0); // Make it sharp like an electrical spark
    
    vColor = baseColor + (vec3(0.8, 0.9, 1.0) * intensePulse * 0.6); // Flash white/cyan
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float alpha = 0.05 / distanceToCenter - 0.1;
    if (alpha < 0.0) discard;
    gl_FragColor = vec4(vColor, alpha * 2.5);
  }
`;

const lineFragmentShader = `
  varying vec3 vColor;
  void main() {
    // The dendrites/synapses are softer than the nodes
    gl_FragColor = vec4(vColor, 0.25);
  }
`;

export default function NeuralCore() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const lineMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const scroll = useScroll();
  
  const particleCount = 6000;
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) }
  }), []);

  const mousePos = useMemo(() => new THREE.Vector2(), []);
  const targetRotation = useMemo(() => new THREE.Vector2(), []);

  const geometry = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const rnd = new Float32Array(particleCount * 3);
    const siz = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      let x, y, z;
      
      // Determine biological layer: Core, White Matter (Volume), or Cortex (Shell)
      let rMultiplier;
      const layer = Math.random();
      if (layer < 0.15) {
         rMultiplier = Math.pow(Math.random(), 0.33) * 0.3; // The Dense Core
      } else if (layer < 0.70) {
         rMultiplier = Math.pow(Math.random(), 0.33); // The Volumetric Neural Pathways
      } else {
         rMultiplier = 1.0 + Math.random() * 0.05; // The Outer Cortex Shell
      }

      const region = Math.random();
      if (region < 0.75) {
        // Cerebrum (Main upper brain)
        const u = Math.random() * Math.PI * 2;
        const v = Math.acos(Math.random() * 2 - 1);
        const r = rMultiplier;
        x = r * 2.2 * Math.sin(v) * Math.cos(u);
        y = r * 1.6 * Math.cos(v) + 0.4;
        z = r * 1.5 * Math.sin(v) * Math.sin(u);
      } else if (region < 0.90) {
        // Cerebellum (Lower back brain)
        const u = Math.random() * Math.PI * 2;
        const v = Math.acos(Math.random() * 2 - 1);
        const r = rMultiplier;
        x = r * 0.8 * Math.sin(v) * Math.cos(u) + 1.2;
        y = r * 0.7 * Math.cos(v) - 0.8;
        z = r * 0.8 * Math.sin(v) * Math.sin(u);
      } else {
        // Brain Stem
        x = (Math.random() - 0.5) * 0.5 * rMultiplier + 0.2;
        y = (Math.random() - 0.5) * 1.5 - 1.2;
        z = (Math.random() - 0.5) * 0.5 * rMultiplier;
      }
      
      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
      
      rnd[i3] = Math.random();
      rnd[i3 + 1] = Math.random();
      rnd[i3 + 2] = Math.random();
      
      siz[i] = Math.random() * 35 + 10;
    }
    
    // Generate Biological Plexus Network (Dendrites connecting synapses)
    const indices = [];
    for (let i = 0; i < particleCount; i++) {
      let connections = 0;
      const ix = pos[i*3];
      const iy = pos[i*3+1];
      const iz = pos[i*3+2];
      
      for (let j = i + 1; j < particleCount; j++) {
        const jx = pos[j*3];
        const jy = pos[j*3+1];
        const jz = pos[j*3+2];
        
        const distSq = (ix-jx)**2 + (iy-jy)**2 + (iz-jz)**2;
        // Connect nearby neurons to form the network
        if (distSq < 0.08) {
          indices.push(i, j);
          connections++;
          if (connections >= 4) break; // Max 4 dendrites per neuron
        }
      }
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aRandomness', new THREE.BufferAttribute(rnd, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(siz, 1));
    geo.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));
    
    return geo;
  }, [particleCount]);
  
  useEffect(() => {
    return () => {
      geometry.dispose();
      materialRef.current?.dispose();
      lineMaterialRef.current?.dispose();
    };
  }, [geometry]);

  useFrame((state, delta) => {
    if (materialRef.current && lineMaterialRef.current) {
      const time = materialRef.current.uniforms.uTime.value + delta;
      const shaderScroll = scroll.pages === 1 ? 0 : scroll.offset;
      
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uScrollProgress.value = shaderScroll;
      materialRef.current.uniforms.uMouse.value.lerp(
        mousePos.set(state.pointer.x, state.pointer.y),
        0.1
      );
      
      lineMaterialRef.current.uniforms.uTime.value = time;
      lineMaterialRef.current.uniforms.uScrollProgress.value = shaderScroll;
      lineMaterialRef.current.uniforms.uMouse.value.copy(materialRef.current.uniforms.uMouse.value);
    }
    
    if (pointsRef.current && linesRef.current) {
      // If pages === 1 (like on the Word Rush page), disable scrolling so overscroll bounce doesn't move the brain.
      const scrollOffset = scroll.pages === 1 ? 0 : Math.max(0, scroll.offset); 
      
      // CHRISTOPHER NOLAN CINEMATIC JOURNEY
      // 1. MACRO TO MICRO ZOOM
      // Starts at a base scale of 1.5 (viewing the Cosmic Brain).
      // Exponentially zooms in up to 35x scale, making the neurons massively huge and spreading them out.
      // This creates the feeling of flying into a microscopic world.
      const targetScale = 1.5 + Math.pow(scrollOffset, 2.5) * 35.0;
      
      // 2. FORWARD FLY-THROUGH
      // As we scale up, the front of the brain comes towards us.
      // We push the entire brain forward so the camera physically passes through the cortex,
      // traverses the white matter, and arrives at the dense Core.
      const targetZ = Math.pow(scrollOffset, 1.8) * 12.0; 
      
      pointsRef.current.scale.set(targetScale, targetScale, targetScale);
      pointsRef.current.position.z = targetZ;
      linesRef.current.scale.set(targetScale, targetScale, targetScale);
      linesRef.current.position.z = targetZ;

      // 3. CINEMATIC CAMERA PAN & ROTATION
      // Subtle parallax based on mouse
      mousePos.set(
        (state.pointer.x * Math.PI) / 10,
        (state.pointer.y * Math.PI) / 10
      );
      targetRotation.lerp(mousePos, 0.05);
      
      const rotY = targetRotation.x;
      const rotX = -targetRotation.y;
      
      // Slow, majestic spin as we fly into the brain
      const rotZ = scrollOffset * Math.PI * 0.3;
      
      pointsRef.current.rotation.set(rotX, rotY, rotZ);
      linesRef.current.rotation.set(rotX, rotY, rotZ);
    }
  });

  return (
    <group>
      <points ref={pointsRef} geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      <lineSegments ref={linesRef} geometry={geometry}>
        <shaderMaterial
          ref={lineMaterialRef}
          vertexShader={vertexShader}
          fragmentShader={lineFragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
