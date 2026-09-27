"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, ChevronDown, Check } from "lucide-react";
import { FACULTY_RECIPIENTS, SLUG_ALIASES } from "@/data/mockInvitations";

interface FacultyPreviewSwitcherProps {
  currentSlug?: string;
}

export default function FacultyPreviewSwitcher({ currentSlug }: FacultyPreviewSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Resolve matching faculty object including aliases
  const resolvedSlug = SLUG_ALIASES[currentSlug || ""] || currentSlug;
  const currentFaculty =
    FACULTY_RECIPIENTS.find((f) => f.slug === resolvedSlug) ||
    FACULTY_RECIPIENTS.find((f) => f.slug === currentSlug) ||
    FACULTY_RECIPIENTS[0];

  const selectedIndex = FACULTY_RECIPIENTS.findIndex((f) => f.slug === currentFaculty.slug);
  const [highlightedIndex, setHighlightedIndex] = useState(selectedIndex >= 0 ? selectedIndex : 0);

  // Synchronize highlighted index when selected faculty changes
  useEffect(() => {
    if (selectedIndex >= 0) {
      setHighlightedIndex(selectedIndex);
    }
  }, [selectedIndex]);

  // Scroll active item into view when navigating via keyboard
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const activeItem = listRef.current.children[highlightedIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = useCallback(
    (slug: string) => {
      setIsOpen(false);
      if (slug && slug !== currentSlug) {
        router.push(`/invite/${slug}`);
      }
    },
    [currentSlug, router]
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
        if (selectedIndex >= 0) {
          setHighlightedIndex(selectedIndex);
        }
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % FACULTY_RECIPIENTS.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + FACULTY_RECIPIENTS.length) % FACULTY_RECIPIENTS.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < FACULTY_RECIPIENTS.length) {
          handleSelect(FACULTY_RECIPIENTS[highlightedIndex].slug);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <aside aria-label="Faculty Recipient Switcher" className="fixed top-2.5 right-2.5 sm:top-3 sm:right-3 z-50">
      <div ref={containerRef} className="relative">
        {/* Custom Dropdown Trigger */}
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Select Faculty Recipient Preview"
          onClick={() => {
            setIsOpen((prev) => !prev);
            if (!isOpen && selectedIndex >= 0) {
              setHighlightedIndex(selectedIndex);
            }
          }}
          onKeyDown={handleKeyDown}
          className="relative flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-[#FFF2EF] border border-[#0B2042] shadow-[0_2px_8px_rgba(11,32,66,0.08)] text-[11px] sm:text-xs text-[#0B2042] transition-all hover:bg-white hover:border-[#1E4E8B] focus:outline-none focus:ring-2 focus:ring-[#0B2042]/20 cursor-pointer select-none max-w-[280px] sm:max-w-xs"
        >
          <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0B2042] shrink-0" />
          <span className="hidden sm:inline font-mono font-medium text-[#1E4E8B] text-[10px] sm:text-[11px] shrink-0">
            Recipient:
          </span>
          <span className="font-display font-bold text-[#0B2042] truncate leading-tight">
            {currentFaculty.recipientName}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#0B2042] shrink-0 ml-1 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Custom Floating Dropdown Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="listbox"
              aria-label="Faculty Recipients Directory"
              tabIndex={-1}
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-full mt-1.5 w-72 sm:w-80 max-w-[calc(100vw-20px)] bg-[#FFF2EF] border border-[#0B2042] shadow-[0_12px_32px_rgba(11,32,66,0.14)] rounded-xl sm:rounded-2xl overflow-hidden z-50 flex flex-col"
            >
              {/* Directory Header Strip */}
              <div className="px-3 py-2 border-b border-[#0B2042]/10 flex items-center justify-between bg-white/60 shrink-0">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#1E4E8B] font-bold">
                  [ FACULTY DIRECTORY ]
                </span>
                <span className="text-[9px] font-mono text-[#0B2042]/70 font-semibold">
                  {FACULTY_RECIPIENTS.length} Recipients
                </span>
              </div>

              {/* Scrollable Recipient List */}
              <div
                ref={listRef}
                className="max-h-[55vh] sm:max-h-[340px] overflow-y-auto p-1.5 space-y-1 overscroll-contain"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#0B2042 #FFF2EF" }}
              >
                {FACULTY_RECIPIENTS.map((faculty, index) => {
                  const isSelected = faculty.slug === currentFaculty.slug;
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <button
                      key={faculty.slug}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(faculty.slug)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`w-full min-h-[44px] px-3 py-2 rounded-lg text-left flex items-center justify-between gap-2.5 transition-colors duration-150 cursor-pointer select-none ${
                        isSelected
                          ? "bg-[#0B2042] text-[#FFF2EF] shadow-[0_2px_8px_rgba(11,32,66,0.15)]"
                          : isHighlighted
                          ? "bg-[#1E4E8B]/10 text-[#0B2042]"
                          : "text-[#0B2042] hover:bg-[#1E4E8B]/8"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-xs sm:text-[13px] truncate ${
                            isSelected ? "font-bold text-[#FFF2EF]" : "font-semibold text-[#0B2042]"
                          }`}
                        >
                          {faculty.recipientName}
                        </p>
                        <p
                          className={`text-[10px] font-mono tracking-wide truncate ${
                            isSelected ? "text-[#FFF2EF]/80" : "text-[#1E4E8B]"
                          }`}
                        >
                          Honored Faculty
                        </p>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-md bg-[#FFF2EF]/15 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-[#FFF2EF]" strokeWidth={2.5} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
