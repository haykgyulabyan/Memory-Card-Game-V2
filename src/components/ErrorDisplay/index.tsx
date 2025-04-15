import { ErrorContainer } from './ErrorDisplay.styles';

type ErrorDisplayProps = {
  error: Error | null;
  onRetry?: () => void;
};

function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <ErrorContainer>
      <h3>Oops! Something went wrong.</h3>
      <p>Could not load game resources.</p>
      {error && <pre>Error: {error.message || 'Unknown error'}</pre>}
      {onRetry && <button onClick={onRetry}>Try Again</button>}
      {!onRetry && <button onClick={() => window.location.reload()}>Reload Page</button>}
    </ErrorContainer>
  );
}

export default ErrorDisplay;
