import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  // React lifecycle method to catch errors
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  // Optional: Log the error to an external service
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  // Reset error state when retrying
  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={this.resetError}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}
