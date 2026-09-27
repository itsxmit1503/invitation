"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { UserCheck, ChevronDown } from "lucide-react";
import { FACULTY_RECIPIENTS } from "@/data/mockInvitations";

interface FacultyPreviewSwitcherProps {
  currentSlug?: string;
}

export default function FacultyPreviewSwitcher({ currentSlug }: FacultyPreviewSwitcherProps) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSlug = e.target.value;
    if (selectedSlug) {
      router.push(`/invite/${selectedSlug}`);
    }
  };

  return (
    <aside aria-label="Faculty Recipient Switcher" className="fixed top-2.5 right-2.5 sm:top-3 sm:right-3 z-50">
      <div className="relative flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#14171A]/95 backdrop-blur-md border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.6)] text-[10px] sm:text-[11px] text-[#8A949E] transition-all hover:border-[#4E7475]/50">
        <UserCheck className="w-3.5 h-3.5 text-[#4E7475] shrink-0" />
        <span className="hidden sm:inline font-mono font-medium text-[#788B78]">Recipient:</span>
        <div className="relative flex items-center">
          <select
            aria-label="Select Faculty Recipient Preview"
            value={currentSlug || "ranjit-rajak"}
            onChange={handleChange}
            className="bg-transparent text-[#F3F1EA] font-medium text-[10px] sm:text-[11px] pr-4 outline-none cursor-pointer appearance-none tracking-wide"
          >
            {FACULTY_RECIPIENTS.map((faculty) => (
              <option
                key={faculty.slug}
                value={faculty.slug}
                className="bg-[#171A1D] text-[#F3F1EA] py-1 text-xs"
              >
                {faculty.recipientName}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-[#8A949E] absolute right-0 pointer-events-none" />
        </div>
      </div>
    </aside>
  );
}
