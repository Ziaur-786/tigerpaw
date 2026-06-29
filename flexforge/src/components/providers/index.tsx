"use client";

import { useState, useEffect } from "react";
import { useSmoothScroll } from "@/hooks/useScroll";
import { Background3D } from "@/components/3d/Background";

// Individual providers
export function ScrollProvider({ children }: { children: React.ReactNode }) {
  // Initialize smooth scrolling
  useSmoothScroll();

  return <>{children}</>;
}

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {isMobile ? <Background3D.ParticleBackgroundLite /> : <Background3D />}
      {children}
    </>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    // Apply theme class
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }

    // Save preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Create theme context
import { createContext } from "react";

interface ThemeContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Cursor Provider
export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "text" | "hover" | "hidden">("default");

  const value = {
    cursorText,
    cursorVariant,
    setCursorText,
    setCursorVariant,
    showText: (text: string) => {
      setCursorText(text);
      setCursorVariant("text");
    },
    hideText: () => {
      setCursorText("");
      setCursorVariant("default");
    },
  };

  return (
    <CursorContext.Provider value={value}>
      {children}
      {/* Custom cursor element */}
      <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
        <div className={`fixed w-8 h-8 rounded-full bg-accent mix-blend-difference transition-all duration-200 ${cursorVariant === "hidden" ? "opacity-0" : "opacity-100"}`} />

        {/* Cursor text */}
        {cursorVariant === "text" && cursorText && (
          <div className="fixed bg-accent text-black px-3 py-1 rounded-full text-sm font-semibold transition-opacity duration-200 pointer-events-auto">
            {cursorText}
          </div>
        )}
      </div>
    </CursorContext.Provider>
  );
}

interface CursorContextType {
  cursorText: string;
  cursorVariant: "default" | "text" | "hover" | "hidden";
  setCursorText: (text: string) => void;
  setCursorVariant: (variant: "default" | "text" | "hover" | "hidden") => void;
  showText: (text: string) => void;
  hideText: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorText: "",
  cursorVariant: "default",
  setCursorText: () => {},
  setCursorVariant: () => {},
  showText: () => {},
  hideText: () => {},
});

export const useCursor = () => {
  const context = React.useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};

// Main Providers component
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CursorProvider>
        <ScrollProvider>
          <BackgroundProvider>
            {children}
          </BackgroundProvider>
        </ScrollProvider>
      </CursorProvider>
    </ThemeProvider>
  );
}
