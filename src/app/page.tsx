'use client';

import { useReducer, useState } from 'react';
import { LookupState, TrainerData } from '@/lib/types';
import { lookupTrainer } from '@/lib/api';
import { TrainerLookupForm } from '@/components/TrainerLookupForm';
import { TrainerResult } from '@/components/TrainerResult';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Footer } from '@/components/Footer';

type LookupAction =
  | { type: 'START_LOADING' }
  | { type: 'SUCCESS'; data: TrainerData }
  | { type: 'ERROR'; errorType: 'not_found' | 'network'; message: string }
  | { type: 'RESET' };

function lookupReducer(state: LookupState, action: LookupAction): LookupState {
  switch (action.type) {
    case 'START_LOADING':
      return { status: 'loading' };
    case 'SUCCESS':
      return { status: 'success', data: action.data };
    case 'ERROR':
      return { status: 'error', errorType: action.errorType, message: action.message };
    case 'RESET':
      return { status: 'idle' };
    default:
      return state;
  }
}

export default function Home() {
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(lookupReducer, { status: 'idle' });

  const handleSubmit = async () => {
    dispatch({ type: 'START_LOADING' });

    try {
      const response = await lookupTrainer(name);

      if (response.success && response.data) {
        dispatch({ type: 'SUCCESS', data: response.data });
      } else if (response.error) {
        dispatch({
          type: 'ERROR',
          errorType: response.error.type === 'not_found' ? 'not_found' : 'network',
          message: response.error.message,
        });
      }
    } catch {
      dispatch({
        type: 'ERROR',
        errorType: 'network',
        message: 'Unable to connect. Please try again.',
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Trainer Lookup</h1>
            <p className="mt-2 text-gray-600">
              Look up your trainer data and see your selected Pokemon
            </p>
          </div>

          <TrainerLookupForm
            name={name}
            onNameChange={setName}
            onSubmit={handleSubmit}
            isLoading={state.status === 'loading'}
          />

          <div className="mt-8" aria-live="polite" aria-atomic="true">
            {state.status === 'loading' && (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            )}

            {state.status === 'success' && <TrainerResult trainer={state.data} />}

            {state.status === 'error' && (
              <ErrorMessage type={state.errorType} message={state.message} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
