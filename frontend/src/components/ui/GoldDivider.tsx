import React from "react";

interface DividerProps {
  className?: string;
  withEmblem?: boolean;
}

export default function GoldDivider({ className = "", withEmblem = true }: DividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 w-full py-3 ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 bg-[#0B2042]/20" />
      {withEmblem ? (
        <div className="flex items-center gap-1.5 text-[#1E4E8B]">
          <span className="w-1 h-1 bg-[#1E4E8B]/50 rounded-full" />
          <span className="w-1.5 h-1.5 bg-[#FF6F61] rounded-[1px]" />
          <span className="w-1 h-1 bg-[#1E4E8B]/50 rounded-full" />
        </div>
      ) : (
        <span className="w-1.5 h-1.5 bg-[#FF6F61] rounded-full" />
      )}
      <div className="h-[1px] flex-1 bg-[#0B2042]/20" />
    </div>
  );
}
