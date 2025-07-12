// src/components/FavoritesList.tsx
'use client';
import React from 'react';

import ErrorMessage from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';
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
      <div className='favorites-empty'>
        <div className='empty-state'>
          <h2>No Favorites Yet</h2>
          <p>
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
    <div className='favorites-list'>
      <div className='favorites-header'>
        <h2>Your Favorite Pokemon</h2>
        <p>{favoritesPokemon?.length || 0} Pokemon in your collection</p>
      </div>

      <div className='pokemon-grid'>
        {favoritesPokemon?.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => onPokemonSelect(pokemon.id)}
          />
        ))}
      </div>
    </div>
  );
};
