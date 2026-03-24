import { describe, expect, it, afterEach } from 'vitest';
import { addResourceHint, preconnect, prefetch, preload, preconnectHiroApi } from '../resourceHints';

describe('resourceHints', () => {
  afterEach(() => {
    document.head.querySelectorAll('link[rel]').forEach((el) => el.remove());
  });

  it('adds a preload link to head', () => {
    const cleanup = addResourceHint('/style.css', 'preload', { as: 'style' });
    const link = document.head.querySelector('link[rel="preload"]');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('/style.css');
    expect(link?.getAttribute('as')).toBe('style');
    cleanup();
    expect(document.head.querySelector('link[rel="preload"]')).toBeNull();
  });

  it('preconnect adds link', () => {
    const cleanup = preconnect('https://api.example.com');
    const link = document.head.querySelector('link[rel="preconnect"]');
    expect(link?.getAttribute('href')).toBe('https://api.example.com');
    cleanup();
  });

  it('prefetch adds link', () => {
    const cleanup = prefetch('/data.json', 'fetch');
    const link = document.head.querySelector('link[rel="prefetch"]');
    expect(link?.getAttribute('href')).toBe('/data.json');
    cleanup();
  });

  it('preload adds link with as type', () => {
    const cleanup = preload('/font.woff2', 'font');
    const link = document.head.querySelector('link[rel="preload"]');
    expect(link?.getAttribute('as')).toBe('font');
    cleanup();
  });

  it('preconnectHiroApi adds hiro preconnect', () => {
    const cleanup = preconnectHiroApi();
    const link = document.head.querySelector('link[rel="preconnect"]');
    expect(link?.getAttribute('href')).toBe('https://api.hiro.so');
    cleanup();
  });
});
