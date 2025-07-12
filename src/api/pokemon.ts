import axios from 'axios';

import type {
  Pokemon,
  PokemonListResponse,
  EvolutionChain,
  PokemonStats,
} from '@/types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const fetchPokemonList = async (
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
  return response.data;
};

const fetchEvolutionChain = async (
  speciesUrl: string
): Promise<EvolutionChain[]> => {
  const speciesRes = await api.get(speciesUrl);
  const evoChainUrl = speciesRes.data.evolution_chain.url;
  const evoChainRes = await api.get(evoChainUrl);
  const chain = evoChainRes.data.chain;

  const evolutions: EvolutionChain[] = [];

  let stage = 1;
  const traverse = (node: any) => {
    const idMatch = node.species.url.match(/\/pokemon-species\/(\d+)\//);
    const id = idMatch ? Number(idMatch[1]) : NaN;
    const name = node.species.name;
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    evolutions.push({ id, name, image, evoStage: stage });

    if (node.evolves_to && node.evolves_to.length > 0) {
      stage++;
      node.evolves_to.forEach(traverse);
    }
  };

  traverse(chain);
  return evolutions;
};

export const fetchPokemonDetail = async (
  nameOrId: string | number
): Promise<Pokemon> => {
  const { data } = await api.get(`/pokemon/${nameOrId}`);

  const rawStats: Record<string, number> = {};
  data.stats.forEach((item: any) => {
    const statName = item.stat.name.replace('-', '_');
    rawStats[statName] = item.base_stat;
  });

  const stats: PokemonStats = {
    hp: rawStats.hp || 0,
    attack: rawStats.attack || 0,
    defense: rawStats.defense || 0,
    special_attack: rawStats.special_attack || 0,
    special_defense: rawStats.special_defense || 0,
    speed: rawStats.speed || 0,
  };

  const speciesRes = await api.get(data.species.url);
  const description =
    speciesRes.data.flavor_text_entries
      .find((entry: any) => entry.language.name === 'en')
      ?.flavor_text.replace(/\f/g, ' ') || 'No description available.';

  const evolutionChain = await fetchEvolutionChain(data.species.url);

  const pokemon: Pokemon = {
    id: data.id,
    name: data.name,
    base_experience: data.base_experience,
    height: data.height,
    weight: data.weight,
    abilities: data.abilities,
    types: data.types,
    sprites: data.sprites,
    artworks: data.sprites.other['official-artwork']?.front_default || '',
    artworkShiny: data.sprites.front_shiny || '',
    stats,
    evolutionChain,
    description,
  };

  return pokemon;
};

export const searchPokemon = async (query: string): Promise<Pokemon[]> => {
  try {
    const pokemon = await fetchPokemonDetail(query.toLowerCase());
    return [pokemon];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

export const fetchMultiplePokemon = async (
  ids: number[]
): Promise<Pokemon[]> => {
  const promises = ids.map((id) => fetchPokemonDetail(id));
  const results = await Promise.allSettled(promises);

  return results
    .filter(
      (result): result is PromiseFulfilledResult<Pokemon> =>
        result.status === 'fulfilled'
    )
    .map((result) => result.value);
};

export const simulateFavoriteToggle = async (
  pokemonId: number,
  isFavorite: boolean
): Promise<{ success: boolean; pokemonId: number; isFavorite: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (Math.random() < 0.05) {
    throw new Error('Network error occurred');
  }

  return { success: true, pokemonId, isFavorite };
};
