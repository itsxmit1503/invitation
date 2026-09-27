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
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#171A1D] border-2 border-[#4E7475] flex flex-col items-center justify-center mb-6 shadow-[0_12px_32px_rgba(78,116,117,0.35)] relative"
      >
        <CheckCircle2 className="w-10 h-10 text-[#4E7475]" />
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#788B78] font-bold mt-1">
          CONFIRMED
        </span>
      </motion.div>

      {/* Primary Warm Headline */}
      <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#788B78] font-semibold mb-2">
        [ RSVP STATUS // GRACIOUSLY CONFIRMED ]
      </span>

      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F3F1EA] font-extrabold tracking-tight mb-3">
        Wonderful! We are genuinely honored, <br />
        <span className="text-[#4E7475]">{invitation.recipientName}</span>.
      </h1>

      <p className="text-sm sm:text-base text-[#D8D5CB] max-w-md leading-relaxed font-light mb-6">
        Your presence makes <span className="text-[#F3F1EA] font-semibold">{invitation.eventName}</span> truly complete and memorable for the entire incoming batch.
      </p>

      <GoldDivider className="max-w-xs mb-8" />

      {/* Official Celebration Meme Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE_EXPO }}
        className="academic-card editorial-frame w-full p-4 sm:p-5 rounded-2xl mb-8 relative border border-white/10 flex flex-col items-center text-center"
      >
        <div className="flex items-center justify-between w-full border-b border-white/8 pb-3 mb-3 px-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#788B78] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E7475]" />
            Official Batch Celebration
          </span>
          <span className="text-[10px] font-mono tracking-wider text-[#8A949E] uppercase">
            STATUS: RSVP ACCEPTED
          </span>
        </div>

        <div className="academic-inset w-full rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center border border-white/5 bg-[#0C0F11]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/api/memes/celebration.jpg"
            onError={(e) => {
              // Graceful fallback to static route if needed
              e.currentTarget.src = "/celebration/celebration.jpg";
            }}
            alt="Batch Celebration Meme"
            className="max-h-[260px] sm:max-h-[320px] w-auto max-w-full rounded-lg object-contain shadow-lg border border-white/10 mx-auto"
          />
        </div>

        <p className="text-xs sm:text-sm font-display text-[#F3F1EA] font-semibold mt-3">
          We can&apos;t wait to welcome you to the grand event! 🎉
        </p>
      </motion.div>

      {/* Confirmed Details Ticket */}
      <div className="academic-card editorial-frame w-full p-6 sm:p-7 rounded-2xl text-left mb-8 relative border border-white/10">
        <div className="flex items-center justify-between border-b border-white/8 pb-4 mb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#788B78] font-semibold">
              [ SPECIAL GUEST ENTRY PASS ]
            </span>
            <h3 className="font-display text-xl sm:text-2xl text-[#F3F1EA] font-extrabold mt-0.5 uppercase">
              {invitation.eventName}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono tracking-wider text-[#8A949E] uppercase">
              PASS ID: FW26-VIP
            </span>
            <p className="text-xs font-mono font-bold text-[#4E7475] mt-0.5">
              VIP FACULTY ROW
            </p>
          </div>
        </div>

        <div className="academic-inset rounded-xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border border-white/5">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-[#4E7475] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#8A949E] text-[11px] font-mono uppercase">Date</p>
              <p className="text-[#F3F1EA] font-medium mt-0.5">{invitation.eventDate}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-[#4E7475] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#8A949E] text-[11px] font-mono uppercase">Reporting Time</p>
              <p className="text-[#F3F1EA] font-medium mt-0.5">{invitation.eventTime}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 sm:col-span-2">
            <MapPin className="w-4 h-4 text-[#4E7475] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#8A949E] text-[11px] font-mono uppercase">Venue</p>
              <p className="text-[#F3F1EA] font-medium mt-0.5">
                {invitation.venue} {invitation.hallName && `— ${invitation.hallName}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Actions */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3.5">
        <a
          href={createGoogleCalendarLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-academic-primary w-full sm:w-auto px-6 py-3.5 rounded-xl font-display font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Add to Google Calendar</span>
        </a>

        {onViewDetails && (
          <button
            type="button"
            onClick={onViewDetails}
            className="btn-academic-secondary w-full sm:w-auto px-6 py-3.5 rounded-xl font-display text-xs tracking-wider uppercase transition-all cursor-pointer font-semibold"
          >
            Review Invitation
          </button>
        )}
      </div>

      {/* Sincere Footer Note */}
      <p className="text-xs text-[#8A949E] font-mono mt-8 flex items-center gap-2 font-normal">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C77C67]" />
        Arrangements for high-tea and commemorative memento have been noted.
      </p>
    </motion.div>
  );
}
