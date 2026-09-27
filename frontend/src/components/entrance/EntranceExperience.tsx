"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationData } from "@/types/invitation";
import { fadeInRise, EASE_EXPO } from "@/lib/motion";
import { sound } from "@/lib/sound";
import WaxSeal from "@/components/ui/WaxSeal";
import GoldDivider from "@/components/ui/GoldDivider";
import { ChevronRight, Volume2, VolumeX, Landmark, GraduationCap } from "lucide-react";

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
    <div className="relative min-h-screen flex flex-col justify-between items-center px-4 py-8 sm:py-12 z-10 max-w-xl mx-auto w-full select-none">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between text-xs tracking-wider uppercase text-[#C5BEB3] z-20">
        <button
          type="button"
          onClick={toggleSound}
          className="tactile-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[#C5BEB3] hover:text-[#E8C878] transition-colors cursor-pointer"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
          <span className="hidden sm:inline text-[11px]">{isMuted ? "Muted" : "Chime"}</span>
        </button>

        <button
          type="button"
          onClick={onComplete}
          className="tactile-pill px-3.5 py-1.5 rounded-full text-[#9E9588] hover:text-[#FDFBF7] transition-all text-[11px] tracking-widest cursor-pointer"
        >
          Skip Intro →
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
              <div className="w-14 h-14 rounded-full bg-[#171513] border border-[#D4AF37]/30 flex items-center justify-center mb-6 shadow-[0_4px_20px_rgba(212,175,55,0.12)]">
                <Landmark className="w-7 h-7 text-[#E8C878]" />
              </div>

              <p className="text-[12px] uppercase tracking-[0.35em] text-[#D4AF37] font-medium mb-3">
                Academic Fellowship
              </p>

              <h2 className="font-accent text-lg sm:text-xl font-semibold tracking-wide text-[#FDFBF7] uppercase max-w-sm mb-2">
                {invitation.department}
              </h2>

              <p className="text-sm font-light text-[#A39E93] tracking-wider mb-6">
                {invitation.universityName}
              </p>

              <GoldDivider className="max-w-[200px]" />

              <p className="font-display italic text-lg sm:text-xl text-[#DFBA73] mt-4">
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
              <span className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37] mb-4">
                The Heritage Tradition
              </span>

              <h2 className="font-display text-3xl sm:text-4xl text-[#FDFBF7] font-normal leading-tight mb-4">
                A Celebration of <br />
                <span className="italic gold-foil-text font-serif">Wisdom & New Horizons</span>
              </h2>

              <p className="text-sm text-[#C5BEB3] leading-relaxed max-w-xs font-light">
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
              <div className="w-12 h-12 rounded-full bg-[#181613] border border-[#D4AF37]/35 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-[#E8C878]" />
              </div>

              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-2 font-medium">
                Annual Welcoming Ceremony
              </span>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FDFBF7] font-semibold tracking-wide mb-3">
                {invitation.eventName}
              </h1>

              {invitation.eventTheme && (
                <p className="font-accent text-xs sm:text-sm uppercase tracking-[0.25em] text-[#DFBA73] mb-4">
                  Theme: {invitation.eventTheme}
                </p>
              )}

              <p className="text-sm text-[#A39E93] max-w-sm leading-relaxed">
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
              <p className="text-sm sm:text-base font-display italic text-[#DFBA73] mb-4">
                And this invitation is especially for...
              </p>

              {/* Dignified Recipient Card */}
              <div className="tactile-card ornate-border w-full py-7 px-6 rounded-2xl flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

                <span className="text-[11px] font-accent uppercase tracking-[0.28em] text-[#E8C878] mb-2 font-semibold px-3 py-1 rounded-full tactile-pill">
                  Distinguished Faculty
                </span>

                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#FDFBF7] font-bold tracking-tight mb-2">
                  {invitation.recipientName}
                </h2>

                <div className="w-16 h-[1px] bg-[#D4AF37]/40 my-2" />

                <p className="text-sm text-[#F6E3B4] font-medium tracking-wide">
                  {invitation.designation}
                </p>

                <p className="text-xs text-[#A39E93] mt-1 font-light">
                  {invitation.department}
                </p>
              </div>

              <p className="text-xs text-[#C5BEB3] mt-5 tracking-wide italic font-light">
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
              <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] mb-2 font-medium">
                Official Invitation
              </p>

              <h3 className="font-display text-xl sm:text-2xl text-[#FDFBF7] mb-2">
                {invitation.honorific || "Respected Professor"},
              </h3>

              <p className="text-sm text-[#C5BEB3] max-w-xs leading-relaxed mb-8 font-light">
                We humbly request the honor of your gracious presence as our esteemed guest.
              </p>

              {/* Interactive Wax Seal to Unseal */}
              <motion.div
                animate={isUnsealing ? { scale: [1, 1.25, 0], opacity: [1, 1, 0] } : {}}
                transition={{ duration: 0.8, ease: EASE_EXPO }}
              >
                <WaxSeal 
                  onClick={handleOpenInvite}
                  isBreaking={isUnsealing}
                  label={invitation.eventName}
                  subLabel={isUnsealing ? "Unsealing..." : "Tap Seal to Open"}
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
                  ? "w-7 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#F6E3B4] shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                  : stepIdx < currentStep
                  ? "w-2 h-1.5 bg-[#D4AF37]/50"
                  : "w-2 h-1.5 bg-white/15 hover:bg-white/30"
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
            className="btn-tactile-secondary flex items-center gap-2 px-7 py-3 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold cursor-pointer"
          >
            <span>Continue</span>
            <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
          </motion.button>
        ) : (
          <p className="text-[11px] text-[#9E9588] tracking-widest uppercase">
            Awaiting your touch to unseal
          </p>
        )}
      </div>
    </div>
  );
}
