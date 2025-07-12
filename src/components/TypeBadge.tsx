// src/components/TypeBadge.tsx
import React from 'react';

interface TypeBadgeProps {
  type: string;
  className?: string;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    return colors[type] || '#68A090';
  };

  return (
    <span
      className='md:text-sm-medium text-sm-medium gap-2 rounded-md border border-neutral-300 px-2 py-1 text-neutral-900'
      style={{ backgroundColor: getTypeColor(type) }}
    >
      {type}
    </span>
  );
};
