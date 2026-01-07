export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center" role="status" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
