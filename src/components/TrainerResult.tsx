import { TrainerData } from '@/lib/types';
import { PokemonCard } from './PokemonCard';
import { NoPokemonMessage } from './NoPokemonMessage';

interface TrainerResultProps {
  trainer: TrainerData;
}

export function TrainerResult({ trainer }: TrainerResultProps) {
  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-6">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{trainer.trainer_name}</h2>
        <p className="text-sm text-gray-500">Trainer ID: {trainer.trainer_id}</p>
      </div>
      {trainer.pokemon ? (
        <PokemonCard pokemon={trainer.pokemon} />
      ) : (
        <NoPokemonMessage />
      )}
    </div>
  );
}
