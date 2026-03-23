import { Spinner } from './Spinner';

interface LoadingScreenProps { message?: string; }

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={message}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', gap: '1rem' }}
    >
      <Spinner size="lg" />
      <p style={{ color: 'var(--text-muted, #6b7280)', fontSize: '0.9rem' }}>{message}</p>
    </div>
  );
}
