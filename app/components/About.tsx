'use client';

import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense, useMemo } from 'react';
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AbstractTechVisual = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Animated particle positions
  const particles = useMemo(() => {
    const tempPositions = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
        tempPositions[i * 3] = (Math.random() - 0.5) * 10;
        tempPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        tempPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return tempPositions;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
        coreRef.current.rotation.y = t * 0.4;
        coreRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    }
    if (shellRef.current) {
        shellRef.current.rotation.y = -t * 0.2;
        shellRef.current.rotation.x = Math.cos(t * 0.3) * 0.1;
    }
    if (pointsRef.current) {
        pointsRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group scale={1}>
      {/* 1. DISTORTED TECH CORE */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 2. OUTER DATA SHELL (HEXAGONAL/WIRE) */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[2.5, 2]} />
        <meshStandardMaterial 
            color="#4f46e5" 
            wireframe 
            transparent 
            opacity={0.15} 
            emissive="#6366f1"
            emissiveIntensity={0.5}
        />
      </mesh>

      {/* 3. GLOWING PARTICLES (Data cloud) */}
      <Points ref={pointsRef} positions={particles}>
          <PointMaterial
            transparent
            color="#818cf8"
            size={0.05}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
      </Points>

      {/* 4. CODE-INSPIRED RINGS */}
      <Float speed={5} rotationIntensity={2} floatIntensity={1}>
          <mesh rotation={[Math.PI / 2, 0.4, 0]}>
              <torusGeometry args={[3.2, 0.01, 16, 100]} />
              <meshStandardMaterial color="#6366f1" transparent opacity={0.3} />
          </mesh>
      </Float>
    </group>
  );
};

const About = () => {
  return (
    <section id="about" className="min-h-[80vh] md:min-h-[75vh] py-16 flex items-center justify-center relative overflow-hidden bg-transparent">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center gap-4 sm:gap-6 md:gap-12 lg:gap-16">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-2 sm:mb-4">
              Expertise
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-8 leading-[1.1] tracking-tight z-20 relative">
              I code with passion <br className="hidden lg:block" />
              <span className="text-indigo-400 drop-shadow-md">& deliver excellence.</span>
            </h3>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed mb-6 sm:mb-10 max-w-2xl mx-auto lg:mx-0 font-light">
              I am Mishal, a full-stack web developer. I build responsive, scalable, and modern web applications that combine clean design with efficient backend functionality.
            </p>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-4 sm:pt-8 border-t border-white/5 uppercase tracking-[0.1em] text-[10px] md:text-xs text-gray-400 font-bold">
              <div className="flex flex-col">
                <span className="text-indigo-400 mb-2">My Approach</span>
                <span>User-Centric Design</span>
              </div>
              <div className="flex flex-col">
                <span className="text-indigo-400 mb-2">Philosophy</span>
                <span>Clean & Efficient Code</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Eye-catching Visual Content */}
        <div className="w-full lg:w-1/2 flex justify-center items-center relative h-[250px] sm:h-[300px] md:h-[450px] lg:h-[600px]">
          <div className="w-full h-full absolute inset-0 cursor-crosshair lg:translate-x-8">
            <Canvas 
               camera={{ position: [0, 0, 10], fov: 45 }} 
               gl={{ antialias: true, powerPreference: "high-performance" }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
                <AbstractTechVisual />
              </Suspense>
            </Canvas>
          </div>
          
          {/* Subtle atmosphere behind canvas */}
          <div className="absolute -z-10 w-full h-full bg-indigo-600/5 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </section>
  );
};

export default About;
