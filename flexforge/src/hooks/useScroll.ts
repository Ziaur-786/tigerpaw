"use client";

import { useEffect, useState, useCallback, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Smooth scroll hook using Lenis
export function useSmoothScroll() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenisInstance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
      smoothTouch: true,
      infinite: false,
    });

    setLenis(lenisInstance);

    // Sync with GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Use requestAnimationFrame for smooth scrolling
    const raf = (time: number) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return lenis;
}

// Scroll progress hook
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const newProgress = (scrollTop / docHeight) * 100;
      setProgress(Math.min(Math.max(newProgress, 0), 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

// Element visibility on scroll hook
export function useOnScreen(
  ref: RefObject<HTMLElement>,
  threshold: number = 0.1,
  rootMargin: string = "0px"
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, threshold, rootMargin]);

  return isVisible;
}

// Scroll direction hook
export function useScrollDirection() {
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 5) {
        setDirection("down");
      } else if (currentScrollY < lastScrollY - 5) {
        setDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return direction;
}

// Scroll to element hook
export function useScrollTo() {
  const scrollTo = useCallback((target: string | HTMLElement, options?: ScrollIntoViewOptions) => {
    if (typeof window === "undefined") return;

    let element: HTMLElement | null;

    if (typeof target === "string") {
      element = document.querySelector(target);
    } else {
      element = target;
    }

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
        ...options,
      });
    }
  }, []);

  const scrollToTop = useCallback((options?: ScrollToOptions) => {
    if (typeof window === "undefined") return;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
      ...options,
    });
  }, []);

  return { scrollTo, scrollToTop };
}

// Parallax hook
export function useParallax<T extends HTMLElement>(
  ref: RefObject<T>,
  speed: number = 0.5
) {
  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const handleScroll = () => {
      const rect = ref.current!.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const offset = (scrolled - elementTop) * speed;

      ref.current!.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, speed]);
}

// GSAP scroll trigger hook
export function useGSAPScrollTrigger(
  targets: gsap.TweenTarget,
  animation: gsap.TweenVars,
  trigger: gsap.TweenTarget = targets,
  options: ScrollTrigger.Vars = {}
) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top 85%",
        end: "top 15%",
        toggleActions: "play none none none",
        ...options,
      },
    });

    tl.to(targets, animation);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [targets, animation, trigger, options]);
}

// Section snap hook
export function useSectionSnap(sections: string[]) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionElements = sections.map((selector) => document.querySelector(selector));

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    let currentSection = 0;

    lenis.on("scroll", (e: { scroll: number }) => {
      const scroll = e.scroll;
      const windowHeight = window.innerHeight;

      sectionElements.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scroll;
        const sectionBottom = sectionTop + rect.height;

        if (scroll >= sectionTop - windowHeight / 2 && scroll < sectionBottom - windowHeight / 2) {
          if (currentSection !== index) {
            currentSection = index;
          }
        }
      });
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [sections]);
}

// Horizontal scroll hook
export function useHorizontalScroll(containerRef: RefObject<HTMLElement>) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const handleScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    // Check on resize
    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  const scrollLeft = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  }, [containerRef]);

  const scrollRight = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  }, [containerRef]);

  return { canScrollLeft, canScrollRight, scrollLeft, scrollRight };
}

// Reading progress hook
export function useReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / height) * 100;
      setCompletion(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return completion;
}

// Export all hooks
export {
  useSmoothScroll as useLenis,
};
