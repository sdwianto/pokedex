'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import PokemonList from '@/components/PokemonList';

export default function ClientPokemonList() {
  const router = useRouter();
  const [searchQuery] = useState('');

  const handlePokemonClick = (id: number) => {
    router.push(`/pokedex/${id}`);
  };

  return (
    <>
      <main className='py-16'>
        <PokemonList
          searchQuery={searchQuery}
          pokemonList='List Pokemon'
          onPokemonClick={handlePokemonClick}
          value='display-xs-bold md:display-md-bold col-span-full text-left text-neutral-900'
        />
      </main>
    </>
  );
}
