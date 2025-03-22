import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Check the length and format accordingly
  if (cleaned.length === 10) {
    // Format as: (XXX) XXX-XXXX
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  } else if (cleaned.length > 10) {
    // International number with country code
    return `+${cleaned.slice(0, cleaned.length - 10)} ${formatPhoneNumber(cleaned.slice(-10))}`;
  }
  
  // If the number has an unexpected length, return it as is
  return phoneNumber;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function debounce<T extends (...args: any[]) => any>(func: T, timeout = 300) {
  let timer: ReturnType<typeof setTimeout>;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Create smooth scrolling functionality
export function smoothScrollTo(y: number, duration = 500): void {
  const initialY = window.scrollY;
  const difference = y - initialY;
  const startTime = performance.now();

  function step() {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    
    window.scrollTo(0, initialY + difference * easeOutQuart);

    if (elapsed < duration) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}