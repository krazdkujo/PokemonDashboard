export function NoPokemonMessage() {
  return (
    <div className="text-center">
      <p className="text-lg text-gray-700">
        You haven&apos;t selected a starter Pokemon yet!
      </p>
      <p className="mt-2">
        <a
          href="https://pokemon-selector-lilac.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Select your starter at Pokemon Selector
        </a>
      </p>
    </div>
  );
}
