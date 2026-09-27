"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactionItem, REJECTION_REACTIONS, FINAL_PUNCHLINE_MEME } from "@/data/rejectionReactions";
import { Sparkles, MessageCircleQuestion, Shield, AlertCircle } from "lucide-react";

export type FinalStepType = 
  | "theek_hai"
  | "kaafi_mauke"
  | "kaafi_baar_mana"
  | "koshish_kar_li"
  | "manane_ki_koshish"
  | "ab_lagta_hai"
  | "aana_hi_padega";

interface ReactionCardProps {
  reaction: ReactionItem | null;
  rejectCount: number;
  finalStep?: FinalStepType | null;
}

export default function ReactionCard({ 
  reaction, 
  rejectCount, 
  finalStep 
}: ReactionCardProps) {
  // If no rejection has occurred yet and not in final step, don't show
  if (!finalStep && (!reaction || rejectCount === 0)) {
    return null;
  }

  // Animation settings: 500-600ms smooth transition
  const transitionConfig = {
    duration: 0.55,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <div className="w-full max-w-xl mx-auto my-4 min-h-[145px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {/* FINAL STEP: PUNCHLINE "AAPKO AB AANA HI PADEGA. 😭" */}
        {finalStep === "aana_hi_padega" ? (
          <motion.div
            key="final-aana-hi-padega"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14 }}
            transition={transitionConfig}
            className="w-full rounded-2xl p-6 sm:p-7 bg-[#1c1814] border-2 border-[#D4AF37] relative overflow-hidden shadow-[0_20px_45px_-8px_rgba(0,0,0,0.85)] text-center tactile-card-raised"
          >
            {/* Top gold ribbon accent */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#E8C878] to-transparent" />

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full tactile-pill text-[10px] sm:text-[11px] font-accent uppercase tracking-[0.25em] text-[#E8C878] font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Official Consensus Reached
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#FDFBF7] font-extrabold tracking-tight mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              AAPKO AB AANA HI PADEGA. 😭
            </h2>

            <p className="text-sm sm:text-base text-[#E8C878] font-medium tracking-wide mt-2">
              Ab aapke paas koi aur option nahi hai. 🙂
            </p>

            {/* Final Punchline Meme Image (Fully Contained in tactile inset) */}
            <div className="mt-5 w-full flex items-center justify-center rounded-xl tactile-inset p-3 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FINAL_PUNCHLINE_MEME}
                alt="Ab aapko aana hi padega"
                loading="eager"
                className="max-h-[220px] sm:max-h-[280px] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </motion.div>
        ) : finalStep ? (
          /* FINAL INTERMEDIATE TRANSITION STEPS */
          <motion.div
            key={`final-step-${finalStep}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={transitionConfig}
            className="w-full rounded-2xl p-7 tactile-card relative overflow-hidden text-center"
          >
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

            <span className="inline-block px-3 py-0.5 rounded-full tactile-pill text-[10px] font-accent uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-3">
              Final Sequence
            </span>

            {finalStep === "theek_hai" && (
              <p className="font-display text-2xl sm:text-3xl text-[#FDFBF7] font-medium italic">
                &ldquo;Theek hai...&rdquo;
              </p>
            )}

            {finalStep === "kaafi_mauke" && (
              <p className="font-display text-xl sm:text-2xl text-[#FDFBF7] font-medium leading-relaxed">
                &ldquo;Humne aapko kaafi mauke de diye.&rdquo;
              </p>
            )}

            {finalStep === "kaafi_baar_mana" && (
              <p className="font-display text-xl sm:text-2xl text-[#FDFBF7] font-medium leading-relaxed">
                &ldquo;Aur aapne humein kaafi baar mana bhi diya.&rdquo;
              </p>
            )}

            {finalStep === "koshish_kar_li" && (
              <p className="font-display text-xl sm:text-2xl text-[#FDFBF7] font-medium leading-relaxed">
                &ldquo;Aapne reject karne ki poori koshish kar li.&rdquo;
              </p>
            )}

            {finalStep === "manane_ki_koshish" && (
              <p className="font-display text-xl sm:text-2xl text-[#FDFBF7] font-medium leading-relaxed">
                &ldquo;Humne manane ki poori koshish kar li.&rdquo;
              </p>
            )}

            {finalStep === "ab_lagta_hai" && (
              <p className="font-display text-2xl sm:text-3xl text-[#E8C878] font-serif italic">
                &ldquo;Ab lagta hai...&rdquo;
              </p>
            )}
          </motion.div>
        ) : reaction ? (
          /* STANDARD PROGRESSION ATTEMPTS */
          <motion.div
            key={reaction.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={transitionConfig}
            className={`w-full rounded-2xl p-5 sm:p-6 relative overflow-hidden ${
              reaction.isMajorComedicMoment
                ? "tactile-card-raised border-2 border-[#D4AF37]"
                : "tactile-card"
            }`}
          >
            {/* Top gold trim */}
            <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent ${
              reaction.isMajorComedicMoment ? "via-[#F6E3B4]" : "via-[#D4AF37]/50"
            } to-transparent`} />

            {/* Header Tag & Counter */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-accent uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded-full tactile-pill ${
                reaction.isMajorComedicMoment
                  ? "text-[#F6E3B4] border-[#D4AF37]/60"
                  : "text-[#E8C878]"
              }`}>
                {reaction.isMajorComedicMoment ? (
                  <Shield className="w-3.5 h-3.5 text-[#E8C878]" />
                ) : (
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                )}
                {reaction.stageTag || "Faculty Appeal"}
              </span>

              <span className="text-[11px] tracking-wider text-[#A39E93] font-mono px-2 py-0.5 rounded-md bg-[#11100E] border border-[#D4AF37]/15">
                Attempt #{rejectCount} of {REJECTION_REACTIONS.length}
              </span>
            </div>

            {/* Primary Witty Message */}
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 p-1.5 rounded-lg border shrink-0 hidden xs:flex shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${
                reaction.isMajorComedicMoment
                  ? "bg-[#292015] border-[#D4AF37]/45 text-[#F6E3B4]"
                  : "bg-[#1C1814] border-[#D4AF37]/20 text-[#E8C878]"
              }`}>
                {reaction.isMajorComedicMoment ? (
                  <AlertCircle className="w-4 h-4 text-[#D4AF37]" />
                ) : (
                  <MessageCircleQuestion className="w-4 h-4" />
                )}
              </div>

              <div>
                <p className={`font-display text-lg sm:text-xl font-medium leading-snug ${
                  reaction.isMajorComedicMoment ? "text-[#FFF6E0] font-semibold text-xl sm:text-2xl" : "text-[#FDFBF7]"
                }`}>
                  &ldquo;{reaction.message}&rdquo;
                </p>

                {reaction.subtext && (
                  <p className="text-xs sm:text-sm text-[#C5BEB3] mt-2 font-light leading-relaxed">
                    {reaction.subtext}
                  </p>
                )}
              </div>
            </div>

            {/* Responsive Meme Image Slot with Full Aspect Preservation (object-contain in tactile-inset) */}
            {reaction.memeUrl && (
              <div className="mt-4 w-full flex items-center justify-center rounded-xl tactile-inset p-2.5 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={reaction.memeUrl}
                  alt={`Reaction meme for attempt ${rejectCount}`}
                  loading="eager"
                  className="max-h-[220px] sm:max-h-[280px] w-auto max-w-full object-contain rounded-lg"
                />
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
