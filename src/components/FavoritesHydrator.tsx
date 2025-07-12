//src/components/FavoritesHydrator.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { hydrateFavoritesFromLocalStorage } from '../features/favoritePokemon/favoritesSlice';

export default function FavoritesHydrator() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hydrateFavoritesFromLocalStorage());
  }, [dispatch]);

  return null;
}
