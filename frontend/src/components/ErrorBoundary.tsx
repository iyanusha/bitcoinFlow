import { Component, type ReactNode, type ErrorInfo } from 'react';
import { logger } from '../lib/logger';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    logger.error('ErrorBoundary caught an error', { error: error.message, componentStack: info.componentStack });
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary" role="alert">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message || 'An unexpected error occurred'}</p>
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
