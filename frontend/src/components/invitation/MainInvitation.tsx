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
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-14 flex flex-col items-center z-10">
      {/* Top University & Faculty Seal */}
      <header className="flex flex-col items-center text-center mb-8">
        <div className="w-11 h-11 rounded-xl bg-[#171A1D] border border-[#788B78]/35 flex items-center justify-center mb-3 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <GraduationCap className="w-5 h-5 text-[#4E7475]" />
        </div>

        <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#788B78] font-semibold">
          {invitation.universityName}
        </span>

        <h3 className="text-xs text-[#8A949E] tracking-widest uppercase mt-1 font-medium">
          {invitation.department}
        </h3>
      </header>

      {/* Main Bespoke Invitation Document */}
      <main className="academic-card editorial-frame w-full rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
        {/* Subtle technical editorial corner markings */}
        <div className="absolute top-4 left-4 text-[9px] font-mono text-[#788B78]/40 select-none hidden sm:block">┌ FW-26</div>
        <div className="absolute top-4 right-4 text-[9px] font-mono text-[#788B78]/40 select-none hidden sm:block">FACULTY ┐</div>
        <div className="absolute bottom-4 left-4 text-[9px] font-mono text-[#788B78]/40 select-none hidden sm:block">└ 2026</div>
        <div className="absolute bottom-4 right-4 text-[9px] font-mono text-[#788B78]/40 select-none hidden sm:block">DEPT-INV ┘</div>

        {/* Header Ribbon / Crest */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md academic-tag text-[10px] font-mono uppercase tracking-[0.25em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E7475]" />
            Official Faculty Convocation
          </span>

          <h1 className="font-display text-4xl sm:text-6xl text-[#F3F1EA] font-extrabold tracking-tight uppercase mb-2">
            {invitation.eventName}
          </h1>

          {invitation.eventTheme && (
            <p className="font-mono text-xs sm:text-sm tracking-[0.22em] text-[#4E7475] uppercase mb-5">
              — &ldquo;{invitation.eventTheme}&rdquo; —
            </p>
          )}

          <GoldDivider className="max-w-[220px] mb-6" />
        </div>

        {/* Personalized Salutation Section */}
        <section className="my-4 text-left">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#788B78] font-semibold mb-1">
            [ INVITATION DELIVERED TO ]
          </p>

          <h2 className="font-display text-3xl sm:text-5xl text-[#F3F1EA] font-extrabold tracking-tight mt-1 mb-1">
            {invitation.recipientName}
          </h2>

          <p className="text-xs sm:text-sm text-[#4E7475] font-semibold tracking-wide mt-1">
            {invitation.designation}
          </p>

          <p className="text-xs text-[#8A949E] mt-0.5">
            {invitation.department}
          </p>

          {/* Sincere Letter Body */}
          <div className="mt-6 pt-6 border-t border-white/8">
            <p className="font-display text-lg text-[#F3F1EA] font-semibold mb-3">
              {invitation.honorific || "Respected Professor"},
            </p>

            <p className="text-sm text-[#D8D5CB] leading-relaxed font-light mb-4">
              {invitation.personalNote || 
                "With deep respect and admiration for your mentorship, the students and organizing committee cordially invite you to grace the annual Freshers' Welcome ceremony."}
            </p>

            <p className="text-sm text-[#D8D5CB] leading-relaxed font-light">
              Your esteemed presence as our cherished mentor will inspire the fresh batch as they begin their collegiate journey.
            </p>
          </div>
        </section>

        {/* Event Schedule & Venue Highlight */}
        <section className="my-8 rounded-xl academic-inset p-5 sm:p-6 border border-white/5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-[#1B2025] border border-white/8 text-[#4E7475] shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#788B78]">Date</p>
                <p className="text-xs sm:text-sm text-[#F3F1EA] font-medium mt-0.5">
                  {invitation.eventDate}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-[#1B2025] border border-white/8 text-[#4E7475] shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#788B78]">Time</p>
                <p className="text-xs sm:text-sm text-[#F3F1EA] font-medium mt-0.5">
                  {invitation.eventTime}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-1">
              <div className="p-2.5 rounded-lg bg-[#1B2025] border border-white/8 text-[#4E7475] shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#788B78]">Venue</p>
                <p className="text-xs sm:text-sm text-[#F3F1EA] font-medium mt-0.5">
                  {invitation.venue}
                </p>
                {invitation.hallName && (
                  <p className="text-[11px] text-[#8A949E] mt-0.5">{invitation.hallName}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated Reaction / Thought Card Area */}
        <ReactionCard 
          reaction={currentReaction} 
          rejectCount={rejectCount} 
          finalStep={finalStep}
        />

        {/* Primary Interactive Response Controls */}
        <section className="mt-8 pt-6 border-t border-white/8 flex flex-col gap-3.5 items-center w-full">
          {/* Always Available Accept Button */}
          <motion.button
            type="button"
            onClick={handleAcceptClick}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className={`btn-academic-primary w-full py-4 px-6 rounded-xl font-display font-bold text-sm uppercase tracking-[0.16em] flex items-center justify-center gap-2 cursor-pointer ${
              isFinalGlowActive
                ? "shadow-[0_0_35px_rgba(78,116,117,0.7)] ring-2 ring-[#79A7A8] scale-[1.01]"
                : ""
            }`}
          >
            <Check className="w-5 h-5 stroke-[2.5]" />
            <span>
              {isFinalGlowActive ? "ACCEPT INVITATION" : "Accept Invitation"}
            </span>
          </motion.button>

          {/* Reject Button & Warning Container (Smoothly Exits in Final Stage) */}
          <AnimatePresence>
            {isRejectButtonVisible && (
              <motion.div
                key="reject-interactive-block"
                initial={{ opacity: 1, scale: 1, height: "auto" }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  y: -10, 
                  height: 0,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                }}
                className="w-full flex flex-col items-center gap-2 overflow-hidden"
              >
                {/* Witty & Playful Reject Button */}
                <motion.button
                  type="button"
                  onClick={handleRejectClick}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-academic-secondary w-full py-3.5 px-6 rounded-xl font-display text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <X className="w-4 h-4 text-[#8A949E]" />
                  <span>
                    {rejectCount === 0 
                      ? "Reject Invitation" 
                      : rejectCount >= REJECTION_REACTIONS.length 
                      ? "Proceed to Final Decision" 
                      : "Reject Invitation"}
                  </span>
                </motion.button>

                {/* Dignified & Playful Reject Warning Annotation */}
                <div className="text-center pt-2 pb-0.5 select-none flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C77C67]" />
                  <p className="text-[11px] sm:text-xs text-[#8A949E] font-mono tracking-wider">
                    <span className="text-[#C77C67] font-semibold">NOTE:</span> Reject at your own risk. You have been warned.
                  </p>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C77C67]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Share Invitation Link Button */}
          <button
            type="button"
            onClick={handleShare}
            className="mt-2 text-[11px] text-[#8A949E] hover:text-[#79A7A8] flex items-center gap-1.5 transition-colors cursor-pointer px-3.5 py-1.5 rounded-md academic-tag-teal font-mono tracking-wider"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? "Link copied to clipboard!" : "Share personalized link"}</span>
          </button>
        </section>
      </main>

      {/* Sincere Subtext */}
      <footer className="text-center mt-6">
        <p className="text-xs text-[#687078] font-mono tracking-wider">
          Organized by the Batch of 2026 • University Campus
        </p>
      </footer>
    </div>
  );
}
