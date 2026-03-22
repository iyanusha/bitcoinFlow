/**
 * Accessibility utility functions
 */

/** Generate a unique ID for aria-* attribute linking */
let counter = 0;
export function generateId(prefix = 'bf'): string {
  counter += 1;
  return `${prefix}-${counter}`;
}

/** Reset counter for testing */
export function resetIdCounter(): void {
  counter = 0;
}

/**
 * Return the appropriate aria-live value based on message urgency
 */
export function getAriaLive(type: 'error' | 'warning' | 'info' | 'success'): 'assertive' | 'polite' {
  return type === 'error' ? 'assertive' : 'polite';
}

/**
 * Return the appropriate ARIA role for a message type
 */
export function getAriaRole(type: 'error' | 'warning' | 'info' | 'success'): 'alert' | 'status' {
  return type === 'error' ? 'alert' : 'status';
}

/**
 * Check if a keyboard event matches a given key with optional modifiers
 */
export function isKeyMatch(
  event: KeyboardEvent,
  key: string,
  modifiers?: { ctrl?: boolean; shift?: boolean; alt?: boolean },
): boolean {
  if (event.key !== key) return false;
  if (modifiers?.ctrl && !event.ctrlKey) return false;
  if (modifiers?.shift && !event.shiftKey) return false;
  if (modifiers?.alt && !event.altKey) return false;
  return true;
}

/**
 * Return label text for external links (opens in new tab)
 */
export function externalLinkLabel(label: string): string {
  return `${label} (opens in new tab)`;
}

/**
 * Format a number for screen reader announcement (e.g., avoid reading "1,000,000" as "one million")
 */
export function formatForScreenReader(value: number, unit: string): string {
  return `${value.toLocaleString()} ${unit}`;
}
