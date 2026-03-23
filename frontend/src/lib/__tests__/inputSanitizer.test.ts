import { describe, expect, it } from 'vitest';
import {
  stripHtml,
  escapeHtml,
  normalizeWhitespace,
  stripControlChars,
  sanitizeText,
  sanitizeNumber,
  truncate,
} from '../inputSanitizer';

describe('stripHtml', () => {
  it('removes HTML tags', () => {
    expect(stripHtml('<b>bold</b>')).toBe('bold');
  });

  it('removes nested tags', () => {
    expect(stripHtml('<div><p>text</p></div>')).toBe('text');
  });

  it('handles self-closing tags', () => {
    expect(stripHtml('before<br/>after')).toBe('beforeafter');
  });

  it('returns plain text unchanged', () => {
    expect(stripHtml('no tags here')).toBe('no tags here');
  });
});

describe('escapeHtml', () => {
  it('escapes ampersand', () => {
    expect(escapeHtml('a&b')).toBe('a&amp;b');
  });

  it('escapes angle brackets', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
  });

  it('escapes quotes', () => {
    expect(escapeHtml('"hello"')).toBe('&quot;hello&quot;');
  });

  it('escapes single quotes', () => {
    expect(escapeHtml("it's")).toBe("it&#39;s");
  });
});

describe('normalizeWhitespace', () => {
  it('trims leading and trailing whitespace', () => {
    expect(normalizeWhitespace('  hello  ')).toBe('hello');
  });

  it('collapses multiple spaces', () => {
    expect(normalizeWhitespace('hello   world')).toBe('hello world');
  });

  it('collapses tabs and newlines', () => {
    expect(normalizeWhitespace('hello\t\nworld')).toBe('hello world');
  });
});

describe('stripControlChars', () => {
  it('removes null bytes', () => {
    expect(stripControlChars('hello\x00world')).toBe('helloworld');
  });

  it('preserves newlines and tabs', () => {
    expect(stripControlChars('hello\n\tworld')).toBe('hello\n\tworld');
  });

  it('removes BEL character', () => {
    expect(stripControlChars('hello\x07world')).toBe('helloworld');
  });
});

describe('sanitizeText', () => {
  it('combines all text sanitization', () => {
    expect(sanitizeText('  <b>hello</b>  \x00world  ')).toBe('hello world');
  });
});

describe('sanitizeNumber', () => {
  it('strips non-numeric characters', () => {
    expect(sanitizeNumber('$1,234.56')).toBe('1234.56');
  });

  it('preserves leading minus', () => {
    expect(sanitizeNumber('-5.5')).toBe('-5.5');
  });

  it('removes extra minus signs', () => {
    expect(sanitizeNumber('-5-3')).toBe('-53');
  });

  it('removes extra decimal points', () => {
    expect(sanitizeNumber('1.2.3')).toBe('1.23');
  });
});

describe('truncate', () => {
  it('returns short string unchanged', () => {
    expect(truncate('hi', 10)).toBe('hi');
  });

  it('truncates with default suffix', () => {
    expect(truncate('hello world', 8)).toBe('hello...');
  });

  it('supports custom suffix', () => {
    expect(truncate('hello world', 9, '…')).toBe('hello wo…');
  });

  it('handles exact length', () => {
    expect(truncate('hello', 5)).toBe('hello');
  });
});
