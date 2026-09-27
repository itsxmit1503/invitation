"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { InvitationData } from "@/types/invitation";
import { sound } from "@/lib/sound";
import { EASE_EXPO } from "@/lib/motion";
import GoldDivider from "@/components/ui/GoldDivider";
import { CheckCircle2, Calendar, MapPin, Clock } from "lucide-react";

interface AcceptCelebrationProps {
  invitation: InvitationData;
  onViewDetails?: () => void;
}

export default function AcceptCelebration({
  invitation,
  onViewDetails,
}: AcceptCelebrationProps) {
  useEffect(() => {
    // Play Indian celebration song
    sound.playIndianSong();

    // Modern academic palette confetti bursts (Teal, Sage, Coral, Off-White, Ink)
    const end = Date.now() + 2.5 * 1000;
    const colors = ["#4E7475", "#788B78", "#C77C67", "#F3F1EA", "#6A9B9C"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  // Google Calendar URL generator
  const createGoogleCalendarLink = () => {
    const title = encodeURIComponent(`${invitation.eventName} - Freshers' Welcome`);
    const details = encodeURIComponent(
      `Annual Freshers' Welcome Ceremony.\nGuest of Honor: ${invitation.recipientName}\nDepartment: ${invitation.department}`
    );
    const location = encodeURIComponent(`${invitation.venue}, ${invitation.hallName || ""}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE_EXPO }}
      className="w-full max-w-5xl h-full max-h-[96svh] flex flex-col justify-between academic-card editorial-frame rounded-2xl sm:rounded-3xl p-3 sm:p-5 lg:p-6 relative overflow-hidden z-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
    >
      {/* Subtle technical editorial corner markings */}
      <div className="absolute top-2.5 left-4 text-[9px] font-mono text-[#788B78]/40 select-none hidden sm:block">┌ FW-26</div>
      <div className="absolute top-2.5 right-4 text-[9px] font-mono text-[#788B78]/40 select-none hidden sm:block">CONFIRMED ┐</div>

      {/* Top Header Bar */}
      <header className="flex items-center justify-between border-b border-white/8 pb-2 sm:pb-2.5 shrink-0">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#171A1D] border border-[#4E7475] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(78,116,117,0.35)]">
            <CheckCircle2 className="w-4 h-4 text-[#4E7475]" />
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#788B78] font-semibold block leading-none">
              [ RSVP STATUS // GRACIOUSLY CONFIRMED ]
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#4E7475] font-mono tracking-wider uppercase block font-medium mt-0.5 leading-none">
              OFFICIAL GUEST PASS ACTIVE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-wider text-[#8A949E] uppercase hidden sm:inline">
            PASS ID: FW26-VIP
          </span>
          <span className="px-2.5 py-0.5 rounded-md academic-tag-teal text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase">
            VIP FACULTY ROW
          </span>
        </div>
      </header>

      {/* Main 2-Column Grid (Desktop) / Vertical Adaptive Stack (Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 flex-1 min-h-0 my-2 sm:my-2.5 items-stretch">
        {/* LEFT COLUMN: Salutation, Guest Pass Ticket & CTA Actions */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between min-h-0 text-left">
          {/* Sincere Gratitude Message */}
          <section className="flex-1 min-h-0 flex flex-col justify-center pr-0 md:pr-1">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#788B78] font-semibold block">
              [ INVITATION ACCEPTED ]
            </span>
            <h2 className="font-display text-lg sm:text-2xl lg:text-3xl text-[#F3F1EA] font-extrabold tracking-tight mt-0.5 leading-tight">
              Wonderful! We are genuinely honored, <br className="hidden sm:inline" />
              <span className="text-[#4E7475]">{invitation.recipientName}</span>.
            </h2>
            <p className="text-[11px] sm:text-xs text-[#D8D5CB] mt-1.5 leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
              Your esteemed presence as our cherished mentor will inspire the fresh batch as they begin their collegiate journey.
            </p>
          </section>

          {/* Confirmed Details Ticket Strip */}
          <section className="mt-2 rounded-xl academic-inset p-2.5 sm:p-3 border border-white/5 shrink-0">
            <div className="flex items-center justify-between border-b border-white/8 pb-2 mb-2">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#788B78] font-semibold">
                [ SPECIAL GUEST ENTRY PASS ]
              </span>
              <span className="text-[10px] sm:text-[11px] font-display font-bold text-[#F3F1EA] uppercase">
                {invitation.eventName}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-left">
              <div className="flex items-start gap-1.5 sm:gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#4E7475] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-[#788B78]">Date</p>
                  <p className="text-[11px] sm:text-xs text-[#F3F1EA] font-medium truncate">
                    {invitation.eventDate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-1.5 sm:gap-2">
                <Clock className="w-3.5 h-3.5 text-[#4E7475] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-[#788B78]">Reporting</p>
                  <p className="text-[11px] sm:text-xs text-[#F3F1EA] font-medium truncate">
                    {invitation.eventTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-1.5 sm:gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#4E7475] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-[#788B78]">Venue</p>
                  <p className="text-[11px] sm:text-xs text-[#F3F1EA] font-medium truncate">
                    {invitation.venue}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons Row */}
          <div className="mt-2 sm:mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
            <a
              href={createGoogleCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-academic-primary py-2.5 sm:py-3 px-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Add to Calendar</span>
            </a>

            {onViewDetails && (
              <button
                type="button"
                onClick={onViewDetails}
                className="btn-academic-secondary py-2.5 sm:py-3 px-4 rounded-xl font-display text-xs uppercase tracking-wider transition-all cursor-pointer font-semibold"
              >
                Review Invitation
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Official Celebration Meme Showcase */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center items-center min-h-0 relative">
          <div className="academic-card editorial-frame w-full h-full max-h-full rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col justify-between items-center text-center relative border border-white/10">
            <div className="flex items-center justify-between w-full border-b border-white/8 pb-2 shrink-0 px-1">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-[#788B78] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E7475]" />
                Official Batch Celebration
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-[#8A949E] uppercase">
                STATUS: CONFIRMED
              </span>
            </div>

            {/* Celebration Meme Image (Responsive Aspect-Preserved Slot) */}
            <div className="my-1.5 w-full flex-1 min-h-0 flex items-center justify-center rounded-lg academic-inset p-1.5 sm:p-2 overflow-hidden border border-white/8 bg-[#0E1113]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/api/memes/celebration.jpg"
                onError={(e) => {
                  e.currentTarget.src = "/celebration/celebration.jpg";
                }}
                alt="Batch Celebration Meme"
                className="max-h-[18svh] sm:max-h-[22svh] md:max-h-[24svh] lg:max-h-[28svh] w-auto max-w-full object-contain rounded-md"
              />
            </div>

            <p className="text-[11px] sm:text-xs font-display text-[#F3F1EA] font-semibold shrink-0">
              We can&apos;t wait to welcome you to the grand event! 🎉
            </p>
          </div>
        </div>
      </div>

      {/* Sincere Footer Note */}
      <footer className="pt-2 sm:pt-2.5 border-t border-white/8 shrink-0 flex items-center justify-between text-[10px] sm:text-[11px] text-[#8A949E] font-mono px-1">
        <div className="flex items-center gap-1.5 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C77C67] shrink-0" />
          <span className="truncate">Arrangements for high-tea and commemorative memento have been noted.</span>
        </div>
        <span className="hidden sm:inline text-[#687078] shrink-0">Batch of 2026</span>
      </footer>
    </motion.div>
  );
}
