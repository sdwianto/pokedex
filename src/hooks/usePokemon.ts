//src/hooks/usePokemon.ts

import { useQuery } from '@tanstack/react-query';

import {
  fetchPokemonDetail,
  fetchPokemonList,
  fetchMultiplePokemon,
} from '@/api/pokemon';

export const usePokemon = (id: number) =>
  useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemonDetail(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

export const usePokemonList = (limit = 20, offset = 0) =>
  useQuery({
    queryKey: ['pokemonList', limit, offset],
    queryFn: () => fetchPokemonList(limit, offset),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

export const useFavoritesPokemon = (favoriteIds: number[]) =>
  useQuery({
    queryKey: ['favoritesPokemon', favoriteIds],
    queryFn: () => fetchMultiplePokemon(favoriteIds),
    enabled: favoriteIds.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export interface EvolutionChain {
  id: number;
  name: string;
  image: string;
  evoStage: number;
}
