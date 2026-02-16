import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format phone number for display
export function formatPhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

// Generate WhatsApp link
export function getWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = formatPhone(phone).replace('+', '');
  const baseUrl = `https://wa.me/${cleanPhone}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}

// Generate tel: link
export function getTelLink(phone: string): string {
  return `tel:${formatPhone(phone)}`;
}

// Generate Instagram link
export function getInstagramLink(handle: string): string {
  const cleanHandle = handle.replace('@', '').replace('https://instagram.com/', '').replace('https://www.instagram.com/', '');
  return `https://instagram.com/${cleanHandle}`;
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Format relative time
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return formatDate(dateString);
}

// Check if a lead needs follow-up based on the MVP rule
export function needsFollowUp(
  status: string,
  createdAt: string,
  nextFollowupAt: string | null,
  followUpDays: number = 3
): boolean {
  if (status !== 'NEW' && status !== 'CONTACTED') {
    return false;
  }

  const now = new Date();

  if (nextFollowupAt) {
    return new Date(nextFollowupAt) <= now;
  }

  const createdDate = new Date(createdAt);
  const daysSinceCreated = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  return daysSinceCreated >= followUpDays;
}

// Get start of current month
export function getStartOfMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

// Get end of current month
export function getEndOfMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
}
