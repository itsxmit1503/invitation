import React from "react";

interface DividerProps {
  className?: string;
  withEmblem?: boolean;
}

export default function GoldDivider({ className = "", withEmblem = true }: DividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 w-full py-3 ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#788B78]/25 to-[#4E7475]/50" />
      {withEmblem ? (
        <div className="flex items-center gap-1.5 text-[#788B78]">
          <span className="w-1 h-1 bg-[#788B78]/60 rounded-full" />
          <span className="w-1.5 h-1.5 bg-[#4E7475] rounded-[1px] shadow-[0_0_6px_rgba(78,116,117,0.5)]" />
          <span className="w-1 h-1 bg-[#788B78]/60 rounded-full" />
        </div>
      ) : (
        <span className="w-1 h-1 bg-[#4E7475]/70 rounded-full" />
      )}
      <div className="h-[1px] flex-1 bg-gradient-l from-transparent via-[#788B78]/25 to-[#4E7475]/50" />
    </div>
  );
}
