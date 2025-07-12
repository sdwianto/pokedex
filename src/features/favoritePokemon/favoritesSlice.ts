// src/features/favoritePokemon/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';

interface FavoriteState {
  favorites: number[];
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    hydrateFavoritesFromLocalStorage: (state) => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('pokemonFavorites');
        if (stored) {
          state.favorites = JSON.parse(stored);
        }
      }
    },
    addFavorite: (state, action: PayloadAction<number>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        localStorage.setItem(
          'pokemonFavorites',
          JSON.stringify(state.favorites)
        );
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
      localStorage.setItem('pokemonFavorites', JSON.stringify(state.favorites));
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const pokemonId = action.payload;
      const index = state.favorites.indexOf(pokemonId);

      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(pokemonId);
      }

      localStorage.setItem('pokemonFavorites', JSON.stringify(state.favorites));
    },
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem('pokemonFavorites');
    },
  },
});

export const {
  hydrateFavoritesFromLocalStorage,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} = favoritesSlice.actions;

// Selectors
export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectIsFavorite = (state: RootState, pokemonId: number) =>
  state.favorites.favorites.includes(pokemonId);
export const selectFavoritesCount = (state: RootState) =>
  state.favorites.favorites.length;

export default favoritesSlice.reducer;
