interface Props {
  error: any;
  resetErrorBoundary: (...args: any[]) => void;
}

function ErrorFallback({ error, resetErrorBoundary }: Props) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}

export default ErrorFallback;
