import React from 'react';
import type { PriceData } from '../types/price';
import { formatUSD, isPositiveChange } from '../lib/priceUtils';

interface PriceBadgeProps {
  price: PriceData | null;
}

export function PriceBadge({ price }: PriceBadgeProps) {
  if (!price) {
    return (
      <span className="price-badge price-badge-loading" aria-label="STX price loading" aria-busy="true">
        <span className="price-skeleton" style={{ width: 64, height: 14, display: 'inline-block' }} aria-hidden="true" />
      </span>
    );
  }

  const positive = isPositiveChange(price.change24h);
  const colorClass = positive ? 'price-badge-up' : 'price-badge-down';
  const arrow = positive ? '▲' : '▼';

  return (
    <span
      className={`price-badge ${colorClass}`}
      aria-label={`STX price ${formatUSD(price.usd)}, ${positive ? 'up' : 'down'} ${Math.abs(price.change24h).toFixed(2)}% in 24 hours`}
      title={`STX/USD — 24h: ${price.change24h > 0 ? '+' : ''}${price.change24h.toFixed(2)}%`}
    >
      <span aria-hidden="true" className="price-badge-arrow">{arrow}</span>
      <span className="price-badge-value">{formatUSD(price.usd)}</span>
    </span>
  );
}
