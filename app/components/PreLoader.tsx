"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PreLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the loader after a short timeout (or after your models load)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center flex-col gap-6"
        >
          {/* A glowing ring or geometric shape mapping to the brand */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 1], opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            className="w-20 h-20 border-t-2 border-r-2 border-indigo-500 rounded-full animate-spin shadow-[0_0_30px_rgba(99,102,241,0.4)]"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white font-bold tracking-[0.3em] uppercase text-xs text-indigo-400"
          >
            Initializing<span className="animate-pulse">...</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
