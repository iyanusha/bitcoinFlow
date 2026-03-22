import { Component, type ReactNode, type ErrorInfo } from 'react';
import { logger } from '../lib/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}
interface State { hasError: boolean; error: Error | null; errorCount: number; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorCount: 0 };
  }
  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    logger.error('ErrorBoundary caught an error', { error: error.message, componentStack: info.componentStack });
    this.props.onError?.(error, info);
    this.setState(prev => ({ errorCount: prev.errorCount + 1 }));
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary" role="alert">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message || 'An unexpected error occurred'}</p>
          {this.state.errorCount > 2 && (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #6b7280)' }}>
              This error has occurred multiple times. Try refreshing the page.
            </p>
          )}
          <button onClick={() => {
            logger.info('User clicked Try Again in ErrorBoundary');
            this.setState({ hasError: false, error: null });
          }}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}
