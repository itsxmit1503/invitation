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
      <div className="w-full flex items-center justify-between text-xs tracking-wider uppercase text-[#A7B0AE] z-20">
        <button
          type="button"
          onClick={toggleSound}
          className="academic-tag flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[#A7B0AE] hover:text-[#F4F0E6] transition-colors cursor-pointer font-mono"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#607D8B]" />}
          <span className="hidden sm:inline text-[11px]">{isMuted ? "MUTED" : "AUDIO ON"}</span>
        </button>

        <button
          type="button"
          onClick={onComplete}
          className="academic-tag px-3.5 py-1.5 rounded-md text-[#A7B0AE] hover:text-[#F4F0E6] transition-all text-[11px] font-mono tracking-widest cursor-pointer"
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
              <div className="w-13 h-13 rounded-xl bg-[#202C34] border border-[#607D8B]/35 flex items-center justify-center mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                <GraduationCap className="w-7 h-7 text-[#607D8B]" />
              </div>

              <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#A7B0AE] font-semibold mb-3">
                [ ACADEMIC FELLOWSHIP ]
              </p>

              <h2 className="font-display text-lg sm:text-xl font-bold tracking-wide text-[#F4F0E6] uppercase max-w-sm mb-2">
                {invitation.department}
              </h2>

              <p className="text-sm font-body text-[#A7B0AE] tracking-wider mb-6">
                {invitation.universityName}
              </p>

              <GoldDivider className="max-w-[200px]" />

              <p className="font-display text-lg sm:text-xl text-[#F4F0E6] mt-4 font-semibold">
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
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#607D8B] mb-4">
                THE HERITAGE TRADITION
              </span>

              <h2 className="font-display text-3xl sm:text-4xl text-[#F4F0E6] font-extrabold leading-tight mb-4 uppercase tracking-tight">
                A Celebration of <br />
                <span className="text-[#607D8B]">Wisdom & New Horizons</span>
              </h2>

              <p className="text-sm text-[#A7B0AE] leading-relaxed max-w-xs font-light">
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
              <div className="w-12 h-12 rounded-xl bg-[#202C34] border border-[#607D8B]/35 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-[#607D8B]" />
              </div>

              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A7B0AE] mb-2 font-medium">
                ANNUAL WELCOMING CEREMONY
              </span>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F4F0E6] font-extrabold tracking-tight mb-3 uppercase">
                {invitation.eventName}
              </h1>

              {invitation.eventTheme && (
                <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-[#607D8B] mb-4">
                  Theme: {invitation.eventTheme}
                </p>
              )}

              <p className="text-sm text-[#A7B0AE] max-w-sm leading-relaxed">
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
              <p className="text-sm sm:text-base font-mono text-[#A7B0AE] mb-4 uppercase tracking-widest">
                [ INVITATION PREPARED ESPECIALLY FOR ]
              </p>

              {/* Dignified Recipient Card */}
              <div className="academic-card editorial-frame w-full py-8 px-6 rounded-2xl flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#607D8B]/60 to-transparent" />

                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#A7B0AE] mb-2 font-semibold px-3 py-1 rounded-md academic-tag">
                  Distinguished Faculty
                </span>

                <h2 className="font-display text-2xl sm:text-4xl text-[#F4F0E6] font-extrabold tracking-tight mb-2 break-words text-center px-2">
                  {invitation.recipientName}
                </h2>

                <div className="w-16 h-[1px] bg-white/10 my-2" />

                <p className="text-sm text-[#607D8B] font-semibold tracking-wide">
                  {invitation.designation}
                </p>

                <p className="text-xs text-[#A7B0AE] mt-1 font-medium">
                  {invitation.department}
                </p>
              </div>

              <p className="text-xs text-[#A7B0AE] mt-5 tracking-wide font-mono">
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
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#A7B0AE] mb-2 font-medium">
                [ OFFICIAL INVITATION ]
              </p>

              <h3 className="font-display text-xl sm:text-2xl text-[#F4F0E6] font-bold mb-2">
                {invitation.honorific || "Respected Sir"},
              </h3>

              <p className="text-sm text-[#A7B0AE] max-w-xs leading-relaxed mb-8 font-light">
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
                  ? "w-7 h-1.5 bg-[#607D8B] shadow-[0_0_6px_rgba(96,125,139,0.4)]"
                  : stepIdx < currentStep
                  ? "w-2 h-1.5 bg-[#A7B0AE]/50"
                  : "w-2 h-1.5 bg-white/10 hover:bg-white/25"
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
            className="btn-academic-primary flex items-center gap-2 px-7 py-3 rounded-xl font-display text-xs uppercase tracking-[0.18em] font-bold cursor-pointer"
          >
            <span>Continue</span>
            <ChevronRight className="w-4 h-4 text-[#F4F0E6]" />
          </motion.button>
        ) : (
          <p className="text-[11px] text-[#A7B0AE] font-mono tracking-widest uppercase">
            Awaiting your touch to unseal
          </p>
        )}
      </div>
    </div>
  );
}
