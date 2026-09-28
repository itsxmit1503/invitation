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
  label = "VYBE'26",
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
        className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2042]"
        aria-label="Unseal invitation"
      >
        {/* Tactile Embossed Solid Navy Academic Seal Body */}
        <div 
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full relative flex items-center justify-center transition-all duration-300 select-none bg-[#0B2042] shadow-[0_10px_28px_-4px_rgba(11,32,66,0.35)]"
        >
          {/* Fine concentric dashed calibration ring */}
          <div className="absolute inset-1.5 rounded-full border border-dashed border-[#FFF2EF]/30 pointer-events-none" />
          
          {/* Inner solid deep blue core */}
          <div 
            className="w-[78%] h-[78%] rounded-full flex flex-col items-center justify-center text-center p-2 relative overflow-hidden bg-[#1E4E8B] shadow-[inset_0_2px_4px_rgba(7,21,43,0.5)] border border-[#FFF2EF]/20"
          >
            {/* Academic cipher markings */}
            <div className="flex flex-col items-center">
              <span className="text-[#FFF2EF]/80 font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase font-semibold">
                SEALED
              </span>
              <span className="text-[#FFF2EF] font-display text-xs sm:text-sm font-bold tracking-tight my-0.5 truncate max-w-[75px]">
                {label}
              </span>
              <span className="text-[#FF6F61] font-mono text-[9px] font-bold tracking-widest">
                2026
              </span>
            </div>
          </div>
        </div>
      </motion.button>

      {/* Modern subtext indicator */}
      <motion.p 
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#1E4E8B] font-semibold flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F61]" />
        <span>{subLabel}</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#0B2042]" />
      </motion.p>
    </div>
  );
}
