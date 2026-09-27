import React from "react";

interface GoldDividerProps {
  className?: string;
  withEmblem?: boolean;
}

export default function GoldDivider({ className = "", withEmblem = true }: GoldDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 w-full py-3 ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-[#D4AF37]/60" />
      {withEmblem ? (
        <div className="flex items-center gap-1 text-[#D4AF37]/75">
          <span className="w-1 h-1 rotate-45 bg-[#D4AF37]/80 rounded-[0.5px]" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#E8C878] rounded-[0.5px] shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
          <span className="w-1 h-1 rotate-45 bg-[#D4AF37]/80 rounded-[0.5px]" />
        </div>
      ) : (
        <span className="w-1 h-1 rotate-45 bg-[#D4AF37]/70" />
      )}
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/35 to-[#D4AF37]/60" />
    </div>
  );
}
