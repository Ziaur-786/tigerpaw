"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { cn, formatNumber } from "@/utils";
import { BRAND, COLORS, WORKOUT_PROGRAMS, TRAINERS } from "@/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

// Register GSAP plugin
gsap.registerPlugin(TextPlugin);

// Animated headline component
function AnimatedHeadline() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!headlineRef.current || typeof window === "undefined") return;

    const headline = headlineRef.current;
    const text = headline.textContent || "";

    // Split text into words
    const words = text.split(/(\s+)/);
    headline.innerHTML = words
      .map((word) => (word.trim() ? `<span class="word">${word}</span>` : word))
      .join("");

    // Animate each word
    const wordElements = headline.querySelectorAll(".word");
    wordElements.forEach((word, index) => {
      gsap.from(word, {
        opacity: 0,
        y: 50,
        rotateX: 90,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
      });
    });

    // Animate subtitle
    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: words.length * 0.1 + 0.2,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <div className="text-center">
      <motion.h1
        ref={headlineRef}
        className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Transform Your Body Into Your Greatest Investment
      </motion.h1>
      <motion.p
        ref={subtitleRef}
        className="mt-6 text-xl md:text-2xl text-secondary-text max-w-3xl mx-auto font-medium"
      >
        Personalized workouts, nutrition plans and science-backed coaching.
      </motion.p>
    </div>
  );
}

// Floating particles component
function FloatingParticles() {
  const particles = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particles.current || typeof window === "undefined") return;

    const container = particles.current;
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 rounded-full bg-accent opacity-30";

      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 4 + 2;
      const animationDelay = Math.random() * 5;
      const animationDuration = Math.random() * 10 + 10;

      particle.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${animationDelay}s;
        animation-duration: ${animationDuration}s;
      `;

      particle.classList.add("animate-particle-float");
      container.appendChild(particle);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div
      ref={particles}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    />
  );
}

// Glowing sphere component
function GlowingSphere() {
  const sphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sphereRef.current || typeof window === "undefined") return;

    const sphere = sphereRef.current;

    // Animate glow
    gsap.to(sphere, {
      boxShadow: [
        "0 0 30px rgba(0, 230, 118, 0.3)",
        "0 0 60px rgba(0, 230, 118, 0.5)",
        "0 0 30px rgba(0, 230, 118, 0.3)",
      ],
      duration: 3,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Float animation
    gsap.to(sphere, {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      ref={sphereRef}
      className="absolute w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-accent via-[#4ECDC4] to-[#00E676] rounded-full opacity-20 blur-2xl"
    />
  );
}

// Stats ticker component
function StatsTicker() {
  const [stats, setStats] = useState({
    members: 0,
    programs: 0,
    trainers: 0,
    transformations: 0,
  });

  const finalStats = {
    members: 50000,
    programs: 24,
    trainers: 16,
    transformations: 5000,
  };

  useEffect(() => {
    const animateStats = () => {
      const duration = 2;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);

        const easeProgress = 1 - Math.pow(1 - progress, 3);

        setStats({
          members: Math.round(finalStats.members * easeProgress),
          programs: Math.round(finalStats.programs * easeProgress),
          trainers: Math.round(finalStats.trainers * easeProgress),
          transformations: Math.round(finalStats.transformations * easeProgress),
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    // Trigger animation when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const ticker = document.querySelector(".stats-ticker");
    if (ticker) {
      observer.observe(ticker);
    }

    return () => {
      if (ticker) {
        observer.unobserve(ticker);
      }
    };
  }, []);

  return (
    <div className="stats-ticker relative w-full overflow-hidden py-8">
      <div className="flex items-center justify-center gap-8 md:gap-16 lg:gap-24">
        {[
          { label: "Members", value: stats.members, suffix: "+ " },
          { label: "Programs", value: stats.programs },
          { label: "Trainers", value: stats.trainers },
          { label: "Transformations", value: stats.transformations, suffix: "+ " },
        ].map((stat, index) => (
          <div key={stat.label} className="text-center">
            <motion.p
              className="text-4xl md:text-5xl lg:text-6xl font-black text-accent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {formatNumber(stat.value)}
              {stat.suffix}
            </motion.p>
            <p className="text-sm text-secondary-text mt-1 font-medium tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// CTA Buttons component
function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
      <Button
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
        motionProps={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.4 },
        }}
      >
        Start Training
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full sm:w-auto"
        motionProps={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.5 },
        }}
      >
        Explore Plans
      </Button>
    </div>
  );
}

// Scroll indicator component
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <motion.div
        className="w-6 h-10 border-2 border-accent rounded-full relative"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.div
          className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-accent rounded-full"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      <span className="text-xs text-secondary-text font-medium tracking-widest uppercase">
        Scroll Down
      </span>
    </motion.div>
  );
}

// Mouse follower for desktop
function MouseFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed w-64 h-64 rounded-full bg-gradient-to-r from-accent via-[#4ECDC4] to-transparent opacity-5 blur-3xl pointer-events-none hidden md:block"
      style={{
        x: position.x - 128,
        y: position.y - 128,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Main Hero section component
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16"
      style={{ background: `radial-gradient(ellipse at center, rgba(0, 230, 118, 0.05) 0%, ${COLORS.background} 70%)` }}
    >
      {/* Mouse follower effect */}
      <MouseFollower />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Glowing spheres */}
      <GlowingSphere />

      {/* Hero content */}
      <Container className="relative z-10">
        <motion.div
          className="relative max-w-5xl mx-auto text-center"
          style={{ opacity, scale }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Brand tagline */}
          <motion.p
            className="text-accent font-bold text-sm md:text-base tracking-[0.3em] mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {BRAND.tagline}
          </motion.p>

          {/* Animated headline */}
          <AnimatedHeadline />

          {/* CTA Buttons */}
          <CTAButtons />

          {/* Stats Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <StatsTicker />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </Container>
    </section>
  );
}
