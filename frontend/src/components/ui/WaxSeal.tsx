"use client";

import { motion } from "framer-motion";
import { Compass, ArrowRight } from "lucide-react";

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
        className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4E7475]"
        aria-label="Unseal invitation"
      >
        {/* Subtle teal atmospheric aura on hover */}
        <div className="absolute -inset-3 rounded-full bg-[#4E7475]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Tactile Embossed Academic Seal Body */}
        <div 
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full relative flex items-center justify-center transition-all duration-300 select-none"
          style={{
            background: "radial-gradient(circle at 35% 30%, #2A323A 0%, #1E2328 60%, #15181C 100%)",
            boxShadow: `
              inset 0 1px 2px rgba(255, 255, 255, 0.15),
              inset 0 -2px 4px rgba(0, 0, 0, 0.8),
              0 14px 28px -6px rgba(0, 0, 0, 0.8),
              0 0 0 1px rgba(78, 116, 117, 0.35)
            `,
          }}
        >
          {/* Fine concentric calibration ring */}
          <div className="absolute inset-1.5 rounded-full border border-dashed border-[#788B78]/30 pointer-events-none" />
          
          {/* Inner debossed core */}
          <div 
            className="w-[78%] h-[78%] rounded-full flex flex-col items-center justify-center text-center p-2 relative overflow-hidden"
            style={{
              background: "radial-gradient(circle at 40% 35%, #242A30 0%, #1A1F24 70%, #13161A 100%)",
              boxShadow: `
                inset 0 2px 4px rgba(0, 0, 0, 0.7),
                inset 0 -1px 2px rgba(255, 255, 255, 0.08),
                0 0 0 1px rgba(255, 255, 255, 0.06)
              `,
            }}
          >
            {/* Academic cipher markings */}
            <div className="flex flex-col items-center">
              <span className="text-[#788B78] font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase font-semibold">
                SEALED
              </span>
              <span className="text-[#F3F1EA] font-display text-xs sm:text-sm font-bold tracking-tight my-0.5 truncate max-w-[75px]">
                {label}
              </span>
              <span className="text-[#4E7475] font-mono text-[9px] font-semibold tracking-widest">
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
        className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#8A949E] flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#4E7475]" />
        <span>{subLabel}</span>
        <ArrowRight className="w-3 h-3 text-[#4E7475]" />
      </motion.p>
    </div>
  );
}
