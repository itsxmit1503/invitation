"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.button
        type="button"
        onClick={onClick}
        disabled={isBreaking}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#607D8B]"
        aria-label="Unseal invitation"
      >
        {/* Subtle dusty blue atmospheric aura on hover */}
        <div className="absolute -inset-3 rounded-full bg-[#607D8B]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Tactile Embossed Academic Seal Body */}
        <div 
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full relative flex items-center justify-center transition-all duration-300 select-none"
          style={{
            background: "radial-gradient(circle at 35% 30%, #2A3842 0%, #202C34 60%, #18232B 100%)",
            boxShadow: `
              inset 0 1px 2px rgba(244, 240, 230, 0.12),
              inset 0 -2px 4px rgba(0, 0, 0, 0.7),
              0 14px 28px -6px rgba(0, 0, 0, 0.65),
              0 0 0 1px rgba(96, 125, 139, 0.35)
            `,
          }}
        >
          {/* Fine concentric calibration ring */}
          <div className="absolute inset-1.5 rounded-full border border-dashed border-[#A7B0AE]/25 pointer-events-none" />
          
          {/* Inner debossed core */}
          <div 
            className="w-[78%] h-[78%] rounded-full flex flex-col items-center justify-center text-center p-2 relative overflow-hidden"
            style={{
              background: "radial-gradient(circle at 40% 35%, #26343C 0%, #1D2830 70%, #131B21 100%)",
              boxShadow: `
                inset 0 2px 4px rgba(0, 0, 0, 0.6),
                inset 0 -1px 2px rgba(244, 240, 230, 0.06),
                0 0 0 1px rgba(167, 176, 174, 0.1)
              `,
            }}
          >
            {/* Academic cipher markings */}
            <div className="flex flex-col items-center">
              <span className="text-[#A7B0AE] font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase font-semibold">
                SEALED
              </span>
              <span className="text-[#F4F0E6] font-display text-xs sm:text-sm font-bold tracking-tight my-0.5 truncate max-w-[75px]">
                {label}
              </span>
              <span className="text-[#607D8B] font-mono text-[9px] font-semibold tracking-widest">
                2026
              </span>
            </div>

            {/* Sweep highlight */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
            />
          </div>
        </div>
      </motion.button>

      {/* Modern subtext indicator */}
      <motion.p 
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#A7B0AE] flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#607D8B]" />
        <span>{subLabel}</span>
        <ArrowRight className="w-3 h-3 text-[#607D8B]" />
      </motion.p>
    </div>
  );
}
