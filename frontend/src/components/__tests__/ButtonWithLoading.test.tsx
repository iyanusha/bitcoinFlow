import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonWithLoading } from '../ButtonWithLoading';

describe('ButtonWithLoading', () => {
  it('renders children when not loading', () => {
    render(<ButtonWithLoading loading={false} onClick={() => {}}>Submit</ButtonWithLoading>);
    expect(screen.getByText('Submit')).toBeTruthy();
  });

  it('shows loading text when loading', () => {
    render(<ButtonWithLoading loading={true} onClick={() => {}}>Submit</ButtonWithLoading>);
    expect(screen.getByText('Processing...')).toBeTruthy();
  });

  it('accepts custom loading text', () => {
    render(
      <ButtonWithLoading loading={true} onClick={() => {}} loadingText="Sending...">
        Submit
      </ButtonWithLoading>
    );
    expect(screen.getByText('Sending...')).toBeTruthy();
  });

  it('is disabled when loading', () => {
    render(<ButtonWithLoading loading={true} onClick={() => {}}>Submit</ButtonWithLoading>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<ButtonWithLoading loading={false} disabled={true} onClick={() => {}}>Submit</ButtonWithLoading>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<ButtonWithLoading loading={false} onClick={onClick}>Submit</ButtonWithLoading>);
    fireEvent.click(screen.getByText('Submit'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('has aria-busy when loading', () => {
    const { container } = render(
      <ButtonWithLoading loading={true} onClick={() => {}}>Submit</ButtonWithLoading>
    );
    expect(container.querySelector('[aria-busy="true"]')).toBeTruthy();
  });

  it('adds btn-loading class when loading', () => {
    const { container } = render(
      <ButtonWithLoading loading={true} onClick={() => {}}>Submit</ButtonWithLoading>
    );
    expect(container.querySelector('.btn-loading')).toBeTruthy();
  });
});
