'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef   = useRef<number | null>(null);

  useEffect(() => {
    if (lenisRef.current) return;

    // Respect prefers-reduced-motion — disable smooth scroll entirely
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1.1,
        touchMultiplier: 1,
      } as ConstructorParameters<typeof Lenis>[0]);

      lenisRef.current = lenis;

      function raf(time: number) {
        lenisRef.current?.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }
      rafRef.current = requestAnimationFrame(raf);
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href?.startsWith('#')) return;

      e.preventDefault();

      if (href === '#') {
        lenisRef.current ? lenisRef.current.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const element = document.querySelector(href) as HTMLElement | null;
      if (element) {
        lenisRef.current ? lenisRef.current.scrollTo(element) : element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.documentElement.addEventListener('click', handleAnchorClick);

    return () => {
      document.documentElement.removeEventListener('click', handleAnchorClick);
      // Cancel animation frame before destroying to prevent memory leak
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
