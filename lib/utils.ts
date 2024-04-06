import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @description Merges class values using Tailwind CSS and custom class values.
 * @param inputs - The class values to merge.
 * @returns The merged class value.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
