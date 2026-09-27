"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InvitationData } from "@/types/invitation";
import EntranceExperience from "@/components/entrance/EntranceExperience";
import MainInvitation from "@/components/invitation/MainInvitation";
import AcceptCelebration from "@/components/celebration/AcceptCelebration";
import AmbientBackdrop from "@/components/ui/AmbientBackdrop";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { EASE_EXPO } from "@/lib/motion";

interface InvitationExperienceProps {
  initialInvitation: InvitationData;
}

export default function InvitationExperience({
  initialInvitation,
}: InvitationExperienceProps) {
  const [invitation, setInvitation] = useState<InvitationData>(initialInvitation);
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  const handleEntranceComplete = () => {
    setHasEntered(true);
  };

  const handleAccept = () => {
    setIsAccepted(true);
    setInvitation((prev) => ({
      ...prev,
      accepted: true,
      acceptedAt: new Date().toISOString(),
    }));
  };

  const handleRejectStateChange = (count: number) => {
    setInvitation((prev) => ({
      ...prev,
      rejectCount: count,
    }));
  };

  return (
    <div className="relative h-[100svh] max-h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden p-2 sm:p-3 lg:p-4">
      {/* Layer 1: Atmospheric Ambient Depth */}
      <AmbientBackdrop />

      {/* Layer 2: Tactile Paper Grain Overlay */}
      <GrainOverlay />

      {/* Dynamic Storytelling Stages */}
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="entrance-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="w-full h-full flex flex-col justify-center items-center overflow-hidden"
          >
            <EntranceExperience
              invitation={invitation}
              onComplete={handleEntranceComplete}
            />
          </motion.div>
        ) : isAccepted ? (
          <motion.div
            key="celebration-stage"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="w-full h-full flex flex-col justify-center items-center overflow-hidden"
          >
            <AcceptCelebration
              invitation={invitation}
              onViewDetails={() => setIsAccepted(false)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="invitation-stage"
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="w-full h-full flex flex-col justify-center items-center overflow-hidden"
          >
            <MainInvitation
              invitation={invitation}
              onAccept={handleAccept}
              onRejectStateChange={handleRejectStateChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
