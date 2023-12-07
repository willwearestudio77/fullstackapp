import { Suspense } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import CircularProgress from "@mui/material/CircularProgress";

// Spinner
const LoadingView = () => <CircularProgress />;

// Error + retry
const ErrorView = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <div>{error.message}</div>
      <button title="Retry" onClick={resetErrorBoundary}>
        Retry
      </button>
    </div>
  );
};

// Combine and render children if all OK.
export const QueryBoundaries = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      FallbackComponent={ErrorView}
      onError={(...args) => console.log(args)}
    >
      <Suspense fallback={<LoadingView />}>{children}</Suspense>
    </ErrorBoundary>
  );
};