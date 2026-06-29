"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { cn } from "@/utils";
import { useRippleAnimation } from "@/hooks/useAnimation";

// Button variants
const buttonVariants = {
  primary:
    "bg-accent text-black font-bold hover:bg-accent/90 active:scale-95",
  secondary:
    "bg-secondary text-white font-bold hover:bg-secondary/90 active:scale-95",
  outline:
    "border-2 border-accent text-accent font-bold hover:bg-accent hover:text-black active:scale-95",
  ghost:
    "text-white font-bold hover:bg-white/10 active:scale-95",
  glass: "glass text-white font-bold backdrop-blur-sm",
  destructive:
    "bg-red-500 text-white font-bold hover:bg-red-500/90 active:scale-95",
};

// Button sizes
const buttonSizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-12 py-5 text-xl",
};

// Button animation variants
const buttonMotionVariants: Variants = {
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

// Button props type
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  motionProps?: HTMLMotionProps<"button">;
  ripple?: boolean;
}

// Motion button component
const MotionButton = motion.button;

// Main button component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      motionProps,
      ripple = true,
      ...props
    },
    ref
  ) => {
    const { ripples, addRipple } = useRippleAnimation();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !disabled) {
        addRipple(e);
      }
      props.onClick?.(e);
    };

    return (
      <MotionButton
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl transition-all duration-300 ease-spring",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        disabled={disabled || isLoading}
        onClick={handleClick}
        variants={buttonMotionVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        {...motionProps}
      >
        {/* Ripple effect */}
        {ripple && (
          <div className="absolute inset-0 pointer-events-none">
            {ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                className="absolute block rounded-full bg-white/30"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: ripple.size,
                  height: ripple.size,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            ))}
          </div>
        )}

        {/* Loading spinner */}
        {isLoading ? (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : null}

        {/* Content */}
        <span className={`flex items-center justify-center gap-2 ${isLoading ? "opacity-0" : "opacity-100"}`}>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      </MotionButton>
    );
  }
);

Button.displayName = "Button";

// Icon button component
export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn("p-2 w-10 h-10", className)}
        variant={props.variant || "ghost"}
        size="md"
        {...props}
      >
        {children}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

// Magnetic button component
export const MagneticButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, ...props }, ref) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
      if (typeof window === "undefined") return;

      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
      <Button
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

// Export all button components
export { Button as default, IconButton, MagneticButton };

// Helper to create button with specific props
import { ReactNode } from "react";

interface LinkButtonProps extends ButtonProps {
  href: string;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ href, className = "", children, ...props }, ref) => {
    return (
      <motion.a
        ref={ref as any}
        href={href}
        className={cn(
          "inline-block text-center",
          buttonVariants[props.variant || "primary"],
          buttonSizes[props.size || "md"],
          "rounded-xl transition-all duration-300 ease-spring",
          className
        )}
        variants={buttonMotionVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        {...props}
      >
        {children}
      </motion.a>
    );
  }
);

LinkButton.displayName = "LinkButton";
