"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { InvitationData } from "@/types/invitation";
import { sound } from "@/lib/sound";
import { EASE_EXPO } from "@/lib/motion";
import GoldDivider from "@/components/ui/GoldDivider";
import { CheckCircle2, Calendar, MapPin, Clock, Sparkles } from "lucide-react";

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

    // Elegant gold and ivory confetti bursts
    const end = Date.now() + 2.5 * 1000;
    const colors = ["#D4AF37", "#F6E3B4", "#FFFFFF", "#C5A880", "#851B27"];

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
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className="w-full max-w-xl mx-auto py-8 px-4 sm:px-6 flex flex-col items-center text-center z-10"
    >
      {/* Confirmed Seal Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.15 }}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#181512] border-2 border-[#D4AF37] flex flex-col items-center justify-center mb-6 shadow-[0_0_35px_rgba(212,175,55,0.35)] relative"
      >
        <CheckCircle2 className="w-10 h-10 text-[#E8C878]" />
        <span className="text-[9px] font-accent uppercase tracking-widest text-[#D4AF37] font-bold mt-1">
          Confirmed
        </span>
      </motion.div>

      {/* Primary Warm Headline */}
      <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-medium mb-2">
        With Our Deepest Gratitude
      </span>

      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#FDFBF7] font-semibold tracking-tight mb-3">
        Wonderful! We are genuinely honored, <br />
        <span className="gold-foil-text italic font-serif">{invitation.recipientName}</span>.
      </h1>

      <p className="text-sm sm:text-base text-[#D1C9BD] max-w-md leading-relaxed font-light mb-6">
        Your presence makes <span className="text-[#FDFBF7] font-medium">{invitation.eventName}</span> truly complete and memorable for the entire incoming batch.
      </p>

      <GoldDivider className="max-w-xs mb-8" />

      {/* Confirmed Details Ticket */}
      <div className="tactile-card ornate-border w-full p-6 sm:p-7 rounded-2xl text-left mb-8 relative">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Special Guest Entry Pass
            </span>
            <h3 className="font-display text-xl text-[#FDFBF7] font-medium mt-0.5">
              {invitation.eventName}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono tracking-wider text-[#A39E93] uppercase">
              Seat Reservation
            </span>
            <p className="text-xs font-semibold text-[#E8C878]">
              Front Row • VIP Faculty
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#A39E93] text-[11px]">Date</p>
              <p className="text-[#FDFBF7] font-medium">{invitation.eventDate}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#A39E93] text-[11px]">Reporting Time</p>
              <p className="text-[#FDFBF7] font-medium">{invitation.eventTime}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 sm:col-span-2">
            <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#A39E93] text-[11px]">Venue</p>
              <p className="text-[#FDFBF7] font-medium">
                {invitation.venue} {invitation.hallName && `— ${invitation.hallName}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Actions */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={createGoogleCalendarLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#DFBA73] text-[#090807] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Add to Google Calendar</span>
        </a>

        {onViewDetails && (
          <button
            type="button"
            onClick={onViewDetails}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1A1815] border border-[#D4AF37]/30 text-[#D1C9BD] hover:text-[#FDFBF7] hover:border-[#D4AF37]/60 text-xs tracking-wider uppercase transition-all cursor-pointer"
          >
            Review Invitation
          </button>
        )}
      </div>

      {/* Sincere Footer Note */}
      <p className="text-xs text-[#9E9588] mt-8 flex items-center gap-1.5 font-light">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        Arrangements for high-tea and commemorative memento have been noted.
      </p>
    </motion.div>
  );
}
