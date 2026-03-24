import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { KeyboardShortcutHelp } from '../KeyboardShortcutHelp';

HTMLDialogElement.prototype.showModal = HTMLDialogElement.prototype.showModal || vi.fn();
HTMLDialogElement.prototype.close = HTMLDialogElement.prototype.close || vi.fn();

describe('KeyboardShortcutHelp', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<KeyboardShortcutHelp open={false} onClose={vi.fn()} />);
    expect(container.querySelector('dialog')).toBeNull();
  });

  it('renders dialog when open', () => {
    render(<KeyboardShortcutHelp open={true} onClose={vi.fn()} />);
    expect(screen.getByText('Keyboard Shortcuts')).toBeDefined();
  });

  it('lists shortcut entries', () => {
    render(<KeyboardShortcutHelp open={true} onClose={vi.fn()} />);
    expect(screen.getByText('Dismiss error messages')).toBeDefined();
    expect(screen.getByText('Show keyboard shortcuts')).toBeDefined();
  });

  it('has close button', () => {
    render(<KeyboardShortcutHelp open={true} onClose={vi.fn()} />);
    expect(screen.getByLabelText('Close keyboard shortcuts')).toBeDefined();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<KeyboardShortcutHelp open={true} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close keyboard shortcuts'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('has proper ARIA attributes', () => {
    render(<KeyboardShortcutHelp open={true} onClose={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-labelledby')).toBe('shortcut-help-title');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('renders kbd elements for keys', () => {
    const { container } = render(<KeyboardShortcutHelp open={true} onClose={vi.fn()} />);
    const kbds = container.querySelectorAll('kbd');
    expect(kbds.length).toBeGreaterThan(0);
  });
});
