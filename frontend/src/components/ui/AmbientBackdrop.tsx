"use client";

import { motion } from "framer-motion";

export default function AmbientBackdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#090807]">
      {/* Top subtle golden light leak */}
      <motion.div 
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[550px] rounded-full blur-[140px] opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.45) 0%, rgba(133, 27, 39, 0.15) 50%, transparent 75%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.28, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom subtle warm hearth glow */}
      <div 
        className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(223, 186, 115, 0.3) 0%, transparent 70%)",
        }}
      />

      {/* Subtle vignette around edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(7, 6, 5, 0.85) 100%)",
        }}
      />
    </div>
  );
}
