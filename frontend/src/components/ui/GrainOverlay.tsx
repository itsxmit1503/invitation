"use client";

export default function GrainOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-25 select-none bg-grain"
      aria-hidden="true"
    />
  );
}
