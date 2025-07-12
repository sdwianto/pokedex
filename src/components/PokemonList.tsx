'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import ErrorMessage from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';
import { PokemonCard } from './PokemonCard';

import { fetchPokemonList } from '@/api/pokemon';
import type { Pokemon } from '@/types/pokemon';

const fetchAllPokemonDetail = async (urls: string[]): Promise<Pokemon[]> => {
  const results = await Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url);
      return res.json();
    })
  );
  return results;
};

const LIMIT = 20;

interface PokemonListProps {
  onPokemonClick: (id: number) => void;
  searchQuery: string;
  pokemonList: string;
  value: string;
}

export default function PokemonList({
  onPokemonClick,
  searchQuery,
  pokemonList,
  value,
}: PokemonListProps) {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [filtered, setFiltered] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const { isLoading, isError } = useQuery({
    queryKey: ['pokemonDetailList'],
    queryFn: async () => {
      const list = await fetchPokemonList(LIMIT, 0);
      const urls = list.results.map((p) => p.url);
      const initialData = await fetchAllPokemonDetail(urls);
      setAllPokemon(initialData);
      setOffset(LIMIT);
      return initialData;
    },
  });

  useEffect(() => {
    if (!searchQuery) {
      setFiltered(allPokemon);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const result = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(lowerQuery)
      );
      setFiltered(result);
    }
  }, [searchQuery, allPokemon]);

  const handleLoadMore = async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const res = await fetchPokemonList(LIMIT, offset);
      const newUrls = res.results.map((p) => p.url);
      const newDetails = await fetchAllPokemonDetail(newUrls);
      const newAll = [...allPokemon, ...newDetails];
      setAllPokemon(newAll);

      if (searchQuery.trim() === '') {
        setFiltered(newAll);
      } else {
        const lowerQuery = searchQuery.toLowerCase();
        const result = newAll.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(lowerQuery)
        );
        setFiltered(result);
      }

      setOffset((prev) => prev + LIMIT);
    } catch (err) {
      console.error('Error loading more Pokémon:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message='Failed to load Pokémon list' />;

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <p className={value}>{pokemonList}</p>
        {filtered.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => onPokemonClick(pokemon.id)}
          />
        ))}
      </div>

      <button
        onClick={handleLoadMore}
        disabled={isLoadingMore}
        className='text-sm-semibold md:text-md-semibold h-11 w-44 w-45 cursor-pointer rounded-full border border-neutral-300 px-4 py-2 text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 md:h-13 md:w-59.25'
      >
        {isLoadingMore ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}
