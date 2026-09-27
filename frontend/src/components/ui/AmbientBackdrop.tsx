"use client";

import React from "react";

export default function AmbientBackdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#FFF2EF]">
      {/* Subtle clean editorial grid for light background */}
      <div className="absolute inset-0 academic-grid opacity-40" />
    </div>
  );
}
