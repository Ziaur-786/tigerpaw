"use client";

import { useEffect, useState, useCallback, RefObject } from "react";
import { gsap } from "gsap";

// Mouse position hook
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clientPosition, setClientPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.pageX, y: e.pageY });
      setClientPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { position, clientPosition };
}

// Mouse enter/leave hook
export function useMouseEnter<T extends HTMLElement>() {
  const [isEntered, setIsEntered] = useState(false);
  const [element, setElement] = useState<T | null>(null);

  const refCallback = useCallback((node: T | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const handleMouseEnter = () => setIsEntered(true);
    const handleMouseLeave = () => setIsEntered(false);

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [element]);

  return { ref: refCallback, isEntered };
}

// Cursor follower hook
export function useCursorFollower() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "text" | "hover" | "hidden">("default");

  const showText = useCallback((text: string) => {
    setCursorText(text);
    setCursorVariant("text");
  }, []);

  const hideText = useCallback(() => {
    setCursorText("");
    setCursorVariant("default");
  }, []);

  const setVariant = useCallback((variant: "default" | "text" | "hover" | "hidden") => {
    setCursorVariant(variant);
  }, []);

  return { cursorText, cursorVariant, showText, hideText, setVariant };
}

// Magnetic cursor effect hook
export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T>,
  strength: number = 0.2
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
    if (!ref.current || !mousePos) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = mousePos.x - centerX;
    const distanceY = mousePos.y - centerY;

    const angle = Math.atan2(distanceY, distanceX);
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Only apply magnetic effect when mouse is close
    const maxDistance = 100;
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    const moveAmount = normalizedDistance * strength * 20;

    gsap.to(ref.current, {
      x: distanceX * normalizedDistance * 0.3,
      y: distanceY * normalizedDistance * 0.3,
      rotation: angle * 0.05,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [mousePos, ref, strength]);
}

// Hover state hook
export function useHover<T extends HTMLElement>() {
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<T>(null);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mouseleave", onMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", onMouseEnter);
      element.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseEnter, onMouseLeave]);

  return { ref: elementRef, isHovered, onMouseEnter, onMouseLeave };
}

// Click outside hook
export function useClickOutside<T extends HTMLElement>(ref: RefObject<T>, callback: () => void) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
}

// Mouse trail hook
export function useMouseTrail(count: number = 10) {
  const [trail, setTrail] = useState<{ x: number; y: number; size: number; id: number }[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let trailId = 0;
    const points: { x: number; y: number; size: number; id: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      trailId++;
      points.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 10 + 5,
        id: trailId,
      });

      // Keep only the last `count` points
      if (points.length > count) {
        points.shift();
      }

      setTrail([...points]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [count]);

  return trail;
}

// Mouse wheel hook
export function useMouseWheel() {
  const [delta, setDelta] = useState(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleWheel = (e: WheelEvent) => {
      setDelta(e.deltaY);
      setDirection(e.deltaY > 0 ? "down" : "up");

      // Reset after a short delay
      const timer = setTimeout(() => {
        setDelta(0);
        setDirection(null);
      }, 100);

      return () => clearTimeout(timer);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return { delta, direction };
}

// Mouse parallax hook
export function useMouseParallax<T extends HTMLElement>(
  ref: RefObject<T>,
  strength: number = 0.1
) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const x = mousePos.x * strength * 50;
    const y = mousePos.y * strength * 50;

    gsap.to(ref.current, {
      x,
      y,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [mousePos, ref, strength]);
}

// Export all hooks
export type { RefObject };
