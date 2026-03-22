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

/** Common ARIA role descriptions */
export const ARIA_DESCRIPTIONS = {
  vaultStats: 'Vault statistics overview showing total deposits, rewards, and balances',
  userPosition: 'Your current position in the vault including deposited amount and share',
  depositForm: 'Form to deposit sBTC into the flow vault',
  withdrawForm: 'Form to withdraw sBTC from the flow vault',
  transactionHistory: 'List of your recent deposit and withdrawal transactions',
  walletConnection: 'Connect or disconnect your Stacks wallet',
} as const;

/** Landmark descriptions for screen readers */
export const LANDMARK_LABELS = {
  header: 'Bitcoin Flow application header',
  main: 'Main application content',
  footer: 'Application footer with links and copyright',
  stats: 'Vault statistics',
  actions: 'Deposit and withdrawal actions',
} as const;

/** Key constants for keyboard interactions */
export const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
} as const;

/** Check if a key press is an activation key (Enter or Space) */
export function isActivationKey(key: string): boolean {
  return key === KEYS.ENTER || key === KEYS.SPACE;
}
