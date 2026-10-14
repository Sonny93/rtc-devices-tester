const Loading = () => (
  <div
    role="status"
    aria-label="Loading"
    className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 dark:bg-gray-950/75"
  >
    <div className="size-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400" />
  </div>
);
export default Loading;
