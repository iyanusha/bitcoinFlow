import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

const defaultProps = {
  currentPage: 1,
  totalPages: 5,
  hasNext: true,
  hasPrev: true,
  onNext: vi.fn(),
  onPrev: vi.fn(),
};

describe('Pagination', () => {
  it('renders page info', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Page 2 of 5')).toBeDefined();
  });

  it('renders nothing when totalPages is 1', () => {
    const { container } = render(
      <Pagination {...defaultProps} totalPages={1} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('calls onNext when next button clicked', () => {
    const onNext = vi.fn();
    render(<Pagination {...defaultProps} onNext={onNext} />);
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(onNext).toHaveBeenCalledOnce();
  });

  it('calls onPrev when prev button clicked', () => {
    const onPrev = vi.fn();
    render(<Pagination {...defaultProps} onPrev={onPrev} />);
    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(onPrev).toHaveBeenCalledOnce();
  });

  it('disables prev button when hasPrev is false', () => {
    render(<Pagination {...defaultProps} hasPrev={false} />);
    expect(screen.getByLabelText('Previous page').hasAttribute('disabled')).toBe(true);
  });

  it('disables next button when hasNext is false', () => {
    render(<Pagination {...defaultProps} hasNext={false} />);
    expect(screen.getByLabelText('Next page').hasAttribute('disabled')).toBe(true);
  });

  it('has navigation role with aria label', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByRole('navigation')).toBeDefined();
  });
});
