import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function for merging class names with Tailwind CSS
 * Uses clsx for conditional class names and twMerge to handle Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a price with currency symbol
 */
export function formatPrice(price: number, options: {
  currency?: "NOK" | "USD" | "EUR",
  notation?: Intl.NumberFormatOptions["notation"]
} = {}) {
  const { currency = "NOK", notation = "standard" } = options;
  
  const formatter = new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency,
    notation,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(price);
}

/**
 * Convert a date to a human-readable format
 */
export function formatDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  
  return d.toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Convert milliseconds to a human-readable duration
 */
export function formatDuration(durationInMinutes: number) {
  if (durationInMinutes < 60) {
    return `${durationInMinutes} minutter`;
  }
  
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  
  if (minutes === 0) {
    return `${hours} time${hours > 1 ? "r" : ""}`;
  }
  
  return `${hours} time${hours > 1 ? "r" : ""} og ${minutes} minutt${minutes > 1 ? "er" : ""}`;
}

/**
 * Generate a uniqueID for use in client-side components
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Makes a string URL-friendly by converting to lowercase, replacing spaces with hyphens, 
 * and removing special characters
 */
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Split accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[æåä]/g, 'a') // Replace Nordic characters
    .replace(/[øöõ]/g, 'o')
    .replace(/[^\w\-]+/g, '-') // Replace non-word chars with dash
    .replace(/\s+/g, '-') // Replace spaces with dash
    .replace(/--+/g, '-') // Replace multiple dashes with single dash
    .replace(/^-+/, '') // Trim dash from start
    .replace(/-+$/, ''); // Trim dash from end
}
