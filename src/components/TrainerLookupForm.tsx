'use client';

import { FormEvent, useRef, useEffect } from 'react';

interface TrainerLookupFormProps {
  name: string;
  onNameChange: (name: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function TrainerLookupForm({
  name,
  onNameChange,
  onSubmit,
  isLoading,
}: TrainerLookupFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = isLoading || name.trim() === '';
  const helperId = 'trainer-name-helper';

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isDisabled) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <label htmlFor="trainer-name" className="mb-1 block text-sm font-medium text-gray-700">
          Trainer Name
        </label>
        <input
          ref={inputRef}
          id="trainer-name"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter your trainer name"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          disabled={isLoading}
          autoComplete="off"
          aria-describedby={name.trim() === '' ? helperId : undefined}
        />
        {name.trim() === '' && (
          <p id={helperId} className="mt-1 text-sm text-gray-500">
            Enter a name to search
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isDisabled}
        className="self-end rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 sm:self-start sm:mt-6"
      >
        {isLoading ? 'Looking up...' : 'Look Up'}
      </button>
    </form>
  );
}
