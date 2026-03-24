import { describe, expect, it } from 'vitest';
import {
  hexToRgb,
  relativeLuminance,
  contrastRatio,
  meetsAA,
  meetsAAA,
  getContrastLevel,
} from '../colorContrast';

describe('hexToRgb', () => {
  it('parses 6-digit hex', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('parses 3-digit hex', () => {
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('parses without hash', () => {
    expect(hexToRgb('000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('returns null for invalid hex', () => {
    expect(hexToRgb('xyz')).toBeNull();
  });

  it('parses color correctly', () => {
    expect(hexToRgb('#667eea')).toEqual({ r: 102, g: 126, b: 234 });
  });
});

describe('relativeLuminance', () => {
  it('returns 1 for white', () => {
    expect(relativeLuminance(255, 255, 255)).toBeCloseTo(1, 4);
  });

  it('returns 0 for black', () => {
    expect(relativeLuminance(0, 0, 0)).toBe(0);
  });
});

describe('contrastRatio', () => {
  it('returns 21 for black on white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
  });

  it('returns 1 for same color', () => {
    expect(contrastRatio('#667eea', '#667eea')).toBeCloseTo(1, 4);
  });

  it('returns 0 for invalid colors', () => {
    expect(contrastRatio('invalid', '#fff')).toBe(0);
  });

  it('is symmetrical', () => {
    const r1 = contrastRatio('#333', '#fff');
    const r2 = contrastRatio('#fff', '#333');
    expect(r1).toBeCloseTo(r2, 4);
  });
});

describe('meetsAA', () => {
  it('passes for black on white', () => {
    expect(meetsAA('#000', '#fff')).toBe(true);
  });

  it('fails for low contrast', () => {
    expect(meetsAA('#777', '#888')).toBe(false);
  });

  it('uses lower threshold for large text', () => {
    // A pair that meets 3:1 but not 4.5:1
    expect(meetsAA('#767676', '#fff', false)).toBe(true);
  });
});

describe('meetsAAA', () => {
  it('passes for black on white', () => {
    expect(meetsAAA('#000', '#fff')).toBe(true);
  });

  it('fails for moderate contrast', () => {
    // #767676 vs white is ~4.5:1, fails AAA normal
    expect(meetsAAA('#767676', '#fff')).toBe(false);
  });
});

describe('getContrastLevel', () => {
  it('returns AAA for high contrast', () => {
    expect(getContrastLevel('#000', '#fff')).toBe('AAA');
  });

  it('returns fail for very low contrast', () => {
    expect(getContrastLevel('#ccc', '#ddd')).toBe('fail');
  });
});
