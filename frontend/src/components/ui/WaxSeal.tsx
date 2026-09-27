"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface WaxSealProps {
  onClick?: () => void;
  isBreaking?: boolean;
  label?: string;
  subLabel?: string;
}

export default function WaxSeal({
  onClick,
  isBreaking = false,
  label = "AARAMBH '26",
  subLabel = "Tap to Unseal",
}: WaxSealProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.button
        type="button"
        onClick={onClick}
        disabled={isBreaking}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        aria-label="Break wax seal and open invitation"
      >
        {/* Outer ambient glow on hover */}
        <div className="absolute -inset-3 rounded-full bg-[#D4AF37]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Tactile Wax Body */}
        <div 
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full relative flex items-center justify-center transition-all duration-300 select-none"
          style={{
            background: "radial-gradient(circle at 35% 30%, #9E2432 0%, #7A1924 45%, #4A0E15 100%)",
            boxShadow: `
              inset 0 2px 4px rgba(255, 255, 255, 0.35),
              inset 0 -3px 6px rgba(0, 0, 0, 0.65),
              0 14px 28px -6px rgba(0, 0, 0, 0.8),
              0 0 0 2px rgba(133, 27, 39, 0.6),
              0 0 20px rgba(133, 27, 39, 0.35)
            `,
          }}
        >
          {/* Irregular wax edge ripples */}
          <div className="absolute inset-1 rounded-full border border-[#D4AF37]/25 opacity-70 pointer-events-none" />
          
          {/* Inner embossed rim */}
          <div 
            className="w-[82%] h-[82%] rounded-full flex flex-col items-center justify-center text-center p-2 relative overflow-hidden"
            style={{
              background: "radial-gradient(circle at 40% 35%, #841E2A 0%, #68141F 70%, #420A10 100%)",
              boxShadow: `
                inset 0 2px 3px rgba(0, 0, 0, 0.6),
                inset 0 -1px 2px rgba(255, 255, 255, 0.2),
                0 0 0 1px rgba(212, 175, 55, 0.3)
              `,
            }}
          >
            {/* Fine metallic monogram stamp */}
            <div className="flex flex-col items-center">
              <span className="text-[#E8C878] font-accent text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] truncate max-w-[70px]">
                {label}
              </span>
              <div className="w-8 h-[1px] bg-[#E8C878]/60 my-0.5" />
              <span className="text-[#FFF2D6] font-display text-xs sm:text-sm font-bold italic tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                2026
              </span>
            </div>

            {/* Subtle light sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"
            />
          </div>
        </div>
      </motion.button>

      {/* Subtitle prompt */}
      <motion.p 
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-medium text-[#C5BEB3] flex items-center gap-1.5"
      >
        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
        {subLabel}
        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
      </motion.p>
    </div>
  );
}
