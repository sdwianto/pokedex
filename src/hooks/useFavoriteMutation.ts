// src/hooks/useFavoriteMutation.ts

'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { simulateFavoriteToggle } from '@/api/favoritesApi';
import { toggleFavorite } from '@/features/favoritePokemon/favoritesSlice';
import { useAppDispatch } from '@/store/hooks';

export const useFavoriteMutation = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      pokemonId,
      isFavorite,
    }: {
      pokemonId: number;
      isFavorite: boolean;
    }) => {
      const result = await simulateFavoriteToggle(pokemonId, isFavorite);
      return result;
    },

    onMutate: async ({ pokemonId }) => {
      await queryClient.cancelQueries({ queryKey: ['favoritesPokemon'] });
      const previousFavorites = queryClient.getQueryData(['favoritesPokemon']);

      dispatch(toggleFavorite(pokemonId));

      return { previousFavorites, pokemonId };
    },

    onError: (error, { pokemonId }) => {
      dispatch(toggleFavorite(pokemonId)); // rollback
      console.error('Failed to toggle favorite:', error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favoritesPokemon'] });
    },
  });
};
