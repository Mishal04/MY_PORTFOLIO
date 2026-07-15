'use client';

import { useEffect, useRef, useState } from 'react';
import { LazyMotion, domAnimation, m, useSpring, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

// Static — defined outside component to avoid re-creation on every render
const SPRING_OPTIONS = { damping: 25, stiffness: 400, mass: 0.5 };

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch]       = useState(false);
  const prefersReducedMotion        = useReducedMotion();

  const smoothX = useSpring(cursorX, SPRING_OPTIONS);
  const smoothY = useSpring(cursorY, SPRING_OPTIONS);

  useEffect(() => {
    // Hide cursor on touch devices — they have no pointer
    const onTouch = () => setIsTouch(true);
    window.addEventListener('touchstart', onTouch, { once: true, passive: true });

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest('a') ||
        target.closest('button') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON';
      setIsHovering(!!interactive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp   = () => setIsClicking(false);

    window.addEventListener('mousemove',  moveCursor,      { passive: true });
    window.addEventListener('mouseover',  handleHover,     { passive: true });
    window.addEventListener('mousedown',  handleMouseDown, { passive: true });
    window.addEventListener('mouseup',    handleMouseUp,   { passive: true });

    return () => {
      window.removeEventListener('touchstart',  onTouch);
      window.removeEventListener('mousemove',   moveCursor);
      window.removeEventListener('mouseover',   handleHover);
      window.removeEventListener('mousedown',   handleMouseDown);
      window.removeEventListener('mouseup',     handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // Don't render on touch devices or when reduced motion is preferred
  if (isTouch || prefersReducedMotion) return null;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        aria-hidden="true"
        style={{
          translateX: smoothX,
          translateY: smoothY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale:           isClicking ? 0.8 : isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0)',
        }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center border border-indigo-400/30"
      >
        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_5px_rgba(129,140,248,0.8)]" />
      </m.div>
    </LazyMotion>
  );
}
