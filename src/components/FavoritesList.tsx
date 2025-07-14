// src/components/FavoritesList.tsx
'use client';
import React from 'react';

import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import { PokemonCard } from './PokemonCard';
import { selectFavorites } from '../features/favoritePokemon/favoritesSlice';
import { useFavoritesPokemon } from '../hooks/usePokemon';
import { useAppSelector } from '../store/hooks';

interface FavoritesListProps {
  onPokemonSelect: (pokemonId: number) => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({
  onPokemonSelect,
}) => {
  const favoriteIds = useAppSelector(selectFavorites);
  const {
    data: favoritesPokemon,
    isLoading,
    error,
  } = useFavoritesPokemon(favoriteIds);

  if (favoriteIds.length === 0) {
    return (
      <div className='mt-20 flex flex-col items-center justify-center py-16'>
        <div className='empty-state'>
          <h2 className='text-2xl leading-tight font-bold md:text-3xl'>
            No Favorites Yet
          </h2>
          <p className='mt-2 text-left text-sm md:text-base'>
            Start adding Pokemon to your favorites by clicking the heart icon!
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message='Failed to load favorite Pokemon' />;
  }

  return (
    <div className='bg-neutral-25 mt-20 flex flex-col items-center justify-center gap-6'>
      <div className='flex flex-col gap-4 py-16'>
        <div className='favorites-header'>
          <h2 className='text-left text-2xl leading-tight font-bold md:text-3xl'>
            Your Favorite Pokemon
          </h2>
          <p className='mt-2 text-left text-sm md:text-base'>
            {favoritesPokemon?.length || 0} Pokemon in your collection
          </p>
        </div>

        <div className='pokemon-grid grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {favoritesPokemon?.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => onPokemonSelect(pokemon.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
