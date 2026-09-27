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
      <div className="relative flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#202C34]/95 backdrop-blur-md border border-[#2E3D47] shadow-[0_4px_16px_rgba(0,0,0,0.5)] text-[10px] sm:text-[11px] text-[#A7B0AE] transition-all hover:border-[#607D8B]/50">
        <UserCheck className="w-3.5 h-3.5 text-[#607D8B] shrink-0" />
        <span className="hidden sm:inline font-mono font-medium text-[#A7B0AE]">Recipient:</span>
        <div className="relative flex items-center">
          <select
            aria-label="Select Faculty Recipient Preview"
            value={currentSlug || "ranjit-rajak"}
            onChange={handleChange}
            className="bg-transparent text-[#F4F0E6] font-medium text-[10px] sm:text-[11px] pr-4 outline-none cursor-pointer appearance-none tracking-wide"
          >
            {FACULTY_RECIPIENTS.map((faculty) => (
              <option
                key={faculty.slug}
                value={faculty.slug}
                className="bg-[#202C34] text-[#F4F0E6] py-1 text-xs"
              >
                {faculty.recipientName}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-[#A7B0AE] absolute right-0 pointer-events-none" />
        </div>
      </div>
    </aside>
  );
}
