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

  // T002: Nickname detection - treat empty string same as null/undefined
  const hasNickname = pokemon.nickname && pokemon.nickname.trim() !== '';

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[150px] w-[150px]">
        <Image
          src={imgError ? '/placeholder-pokemon.svg' : spriteUrl}
          alt={hasNickname ? pokemon.nickname! : pokemon.name}
          fill
          className="object-contain"
          onError={() => setImgError(true)}
          unoptimized
        />
      </div>
      {/* T003-T005: Display nickname as primary heading when present, species as subtitle */}
      {hasNickname ? (
        <>
          <h3 className="mt-2 text-xl font-bold">{pokemon.nickname}</h3>
          <p className="text-sm text-gray-500 capitalize">{pokemon.name}</p>
        </>
      ) : (
        <>
          <h3 className="mt-2 text-xl font-bold capitalize">{pokemon.name}</h3>
          {/* T006-T008: Add nickname link when no nickname */}
          <a
            href="https://pokemon-selector-lilac.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            Add a nickname
          </a>
        </>
      )}
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
