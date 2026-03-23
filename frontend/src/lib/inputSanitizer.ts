/**
 * Input sanitization utilities for preventing XSS and data issues.
 */

/** Strip HTML tags from a string */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

/** Escape HTML entities */
export function escapeHtml(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return input.replace(/[&<>"']/g, (char) => map[char] || char);
}

/** Trim and collapse whitespace */
export function normalizeWhitespace(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

/** Remove control characters (except newline and tab) */
export function stripControlChars(input: string): string {
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

/** Sanitize a generic text input */
export function sanitizeText(input: string): string {
  return normalizeWhitespace(stripControlChars(stripHtml(input)));
}

/** Sanitize a numeric input (only digits, decimal point, and minus) */
export function sanitizeNumber(input: string): string {
  let s = input.replace(/[^0-9.-]/g, '');
  // Only allow one minus at the start
  if (s.startsWith('-')) {
    s = '-' + s.slice(1).replace(/-/g, '');
  } else {
    s = s.replace(/-/g, '');
  }
  // Only allow one decimal point
  const parts = s.split('.');
  if (parts.length > 2) {
    s = parts[0] + '.' + parts.slice(1).join('');
  }
  return s;
}

/** Truncate a string to a maximum length */
export function truncate(input: string, maxLength: number, suffix = '...'): string {
  if (input.length <= maxLength) return input;
  return input.slice(0, maxLength - suffix.length) + suffix;
}
