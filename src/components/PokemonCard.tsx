// src/components/PokemonCard.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { TypeBadge } from './TypeBadge';

import { selectIsFavorite } from '@/features/favoritePokemon/favoritesSlice';
import { useFavoriteMutation } from '@/hooks/useFavoriteMutation';
import { useAppSelector } from '@/store/hooks';
import { Pokemon } from '@/types/pokemon';
import { ICONS } from '@/lib/image';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export const PokemonCard: FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const router = useRouter();
  const isFavorite = useAppSelector((state) =>
    selectIsFavorite(state, pokemon.id)
  );
  const favoriteMutation = useFavoriteMutation();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    favoriteMutation.mutate({ pokemonId: pokemon.id, isFavorite });
  };

  const handleCardClick = () => {
    onClick();
    router.push(`/pokedex/${pokemon.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className='bg-neutral-25 cursor-pointer rounded-2xl border border-neutral-300 p-3 transition-shadow hover:shadow-md md:gap-6 md:p-6'
    >
      <div className='relative flex h-50 w-50 items-center justify-center'>
        {/* Background image */}
        <div
          className='absolute inset-0 bg-contain bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${ICONS.background})`,
          }}
        />

        {/* Animated Pokemon image */}
        <motion.div
          initial={{ scale: 1, y: 0, rotate: 0 }}
          animate={{
            scale: [1, 1.05, 1],
            y: [0, -8, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{
            scale: 1.1,
            rotate: 4,
            transition: { duration: 0.3 },
          }}
          className='relative z-10'
        >
          <Image
            src={
              pokemon.sprites?.other?.['official-artwork']?.front_default ||
              pokemon.sprites?.front_default ||
              '/placeholder.png'
            }
            alt={pokemon.name}
            width={200}
            height={200}
            className='p-2'
            priority
          />
        </motion.div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col justify-between'>
          <div className='flex items-center gap-2'>
            <span className='md:text-md-regular text-sm-regular text-neutral-500'>
              {pokemon.id.toString().padStart(3, '0')}
            </span>
            <button
              type='button'
              className={` ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              disabled={favoriteMutation.isPending}
              aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
            >
              <span
                className='md:text-xl-regular text-md-regular text-neutral-500'
                style={{ color: isFavorite ? 'red' : undefined }}
              >
                {isFavorite ? '♥' : '♡'}
              </span>
            </button>
          </div>
          <h1 className='text-base font-semibold text-neutral-900 capitalize'>
            {pokemon.name}
          </h1>
        </div>

        {pokemon.types.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {pokemon.types.map((typeObj) => {
              const typeName =
                typeof typeObj === 'string' ? typeObj : typeObj.type?.name;
              return <TypeBadge key={typeName} type={typeName} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
