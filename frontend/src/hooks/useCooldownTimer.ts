import { useState, useEffect, useCallback } from 'react';
import { BLOCK_TIME_SECONDS } from '../lib/constants';

interface CooldownTimerState {
  /** Estimated seconds remaining in cooldown */
  secondsRemaining: number;
  /** Human-readable time string e.g. "5m 30s" */
  display: string;
  /** Whether the cooldown has expired */
  isExpired: boolean;
}

function formatCooldownTime(seconds: number): string {
  if (seconds <= 0) return 'Ready';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

/**
 * Hook that converts a block-based cooldown into a real-time countdown.
 * Takes the number of remaining blocks and provides a ticking timer.
 */
export function useCooldownTimer(blocksRemaining: number): CooldownTimerState {
  const initialSeconds = blocksRemaining * BLOCK_TIME_SECONDS;
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);

  // Reset when blocksRemaining changes
  useEffect(() => {
    setSecondsRemaining(blocksRemaining * BLOCK_TIME_SECONDS);
  }, [blocksRemaining]);

  // Tick every second when cooldown is active
  useEffect(() => {
    if (secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        const next = prev - 1;
        return next >= 0 ? next : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining > 0]);

  const isExpired = secondsRemaining <= 0;
  const display = formatCooldownTime(secondsRemaining);

  return { secondsRemaining, display, isExpired };
}
