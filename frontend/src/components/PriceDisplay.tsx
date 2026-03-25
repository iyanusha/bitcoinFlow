import React from 'react';
import { usePriceFeed } from '../hooks/usePriceFeed';
import { formatUSD, formatChangePercent, isPositiveChange } from '../lib/priceUtils';

export function PriceDisplay() {
  const { price, loading, error, refresh, history } = usePriceFeed();

  if (loading && !price) {
    return (
      <div className="price-display" aria-label="Loading STX price" aria-busy="true" role="status">
        <div className="price-skeleton-wrapper">
          <div className="price-skeleton" style={{ width: 128, height: 28, marginBottom: 6 }} aria-hidden="true" />
          <div className="price-skeleton" style={{ width: 72, height: 16, marginBottom: 4 }} aria-hidden="true" />
          <div className="price-skeleton" style={{ width: 96, height: 12 }} aria-hidden="true" />
        </div>
        <span className="sr-only">Fetching current STX price…</span>
      </div>
    );
  }

  if (error && !price) {
    return (
      <div className="price-display price-error-banner" role="alert" aria-live="assertive">
        <div className="price-error-content">
          <span className="price-error-icon" aria-hidden="true">⚠</span>
          <span className="price-error-text">Price unavailable — {error}</span>
        </div>
        <button
          className="price-retry-btn"
          onClick={refresh}
          aria-label="Retry fetching STX price"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Retrying…' : 'Retry'}
        </button>
      </div>
    );
  }

  // Stale price warning banner (price loaded but fetch failed)
  const showStaleWarning = error && price !== null;

  if (!price) return null;

  const positive = isPositiveChange(price.change24h);
  const arrow = positive ? '▲' : '▼';
  const changeClass = positive ? 'price-up' : 'price-down';
  const updatedDate = new Date(price.updatedAt);
  const timeStr = updatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="price-display" aria-label={`STX price: ${formatUSD(price.usd)}`}>
      {showStaleWarning && (
        <div className="price-stale-banner" role="status" aria-live="polite">
          <span>Showing cached price — </span>
          <button className="price-retry-btn price-retry-inline" onClick={refresh} aria-label="Retry fetching STX price">
            Refresh
          </button>
        </div>
      )}
      <div className="price-main">
        <span className="price-value">{formatUSD(price.usd)}</span>
        <span className={`price-change ${changeClass}`} aria-label={`24h change: ${formatChangePercent(price.change24h)}`}>
          <span aria-hidden="true">{arrow}</span>
          {formatChangePercent(price.change24h)}
        </span>
      </div>
      <div className="price-meta">
        <span className="price-label">STX/USD</span>
        <span className="price-updated" aria-label={`Last updated at ${timeStr}`}>
          Updated {timeStr}
        </span>
        <button
          className="price-refresh-btn"
          onClick={refresh}
          disabled={loading}
          aria-label="Refresh STX price"
          aria-busy={loading}
        >
          {loading ? '…' : '↻'}
        </button>
      </div>
      {history.length > 1 && (
        <PriceSparklineInline prices={history.map(h => h.usd)} />
      )}
    </div>
  );
}

function PriceSparklineInline({ prices }: { prices: number[] }) {
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const w = 120;
  const h = 32;
  const points = prices
    .map((p, i) => {
      const x = (i / (prices.length - 1)) * w;
      const y = h - ((p - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
      className="price-sparkline"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
