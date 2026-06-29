/**
 * Number formatting utilities
 */

/**
 * Format a number with commas as thousand separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Format a number as a percentage
 */
export function formatPercentage(num: number, decimals: number = 1): string {
  return `${num.toFixed(decimals)}%`;
}

/**
 * Format a currency value
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a price with optional discount
 */
export function formatPrice(
  price: number,
  discount?: number,
  currency: string = "USD"
): { original: string; discounted?: string; hasDiscount: boolean } {
  const original = formatCurrency(price, currency);

  if (discount && discount > 0) {
    const discountedPrice = price - (price * discount) / 100;
    return {
      original,
      discounted: formatCurrency(discountedPrice, currency),
      hasDiscount: true,
    };
  }

  return { original, hasDiscount: false };
}

/**
 * Format a duration in minutes/seconds
 */
export function formatDuration(
  seconds: number,
  format: "mm:ss" | "hh:mm:ss" | "short" = "mm:ss"
): string {
  const totalSeconds = Math.floor(seconds);

  switch (format) {
    case "hh:mm:ss":
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;
      return [hours, minutes, secs]
        .map((v) => v.toString().padStart(2, "0"))
        .join(":");

    case "short":
      if (totalSeconds < 60) {
        return `${totalSeconds}s`;
      } else if (totalSeconds < 3600) {
        const minutes = Math.floor(totalSeconds / 60);
        return `${minutes}m`;
      } else {
        const hours = Math.floor(totalSeconds / 3600);
        return `${hours}h`;
      }

    case "mm:ss":
    default:
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      return [mins, secs].map((v) => v.toString().padStart(2, "0")).join(":");
  }
}

/**
 * Format a date
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };

  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat("en-US", defaultOptions).format(dateObj);
}

/**
 * Format a relative date (e.g., "2 days ago")
 */
export function formatRelativeDate(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return interval === 1 ? `${unit} ago` : `${interval} ${unit}s ago`;
    }
  }

  return "just now";
}

/**
 * Format a date range
 */
export function formatDateRange(
  startDate: Date | string,
  endDate: Date | string
): string {
  const start = formatDate(startDate, { month: "short", day: "numeric" });
  const end = formatDate(endDate, { month: "short", day: "numeric", year: "numeric" });

  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();

  if (startYear === endYear) {
    return `${start} - ${end}`;
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

/**
 * Format a time
 */
export function formatTime(
  time: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    ...options,
  };

  const dateObj = time instanceof Date ? time : new Date(time);
  return new Intl.DateTimeFormat("en-US", defaultOptions).format(dateObj);
}

/**
 * Format a file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format a number with a suffix (e.g., 1k, 1M)
 */
export function formatNumberWithSuffix(num: number): string {
  if (num < 1000) return num.toString();
  if (num >= 1000 && num < 1000000) return `${(num / 1000).toFixed(1)}k`;
  if (num >= 1000000 && num < 1000000000) return `${(num / 1000000).toFixed(1)}M`;
  return `${(num / 1000000000).toFixed(1)}B`;
}

/**
 * Truncate a string
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalize each word in a string
 */
export function capitalizeWords(str: string): string {
  return str.split(" ").map(capitalize).join(" ");
}

/**
 * Format a phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

/**
 * Format an email address
 */
export function formatEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Format a URL
 */
export function formatUrl(url: string): string {
  let formatted = url.trim();
  if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
    formatted = `https://${formatted}`;
  }
  return formatted;
}

/**
 * Format a YouTube URL to get the video ID
 */
export function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

/**
 * Format a slug from a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Format a title from a slug
 */
export function titleize(slug: string): string {
  return slug
    .split("-")
    .map(capitalize)
    .join(" ");
}

/**
 * Format a list of items as a comma-separated string
 */
export function formatList(items: string[], conjunction: string = "and"): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, ${conjunction} ${items[items.length - 1]}`;
}

/**
 * Format a range (e.g., "1 - 5 of 10")
 */
export function formatRange(
  start: number,
  end: number,
  total: number
): string {
  return `${start} - ${end} of ${total}`;
}

/**
 * Format a progress value as a percentage
 */
export function formatProgress(
  current: number,
  total: number,
  decimals: number = 0
): string {
  const percentage = (current / total) * 100;
  return formatPercentage(percentage, decimals);
}

/**
 * Format calories
 */
export function formatCalories(calories: number): string {
  return `${formatNumber(calories)} cal`;
}

/**
 * Format a weight value
 */
export function formatWeight(
  weight: number,
  unit: "kg" | "lbs" | "g" = "kg"
): string {
  const formattedWeight = formatNumber(weight);
  return `${formattedWeight} ${unit.toUpperCase()}`;
}

/**
 * Format a height value
 */
export function formatHeight(
  height: number,
  unit: "cm" | "m" | "ft" = "cm"
): string {
  if (unit === "ft") {
    const feet = Math.floor(height);
    const inches = Math.round((height - feet) * 12);
    return `${feet}'${inches}"`;
  }
  return `${formatNumber(height)} ${unit}`;
}

/**
 * Format BMI value with category
 */
export function formatBMI(bmi: number): { value: string; category: string; color: string } {
  const value = bmi.toFixed(1);

  if (bmi < 18.5) {
    return { value, category: "Underweight", color: "#FFD93D" };
  } else if (bmi < 25) {
    return { value, category: "Normal weight", color: "#00E676" };
  } else if (bmi < 30) {
    return { value, category: "Overweight", color: "#FF9F43" };
  } else if (bmi < 35) {
    return { value, category: "Obesity Class I", color: "#FF6B6B" };
  } else if (bmi < 40) {
    return { value, category: "Obesity Class II", color: "#FF3737" };
  } else {
    return { value, category: "Obesity Class III", color: "#FF0000" };
  }
}

/**
 * Format body fat percentage with category
 */
export function formatBodyFat(
  bodyFat: number,
  gender: "male" | "female" = "male"
): { value: string; category: string; color: string } {
  const value = bodyFat.toFixed(1);

  if (gender === "male") {
    if (bodyFat < 6) {
      return { value, category: "Essential Fat", color: "#FFD93D" };
    } else if (bodyFat < 14) {
      return { value, category: "Athletes", color: "#00E676" };
    } else if (bodyFat < 18) {
      return { value, category: "Fitness", color: "#00E676" };
    } else if (bodyFat < 25) {
      return { value, category: "Average", color: "#FF9F43" };
    } else {
      return { value, category: "Obese", color: "#FF6B6B" };
    }
  } else {
    // Female
    if (bodyFat < 10) {
      return { value, category: "Essential Fat", color: "#FFD93D" };
    } else if (bodyFat < 16) {
      return { value, category: "Athletes", color: "#00E676" };
    } else if (bodyFat < 21) {
      return { value, category: "Fitness", color: "#00E676" };
    } else if (bodyFat < 28) {
      return { value, category: "Average", color: "#FF9F43" };
    } else {
      return { value, category: "Obese", color: "#FF6B6B" };
    }
  }
}
