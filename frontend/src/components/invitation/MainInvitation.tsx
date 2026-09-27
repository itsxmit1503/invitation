"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationData } from "@/types/invitation";
import { REJECTION_REACTIONS } from "@/data/rejectionReactions";
import ReactionCard, { FinalStepType } from "@/components/reaction/ReactionCard";
import { sound } from "@/lib/sound";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  X, 
  Share2,
  GraduationCap
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

    // Immediately remove the "Proceed to Final Decision" button
    setIsRejectButtonVisible(false);

    // Start Sad Violin as background music across the final sequence
    sound.playSadViolin();

    // Step 1: "Theek hai..."
    setFinalStep("theek_hai");

    // Step 2: "Humne aapko kaafi mauke de diye."
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

    // Step 6: "Ab lagta hai..."
    const t5 = setTimeout(() => {
      setFinalStep("ab_lagta_hai");
    }, 17600);
    timeoutRefs.current.push(t5);

    // Step 7: Final image reveal + Punchline + Immediate transition to Indian celebration song
    const t6 = setTimeout(() => {
      setFinalStep("aana_hi_padega");
      setIsFinalGlowActive(true);
      sound.playIndianSong();
    }, 20600);
    timeoutRefs.current.push(t6);
  };

  const handleRejectClick = () => {
    if (finalStep !== null) {
      return; // Sequence is already running
    }

    sound.stopCurrentEffect();

    const nextCount = rejectCount + 1;
    setRejectCount(nextCount);

    if (onRejectStateChange) {
      onRejectStateChange(nextCount);
    }

    if (nextCount <= REJECTION_REACTIONS.length) {
      if (nextCount === 1) {
        sound.playAwkward();
      } else if (nextCount === 5) {
        sound.playDexter();
      } else if (nextCount === 8) {
        sound.playAww();
      } else if (nextCount === 11) {
        sound.playMeow();
      }
    } else {
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
    <div className="w-full max-w-5xl h-full max-h-[96svh] flex flex-col justify-between academic-card editorial-frame rounded-2xl sm:rounded-3xl p-3 sm:p-5 lg:p-6 relative overflow-hidden z-10 shadow-[0_12px_40px_rgba(11,32,66,0.08)] bg-white border border-[#0B2042]/15">
      {/* Subtle technical editorial corner markings */}
      <div className="absolute top-2.5 left-4 text-[9px] font-mono text-[#1E4E8B]/40 select-none hidden sm:block">┌ FW-26</div>
      <div className="absolute top-2.5 right-4 text-[9px] font-mono text-[#1E4E8B]/40 select-none hidden sm:block">FACULTY ┐</div>

      {/* Top Header Bar */}
      <header className="flex items-center justify-between border-b border-[#0B2042]/10 pb-2 sm:pb-2.5 shrink-0">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FFF2EF] border border-[#0B2042]/25 flex items-center justify-center shrink-0 shadow-[0_1px_4px_rgba(11,32,66,0.08)]">
            <GraduationCap className="w-4 h-4 text-[#0B2042]" />
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#0B2042] font-bold block leading-none">
              {invitation.conductedBy || "Conducted by BCA III Semester"}
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#1E4E8B] tracking-wider uppercase block font-semibold mt-0.5 leading-none">
              {invitation.eventType || "Freshers' Welcome 2026"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full academic-tag text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F75C7]" />
            Official Welcome
          </span>
          <h1 className="font-display text-xs sm:text-base lg:text-lg text-[#0B2042] font-extrabold tracking-tight uppercase">
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
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#1E4E8B] font-bold block">
              [ INVITATION DELIVERED TO ]
            </span>
            <h2 className="font-display text-lg sm:text-2xl lg:text-3xl text-[#0B2042] font-extrabold tracking-tight mt-0.5 leading-tight break-words">
              {invitation.recipientName}
            </h2>
            <p className="text-[11px] sm:text-xs text-[#1E4E8B] font-semibold tracking-wide">
              {invitation.designation} • {invitation.department}
            </p>

            {/* Sincere Letter Body */}
            <div className="mt-2 sm:mt-2.5 pt-2 sm:pt-2.5 border-t border-[#0B2042]/10 text-xs sm:text-sm text-[#0B2042] leading-relaxed font-normal">
              <p className="font-display text-xs sm:text-sm text-[#0B2042] font-bold mb-1">
                {invitation.honorific || "Respected Sir"},
              </p>
              <p className="text-[11px] sm:text-xs lg:text-[13px] text-[#0B2042] leading-relaxed line-clamp-4 sm:line-clamp-none">
                {invitation.personalNote || 
                  "With deep respect and admiration for your mentorship, the students and organizing committee cordially invite you to grace the annual Freshers' Welcome ceremony as our esteemed mentor."}
              </p>
            </div>
          </section>

          {/* Event Schedule & Venue Strip */}
          <section className="mt-2 rounded-xl academic-inset p-2 sm:p-2.5 border border-[#0B2042]/12 bg-[#FFF8F6] shrink-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-left">
              <div className="flex items-start gap-1.5 sm:gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#1E4E8B] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-[#1E4E8B] font-bold">Date</p>
                  <p className="text-[11px] sm:text-xs text-[#0B2042] font-semibold leading-tight">
                    {invitation.eventDate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-1.5 sm:gap-2">
                <Clock className="w-3.5 h-3.5 text-[#1E4E8B] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-[#1E4E8B] font-bold">Time</p>
                  <p className="text-[11px] sm:text-xs text-[#0B2042] font-semibold leading-tight">
                    {invitation.eventTime}
                  </p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-start gap-1.5 sm:gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#1E4E8B] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-[#1E4E8B] font-bold">Venue</p>
                  <p className="text-[11px] sm:text-xs text-[#0B2042] font-semibold leading-tight break-words">
                    {invitation.venue}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Visual Stage (Welcome Card OR Reaction Card) */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center items-center min-h-0 relative">
          <AnimatePresence mode="wait">
            {rejectCount === 0 && !finalStep ? (
              <motion.div
                key="initial-welcome-meme"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="academic-card editorial-frame w-full h-full max-h-full rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 relative overflow-hidden flex flex-col justify-between bg-white border border-[#0B2042]/15 shadow-[0_4px_16px_rgba(11,32,66,0.06)]"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-1.5 shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] font-bold px-2 py-0.5 rounded-md academic-tag text-[#0B2042]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F75C7]" />
                    Official Faculty Invitation
                  </span>
                  <span className="text-[10px] sm:text-[11px] tracking-wider text-[#1E4E8B] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FFF2EF] border border-[#0B2042]/15">
                    HONORED GUEST
                  </span>
                </div>

                {/* Welcome Message */}
                <div className="shrink-0 text-left">
                  <p className="font-display text-xs sm:text-sm lg:text-base font-bold leading-snug text-[#0B2042]">
                    A special invitation awaits your gracious acceptance.
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#1E4E8B] mt-0.5 font-medium">
                    We cordially invite you to grace the annual Freshers&apos; Welcome ceremony.
                  </p>
                </div>

                {/* Responsive Welcome Meme Image Slot with Full Aspect Preservation */}
                <div className="my-1 sm:my-1.5 w-full flex-1 min-h-0 flex items-center justify-center rounded-lg academic-inset p-1 sm:p-2 overflow-hidden border border-[#0B2042]/12 bg-[#FFF8F6]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/api/memes/welcome.jpg"
                    onError={(e) => {
                      e.currentTarget.src = "/memes%20and%20sounds/welcome.jpg";
                    }}
                    alt="Welcome Meme"
                    loading="eager"
                    className="max-h-[16svh] sm:max-h-[20svh] md:max-h-[22svh] lg:max-h-[26svh] w-auto max-w-full object-contain rounded-md"
                  />
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
      <footer className="pt-2 sm:pt-2.5 border-t border-[#0B2042]/10 shrink-0 flex flex-col gap-1.5 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 w-full">
          {/* Always Visible Accept Button */}
          <motion.button
            type="button"
            onClick={handleAcceptClick}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            className={`btn-academic-primary py-2.5 sm:py-3 px-4 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 cursor-pointer ${
              isFinalGlowActive
                ? "ring-2 ring-[#0B2042] shadow-md scale-[1.01]"
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
                <X className="w-3.5 h-3.5 text-[#0B2042]" />
                <span>
                  {rejectCount === 0
                    ? "Reject Invitation"
                    : rejectCount >= REJECTION_REACTIONS.length
                    ? "Proceed to Final Decision"
                    : "Reject Invitation"}
                </span>
              </motion.button>
            ) : (
              <div className="hidden sm:flex items-center justify-center px-4 py-2 rounded-xl bg-[#FFF2EF] border border-[#0B2042]/30 text-[11px] font-mono text-[#0B2042] font-semibold">
                Final decision reached • Acceptance mandatory 🙂
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Subtext Bar: Reject Hint & Share Link */}
        <div className="flex sm:grid sm:grid-cols-2 items-center justify-between sm:justify-items-stretch text-[10px] sm:text-[11px] text-[#1E4E8B] px-1 min-h-[22px] gap-2 sm:gap-2.5">
          {/* Left Column (Desktop: Under Accept button) */}
          <div className="flex items-center justify-start">
            <button
              type="button"
              onClick={handleShare}
              className="hover:text-[#0B2042] flex items-center gap-1 transition-colors cursor-pointer shrink-0 font-mono font-medium"
            >
              <Share2 className="w-3 h-3" />
              <span>{copiedLink ? "Copied!" : "Share link"}</span>
            </button>
          </div>

          {/* Right Column (Desktop: Directly under Reject button) */}
          <div className="flex items-center justify-end sm:justify-center min-w-0">
            <AnimatePresence>
              {rejectCount === 0 && !finalStep && (
                <motion.div
                  key="reject-curiosity-hint"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{
                    opacity: [0.92, 1, 0.92],
                    y: [0, -2, 0],
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex items-center gap-1.5 min-w-0 select-none"
                >
                  <span className="font-display font-medium text-[11px] sm:text-xs text-[#0B2042] tracking-tight truncate">
                    Psst… the other button is also worth considering. 👀
                  </span>
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    stroke="#FF6F61"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 -mt-0.5"
                    aria-hidden="true"
                  >
                    <path d="M3 13 C 7 14, 12 11, 12 3" />
                    <path d="M7 6 L 12 2 L 17 6" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </footer>
    </div>
  );
}
