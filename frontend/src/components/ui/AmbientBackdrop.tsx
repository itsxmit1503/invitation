"use client";

import { motion } from "framer-motion";

export default function AmbientBackdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#18232B]">
      {/* Subtle academic grid */}
      <div className="absolute inset-0 academic-grid opacity-50" />

      {/* Top subtle dusty blue ambient light */}
      <motion.div 
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[720px] h-[500px] rounded-full blur-[140px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(96, 125, 139, 0.22) 0%, rgba(32, 44, 52, 0.15) 50%, transparent 75%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.22, 0.15],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom subtle dusty navy glow */}
      <div 
        className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[650px] h-[400px] rounded-full blur-[130px] opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(96, 125, 139, 0.14) 0%, transparent 70%)",
        }}
      />

      {/* Subtle vignette around edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(24, 35, 43, 0.85) 100%)",
        }}
      />
    </div>
  );
}
