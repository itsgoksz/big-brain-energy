import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

// --- Shaders ---
const vertexShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  
  attribute float aSize;
  attribute vec3 aRandomness;
  
  varying vec3 vColor;
  
  void main() {
    // Basic spherical position
    vec3 pos = position;
    
    // As uScrollProgress increases, we warp the sphere into a tunnel.
    // Progress goes from 0 to 1 over 5 pages. We want the warp to happen mainly between scroll 0.05 and 0.2.
    float warpIntensity = smoothstep(0.05, 0.2, uScrollProgress);
    
    // Tunnel effect: stretch along Z, push outward along X and Y
    float zStretch = 100.0;
    float radiusExpansion = 15.0;
    
    vec3 targetPos = pos;
    // Push particles far back along Z to form a tunnel
    targetPos.z -= (1.0 - abs(pos.z/2.5)) * zStretch;
    
    // Normalize xy to push outward smoothly, forming the tunnel walls
    float xyLen = length(pos.xy);
    if (xyLen > 0.0) {
      targetPos.x += (pos.x / xyLen) * radiusExpansion;
      targetPos.y += (pos.y / xyLen) * radiusExpansion;
    }
    
    // Blend between sphere and tunnel based on scroll
    vec3 finalPos = mix(pos, targetPos, warpIntensity);
    
    // Add noise/movement
    finalPos.x += cos(uTime * aRandomness.x) * 0.1;
    finalPos.y += sin(uTime * aRandomness.y) * 0.1;
    finalPos.z += sin(uTime * aRandomness.z) * 0.1;
    
    vec4 modelPosition = modelMatrix * vec4(finalPos, 1.0);
    
    // Restore the visceral flying forward effect tied strictly to scroll
    float travelDistance = warpIntensity * (uScrollProgress * 300.0) + (uTime * 2.0);
    
    // Apply global wrapping so we never run out of particles.
    // Base geometry Z spans from ~2.5 to -zStretch. We wrap at +10 (behind camera).
    float range = zStretch + 10.0;
    modelPosition.z = mod(modelPosition.z + travelDistance + zStretch, range) - zStretch;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    
    // Point size depends on distance (perspective)
    gl_PointSize = aSize * (1.0 / -viewPosition.z);
    
    // Mix of neon blue, purple and green based on coordinates
    vec3 colorBlue = vec3(0.0, 0.94, 1.0); // #00f0ff
    vec3 colorPurple = vec3(0.62, 0.0, 1.0); // #9d00ff
    vec3 colorGreen = vec3(0.22, 1.0, 0.08); // #39ff14
    
    float mixFactor = sin(finalPos.x * 0.5 + uTime) * 0.5 + 0.5;
    vec3 mixedColor = mix(colorBlue, colorPurple, mixFactor);
    
    // Add occasional green highlights
    float greenFactor = step(0.95, sin(finalPos.y * 10.0 + uTime * 2.0));
    vColor = mix(mixedColor, colorGreen, greenFactor * 0.5);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
    // Create a circular particle with soft edges (glow)
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float alpha = 0.05 / distanceToCenter - 0.1;
    
    if (alpha < 0.0) discard;
    
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export default function NeuralCore() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const scroll = useScroll();
  
  const particleCount = 100000;
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 }
  }), []);

  // Strict WebGL Optimization: Pre-allocate variables for useFrame to prevent GC stutters
  const mousePos = useMemo(() => new THREE.Vector2(), []);
  const targetRotation = useMemo(() => new THREE.Vector2(), []);
  
  useEffect(() => {
    // Strict Cleanup: dispose WebGL resources
    return () => {
      geometryRef.current?.dispose();
      materialRef.current?.dispose();
    };
  }, []);

  // Generate particle attributes
  const [positions, randomness, sizes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const rnd = new Float32Array(particleCount * 3);
    const siz = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Spherical distribution
      const radius = 2 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
      
      rnd[i3] = Math.random();
      rnd[i3 + 1] = Math.random();
      rnd[i3 + 2] = Math.random();
      
      siz[i] = Math.random() * 30 + 10;
    }
    
    return [pos, rnd, siz];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uScrollProgress.value = scroll.offset;
    }
    
    if (pointsRef.current) {
      // Smoothly rotate the core based on mouse position (parallax)
      mousePos.set(
        (state.pointer.x * Math.PI) / 10,
        (state.pointer.y * Math.PI) / 10
      );
      
      targetRotation.lerp(mousePos, 0.05);
      pointsRef.current.rotation.y = targetRotation.x;
      pointsRef.current.rotation.x = -targetRotation.y;
      
      // Rotate the entire system slightly as the user scrolls
      pointsRef.current.rotation.z = scroll.offset * Math.PI;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          count={particleCount}
          args={[randomness, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={particleCount}
          args={[sizes, 1]}
        />
      </bufferGeometry>
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
  );
}
