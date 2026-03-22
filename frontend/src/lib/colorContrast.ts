/**
 * WCAG 2.1 color contrast utilities for ensuring accessible color combinations.
 */

/** Parse a hex color string to RGB values */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace(/^#/, '');
  if (cleaned.length !== 3 && cleaned.length !== 6) return null;

  const full = cleaned.length === 3
    ? cleaned.split('').map(c => c + c).join('')
    : cleaned;

  const num = parseInt(full, 16);
  if (isNaN(num)) return null;

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/** Calculate relative luminance per WCAG 2.1 */
export function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/** Calculate contrast ratio between two colors (1:1 to 21:1) */
export function contrastRatio(hex1: string, hex2: string): number {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  if (!c1 || !c2) return 0;

  const l1 = relativeLuminance(c1.r, c1.g, c1.b);
  const l2 = relativeLuminance(c2.r, c2.g, c2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/** WCAG AA requires 4.5:1 for normal text, 3:1 for large text */
export function meetsAA(hex1: string, hex2: string, isLargeText = false): boolean {
  const ratio = contrastRatio(hex1, hex2);
  return ratio >= (isLargeText ? 3 : 4.5);
}

/** WCAG AAA requires 7:1 for normal text, 4.5:1 for large text */
export function meetsAAA(hex1: string, hex2: string, isLargeText = false): boolean {
  const ratio = contrastRatio(hex1, hex2);
  return ratio >= (isLargeText ? 4.5 : 7);
}

export type ContrastLevel = 'fail' | 'AA-large' | 'AA' | 'AAA';

/** Get the highest WCAG level met by a color pair */
export function getContrastLevel(hex1: string, hex2: string): ContrastLevel {
  const ratio = contrastRatio(hex1, hex2);
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA-large';
  return 'fail';
}
