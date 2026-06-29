"use client";

import { motion, AnimatePresence } from "react";
import { Home, Dumbbell, Fire, Users, Calculator, Crown, Book, MessageSquare, X } from "lucide-react";
import { NAVIGATION } from "@/constants";
import { cn } from "@/utils";

/**
 * Bottom Mobile Navigation Component
 * Fixed bottom tab bar for mobile devices
 */
interface MobileNavProps {
  onClose?: () => void;
}

export function MobileNav({ onClose }: MobileNavProps) {
  const scrollToSection = (href: string) => {
    const target = href.replace("#", "");
    const element = document.querySelector(`#${target}`) || document.querySelector(target);
    if (element) {
      const headerOffset = 80;
      const elementPosition = (element as HTMLElement).getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    onClose?.();
  };

  // Icon mapping for navigation items
  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="w-5 h-5" />,
    Programs: <Dumbbell className="w-5 h-5" />,
    Nutrition: <Fire className="w-5 h-5" />,
    Transformations: <Users className="w-5 h-5" />,
    Calculators: <Calculator className="w-5 h-5" />,
    Plans: <Crown className="w-5 h-5" />,
    Trainers: <Users className="w-5 h-5" />,
    Blog: <Book className="w-5 h-5" />,
    Contact: <MessageSquare className="w-5 h-5" />,
  };

  return (
    <motion.nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-black/90 backdrop-blur-xl border-t border-white/10",
        "px-2 py-2 safe-area-inset-bottom"
      )}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between">
          {NAVIGATION.links.slice(0, 5).map((link, index) => {
            const Icon = iconMap[link.label] || <Dumbbell className="w-5 h-5" />;

            return (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-2xl",
                  "text-white/60 hover:text-accent transition-colors"
                )}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                {Icon}
                <span className="text-xs font-medium">{link.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Close button if used in modal context */}
      {onClose && (
        <motion.button
          className="absolute top-2 right-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close"
        >
          <X className="w-4 h-4 text-white" />
        </motion.button>
      )}
    </motion.nav>
  );
}

/**
 * Quick Action Nav - Floating action buttons for mobile
 */
export function QuickActionNav() {
  const actions = [
    { icon: <Dumbbell className="w-5 h-5" />, label: "Workouts", href: "#programs" },
    { icon: <Fire className="w-5 h-5" />, label: "Nutrition", href: "#nutrition" },
    { icon: <Calculator className="w-5 h-5" />, label: "BMI", href: "#calculators" },
    { icon: <Crown className="w-5 h-5" />, label: "Plans", href: "#plans" },
  ];

  const scrollToSection = (href: string) => {
    const target = href.replace("#", "");
    const element = document.querySelector(`#${target}`);
    if (element) {
      window.scrollTo({
        top: (element as HTMLElement).offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.div
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 lg:hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={cn(
          "flex items-center gap-2",
          "glass backdrop-blur-lg rounded-2xl border border-white/10",
          "px-3 py-2"
        )}
        whileHover={{ scale: 1.02 }}
      >
        {actions.map((action, index) => (
          <motion.button
            key={action.href}
            onClick={() => scrollToSection(action.href)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-xl",
              "text-white/60 hover:text-accent hover:bg-white/5 transition-colors"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
          >
            {action.icon}
            <span className="text-xs font-medium">{action.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default MobileNav;
