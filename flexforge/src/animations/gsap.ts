"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, SplitText);

// Animation presets
export const fadeIn = (targets: gsap.TweenTarget, duration: number = 0.8, delay: number = 0) => {
  return gsap.from(targets, {
    opacity: 0,
    duration,
    delay,
    ease: "power3.out",
  });
};

export const fadeOut = (targets: gsap.TweenTarget, duration: number = 0.6) => {
  return gsap.to(targets, {
    opacity: 0,
    duration,
    ease: "power3.in",
  });
};

export const slideUp = (targets: gsap.TweenTarget, duration: number = 0.8, delay: number = 0, distance: number = 30) => {
  return gsap.from(targets, {
    y: distance,
    opacity: 0,
    duration,
    delay,
    ease: "power3.out",
  });
};

export const slideDown = (targets: gsap.TweenTarget, duration: number = 0.8, delay: number = 0, distance: number = 30) => {
  return gsap.from(targets, {
    y: -distance,
    opacity: 0,
    duration,
    delay,
    ease: "power3.out",
  });
};

export const slideLeft = (targets: gsap.TweenTarget, duration: number = 0.8, delay: number = 0, distance: number = 30) => {
  return gsap.from(targets, {
    x: -distance,
    opacity: 0,
    duration,
    delay,
    ease: "power3.out",
  });
};

export const slideRight = (targets: gsap.TweenTarget, duration: number = 0.8, delay: number = 0, distance: number = 30) => {
  return gsap.from(targets, {
    x: distance,
    opacity: 0,
    duration,
    delay,
    ease: "power3.out",
  });
};

export const scaleIn = (targets: gsap.TweenTarget, duration: number = 0.6, delay: number = 0, scale: number = 0.9) => {
  return gsap.from(targets, {
    scale,
    opacity: 0,
    duration,
    delay,
    ease: "power3.out",
  });
};

export const blurIn = (targets: gsap.TweenTarget, duration: number = 0.8, delay: number = 0) => {
  return gsap.from(targets, {
    filter: "blur(10px)",
    opacity: 0,
    duration,
    delay,
    ease: "power3.out",
    onComplete: () => {
      gsap.set(targets, { filter: "blur(0px)" });
    },
  });
};

export const staggerChildren = (parent: gsap.TweenTarget, duration: number = 0.6, stagger: number = 0.1, y: number = 20) => {
  return gsap.from(parent, {
    y,
    opacity: 0,
    duration,
    stagger: {
      each: stagger,
      from: "start",
    },
    ease: "power3.out",
  });
};

// Scroll animations
export const scrollFadeIn = (targets: gsap.TweenTarget, trigger: gsap.TweenTarget = targets) => {
  return gsap.from(targets, {
    opacity: 0,
    scrollTrigger: {
      trigger,
      start: "top 80%",
      end: "top 20%",
      toggleActions: "play none none none",
    },
    ease: "power3.out",
    duration: 1,
  });
};

export const scrollSlideUp = (targets: gsap.TweenTarget, trigger: gsap.TweenTarget = targets, distance: number = 50) => {
  return gsap.from(targets, {
    y: distance,
    opacity: 0,
    scrollTrigger: {
      trigger,
      start: "top 85%",
      end: "top 15%",
      toggleActions: "play none none none",
    },
    ease: "power3.out",
    duration: 1.2,
  });
};

export const scrollScale = (targets: gsap.TweenTarget, trigger: gsap.TweenTarget = targets, scale: number = 0.8) => {
  return gsap.from(targets, {
    scale,
    opacity: 0,
    scrollTrigger: {
      trigger,
      start: "top 80%",
      end: "top 20%",
      toggleActions: "play none none none",
    },
    ease: "power3.out",
    duration: 1,
  });
};

export const scrollParallax = (targets: gsap.TweenTarget, speed: number = 0.5, trigger: gsap.TweenTarget = targets) => {
  return gsap.to(targets, {
    y: (i, target) => (i * 100 * speed),
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
    ease: "none",
  });
};

export const horizontalScroll = (container: gsap.TweenTarget, items: gsap.TweenTarget) => {
  return gsap.to(items, {
    x: () => -(items as HTMLElement).scrollWidth + (container as HTMLElement).offsetWidth,
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${(items as HTMLElement).scrollWidth - (container as HTMLElement).offsetWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
    ease: "none",
  });
};

// Text animations
export const textReveal = (target: string | HTMLElement, duration: number = 1) => {
  const split = new SplitText(target, { type: "chars,words,lines" });
  return gsap.from(split.chars, {
    opacity: 0,
    y: 50,
    rotateX: 90,
    duration,
    stagger: 0.02,
    ease: "power3.out",
  });
};

export const textScramble = (target: string | HTMLElement, duration: number = 1, text: string = "") => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const originalText = text || (typeof target === "string" ? target : target.textContent || "");
  const scrambled = originalText.split("").map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join("");

  if (typeof target === "string") return;

  target.textContent = scrambled;

  return gsap.to(target, {
    duration,
    text: originalText,
    ease: "power3.out",
  });
};

export const typedText = (target: string | HTMLElement, text: string, duration: number = 2) => {
  if (typeof target === "string") return;

  target.textContent = "";

  return gsap.to(target, {
    duration,
    text,
    ease: "power3.out",
  });
};

// Hover animations
export const hoverScale = (target: gsap.TweenTarget, scale: number = 1.05, duration: number = 0.3) => {
  return gsap.to(target, {
    scale,
    duration,
    ease: "power2.out",
    paused: true,
  });
};

export const hoverGlow = (target: gsap.TweenTarget, color: string = "#00E676", intensity: number = 0.3, duration: number = 0.3) => {
  return gsap.to(target, {
    boxShadow: `0 0 ${40 * intensity}px ${color}`,
    duration,
    ease: "power2.out",
    paused: true,
  });
};

export const hoverTranslate = (target: gsap.TweenTarget, x: number = 0, y: number = -5, duration: number = 0.3) => {
  return gsap.to(target, {
    x,
    y,
    duration,
    ease: "power2.out",
    paused: true,
  });
};

// Card animations
export const cardHover = (target: gsap.TweenTarget) => {
  const tl = gsap.timeline({ paused: true });
  tl.to(target, {
    y: -10,
    duration: 0.3,
    ease: "power2.out",
  }).to(target, {
    scale: 1.02,
    duration: 0.2,
    ease: "power2.out",
  }, "<");
  return tl;
};

export const cardTilt = (target: gsap.TweenTarget, maxRotation: number = 10) => {
  return gsap.to(target, {
    rotationX: (i, el) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const mouseX = gsap.getProperty("body", "clientX") as number || 0;
      const angle = (mouseX - centerX) / rect.width * maxRotation;
      return angle;
    },
    rotationY: (i, el) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const mouseY = gsap.getProperty("body", "clientY") as number || 0;
      const angle = (mouseY - centerY) / rect.height * maxRotation;
      return angle;
    },
    transformPerspective: 1000,
    ease: "power2.out",
    paused: true,
  });
};

// Magnetic effect
export const magnetic = (target: gsap.TweenTarget, strength: number = 0.2) => {
  return gsap.to(target, {
    x: (i, el) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const mouseX = gsap.getProperty("body", "clientX") as number || 0;
      return (mouseX - centerX) * strength;
    },
    y: (i, el) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const mouseY = gsap.getProperty("body", "clientY") as number || 0;
      return (mouseY - centerY) * strength;
    },
    ease: "power2.out",
    paused: true,
  });
};

// Ripple effect
export const ripple = (target: gsap.TweenTarget, color: string = "rgba(255, 255, 255, 0.3)", duration: number = 0.6) => {
  const rippleElement = document.createElement("span");
  rippleElement.className = "ripple-effect";
  rippleElement.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: ${color};
    transform: scale(0);
    pointer-events: none;
    opacity: 1;
  `;

  (target as HTMLElement).appendChild(rippleElement);

  const rect = (target as HTMLElement).getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = (target as HTMLElement).clientX || rect.width / 2;
  const y = (target as HTMLElement).clientY || rect.height / 2;

  gsap.set(rippleElement, {
    width: size,
    height: size,
    left: x - size / 2,
    top: y - size / 2,
  });

  return gsap.to(rippleElement, {
    scale: 2,
    opacity: 0,
    duration,
    ease: "power2.out",
    onComplete: () => {
      rippleElement.remove();
    },
  });
};

// Loading animations
export const loadingSpinner = (target: gsap.TweenTarget) => {
  return gsap.to(target, {
    rotation: 360,
    duration: 1,
    repeat: -1,
    ease: "linear",
  });
};

export const loadingPulse = (target: gsap.TweenTarget) => {
  return gsap.to(target, {
    scale: 1.2,
    opacity: 0.5,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
  });
};

export const loadingBar = (target: gsap.TweenTarget) => {
  return gsap.fromTo(target, {
    width: "0%",
  }, {
    width: "100%",
    duration: 2,
    ease: "power2.inOut",
  });
};

// Scroll to top
export const scrollToTop = (duration: number = 1) => {
  return gsap.to(window, {
    scrollTo: { y: 0 },
    duration,
    ease: "power2.inOut",
  });
};

// Smooth scroll to element
export const scrollToElement = (target: string | HTMLElement, duration: number = 1, offset: number = 0) => {
  return gsap.to(window, {
    scrollTo: { y: target, offsetY: offset },
    duration,
    ease: "power2.inOut",
  });
};

// kill all animations
export const killAll = () => {
  gsap.killAll();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

// Refresh ScrollTrigger
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

export { gsap, ScrollTrigger, ScrollToPlugin, TextPlugin, SplitText, useGSAP };
