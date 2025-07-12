// src/types/pokemon.ts

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export interface Pokemon {
  id: number;
  name: string;
  image?: string;
  description?: string;
  base_experience: number;

  height: number;
  weight: number;

  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];

  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };

  artworks?: string;
  artworkShiny?: string;
  isFavorite?: boolean;

  types: Array<{
    type: {
      name: string;
      url?: string;
    };
  }>;

  stats: PokemonStats;
  evolutionChain?: EvolutionChain[];
}

export interface EvolutionChain {
  image: string;
  id: number;
  name: string;
  evoStage: number;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSummary[];
}

export interface PokemonSummary {
  name: string;
  url: string;
}
