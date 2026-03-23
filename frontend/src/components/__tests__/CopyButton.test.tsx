import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CopyButton } from '../CopyButton';

vi.mock('../../lib/clipboard', () => ({
  copyToClipboard: vi.fn().mockResolvedValue(true),
}));

describe('CopyButton', () => {
  it('renders with default label', () => {
    render(<CopyButton text="test" />);
    expect(screen.getByText('Copy')).toBeTruthy();
  });

  it('has accessible aria-label', () => {
    render(<CopyButton text="test" label="Copy address" />);
    expect(screen.getByLabelText('Copy address')).toBeTruthy();
  });

  it('shows "Copied" feedback after click', async () => {
    render(<CopyButton text="test" />);
    fireEvent.click(screen.getByText('Copy'));
    await waitFor(() => {
      expect(screen.getByText('Copied')).toBeTruthy();
    });
  });

  it('has copy-btn CSS class', () => {
    const { container } = render(<CopyButton text="test" />);
    expect(container.querySelector('.copy-btn')).toBeTruthy();
  });
});
