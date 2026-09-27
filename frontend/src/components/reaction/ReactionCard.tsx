"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactionItem, REJECTION_REACTIONS, FINAL_PUNCHLINE_MEME } from "@/data/rejectionReactions";
import { MessageCircleQuestion, AlertCircle, Compass } from "lucide-react";

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

  // Animation settings: 550ms smooth transition
  const transitionConfig = {
    duration: 0.55,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <div className="w-full h-full max-h-full min-h-0 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {/* FINAL STEP: PUNCHLINE "AAPKO AB AANA HI PADEGA. 😭" */}
        {finalStep === "aana_hi_padega" ? (
          <motion.div
            key="final-aana-hi-padega"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14 }}
            transition={transitionConfig}
            className="w-full h-full max-h-full rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 bg-[#1C2126] border-2 border-[#4E7475] relative overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.85)] flex flex-col justify-between items-center text-center academic-card-elevated"
          >
            {/* Top teal calibration line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#4E7475] to-transparent" />

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md academic-tag-teal text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4E7475]" />
              Official Consensus Reached
            </div>

            <div className="my-0.5">
              <h2 className="font-display text-base sm:text-xl lg:text-2xl text-[#F3F1EA] font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                AAPKO AB AANA HI PADEGA. 😭
              </h2>

              <p className="text-[11px] sm:text-xs text-[#79A7A8] font-mono tracking-wide mt-0.5">
                Ab aapke paas koi aur option nahi hai. 🙂
              </p>
            </div>

            {/* Final Punchline Meme Image (Responsive Aspect-Preserved Slot) */}
            <div className="my-1 w-full flex-1 min-h-0 flex items-center justify-center rounded-lg academic-inset p-1.5 sm:p-2 overflow-hidden border border-white/8 bg-[#0E1113]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FINAL_PUNCHLINE_MEME}
                alt="Ab aapko aana hi padega"
                loading="eager"
                className="max-h-[16svh] sm:max-h-[20svh] md:max-h-[22svh] lg:max-h-[26svh] w-auto max-w-full object-contain rounded-md"
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
            className="w-full h-full max-h-full rounded-xl sm:rounded-2xl p-4 sm:p-6 academic-card relative overflow-hidden flex flex-col justify-center items-center text-center border border-white/10"
          >
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#4E7475]/60 to-transparent" />

            <span className="inline-block px-2.5 py-0.5 rounded-md academic-tag-coral text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] font-semibold mb-3">
              [ FINAL SEQUENCE ]
            </span>

            {finalStep === "theek_hai" && (
              <p className="font-display text-lg sm:text-2xl text-[#F3F1EA] font-semibold italic">
                &ldquo;Theek hai...&rdquo;
              </p>
            )}

            {finalStep === "kaafi_mauke" && (
              <p className="font-display text-base sm:text-xl text-[#F3F1EA] font-semibold leading-relaxed">
                &ldquo;Humne aapko kaafi mauke de diye.&rdquo;
              </p>
            )}

            {finalStep === "kaafi_baar_mana" && (
              <p className="font-display text-base sm:text-xl text-[#F3F1EA] font-semibold leading-relaxed">
                &ldquo;Aur aapne humein kaafi baar mana bhi diya.&rdquo;
              </p>
            )}

            {finalStep === "koshish_kar_li" && (
              <p className="font-display text-base sm:text-xl text-[#F3F1EA] font-semibold leading-relaxed">
                &ldquo;Aapne reject karne ki poori koshish kar li.&rdquo;
              </p>
            )}

            {finalStep === "manane_ki_koshish" && (
              <p className="font-display text-base sm:text-xl text-[#F3F1EA] font-semibold leading-relaxed">
                &ldquo;Humne manane ki poori koshish kar li.&rdquo;
              </p>
            )}

            {finalStep === "ab_lagta_hai" && (
              <p className="font-display text-lg sm:text-2xl text-[#4E7475] font-bold italic">
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
            className={`w-full h-full max-h-full rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 relative overflow-hidden flex flex-col justify-between ${
              reaction.isMajorComedicMoment
                ? "academic-card-elevated border-2 border-[#4E7475]"
                : "academic-card border border-white/10"
            }`}
          >
            {/* Top calibration accent line */}
            <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent ${
              reaction.isMajorComedicMoment ? "via-[#4E7475]" : "via-[#788B78]/50"
            } to-transparent`} />

            {/* Header Tag & Counter */}
            <div className="flex items-center justify-between gap-2 mb-1.5 shrink-0">
              <span className={`inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] font-semibold px-2 py-0.5 rounded-md ${
                reaction.isMajorComedicMoment
                  ? "academic-tag-teal font-bold"
                  : "academic-tag"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E7475]" />
                {reaction.stageTag || "Faculty Appeal"}
              </span>

              <span className="text-[10px] sm:text-[11px] tracking-wider text-[#8A949E] font-mono px-2 py-0.5 rounded-md bg-[#121417] border border-white/5">
                ATTEMPT #{rejectCount} OF {REJECTION_REACTIONS.length}
              </span>
            </div>

            {/* Primary Witty Message */}
            <div className="flex items-start gap-2 shrink-0">
              <div className={`mt-0.5 p-1 rounded-md border shrink-0 hidden xs:flex shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${
                reaction.isMajorComedicMoment
                  ? "bg-[#1E262B] border-[#4E7475]/45 text-[#79A7A8]"
                  : "bg-[#171D22] border-white/10 text-[#788B78]"
              }`}>
                {reaction.isMajorComedicMoment ? (
                  <AlertCircle className="w-3.5 h-3.5 text-[#C77C67]" />
                ) : (
                  <MessageCircleQuestion className="w-3.5 h-3.5" />
                )}
              </div>

              <div className="min-w-0">
                <p className={`font-display text-xs sm:text-sm lg:text-base font-bold leading-snug truncate sm:whitespace-normal ${
                  reaction.isMajorComedicMoment ? "text-[#F3F1EA] sm:text-base lg:text-lg" : "text-[#F3F1EA]"
                }`}>
                  &ldquo;{reaction.message}&rdquo;
                </p>

                {reaction.subtext && (
                  <p className="text-[10px] sm:text-xs text-[#8A949E] mt-0.5 font-normal line-clamp-1 sm:line-clamp-2">
                    {reaction.subtext}
                  </p>
                )}
              </div>
            </div>

            {/* Responsive Meme Image Slot with Full Aspect Preservation (object-contain in academic-inset) */}
            {reaction.memeUrl && (
              <div className="my-1 sm:my-1.5 w-full flex-1 min-h-0 flex items-center justify-center rounded-lg academic-inset p-1 sm:p-2 overflow-hidden border border-white/6 bg-[#0E1113]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={reaction.memeUrl}
                  alt={`Reaction meme for attempt ${rejectCount}`}
                  loading="eager"
                  className="max-h-[16svh] sm:max-h-[20svh] md:max-h-[22svh] lg:max-h-[26svh] w-auto max-w-full object-contain rounded-md"
                />
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
