// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from '../features/favoritePokemon/favoritesSlice';

// Create the store
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

// Export types
export type RootState = {
  favorites: ReturnType<typeof favoritesReducer>;
};

export type AppDispatch = typeof store.dispatch;
