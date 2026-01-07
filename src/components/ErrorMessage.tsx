interface ErrorMessageProps {
  type: 'not_found' | 'network';
  message: string;
}

export function ErrorMessage({ type, message }: ErrorMessageProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
      <p className="text-red-700">{message}</p>
      {type === 'not_found' && (
        <p className="mt-2 text-sm text-gray-600">
          <a
            href="https://pokemon-selector-lilac.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Register at Pokemon Selector
          </a>
        </p>
      )}
    </div>
  );
}
