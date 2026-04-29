'use client';

import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense, useState, useMemo } from 'react';
import { Float, Sphere, RoundedBox, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GirlyCartoonCharacter = () => {
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  // Smooth cursor tracking logic
  useFrame((state) => {
    const { x, y } = state.pointer;
    
    // Head tilt and look
    if (headRef.current) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, x * 0.4, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -y * 0.2, 0.1);
    }

    // Interactive Digital Eyes (Inner dots follow cursor)
    if (leftEyeRef.current && rightEyeRef.current) {
        leftEyeRef.current.position.x = 0.5 + x * 0.15;
        leftEyeRef.current.position.y = 0.5 + y * 0.15;
        rightEyeRef.current.position.x = -0.5 + x * 0.15;
        rightEyeRef.current.position.y = 0.5 + y * 0.15;
    }

    // Body soft reaction (making it slightly shorter/bouncier)
    if (bodyRef.current) {
        bodyRef.current.rotation.z = x * 0.05;
        bodyRef.current.position.y = -1.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group position={[0, 0.4, 0]} scale={0.95}>
      {/* 1. SOFT BODY (Cute Pinkish-White Suit) */}
      <mesh ref={bodyRef} position={[0, -1.4, 0]}>
         <sphereGeometry args={[1.4, 64, 64]} />
         <meshStandardMaterial color="#fff1f2" roughness={0.05} metalness={0.1} />
      </mesh>

      {/* 2. HEAD (Girly Accessory / Ears Style) */}
      <group ref={headRef} position={[0, 1.0, 0]}>
        {/* Head Shell */}
        <RoundedBox args={[2.0, 1.8, 1.6]} radius={0.5} smoothness={8}>
           <meshStandardMaterial color="#fff1f2" roughness={0.1} />
        </RoundedBox>

        {/* Cute "Cat-ear" / Antenna Detail */}
        <group position={[0, 1.0, 0]}>
           <mesh position={[0.7, 0, 0]} rotation={[0, 0, -0.3]}>
              <capsuleGeometry args={[0.2, 0.4, 4, 16]} />
              <meshStandardMaterial color="#fb7185" />
           </mesh>
           <mesh position={[-0.7, 0, 0]} rotation={[0, 0, 0.3]}>
              <capsuleGeometry args={[0.2, 0.4, 4, 16]} />
              <meshStandardMaterial color="#fb7185" />
           </mesh>
        </group>

        {/* Glossy Faceplate */}
        <RoundedBox args={[1.6, 1.2, 0.2]} radius={0.4} smoothness={8} position={[0, 0, 0.75]}>
           <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.1} />
        </RoundedBox>

        {/* EYES (Sparkly Pink/Blue) */}
        <mesh ref={leftEyeRef} position={[0.45, 0.35, 0.86]}>
           <circleGeometry args={[0.22, 32]} />
           <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={3} />
        </mesh>

        {/* RIGHT EYE */}
        <mesh ref={rightEyeRef} position={[-0.45, 0.35, 0.86]}>
           <circleGeometry args={[0.22, 32]} />
           <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={3} />
        </mesh>

        {/* Blushed Cheeks */}
        <mesh position={[0.7, -0.1, 0.86]}>
           <circleGeometry args={[0.12, 16]} />
           <meshStandardMaterial color="#fda4af" transparent opacity={0.4} />
        </mesh>
        <mesh position={[-0.7, -0.1, 0.86]}>
           <circleGeometry args={[0.12, 16]} />
           <meshStandardMaterial color="#fda4af" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* 3. FLOATING SYMBOLS (Cute Hearts / Orbs) */}
      <Float speed={4} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[2.2, 1.5, 0]}>
           <sphereGeometry args={[0.25, 32, 32]} />
           <meshStandardMaterial color="#fda4af" emissive="#fb7185" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-2.2, 0.2, 1]}>
           <sphereGeometry args={[0.15, 32, 32]} />
           <meshStandardMaterial color="#818cf8" />
        </mesh>
      </Float>
    </group>
  );
};

export default function HeroVisual() {
  return (
    <div className="w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[450px] relative pointer-events-none mb-0 flex-shrink-0">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }} 
        gl={{ 
            antialias: true, 
            powerPreference: "high-performance",
            alpha: true
        }} 
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} />
          <pointLight position={[-10, 5, 10]} color="#fb7185" intensity={1.2} />
          <GirlyCartoonCharacter />
        </Suspense>
      </Canvas>
    </div>
  );
}
