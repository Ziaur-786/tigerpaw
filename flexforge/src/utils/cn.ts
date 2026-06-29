import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes with tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility to create a class string with a base class and conditional modifiers
 */
export function classNames(
  base: string,
  modifiers: Record<string, boolean | string | undefined | null> = {},
  additional: string[] = []
): string {
  const modifierClasses = Object.entries(modifiers)
    .filter(([_, condition]) => Boolean(condition))
    .map(([className]) => className)
    .join(" ");

  return cn(base, modifierClasses, ...additional);
}

/**
 * Utility to create a class string for responsive design
 */
export function responsiveClass(
  mobile: string,
  tablet?: string,
  desktop?: string,
  largeDesktop?: string
): string {
  const classes: string[] = [mobile];
  if (tablet) classes.push(`md:${tablet}`);
  if (desktop) classes.push(`lg:${desktop}`);
  if (largeDesktop) classes.push(`xl:${largeDesktop}`);
  return classes.join(" ");
}

/**
 * Utility to create a class string for hover, focus, and active states
 */
export function stateClasses(
  base: string,
  hover?: string,
  focus?: string,
  active?: string,
  disabled?: string
): string {
  const classes: string[] = [base];
  if (hover) classes.push(`hover:${hover}`);
  if (focus) classes.push(`focus:${focus}`);
  if (active) classes.push(`active:${active}`);
  if (disabled) classes.push(`disabled:${disabled}`);
  return classes.join(" ");
}
