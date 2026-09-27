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
  Sparkles, 
  Award,
  Landmark,
  Share2
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
    onAccept();
  };

  const startFinalSequence = () => {
    clearAllTimeouts();

    // Section 7: Immediately remove the "Proceed to Final Decision" button
    setIsRejectButtonVisible(false);

    // Section 8: Start Sad Violin as background music across the final sequence
    sound.playSadViolin();

    // Step 1: "Theek hai..."
    setFinalStep("theek_hai");

    // Step 2: "Humne aapko kaafi mauke de diye."
    const t1 = setTimeout(() => {
      setFinalStep("kaafi_mauke");
    }, 1800);
    timeoutRefs.current.push(t1);

    // Step 3: "Aur aapne humein kaafi baar mana bhi diya."
    const t2 = setTimeout(() => {
      setFinalStep("kaafi_baar_mana");
    }, 3600);
    timeoutRefs.current.push(t2);

    // Step 4: "Aapne reject karne ki poori koshish kar li."
    const t3 = setTimeout(() => {
      setFinalStep("koshish_kar_li");
    }, 5400);
    timeoutRefs.current.push(t3);

    // Step 5: "Humne manane ki poori koshish kar li."
    const t4 = setTimeout(() => {
      setFinalStep("manane_ki_koshish");
    }, 7200);
    timeoutRefs.current.push(t4);

    // Step 6: "Ab lagta hai..."
    const t5 = setTimeout(() => {
      setFinalStep("ab_lagta_hai");
    }, 9000);
    timeoutRefs.current.push(t5);

    // Step 7: Final image reveal + Punchline + Indian celebration song
    const t6 = setTimeout(() => {
      setFinalStep("aana_hi_padega");
      setIsFinalGlowActive(true);
      // Section 9: Transition from sad violin to Indian celebration song
      sound.fadeOrStopSadViolin(600);
      sound.playIndianSong();
    }, 10800);
    timeoutRefs.current.push(t6);
  };

  const handleRejectClick = () => {
    if (finalStep !== null) {
      return; // Sequence is already running
    }

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
      // Attempts 2, 3, 4, 6, 7, 9, 10, 12, 13, 14, 15 play no sound
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
        <div className="w-12 h-12 rounded-full bg-[#181613] border border-[#D4AF37]/40 flex items-center justify-center mb-3 shadow-[0_4px_16px_rgba(212,175,55,0.15)]">
          <Landmark className="w-6 h-6 text-[#E8C878]" />
        </div>

        <span className="text-[11px] font-accent uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">
          {invitation.universityName}
        </span>

        <h3 className="text-xs text-[#A39E93] tracking-widest uppercase mt-1">
          {invitation.department}
        </h3>
      </header>

      {/* Main Bespoke Invitation Document */}
      <main className="tactile-card ornate-border w-full rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
        {/* Subtle decorative gold corner notches */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]/40 pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/40 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/40 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]/40 pointer-events-none" />

        {/* Header Ribbon / Crest */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#201D19] border border-[#D4AF37]/25 text-[10px] font-accent uppercase tracking-[0.25em] text-[#E8C878] mb-4">
            <Award className="w-3 h-3 text-[#D4AF37]" />
            Official Faculty Invocation
          </span>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-5xl text-[#FDFBF7] font-normal tracking-tight mb-2">
            {invitation.eventName}
          </h1>

          {invitation.eventTheme && (
            <p className="font-serif italic text-sm sm:text-base text-[#DFBA73] mb-6">
              — &ldquo;{invitation.eventTheme}&rdquo; —
            </p>
          )}

          <GoldDivider className="max-w-[240px] mb-6" />
        </div>

        {/* Personalized Salutation Section */}
        <section className="my-4 text-left">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
            Personal Invitation for
          </p>

          <h2 className="font-display text-2xl sm:text-3xl text-[#FDFBF7] font-bold tracking-tight">
            {invitation.recipientName}
          </h2>

          <p className="text-xs sm:text-sm text-[#E8C878] font-medium tracking-wide mt-0.5">
            {invitation.designation}
          </p>

          <p className="text-xs text-[#9E9588] mt-0.5">
            {invitation.department}
          </p>

          {/* Sincere Letter Body */}
          <div className="mt-6 pt-6 border-t border-[#D4AF37]/15">
            <p className="font-display text-lg text-[#FDFBF7] italic mb-3">
              {invitation.honorific || "Respected Professor"},
            </p>

            <p className="text-sm text-[#D1C9BD] leading-relaxed font-light mb-4">
              {invitation.personalNote || 
                "With deep respect and admiration for your mentorship, the students and organizing committee cordially invite you to grace the annual Freshers' Welcome ceremony."}
            </p>

            <p className="text-sm text-[#D1C9BD] leading-relaxed font-light">
              Your esteemed presence as our cherished mentor will inspire the fresh batch as they begin their collegiate journey.
            </p>
          </div>
        </section>

        {/* Event Schedule & Venue Highlight */}
        <section className="my-8 rounded-2xl bg-[#11100F] border border-[#D4AF37]/20 p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#1D1A17] border border-[#D4AF37]/20 text-[#E8C878] shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#9E9588]">Date</p>
                <p className="text-xs sm:text-sm text-[#FDFBF7] font-medium mt-0.5">
                  {invitation.eventDate}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#1D1A17] border border-[#D4AF37]/20 text-[#E8C878] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#9E9588]">Time</p>
                <p className="text-xs sm:text-sm text-[#FDFBF7] font-medium mt-0.5">
                  {invitation.eventTime}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-1">
              <div className="p-2 rounded-lg bg-[#1D1A17] border border-[#D4AF37]/20 text-[#E8C878] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#9E9588]">Venue</p>
                <p className="text-xs sm:text-sm text-[#FDFBF7] font-medium mt-0.5">
                  {invitation.venue}
                </p>
                {invitation.hallName && (
                  <p className="text-[11px] text-[#A39E93]">{invitation.hallName}</p>
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
        <section className="mt-8 pt-6 border-t border-[#D4AF37]/20 flex flex-col gap-3.5 items-center w-full">
          {/* Always Available Accept Button */}
          <motion.button
            type="button"
            onClick={handleAcceptClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#DFBA73] to-[#C5A880] text-[#090807] font-bold text-sm uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isFinalGlowActive
                ? "shadow-[0_0_35px_rgba(212,175,55,0.7)] ring-2 ring-[#FFF2D6] scale-[1.01]"
                : "shadow-[0_6px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_8px_32px_rgba(212,175,55,0.6)]"
            }`}
          >
            <Check className="w-5 h-5 stroke-[2.5]" />
            <span>
              {isFinalGlowActive ? "✨ ACCEPT INVITATION" : "Accept Invitation"}
            </span>
            <Sparkles className="w-4 h-4 ml-1 opacity-80" />
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
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#161412] hover:bg-[#1C1916] border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 text-[#C5BEB3] hover:text-[#FDFBF7] text-xs uppercase tracking-[0.15em] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4 text-[#A39E93]" />
                  <span>
                    {rejectCount === 0 
                      ? "Reject Invitation" 
                      : rejectCount >= REJECTION_REACTIONS.length 
                      ? "Proceed to Final Decision" 
                      : "Reject Invitation"}
                  </span>
                </motion.button>

                {/* Section 2: Elegant Reject Warning */}
                <div className="text-center pt-1 pb-1">
                  <p className="text-[11px] sm:text-xs text-[#DFBA73] font-medium tracking-wide flex items-center justify-center gap-1.5 opacity-90">
                    <span>⚠️</span>
                    <span>Reject at your own risk.</span>
                  </p>
                  <p className="text-[10px] text-[#A39E93] tracking-widest uppercase mt-0.5 font-light">
                    You have been warned.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Share Invitation Link Button */}
          <button
            type="button"
            onClick={handleShare}
            className="mt-2 text-[11px] text-[#A39E93] hover:text-[#E8C878] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? "Link copied to clipboard!" : "Share personalized link"}</span>
          </button>
        </section>
      </main>

      {/* Sincere Subtext */}
      <footer className="text-center mt-6">
        <p className="text-xs text-[#9E9588] tracking-wider font-light">
          Organized with reverence by the Batch of 2026 • University Campus
        </p>
      </footer>
    </div>
  );
}
