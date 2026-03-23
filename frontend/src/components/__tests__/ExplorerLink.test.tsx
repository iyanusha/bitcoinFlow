import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExplorerLink } from '../ExplorerLink';

describe('ExplorerLink', () => {
  it('renders tx link with formatted txId', () => {
    render(<ExplorerLink type="tx" value="0x1234567890abcdef1234567890abcdef" />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toContain('txid/0x1234567890abcdef');
  });

  it('renders address link with formatted address', () => {
    render(<ExplorerLink type="address" value="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toContain('address/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM');
  });

  it('uses custom label when provided', () => {
    render(<ExplorerLink type="tx" value="0xabc" label="View Transaction" />);
    expect(screen.getByText('View Transaction')).toBeTruthy();
  });

  it('opens in new tab with security attributes', () => {
    render(<ExplorerLink type="tx" value="0xabc" />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
  });

  it('has explorer-link CSS class', () => {
    const { container } = render(<ExplorerLink type="tx" value="0xabc" />);
    expect(container.querySelector('.explorer-link')).toBeTruthy();
  });

  it('shows full value in title attribute', () => {
    render(<ExplorerLink type="tx" value="0xfullhash" />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('title')).toBe('0xfullhash');
  });
});
