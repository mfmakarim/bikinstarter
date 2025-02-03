import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetcher = (url: string | URL | Request) => fetch(url).then(r => r.json())

export function getLocalStorage(key: string, defaultValue: unknown) {

  // Get the value from local storage
  const stickyValue = localStorage.getItem(key);

  // Check if stickyValue is not null or undefined
  if (stickyValue !== null && stickyValue !== undefined) {
      try {
          return JSON.parse(stickyValue);
      } catch (error) {
          console.error(`Error parsing JSON for key "${key}":`, error);
          return defaultValue;
      }
  } else {
      return defaultValue;
  }
}

// Stores a value in local storage after serializing it to JSON.
export function setLocalStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}