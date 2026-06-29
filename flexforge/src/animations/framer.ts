"use client";

import { motion, Variants, Transition, HTMLMotionProps, AnimatePresenceProps } from "framer-motion";

// Animation variants

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.4 } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, x: -30, transition: { duration: 0.4 } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, x: 30, transition: { duration: 0.4 } },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4 } },
};

export const scaleInUp: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.4 } },
};

// Blur animations
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, filter: "blur(10px)", transition: { duration: 0.4 } },
};

// Stagger animations
export const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

// Card animations
export const cardVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

export const glassCardVariants: Variants = {
  rest: {
    backdropFilter: "blur(10px)",
    webkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    transition: { duration: 0.5 },
  },
  hover: {
    backdropFilter: "blur(20px)",
    webkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(0, 230, 118, 0.3)",
    boxShadow: "0 0 40px rgba(0, 230, 118, 0.1)",
    transition: { duration: 0.4 },
  },
};

// Button animations
export const buttonVariants: Variants = {
  rest: {
    scale: 1,
    transition: { duration: 0.3 },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export const magneticButtonVariants: Variants = {
  rest: {
    x: 0,
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 300 },
  },
  hover: {
    x: 5,
    y: -5,
    transition: { type: "spring", damping: 10, stiffness: 400 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// Glow animations
export const glowVariants: Variants = {
  rest: {
    boxShadow: "0 0 20px rgba(0, 230, 118, 0.3)",
    transition: { duration: 0.5 },
  },
  hover: {
    boxShadow: "0 0 40px rgba(0, 230, 118, 0.6)",
    transition: { duration: 0.4 },
  },
};

// Floating animation
export const floatVariants: Variants = {
  rest: {
    y: 0,
    transition: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
  },
  hover: {
    y: -20,
    transition: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
  },
};

// Particle animation
export const particleVariants: Variants = {
  initial: (i: number) => ({
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    opacity: Math.random() * 0.5 + 0.2,
    scale: Math.random() * 0.5 + 0.5,
  }),
  animate: (i: number) => ({
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100,
    opacity: [0.2, 0.5, 0.2],
    scale: [0.5, 1, 0.5],
    transition: {
      duration: 4 + Math.random() * 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: Math.random() * 2,
    },
  }),
};

// Text animations
export const textContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

export const textItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

// Image animations
export const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.4 },
  },
};

// Progress animations
export const progressVariants: Variants = {
  hidden: { width: "0%" },
  visible: (progress: number) => ({
    width: `${progress}%`,
    transition: { duration: 1, ease: "easeOut" },
  }),
};

// Circle animations
export const circleVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" },
  },
};

// Loading animations
export const loadingVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [0.8, 1.2, 0.8],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
};

// Spinner animation
export const spinnerVariants: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: "linear" },
  },
};

// Pulse animation
export const pulseVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.5, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

// Shake animation
export const shakeVariants: Variants = {
  rest: { x: 0 },
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },
};

// Bounce animation
export const bounceVariants: Variants = {
  rest: { y: 0 },
  bounce: {
    y: [0, -20, 0, -10, 0],
    transition: { duration: 1, ease: "easeOut" },
  },
};

// Transition presets
export const transitionPresets: Record<string, Transition> = {
  default: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  fast: { duration: 0.3, ease: "easeOut" },
  slow: { duration: 1, ease: [0.4, 0, 0.2, 1] },
  spring: { type: "spring", damping: 25, stiffness: 500 },
  bounce: { type: "spring", damping: 10, stiffness: 300 },
  smooth: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
};

// Custom motion components
export const MotionDiv = motion.div;
export const MotionSpan = motion.span;
export const MotionP = motion.p;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const MotionButton = motion.button;
export const MotionSection = motion.section;
export const MotionDivWithProps = motion.div as React.ComponentType<HTMLMotionProps<"div">>;

// AnimatePresence with custom props
export const CustomAnimatePresence: React.ComponentType<AnimatePresenceProps> = AnimatePresence;

// Animation utilities
export const animateOnScroll = (threshold: number = 0.1) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, threshold },
});

export const animateOnHover = {
  initial: "rest",
  whileHover: "hover",
  whileTap: "tap",
};

export const animateOnFocus = {
  initial: "rest",
  whileFocus: "hover",
};

// Export all variants
export const variants = {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleInUp,
  blurIn,
  container,
  item,
  cardVariants,
  glassCardVariants,
  buttonVariants,
  magneticButtonVariants,
  glowVariants,
  floatVariants,
  particleVariants,
  textContainer,
  textItem,
  imageVariants,
  progressVariants,
  circleVariants,
  loadingVariants,
  spinnerVariants,
  pulseVariants,
  shakeVariants,
  bounceVariants,
};
