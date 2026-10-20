import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';
import { ErrorState } from '@/shared/components/ui/error-state';
import { logger } from '@/shared/lib/logger';

type GlobalErrorBoundaryState = {
  readonly error: Error | null;
};

export class GlobalErrorBoundary extends Component<PropsWithChildren, GlobalErrorBoundaryState> {
  override state: GlobalErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error(error.message, errorInfo);
  }

  override render(): ReactNode {
    if (this.state.error) {
      return (
        <ErrorState
          description={this.state.error.message}
          onRetry={() => this.setState({ error: null })}
        />
      );
    }

    return this.props.children;
  }
}
