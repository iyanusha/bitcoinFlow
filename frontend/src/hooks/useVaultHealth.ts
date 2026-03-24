import { useMemo } from 'react';
import type { VaultStats } from '../types';

export type VaultHealthStatus = 'healthy' | 'warning' | 'critical' | 'paused';

export interface VaultHealth {
  status: VaultHealthStatus;
  label: string;
  description: string;
}

/**
 * Derive vault health from current stats.
 * Provides a simplified status for UI display.
 */
export function useVaultHealth(stats: VaultStats): VaultHealth {
  return useMemo(() => {
    if (stats.isPaused) {
      return {
        status: 'paused' as const,
        label: 'Paused',
        description: 'The vault is temporarily paused. Deposits and withdrawals are disabled.',
      };
    }

    const depositToRewardRatio = stats.totalDeposits > 0
      ? stats.totalRewards / stats.totalDeposits
      : 0;

    // If reward ratio is very low after significant deposits, warn
    if (stats.totalDeposits > 0 && depositToRewardRatio < 0.001) {
      return {
        status: 'warning' as const,
        label: 'Low Yield',
        description: 'The vault is generating below-average rewards. Stacking may be inactive.',
      };
    }

    // If STX balance diverges significantly from deposits, critical
    if (stats.totalDeposits > 0 && stats.stxBalance < stats.totalDeposits * 0.5) {
      return {
        status: 'critical' as const,
        label: 'Under-collateralized',
        description: 'Vault STX balance is significantly below total deposits.',
      };
    }

    return {
      status: 'healthy' as const,
      label: 'Healthy',
      description: 'The vault is operating normally with active stacking.',
    };
  }, [stats]);
}
