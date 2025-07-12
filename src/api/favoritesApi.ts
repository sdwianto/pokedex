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
    types: ['electric'],
    size: {
      height: 0.4,
      weight: 6.0,
    },
    abilities: ['static', 'lightning-rod'],
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
