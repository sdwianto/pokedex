import { Pokemon } from '@/types/pokemon';

export const simulateFavoriteToggle = async (
  pokemonId: number,
  isFavorite: boolean
): Promise<Pokemon> => {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return a mock Pokemon object with the updated favorite status
  return {
    id: pokemonId,
    name: 'pikachu',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    description:
      'When several of these Pokémon gather, their electricity could build and cause lightning storms.',
    base_experience: 112,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      front_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png',
      other: {
        'official-artwork': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        },
        dream_world: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
        },
      },
    },
    types: [{ type: { name: 'electric' } }],
    height: 0.4,
    weight: 6.0,
    abilities: [
      { ability: { name: 'static' }, is_hidden: false, slot: 1 },
      { ability: { name: 'lightning-rod' }, is_hidden: false, slot: 2 },
    ],
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      special_attack: 50,
      special_defense: 50,
      speed: 90,
    },
    isFavorite: !isFavorite,
  };
};
