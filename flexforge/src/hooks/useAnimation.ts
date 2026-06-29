"use client";

import { useEffect, useRef, useState, useCallback, RefObject } from "react";
import { gsap } from "gsap";
import { motion, Variants, AnimationControls, HTMLMotionProps } from "framer-motion";

// Animation controller hook
export function useAnimationController() {
  const controls = useRef<AnimationControls | null>(null);

  const start = useCallback((animation: string | Variants) => {
    if (controls.current) {
      controls.current.start(animation);
    }
  }, []);

  const stop = useCallback(() => {
    if (controls.current) {
      controls.current.stop();
    }
  }, []);

  const set = useCallback((animation: string | Variants) => {
    if (controls.current) {
      controls.current.set(animation);
    }
  }, []);

  return { ref: controls, start, stop, set };
}

// GSAP animation hook
export function useGSAPAnimation<T extends Element>(
  deps: any[] = [],
  callback?: (element: T) => gsap.core.Tween | gsap.core.Timeline
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    let animation: gsap.core.Tween | gsap.core.Timeline | null = null;

    if (callback) {
      animation = callback(ref.current);
    }

    return () => {
      if (animation) {
        animation.kill();
      }
    };
  }, deps);

  return ref;
}

// Framer Motion animation hook
export function useFramerAnimation(
  initial: string | Variants,
  animate: string | Variants,
  exit?: string | Variants,
  transition?: { duration?: number; ease?: string | number[]; delay?: number }
) {
  return {
    initial,
    animate,
    exit,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      ...transition,
    },
  };
}

// Stagger animation hook
export function useStaggerAnimation(
  children: React.ReactNode[],
  variants: Variants,
  stagger: number = 0.1,
  delay: number = 0
) {
  return {
    initial: "hidden",
    animate: "visible",
    variants,
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  };
}

// Loading animation hook
export function useLoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const loadingVariants: Variants = {
    initial: { opacity: 1, scale: 1 },
    animate: {
      opacity: [1, 0.5, 1],
      scale: [1, 1.2, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
  };

  return { isLoading, loadingVariants };
}

// Text animation hook
export function useTextAnimation(
  text: string,
  duration: number = 1,
  delay: number = 0
) {
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const animateText = useCallback(() => {
    setIsAnimating(true);
    setDisplayedText("");

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, (duration * 1000) / text.length);

    return () => clearInterval(interval);
  }, [text, duration]);

  useEffect(() => {
    animateText();
  }, [animateText]);

  return { displayedText, isAnimating, animateText };
}

// Scroll-triggered animation hook
export function useScrollAnimation<T extends Element>(
  trigger: string | RefObject<T>,
  animation: gsap.TweenVars,
  start: string = "top 85%",
  end: string = "top 15%"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const triggerElement = typeof trigger === "string"
      ? document.querySelector(trigger)
      : trigger.current;

    if (!triggerElement) return;

    gsap.from(ref.current, {
      scrollTrigger: {
        trigger: triggerElement,
        start,
        end,
        toggleActions: "play none none none",
      },
      ...animation,
    });

    return () => {
      gsap.killTweensOf(ref.current);
    };
  }, [trigger, animation, start, end]);

  return ref;
}

// Hover animation hook
export function useHoverAnimation(
  rest: Variants,
  hover: Variants,
  tap?: Variants
) {
  return {
    initial: rest,
    whileHover: hover,
    whileTap: tap || rest,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  };
}

// Focus animation hook
export function useFocusAnimation(
  rest: Variants,
  focus: Variants
) {
  return {
    initial: rest,
    whileFocus: focus,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  };
}

// Viewport animation hook
export function useViewportAnimation(
  variants: Variants,
  once: boolean = true,
  threshold: number = 0.1,
  margin: string = "0px"
) {
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once, threshold, margin },
    variants,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  };
}

// Count-up animation hook
export function useCountUp(
  end: number,
  duration: number = 2,
  decimals: number = 0
) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startCount = useCallback(() => {
    setIsAnimating(true);
    setCount(0);

    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (end - startValue) * easeProgress;

      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, decimals]);

  useEffect(() => {
    startCount();
  }, [startCount]);

  return { count, isAnimating, startCount };
}

// Pulse animation hook
export function usePulseAnimation(
  minScale: number = 1,
  maxScale: number = 1.05,
  duration: number = 2
) {
  const pulseVariants: Variants = {
    initial: { scale: minScale },
    animate: {
      scale: [minScale, maxScale, minScale],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return pulseVariants;
}

// Shake animation hook
export function useShakeAnimation() {
  const shakeVariants: Variants = {
    rest: { x: 0 },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    },
  };

  const triggerShake = useCallback((controls: AnimationControls) => {
    controls.start("shake").then(() => controls.start("rest"));
  }, []);

  return { shakeVariants, triggerShake };
}

// Bounce animation hook
export function useBounceAnimation() {
  const bounceVariants: Variants = {
    rest: { y: 0 },
    bounce: {
      y: [0, -20, 0, -10, 0],
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const triggerBounce = useCallback((controls: AnimationControls) => {
    controls.start("bounce").then(() => controls.start("rest"));
  }, []);

  return { bounceVariants, triggerBounce };
}

// Ripple animation hook
export function useRippleAnimation() {
  const [ripples, setRipples] = useState<{ x: number; y: number; size: number; id: number }[]>([]);
  const rippleId = useRef(0);

  const addRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height);

    rippleId.current++;
    setRipples((prev) => [...prev, { x, y, size, id: rippleId.current }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId.current));
    }, 600);
  }, []);

  return { ripples, addRipple };
}

// Card tilt animation hook
export function useCardTilt<T extends HTMLElement>(
  ref: RefObject<T>,
  maxRotation: number = 15
) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = mousePos.x - centerX;
    const distanceY = mousePos.y - centerY;

    const rotationX = (distanceY / rect.height) * maxRotation;
    const rotationY = (distanceX / rect.width) * maxRotation * -1;

    const isHovered = Math.abs(distanceX) < rect.width / 2 && Math.abs(distanceY) < rect.height / 2;

    gsap.to(ref.current, {
      rotationX: isHovered ? rotationX : 0,
      rotationY: isHovered ? rotationY : 0,
      transformPerspective: 1000,
      transition: { duration: 0.3, ease: "power2.out" },
    });
  }, [mousePos, ref, maxRotation]);
}

// Export all hooks
export type { Variants, AnimationControls, HTMLMotionProps };
