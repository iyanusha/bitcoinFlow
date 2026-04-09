import React, { useState, useEffect, useMemo } from 'react';
import { blocksToReadable } from '../lib/lockUtils';

interface CountdownTimerProps {
  blocksRemaining: number;
  totalBlocks: number;
  currentBlock: number;
}

export function CountdownTimer({ blocksRemaining, totalBlocks, currentBlock }: CountdownTimerProps) {
  const [tick, setTick] = useState(0);

  // Re-render every 60 seconds to refresh the estimate
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 60_000);
    return () => clearInterval(interval);
  }, []);

  const elapsed = totalBlocks - blocksRemaining;
  const progressPct = totalBlocks > 0 ? Math.min(100, (elapsed / totalBlocks) * 100) : 0;

  const timeLabel = useMemo(() => {
    if (blocksRemaining <= 0) return 'Eligible to unlock';
    return blocksToReadable(blocksRemaining) + ' remaining';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocksRemaining, tick]);

  // SVG ring parameters
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPct / 100) * circumference;

  return (
    <div className="countdown-timer" aria-label={`Lock countdown: ${timeLabel}`}>
      <div className="countdown-ring-wrapper" aria-hidden="true">
        <svg
          width={52}
          height={52}
          viewBox="0 0 52 52"
          className="lock-progress-ring"
        >
          {/* Background ring */}
          <circle
            cx={26}
            cy={26}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={4}
          />
          {/* Progress ring */}
          <circle
            cx={26}
            cy={26}
            r={radius}
            fill="none"
            stroke={progressPct >= 100 ? '#22c55e' : '#f59e0b'}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 26 26)"
            className="lock-ring-progress"
            style={{
              transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s ease',
            }}
          />
        </svg>
        <span className="countdown-pct-label" aria-hidden="true">
          {Math.round(progressPct)}%
        </span>
      </div>

      <div className="countdown-info">
        <p className="countdown-label">{timeLabel}</p>
        <p className="countdown-blocks">
          {blocksRemaining.toLocaleString()} blocks left
          <span className="countdown-current"> (block {currentBlock.toLocaleString()})</span>
        </p>
        <div className="countdown-progress-bar" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
          <div className="countdown-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>
    </div>
  );
}
