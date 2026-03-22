import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { auditAccessibility } from '../a11yAudit';

describe('auditAccessibility', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('reports images without alt text', () => {
    container.innerHTML = '<img src="test.png">';
    const issues = auditAccessibility(container);
    expect(issues.some(i => i.issue === 'Image missing alt text')).toBe(true);
  });

  it('does not report images with alt text', () => {
    container.innerHTML = '<img src="test.png" alt="A test image">';
    const issues = auditAccessibility(container);
    expect(issues.some(i => i.issue === 'Image missing alt text')).toBe(false);
  });

  it('does not report presentation images', () => {
    container.innerHTML = '<img src="test.png" role="presentation">';
    const issues = auditAccessibility(container);
    expect(issues.some(i => i.issue === 'Image missing alt text')).toBe(false);
  });

  it('reports buttons without accessible names', () => {
    container.innerHTML = '<button></button>';
    const issues = auditAccessibility(container);
    expect(issues.some(i => i.issue === 'Button has no accessible name')).toBe(true);
  });

  it('does not report buttons with text content', () => {
    container.innerHTML = '<button>Click me</button>';
    const issues = auditAccessibility(container);
    expect(issues.some(i => i.issue === 'Button has no accessible name')).toBe(false);
  });

  it('does not report buttons with aria-label', () => {
    container.innerHTML = '<button aria-label="Close"></button>';
    const issues = auditAccessibility(container);
    expect(issues.some(i => i.issue === 'Button has no accessible name')).toBe(false);
  });

  it('reports inputs without labels', () => {
    container.innerHTML = '<input type="text">';
    const issues = auditAccessibility(container);
    expect(issues.some(i => i.issue === 'Form input missing label')).toBe(true);
  });

  it('does not report inputs with matching label', () => {
    container.innerHTML = '<label for="name">Name</label><input id="name" type="text">';
    const issues = auditAccessibility(container);
    expect(issues.some(i => i.issue === 'Form input missing label')).toBe(false);
  });

  it('reports skipped heading levels', () => {
    container.innerHTML = '<h1>Title</h1><h3>Subtitle</h3>';
    const issues = auditAccessibility(container);
    expect(issues.some(i => i.issue.includes('Heading level skipped'))).toBe(true);
  });

  it('does not report sequential heading levels', () => {
    container.innerHTML = '<h1>Title</h1><h2>Subtitle</h2><h3>Section</h3>';
    const issues = auditAccessibility(container);
    expect(issues.some(i => i.issue.includes('Heading level skipped'))).toBe(false);
  });

  it('returns empty array for clean DOM', () => {
    container.innerHTML = '<h1>Title</h1><h2>Subtitle</h2><button>OK</button>';
    const issues = auditAccessibility(container);
    expect(issues).toHaveLength(0);
  });
});
