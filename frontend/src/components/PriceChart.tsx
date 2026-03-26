import React, { useMemo } from 'react';

interface PriceChartProps {
  history: number[];
  width?: number;
  height?: number;
  strokeColor?: string;
  fillId?: string;
}

export function PriceChart({
  history,
  width = 240,
  height = 60,
  strokeColor = '#16a34a',
  fillId,
}: PriceChartProps) {
  const gradientId = fillId || 'price-chart-gradient';

  const { polylinePoints, polygonPoints } = useMemo(() => {
    if (history.length < 2) return { polylinePoints: '', polygonPoints: '' };

    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;
    const padding = 4;
    const chartH = height - padding * 2;
    const chartW = width;

    const coords = history.map((price, i) => {
      const x = (i / (history.length - 1)) * chartW;
      const y = padding + chartH - ((price - min) / range) * chartH;
      return { x, y };
    });

    const linePoints = coords.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

    // Closed polygon for gradient fill: line + baseline
    const first = coords[0];
    const last = coords[coords.length - 1];
    const fillPoints = [
      ...coords.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`),
      `${last.x.toFixed(2)},${height}`,
      `${first.x.toFixed(2)},${height}`,
    ].join(' ');

    return { polylinePoints: linePoints, polygonPoints: fillPoints };
  }, [history, width, height]);

  if (history.length < 2) {
    return (
      <div className="price-chart price-chart-empty" aria-hidden="true" style={{ width, height }}>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>Not enough data</span>
      </div>
    );
  }

  const isPositive = history[history.length - 1] >= history[0];
  const color = isPositive ? '#16a34a' : '#dc2626';
  const fillColor = isPositive ? '#dcfce7' : '#fee2e2';

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="price-chart"
      aria-hidden="true"
      role="img"
      aria-label="STX price history sparkline"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={fillColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Gradient fill area */}
      <polygon
        points={polygonPoints}
        fill={`url(#${gradientId})`}
        stroke="none"
      />

      {/* Price line */}
      <polyline
        points={polylinePoints}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* End dot */}
      {history.length > 0 && (() => {
        const last = polylinePoints.split(' ').pop();
        if (!last) return null;
        const [x, y] = last.split(',').map(Number);
        return <circle cx={x} cy={y} r={2.5} fill={color} />;
      })()}
    </svg>
  );
}
