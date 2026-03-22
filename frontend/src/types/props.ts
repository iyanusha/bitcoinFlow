import type { VaultStats, TransactionRecord, AppError } from './index';

export interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  loading?: boolean;
}

export interface ActionCardProps {
  title: string;
  onSubmit: (amount: string) => Promise<void>;
  buttonLabel: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
}

export interface VaultStatsProps {
  stats: VaultStats;
  loading: boolean;
}

export interface TransactionListProps {
  transactions: TransactionRecord[];
  loading: boolean;
}

export interface ErrorDisplayProps {
  error: AppError | null;
  onDismiss: () => void;
}

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

export interface ResponsiveValue<T> {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  wide?: T;
}

export interface AccessibleProps {
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  role?: string;
}
