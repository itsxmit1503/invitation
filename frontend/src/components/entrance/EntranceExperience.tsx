"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationData } from "@/types/invitation";
import { fadeInRise } from "@/lib/motion";
import { sound } from "@/lib/sound";
import WaxSeal from "@/components/ui/WaxSeal";
import GoldDivider from "@/components/ui/GoldDivider";
import { ChevronRight, Volume2, VolumeX, GraduationCap } from "lucide-react";

interface EntranceExperienceProps {
  invitation: InvitationData;
  onComplete: () => void;
}

export default function EntranceExperience({
  invitation,
  onComplete,
}: EntranceExperienceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isUnsealing, setIsUnsealing] = useState(false);

  // Play gentle sound on step advancement
  useEffect(() => {
    if (currentStep === 0) {
      sound.playChime(440, 1.4);
    } else if (currentStep === 1) {
      sound.playChime(528, 1.4);
    } else if (currentStep === 2) {
      sound.playChime(660, 1.5);
    } else if (currentStep === 3) {
      // Emotional name reveal tone
      sound.playChime(587.33, 2.0);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleOpenInvite();
    }
  };

  const handleOpenInvite = () => {
    setIsUnsealing(true);
    sound.playChalo();
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="relative h-full max-h-full flex flex-col justify-between items-center px-4 py-3 sm:py-5 z-10 max-w-xl mx-auto w-full select-none overflow-hidden">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between text-xs tracking-wider uppercase z-20">
        <button
          type="button"
          onClick={toggleSound}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#0B2042] text-[#0B2042] hover:bg-[#FFE8E3] shadow-[0_1px_3px_rgba(11,32,66,0.08)] transition-all cursor-pointer font-mono font-medium"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#0B2042]" />}
          <span className="hidden sm:inline text-[11px]">{isMuted ? "MUTED" : "AUDIO ON"}</span>
        </button>

        <button
          type="button"
          onClick={onComplete}
          className="px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#0B2042] text-[#0B2042] hover:bg-[#FFE8E3] shadow-[0_1px_3px_rgba(11,32,66,0.08)] transition-all text-[11px] font-mono tracking-widest cursor-pointer font-medium"
        >
          SKIP INTRO →
        </button>
      </div>

      {/* Center Cinematic Stage */}
      <div className="flex-1 flex flex-col justify-center items-center w-full my-auto text-center py-6">
        <AnimatePresence mode="wait">
          {/* STEP 0: UNIVERSITY IDENTITY */}
          {currentStep === 0 && (
            <motion.div
              key="step-university"
              variants={fadeInRise}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center max-w-md"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0B2042] text-[#FFF2EF] flex items-center justify-center mb-6 shadow-[0_4px_16px_rgba(11,32,66,0.2)]">
                <GraduationCap className="w-7 h-7 text-[#FFF2EF]" />
              </div>

              <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#1E4E8B] font-bold mb-3">
                [ ACADEMIC FELLOWSHIP ]
              </p>

              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0B2042] uppercase max-w-sm mb-2">
                {invitation.department}
              </h2>

              <p className="text-sm font-body text-[#1E4E8B] font-semibold tracking-wider mb-6">
                {invitation.universityName}
              </p>

              <GoldDivider className="max-w-[200px]" />

              <p className="font-display text-lg sm:text-xl text-[#0B2042] mt-4 font-semibold">
                Cordially welcomes you to an esteemed gathering
              </p>
            </motion.div>
          )}

          {/* STEP 1: EVENT IDENTITY */}
          {currentStep === 1 && (
            <motion.div
              key="step-event"
              variants={fadeInRise}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center max-w-md"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#1E4E8B] font-bold mb-4">
                THE HERITAGE TRADITION
              </span>

              <h2 className="font-display text-3xl sm:text-4xl text-[#0B2042] font-extrabold leading-tight mb-4 uppercase tracking-tight">
                A Celebration of <br />
                <span className="text-[#1E4E8B]">Wisdom & New Horizons</span>
              </h2>

              <p className="text-sm text-[#0B2042] leading-relaxed max-w-xs font-normal">
                Honoring the mentors who illuminate the path, and embracing the curious minds taking their very first step.
              </p>

              <GoldDivider className="max-w-[180px] my-4" />
            </motion.div>
          )}

          {/* STEP 2: FRESHERS' WELCOME */}
          {currentStep === 2 && (
            <motion.div
              key="step-welcome"
              variants={fadeInRise}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center max-w-md"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0B2042] text-[#FFF2EF] flex items-center justify-center mb-4 shadow-[0_4px_16px_rgba(11,32,66,0.2)]">
                <GraduationCap className="w-7 h-7 text-[#FFF2EF]" />
              </div>

              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#1E4E8B] mb-2 font-bold">
                ANNUAL WELCOMING CEREMONY
              </span>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#0B2042] font-extrabold tracking-tight mb-3 uppercase">
                {invitation.eventName}
              </h1>

              {invitation.eventTheme && (
                <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-[#1E4E8B] font-semibold mb-4">
                  Theme: {invitation.eventTheme}
                </p>
              )}

              <p className="text-sm text-[#0B2042] max-w-sm leading-relaxed">
                The Batch of 2026 seeks your blessings, guidance, and presence as they embark on this formative chapter.
              </p>
            </motion.div>
          )}

          {/* STEP 3: PERSONALIZED RECIPIENT REVEAL */}
          {currentStep === 3 && (
            <motion.div
              key="step-recipient"
              variants={fadeInRise}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center max-w-md w-full"
            >
              <p className="text-sm sm:text-base font-mono text-[#1E4E8B] font-bold mb-4 uppercase tracking-widest">
                [ INVITATION PREPARED ESPECIALLY FOR ]
              </p>

              {/* Dignified Recipient Card */}
              <div className="academic-card w-full py-8 px-6 rounded-2xl flex flex-col items-center relative overflow-hidden bg-white border-2 border-[#0B2042] shadow-[0_8px_32px_rgba(11,32,66,0.08)]">
                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#1E4E8B] mb-2 font-bold px-3 py-1 rounded-md bg-[#FFF2EF] border border-[#0B2042]/20">
                  Distinguished Faculty
                </span>

                <h2 className="font-display text-2xl sm:text-4xl text-[#0B2042] font-extrabold tracking-tight mb-2 break-words text-center px-2">
                  {invitation.recipientName}
                </h2>

                <div className="w-16 h-[2px] bg-[#0B2042]/20 my-2" />

                <p className="text-sm text-[#1E4E8B] font-bold tracking-wide">
                  {invitation.designation}
                </p>

                <p className="text-xs text-[#0B2042] mt-1 font-medium">
                  {invitation.department}
                </p>
              </div>

              <p className="text-xs text-[#1E4E8B] mt-5 tracking-wide font-mono font-medium">
                Your presence completes our celebration.
              </p>
            </motion.div>
          )}

          {/* STEP 4: INVITATION MESSAGE & WAX SEAL */}
          {currentStep === 4 && (
            <motion.div
              key="step-seal"
              variants={fadeInRise}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center max-w-md w-full"
            >
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#1E4E8B] mb-2 font-bold">
                [ OFFICIAL INVITATION ]
              </p>

              <h3 className="font-display text-xl sm:text-2xl text-[#0B2042] font-bold mb-2">
                {invitation.honorific || "Respected Sir"},
              </h3>

              <p className="text-sm text-[#0B2042] max-w-xs leading-relaxed mb-8 font-normal">
                We humbly request the honor of your gracious presence as our esteemed guest.
              </p>

              {/* Interactive Embossed Seal to Unseal */}
              <motion.div
                animate={isUnsealing ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] } : {}}
                transition={{ duration: 0.8 }}
              >
                <WaxSeal 
                  onClick={handleOpenInvite}
                  isBreaking={isUnsealing}
                  label={invitation.eventName}
                  subLabel={isUnsealing ? "UNSEALING..." : "TAP SEAL TO OPEN"}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls & Step Dots */}
      <div className="w-full flex flex-col items-center gap-5 z-20">
        {/* Step Progress Indicators */}
        <div className="flex items-center gap-2" aria-label={`Step ${currentStep + 1} of 5`}>
          {[0, 1, 2, 3, 4].map((stepIdx) => (
            <button
              key={stepIdx}
              type="button"
              onClick={() => setCurrentStep(stepIdx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                stepIdx === currentStep
                  ? "w-7 h-1.5 bg-[#2F75C7] shadow-[0_1px_4px_rgba(47,117,199,0.3)]"
                  : stepIdx < currentStep
                  ? "w-2 h-1.5 bg-[#1E4E8B]/40"
                  : "w-2 h-1.5 bg-[#0B2042]/15 hover:bg-[#0B2042]/30"
              }`}
              aria-label={`Go to step ${stepIdx + 1}`}
            />
          ))}
        </div>

        {/* Action Button for Steps 0-3 */}
        {currentStep < 4 ? (
          <motion.button
            type="button"
            onClick={handleNext}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="btn-academic-primary flex items-center gap-2 px-8 py-3 rounded-xl font-display text-xs uppercase tracking-[0.18em] font-bold cursor-pointer"
          >
            <span>Continue</span>
            <ChevronRight className="w-4 h-4 text-[#FFF2EF]" />
          </motion.button>
        ) : (
          <p className="text-[11px] text-[#1E4E8B] font-mono tracking-widest uppercase font-semibold">
            Awaiting your touch to unseal
          </p>
        )}
      </div>
    </div>
  );
}
