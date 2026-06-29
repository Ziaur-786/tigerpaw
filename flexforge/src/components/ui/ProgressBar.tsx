"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScroll, useMotionValue, useSpring } from "framer-motion";

/**
 * Progress Bar Component
 * Shows reading/scroll progress at the top of the page
 */
export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth the progress value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Show/hide based on scroll direction
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsVisible(currentScrollY > 100);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="progress-bar"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 4 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="progress-bar-fill"
        style={{ scaleX: smoothProgress, transformOrigin: "left" }}
      />
    </motion.div>
  );
}

/**
 * Circular Progress Component
 * Used for stats, skills, etc.
 */
interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  indicatorColor?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function CircularProgress({
  value,
  max,
  size = 100,
  strokeWidth = 8,
  trackColor = "rgba(255, 255, 255, 0.08)",
  indicatorColor = "#00E676",
  showValue = true,
  valueFormatter = (v) => `${Math.round(v)}%`,
  className = "",
}: CircularProgressProps) {
  const percentage = (value / max) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        className="absolute"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />

        {/* Indicator */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={indicatorColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>

      {/* Value */}
      {showValue && (
        <motion.span
          className="absolute text-center font-bold text-accent"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {valueFormatter(percentage)}
        </motion.span>
      )}
    </div>
  );
}

/**
 * Linear Progress Bar Component
 * Used for progress tracking
 */
interface LinearProgressProps {
  value: number;
  max: number;
  height?: number;
  trackColor?: string;
  indicatorColor?: string;
  rounded?: boolean;
  showValue?: boolean;
  valueFormatter?: (value: number, max: number) => string;
  className?: string;
}

export function LinearProgress({
  value,
  max,
  height = 8,
  trackColor = "rgba(255, 255, 255, 0.08)",
  indicatorColor = "#00E676",
  rounded = true,
  showValue = false,
  valueFormatter = (v, m) => `${Math.round((v / m) * 100)}%`,
  className = "",
}: LinearProgressProps) {
  const percentage = (value / max) * 100;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Track */}
      <div
        className="w-full bg-[rgba(255,255,255,0.08)]"
        style={{ height, borderRadius: rounded ? height / 2 : 0 }}
      />

      {/* Indicator */}
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-[#4ECDC4]"
        style={{
          width: `${percentage}%`,
          borderRadius: rounded ? height / 2 : 0,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Value */}
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
          {valueFormatter(value, max)}
        </div>
      )}
    </div>
  );
}

/**
 * Skill Bar Component
 * Used for displaying skill levels
 */
interface SkillBarProps {
  name: string;
  value: number;
  max?: number;
  color?: string;
  className?: string;
}

export function SkillBar({
  name,
  value,
  max = 100,
  color = "#00E676",
  className = "",
}: SkillBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-secondary-text">{name}</span>
        <span className="text-sm font-bold text-accent">{Math.round(percentage)}%</span>
      </div>
      <LinearProgress
        value={value}
        max={max}
        height={6}
        indicatorColor={color}
        rounded
      />
    </div>
  );
}
