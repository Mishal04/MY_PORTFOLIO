'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GlobalParticles() {
  const ref = useRef<THREE.Points>(null!);

  // Majestic Universe (1500 particles for high density)
  const particles = useMemo(() => {
    const temp = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
        temp[i * 3] = (Math.random() - 0.5) * 35;
        temp[i * 3 + 1] = (Math.random() - 0.5) * 35;
        temp[i * 3 + 2] = (Math.random() - 0.5) * 35;
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
        // More active, majestic motion
        ref.current.rotation.y += delta * 0.04;
        ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#c7d2fe"
        size={0.12}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-transparent">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 60 }} 
        gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            alpha: true
        }}
        dpr={1}
      >
        <GlobalParticles />
      </Canvas>
      {/* High-Impact Ambient Depth */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-5%] left-[-5%] w-[70rem] h-[70rem] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70rem] h-[70rem] bg-violet-600/10 rounded-full blur-[160px]" />
      </div>
    </div>
  );
}