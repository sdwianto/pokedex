//src/app/ClientPokemonList.tsx
'use client';

import { useState } from 'react';

import PokemonList from '@/components/PokemonList';

interface ClientPokemonListProps {
  onPokemonClick: (pokemonId: number) => void;
}

export default function ClientPokemonList({
  onPokemonClick,
}: ClientPokemonListProps) {
  const [searchQuery] = useState('');

  return (
    <>
      <main className='py-16'>
        <PokemonList
          searchQuery={searchQuery}
          pokemonList='List Pokemon'
          onPokemonClick={onPokemonClick}
          value='display-xs-bold md:display-md-bold col-span-full text-left text-neutral-900'
        />
      </main>
    </>
  );
}
