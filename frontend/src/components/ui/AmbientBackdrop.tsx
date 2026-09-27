"use client";

import { motion } from "framer-motion";

export default function AmbientBackdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#111315]">
      {/* Subtle academic grid */}
      <div className="absolute inset-0 academic-grid opacity-60" />

      {/* Top subtle dusty teal ambient light */}
      <motion.div 
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[720px] h-[500px] rounded-full blur-[140px] opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(78, 116, 117, 0.4) 0%, rgba(120, 139, 120, 0.15) 50%, transparent 75%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.18, 0.26, 0.18],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom subtle muted sage glow */}
      <div 
        className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[650px] h-[400px] rounded-full blur-[130px] opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(120, 139, 120, 0.25) 0%, transparent 70%)",
        }}
      />

      {/* Subtle vignette around edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 45%, rgba(17, 19, 21, 0.9) 100%)",
        }}
      />
    </div>
  );
}
