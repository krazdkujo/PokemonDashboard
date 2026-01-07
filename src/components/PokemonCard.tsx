'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Pokemon } from '@/lib/types';
import { TypeBadge } from './TypeBadge';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imgError, setImgError] = useState(false);
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.number}.png`;
  const formattedNumber = `#${pokemon.number.toString().padStart(3, '0')}`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[150px] w-[150px]">
        <Image
          src={imgError ? '/placeholder-pokemon.svg' : spriteUrl}
          alt={pokemon.name}
          fill
          className="object-contain"
          onError={() => setImgError(true)}
          unoptimized
        />
      </div>
      <h3 className="mt-2 text-xl font-bold capitalize">{pokemon.name}</h3>
      <p className="text-gray-600">{formattedNumber}</p>
      <div className="mt-2 flex gap-2">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} typeName={type} />
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-400">ID: {pokemon.uuid}</p>
    </div>
  );
}
