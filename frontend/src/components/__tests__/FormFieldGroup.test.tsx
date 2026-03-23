import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormFieldGroup } from '../FormFieldGroup';

describe('FormFieldGroup', () => {
  it('renders legend text', () => {
    render(<FormFieldGroup legend="Amount Settings"><input /></FormFieldGroup>);
    expect(screen.getByText('Amount Settings')).toBeDefined();
  });

  it('renders children', () => {
    render(<FormFieldGroup legend="Test"><button>Submit</button></FormFieldGroup>);
    expect(screen.getByText('Submit')).toBeDefined();
  });

  it('renders error message when provided', () => {
    render(<FormFieldGroup legend="Test" error="Something went wrong"><input /></FormFieldGroup>);
    expect(screen.getByText('Something went wrong')).toBeDefined();
    expect(screen.getByRole('alert')).toBeDefined();
  });

  it('does not render error when null', () => {
    const { container } = render(<FormFieldGroup legend="Test" error={null}><input /></FormFieldGroup>);
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });

  it('applies custom className', () => {
    const { container } = render(<FormFieldGroup legend="Test" className="custom"><input /></FormFieldGroup>);
    expect(container.querySelector('fieldset')?.className).toContain('custom');
  });

  it('uses fieldset element', () => {
    const { container } = render(<FormFieldGroup legend="Test"><input /></FormFieldGroup>);
    expect(container.querySelector('fieldset')).toBeTruthy();
  });
});
