/**
 * Runtime accessibility audit utilities for development.
 * Checks common WCAG issues in the rendered DOM.
 */

export interface A11yIssue {
  element: string;
  issue: string;
  severity: 'error' | 'warning';
}

/** Check for images without alt text */
function checkImagesAlt(root: Element): A11yIssue[] {
  const issues: A11yIssue[] = [];
  const images = root.querySelectorAll('img');
  images.forEach((img) => {
    if (!img.hasAttribute('alt') && !img.getAttribute('role')?.includes('presentation')) {
      issues.push({
        element: `<img src="${img.src?.slice(0, 50)}">`,
        issue: 'Image missing alt text',
        severity: 'error',
      });
    }
  });
  return issues;
}

/** Check for buttons without accessible names */
function checkButtonLabels(root: Element): A11yIssue[] {
  const issues: A11yIssue[] = [];
  const buttons = root.querySelectorAll('button');
  buttons.forEach((btn) => {
    const text = btn.textContent?.trim();
    const label = btn.getAttribute('aria-label');
    const labelledBy = btn.getAttribute('aria-labelledby');
    if (!text && !label && !labelledBy) {
      issues.push({
        element: `<button class="${btn.className}">`,
        issue: 'Button has no accessible name',
        severity: 'error',
      });
    }
  });
  return issues;
}

/** Check for form inputs without labels */
function checkInputLabels(root: Element): A11yIssue[] {
  const issues: A11yIssue[] = [];
  const inputs = root.querySelectorAll('input, select, textarea');
  inputs.forEach((input) => {
    const id = input.getAttribute('id');
    const label = input.getAttribute('aria-label');
    const labelledBy = input.getAttribute('aria-labelledby');
    const hasLabel = id && root.querySelector(`label[for="${id}"]`);
    if (!hasLabel && !label && !labelledBy) {
      issues.push({
        element: `<${input.tagName.toLowerCase()} type="${input.getAttribute('type') || 'text'}">`,
        issue: 'Form input missing label',
        severity: 'error',
      });
    }
  });
  return issues;
}

/** Check for missing heading hierarchy */
function checkHeadingOrder(root: Element): A11yIssue[] {
  const issues: A11yIssue[] = [];
  const headings = root.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let lastLevel = 0;
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1]);
    if (lastLevel > 0 && level > lastLevel + 1) {
      issues.push({
        element: `<${heading.tagName.toLowerCase()}>`,
        issue: `Heading level skipped from h${lastLevel} to h${level}`,
        severity: 'warning',
      });
    }
    lastLevel = level;
  });
  return issues;
}

/** Run all accessibility checks */
export function auditAccessibility(root: Element = document.body): A11yIssue[] {
  return [
    ...checkImagesAlt(root),
    ...checkButtonLabels(root),
    ...checkInputLabels(root),
    ...checkHeadingOrder(root),
  ];
}
