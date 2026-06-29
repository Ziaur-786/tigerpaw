"use client";

import { forwardRef, HTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils";

// Container component
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "main" | "article" | "header" | "footer";
  motionProps?: HTMLMotionProps<"div">;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = "", as: Component = "div", children, motionProps, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";

// Motion Container component
export const MotionContainer = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = "", as: Component = "div", children, motionProps, ...props }, ref) => {
    const MotionComponent = motion(Component);
    return (
      <MotionComponent
        ref={ref as any}
        className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
        {...motionProps}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

MotionContainer.displayName = "MotionContainer";

// Section component
interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  tagline?: string;
  id?: string;
  className?: string;
  containerClassName?: string;
  motionProps?: HTMLMotionProps<"div">;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      className = "",
      containerClassName = "",
      title,
      subtitle,
      tagline,
      id,
      children,
      motionProps,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn("relative py-16 md:py-24 lg:py-32", className)}
        {...props}
      >
        <Container className={containerClassName}>
          {/* Section header */}
          {(title || subtitle || tagline) && (
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, threshold: 0.1 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              {tagline && (
                <p className="text-accent font-bold text-sm md:text-base tracking-[0.3em] mb-4">
                  {tagline}
                </p>
              )}
              {title && (
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg md:text-xl text-secondary-text max-w-3xl mx-auto font-medium">
                  {subtitle}
                </p>
              )}
            </motion.div>
          )}

          {/* Section content */}
          {children}
        </Container>
      </section>
    );
  }
);

Section.displayName = "Section";

// Card component
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "bordered";
  padding?: "none" | "sm" | "md" | "lg";
  hoverEffect?: boolean;
  motionProps?: HTMLMotionProps<"div">;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = "",
      variant = "default",
      padding = "md",
      hoverEffect = false,
      children,
      motionProps,
      ...props
    },
    ref
  ) => {
    const paddingClasses = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const variantClasses = {
      default: "bg-card",
      glass: "glass backdrop-blur-sm",
      gradient: "bg-gradient-to-br from-card via-[#1a1a1a] to-card",
      bordered: "bg-card border border-border",
    };

    const MotionDiv = motion.div;

    if (hoverEffect) {
      return (
        <MotionDiv
          ref={ref}
          className={cn(
            "rounded-2xl transition-all duration-300 ease-spring",
            variantClasses[variant],
            paddingClasses[padding],
            className
          )}
          initial="rest"
          whileHover="hover"
          variants={{
            rest: { y: 0, scale: 1, boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)" },
            hover: {
              y: -8,
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0, 230, 118, 0.1)",
            },
          }}
          {...motionProps}
          {...props}
        >
          {children}
        </MotionDiv>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-300 ease-spring",
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Grid component
interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  responsive?: boolean;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className = "",
      cols = 3,
      gap = "md",
      responsive = true,
      children,
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      none: "gap-0",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-12",
    };

    const colClasses = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: responsive ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-3",
      4: responsive ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-4",
      5: responsive ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-5" : "grid-cols-5",
      6: responsive ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-6" : "grid-cols-6",
    };

    return (
      <div
        ref={ref}
        className={cn("grid", colClasses[cols], gapClasses[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

// Export all layout components
export { Container as default, MotionContainer, Section, Card, Grid };
