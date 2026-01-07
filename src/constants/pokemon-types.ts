import { TypeColorConfig } from '@/lib/types';

export const POKEMON_TYPE_COLORS: Record<string, TypeColorConfig> = {
  Normal: { bg: 'bg-stone-400', text: 'text-white' },
  Fire: { bg: 'bg-orange-500', text: 'text-white' },
  Water: { bg: 'bg-blue-500', text: 'text-white' },
  Electric: { bg: 'bg-yellow-400', text: 'text-black' },
  Grass: { bg: 'bg-green-500', text: 'text-white' },
  Ice: { bg: 'bg-cyan-300', text: 'text-black' },
  Fighting: { bg: 'bg-red-700', text: 'text-white' },
  Poison: { bg: 'bg-purple-500', text: 'text-white' },
  Ground: { bg: 'bg-amber-600', text: 'text-white' },
  Flying: { bg: 'bg-indigo-300', text: 'text-black' },
  Psychic: { bg: 'bg-pink-500', text: 'text-white' },
  Bug: { bg: 'bg-lime-500', text: 'text-white' },
  Rock: { bg: 'bg-stone-600', text: 'text-white' },
  Ghost: { bg: 'bg-violet-700', text: 'text-white' },
  Dragon: { bg: 'bg-indigo-600', text: 'text-white' },
  Dark: { bg: 'bg-stone-800', text: 'text-white' },
  Steel: { bg: 'bg-slate-400', text: 'text-black' },
  Fairy: { bg: 'bg-pink-300', text: 'text-black' },
};

export function getTypeColors(typeName: string): TypeColorConfig {
  return POKEMON_TYPE_COLORS[typeName] || { bg: 'bg-gray-400', text: 'text-white' };
}
