import React from 'react';
import type { PriceData } from '../types/price';
import { formatUSD, isPositiveChange } from '../lib/priceUtils';

interface PriceBadgeProps {
  price: PriceData | null;
  /** When true, shows the STX/BTC rate instead of STX/USD */
  showBtcRate?: boolean;
}

export function PriceBadge({ price, showBtcRate = false }: PriceBadgeProps) {
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

  if (showBtcRate && price.btc > 0) {
    const btcFormatted = price.btc < 0.001
      ? price.btc.toExponential(4)
      : price.btc.toFixed(8);
    return (
      <span
        className="price-badge"
        aria-label={`STX/BTC rate: ${btcFormatted}`}
        title="STX price in BTC"
      >
        <span className="price-badge-value">₿ {btcFormatted}</span>
      </span>
    );
  }

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
