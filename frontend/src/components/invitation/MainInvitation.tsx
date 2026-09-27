"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationData } from "@/types/invitation";
import { REJECTION_REACTIONS } from "@/data/rejectionReactions";
import ReactionCard, { FinalStepType } from "@/components/reaction/ReactionCard";
import GoldDivider from "@/components/ui/GoldDivider";
import { sound } from "@/lib/sound";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  X, 
  Share2,
  GraduationCap,
  Compass
} from "lucide-react";

interface MainInvitationProps {
  invitation: InvitationData;
  onAccept: () => void;
  onRejectStateChange?: (count: number) => void;
}

export default function MainInvitation({
  invitation,
  onAccept,
  onRejectStateChange,
}: MainInvitationProps) {
  const [rejectCount, setRejectCount] = useState<number>(0);
  const [finalStep, setFinalStep] = useState<FinalStepType | null>(null);
  const [isRejectButtonVisible, setIsRejectButtonVisible] = useState<boolean>(true);
  const [isFinalGlowActive, setIsFinalGlowActive] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Keep track of active timeouts for cleanup on Accept or unmount
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach((t) => clearTimeout(t));
    timeoutRefs.current = [];
  };

  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  const handleAcceptClick = () => {
    clearAllTimeouts();
    sound.stopAllRejectionSounds();
    sound.retryPendingCelebration();
    onAccept();
  };

  const startFinalSequence = () => {
    clearAllTimeouts();
    sound.stopCurrentEffect();

    // Section 7: Immediately remove the "Proceed to Final Decision" button
    setIsRejectButtonVisible(false);

    // Section 8: Start Sad Violin as background music across the final sequence
    sound.playSadViolin();

    // Step 1: "Theek hai..."
    setFinalStep("theek_hai");

    // Step 2: "Humne aapko kaafi mauke de diye." (Deliberate reading pause)
    const t1 = setTimeout(() => {
      setFinalStep("kaafi_mauke");
    }, 3200);
    timeoutRefs.current.push(t1);

    // Step 3: "Aur aapne humein kaafi baar mana bhi diya."
    const t2 = setTimeout(() => {
      setFinalStep("kaafi_baar_mana");
    }, 6800);
    timeoutRefs.current.push(t2);

    // Step 4: "Aapne reject karne ki poori koshish kar li."
    const t3 = setTimeout(() => {
      setFinalStep("koshish_kar_li");
    }, 10400);
    timeoutRefs.current.push(t3);

    // Step 5: "Humne manane ki poori koshish kar li."
    const t4 = setTimeout(() => {
      setFinalStep("manane_ki_koshish");
    }, 14000);
    timeoutRefs.current.push(t4);

    // Step 6: "Ab lagta hai..." (Short suspenseful pause before final reveal)
    const t5 = setTimeout(() => {
      setFinalStep("ab_lagta_hai");
    }, 17600);
    timeoutRefs.current.push(t5);

    // Step 7: Final image reveal + Punchline + Immediate transition to Indian celebration song
    const t6 = setTimeout(() => {
      setFinalStep("aana_hi_padega");
      setIsFinalGlowActive(true);
      // Immediately stop sad violin, clear rejection audio, and start Indian celebration song
      sound.playIndianSong();
    }, 20600);
    timeoutRefs.current.push(t6);
  };

  const handleRejectClick = () => {
    if (finalStep !== null) {
      return; // Sequence is already running
    }

    // Immediately stop any currently playing reaction sound before switching states
    sound.stopCurrentEffect();

    const nextCount = rejectCount + 1;
    setRejectCount(nextCount);

    if (onRejectStateChange) {
      onRejectStateChange(nextCount);
    }

    if (nextCount <= REJECTION_REACTIONS.length) {
      // Event-based sound triggers for specific rejection attempts
      if (nextCount === 1) {
        sound.playAwkward();
      } else if (nextCount === 5) {
        sound.playDexter();
      } else if (nextCount === 8) {
        sound.playAww();
      } else if (nextCount === 11) {
        sound.playMeow();
      }
      // Attempts 2, 3, 4, 6, 7, 9, 10, 12, 13, 14, 15 have no audio cues; previous audio was already cut off
    } else {
      // Reached beyond all attempts: trigger final transition sequence
      startFinalSequence();
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Determine current active reaction (Attempts 1 to REJECTION_REACTIONS.length)
  const currentReaction = 
    rejectCount > 0 && rejectCount <= REJECTION_REACTIONS.length 
      ? REJECTION_REACTIONS[rejectCount - 1] 
      : null;

  return (
    <div className="w-full max-w-5xl h-full max-h-[96svh] flex flex-col justify-between academic-card editorial-frame rounded-2xl sm:rounded-3xl p-3 sm:p-5 lg:p-6 relative overflow-hidden z-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
      {/* Subtle technical editorial corner markings */}
      <div className="absolute top-2.5 left-4 text-[9px] font-mono text-[#788B78]/40 select-none hidden sm:block">┌ FW-26</div>
      <div className="absolute top-2.5 right-4 text-[9px] font-mono text-[#788B78]/40 select-none hidden sm:block">FACULTY ┐</div>

      {/* Top Header Bar */}
      <header className="flex items-center justify-between border-b border-white/8 pb-2 sm:pb-2.5 shrink-0">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#171A1D] border border-[#788B78]/35 flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            <GraduationCap className="w-4 h-4 text-[#4E7475]" />
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#788B78] font-semibold block leading-none">
              {invitation.universityName}
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#8A949E] tracking-wider uppercase block font-medium mt-0.5 leading-none">
              {invitation.department}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md academic-tag text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E7475]" />
            Official Convocation
          </span>
          <h1 className="font-display text-xs sm:text-base lg:text-lg text-[#F3F1EA] font-extrabold tracking-tight uppercase">
            {invitation.eventName}
          </h1>
        </div>
      </header>

      {/* Main 2-Column Grid (Desktop) / Vertical Adaptive Stack (Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 flex-1 min-h-0 my-2 sm:my-2.5 items-stretch">
        {/* LEFT COLUMN: Salutation, Personalized Note & Event Details */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between min-h-0 text-left">
          {/* Salutation Card */}
          <section className="flex-1 min-h-0 flex flex-col justify-center pr-0 md:pr-1">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#788B78] font-semibold block">
              [ INVITATION DELIVERED TO ]
            </span>
            <h2 className="font-display text-lg sm:text-2xl lg:text-3xl text-[#F3F1EA] font-extrabold tracking-tight mt-0.5 leading-tight">
              {invitation.recipientName}
            </h2>
            <p className="text-[11px] sm:text-xs text-[#4E7475] font-semibold tracking-wide">
              {invitation.designation} • {invitation.department}
            </p>

            {/* Sincere Letter Body */}
            <div className="mt-2 sm:mt-2.5 pt-2 sm:pt-2.5 border-t border-white/8 text-xs sm:text-sm text-[#D8D5CB] leading-relaxed font-light">
              <p className="font-display text-xs sm:text-sm text-[#F3F1EA] font-semibold mb-1">
                {invitation.honorific || "Respected Professor"},
              </p>
              <p className="text-[11px] sm:text-xs lg:text-[13px] text-[#D8D5CB] leading-relaxed line-clamp-3 sm:line-clamp-none">
                {invitation.personalNote || 
                  "With deep respect and admiration for your mentorship, the students and organizing committee cordially invite you to grace the annual Freshers' Welcome ceremony as our esteemed mentor."}
              </p>
            </div>
          </section>

          {/* Event Schedule & Venue Strip */}
          <section className="mt-2 rounded-xl academic-inset p-2 sm:p-2.5 border border-white/5 shrink-0">
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
                  <p className="text-[9px] font-mono uppercase tracking-wider text-[#788B78]">Time</p>
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
        </div>

        {/* RIGHT COLUMN: Visual Stage (Welcome Emblem OR Reaction Card) */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center items-center min-h-0 relative">
          <AnimatePresence mode="wait">
            {rejectCount === 0 && !finalStep ? (
              <motion.div
                key="initial-welcome-emblem"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="academic-card editorial-frame w-full h-full max-h-full rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center relative border border-white/10"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#171A1D] border-2 border-[#4E7475]/40 flex items-center justify-center mb-2.5 shadow-[0_8px_24px_rgba(78,116,117,0.25)]">
                  <GraduationCap className="w-6 h-6 text-[#4E7475]" />
                </div>

                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#788B78] font-semibold mb-1.5">
                  [ OFFICIAL BATCH GUEST ]
                </span>

                <h3 className="font-display text-sm sm:text-base lg:text-lg text-[#F3F1EA] font-bold">
                  Distinguished Faculty Presence
                </h3>

                <p className="text-[11px] sm:text-xs text-[#8A949E] max-w-xs mt-1.5 leading-relaxed">
                  We eagerly await your gracious presence to inspire the students and commemorate this collegiate milestone.
                </p>

                <div className="mt-3 px-3 py-1 rounded-md academic-tag-teal text-[9px] sm:text-[10px] font-mono tracking-wider">
                  HONORED GUEST • FRONT ROW
                </div>
              </motion.div>
            ) : (
              <ReactionCard
                reaction={currentReaction}
                rejectCount={rejectCount}
                finalStep={finalStep}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* BOTTOM INTERACTION ZONE: Always Anchored & Stable */}
      <footer className="pt-2 sm:pt-2.5 border-t border-white/8 shrink-0 flex flex-col gap-1.5 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 w-full">
          {/* Always Visible Accept Button */}
          <motion.button
            type="button"
            onClick={handleAcceptClick}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            className={`btn-academic-primary py-2.5 sm:py-3 px-4 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 cursor-pointer ${
              isFinalGlowActive
                ? "shadow-[0_0_35px_rgba(78,116,117,0.7)] ring-2 ring-[#79A7A8] scale-[1.01]"
                : ""
            }`}
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>
              {isFinalGlowActive ? "ACCEPT INVITATION" : "Accept Invitation"}
            </span>
          </motion.button>

          {/* Reject Button (or Placeholder in final step) */}
          <AnimatePresence>
            {isRejectButtonVisible ? (
              <motion.button
                key="reject-btn"
                type="button"
                onClick={handleRejectClick}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="btn-academic-secondary py-2.5 sm:py-3 px-4 rounded-xl font-display text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <X className="w-3.5 h-3.5 text-[#8A949E]" />
                <span>
                  {rejectCount === 0
                    ? "Reject Invitation"
                    : rejectCount >= REJECTION_REACTIONS.length
                    ? "Proceed to Final Decision"
                    : "Reject Invitation"}
                </span>
              </motion.button>
            ) : (
              <div className="hidden sm:flex items-center justify-center px-4 py-2 rounded-xl bg-[#14171A]/60 border border-[#4E7475]/30 text-[11px] font-mono text-[#79A7A8]">
                Final decision reached • Acceptance mandatory 🙂
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Subtext Bar: Warning Note & Share Link */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#8A949E] font-mono px-1">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C77C67] shrink-0" />
            <span className="truncate">
              <span className="text-[#C77C67] font-semibold">NOTE:</span> Reject at your own risk.
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="hover:text-[#79A7A8] flex items-center gap-1 transition-colors cursor-pointer shrink-0 ml-2"
          >
            <Share2 className="w-3 h-3" />
            <span>{copiedLink ? "Copied!" : "Share link"}</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
