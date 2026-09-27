import { Variants, Transition } from "framer-motion";

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;
export const EASE_DECEL = [0, 0, 0.2, 1] as const;

export const transitionSmooth: Transition = {
  duration: 0.8,
  ease: EASE_EXPO,
};

export const transitionSpring = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

export const transitionGentle = {
  duration: 1.2,
  ease: EASE_SMOOTH,
};

// Cinematic reveal variants
export const fadeInRise: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: EASE_EXPO,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: "blur(3px)",
    transition: {
      duration: 0.5,
      ease: EASE_SMOOTH,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

export const tactileCardVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: EASE_EXPO,
    },
  },
};

export const waxSealVariant: Variants = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASE_EXPO,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.4)",
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.94,
  },
};
