import React from "react";

interface DividerProps {
  className?: string;
  withEmblem?: boolean;
}

export default function GoldDivider({ className = "", withEmblem = true }: DividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 w-full py-3 ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#A7B0AE]/20 to-[#607D8B]/40" />
      {withEmblem ? (
        <div className="flex items-center gap-1.5 text-[#A7B0AE]">
          <span className="w-1 h-1 bg-[#A7B0AE]/50 rounded-full" />
          <span className="w-1.5 h-1.5 bg-[#607D8B] rounded-[1px]" />
          <span className="w-1 h-1 bg-[#A7B0AE]/50 rounded-full" />
        </div>
      ) : (
        <span className="w-1 h-1 bg-[#607D8B]/70 rounded-full" />
      )}
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#A7B0AE]/20 to-[#607D8B]/40" />
    </div>
  );
}
