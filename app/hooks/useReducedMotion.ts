"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Returns true when the user has requested reduced motion
 * (prefers-reduced-motion: reduce).
 * Falls back to Framer Motion's built-in hook which handles SSR safely.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
