// src/components/PokemonDetail.tsx
'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import ErrorMessage from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';
import StatBar from './StatBar';
import { TypeBadge } from './TypeBadge';

import {
  selectFavoritesCount,
  selectIsFavorite,
} from '@/features/favoritePokemon/favoritesSlice';
import { useFavoriteMutation } from '@/hooks/useFavoriteMutation';
import { usePokemon } from '@/hooks/usePokemon';
import { ICONS } from '@/lib/image';
import { useAppSelector } from '@/store/hooks';

interface PokemonDetailProps {
  pokemonId: number;
  onBack: () => void;
}

interface HeaderProps {
  onShowFavorites: () => void;
  currentView: 'list' | 'detail' | 'favorites';
}

export const PokemonDetail: React.FC<PokemonDetailProps & HeaderProps> = ({
  pokemonId,
  onBack,
  onShowFavorites,
  currentView,
}) => {
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const router = useRouter();
  const { data: pokemon, isLoading, error } = usePokemon(pokemonId);
  const isFavorite = useAppSelector((state) =>
    selectIsFavorite(state, pokemonId)
  );
  const favoriteMutation = useFavoriteMutation();
  const favoritesCount = useAppSelector(selectFavoritesCount);

  const handleFavoriteClick = () => {
    favoriteMutation.mutate({ pokemonId, isFavorite });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/pokedex?search=${query}`);
    setQuery('');
  };

  if (isLoading) return <LoadingSpinner />;

  if (error || !pokemon)
    return <ErrorMessage message='Failed to load Pokémon details' />;

  return (
    <>
      {/* Header: Navbar & Search Form */}
      <header
        className={`fixed top-0 z-30 flex h-16 w-full items-center justify-between gap-2 border-b border-neutral-300 px-4 py-2 transition-all duration-300 md:h-20 md:px-30 ${scrolled ? 'backdrop-blur-md' : 'backdrop-blur-0'}`}
      >
        {/* Logo Section */}
        <div
          className='flex cursor-pointer items-center gap-2'
          onClick={() => router.push('/')}
        >
          <Image
            src={ICONS.pokeball}
            alt='pokeball'
            width={32}
            height={32}
            className='md:h-10 md:w-10'
          />
          <h1 className='text-lg font-semibold tracking-tight text-neutral-900 md:text-2xl'>
            Pokedex
          </h1>
        </div>

        {/* Search Form */}
        <div className='flex items-center gap-2'>
          <form
            onSubmit={handleSubmit}
            className='relative flex h-10 w-[260px] items-center gap-2 rounded-full bg-neutral-100 px-4 md:h-12 md:w-[400px] md:px-6'
          >
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search Pokemon'
              className='w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none md:text-base'
            />
            <Icon
              icon='mynaui:search-circle-solid'
              width={24}
              height={24}
              onClick={handleSubmit}
              className='text-secondary-300 hover:text-secondary-500 cursor-pointer md:h-6 md:w-6'
            />
          </form>
          <div className='ml-auto flex items-center gap-2'>
            <button
              className={`text-sm-medium md:text-md-medium cursor-pointer rounded-md border border-neutral-300 p-1 px-2 text-center text-red-500 hover:bg-red-500 hover:text-white ${
                currentView === 'favorites' ? 'active' : ''
              }`}
              onClick={onShowFavorites}
            >
              ♥ My Favorites {favoritesCount > 0 && `(${favoritesCount})`}
            </button>
          </div>
        </div>
      </header>
      {/* Pokemon Detail */}
      <div className='z-20 mt-16 flex flex-col items-center px-6 py-12 md:mt-20 md:gap-12'>
        {/* Header: Back Button & Favorite Button */}
        <div className='flex w-full justify-between md:flex-row md:gap-6'>
          <button className='text-blue-600 hover:underline' onClick={onBack}>
            ← Back
          </button>
          <div className='flex justify-end'>
            <button
              className={`rounded px-4 py-1 ${
                isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
              }`}
              onClick={handleFavoriteClick}
              disabled={favoriteMutation.isPending}
            >
              {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
            </button>
          </div>
        </div>
        {/* Box 1: Pokemon Info */}
        <div className='flex flex-col'>
          <div className='flex flex-row gap-12'>
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
              className='flex-none'
            >
              <Image
                src={
                  pokemon.artworks ||
                  pokemon.sprites.other['official-artwork'].front_default ||
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
                width={320}
                height={320}
                className='md:h-119.75 md:w-119.75'
              />
            </motion.div>
            {/* Pokemon details */}
            <div className='flex flex-1 flex-col gap-5'>
              <div className='flex flex-col gap-4'>
                <Image
                  src={ICONS.pokeball3d}
                  alt='pokeball'
                  width={32}
                  height={32}
                  className='md:h-10 md:w-10'
                />
                <span className='md:text-lg-regular text-md-regular text-neutral-500'>
                  {pokemon.id.toString().padStart(3, '0')}
                </span>
                <h1 className='md:text-lg-bold display-xs-bold md:display-xl-bold text-neutral-900'>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h1>
                <div className='text-sm-regular md:text-md-regular text-neutral-700'>
                  “{pokemon.description}”
                </div>
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2.5'>
                  <p className='md:text-xl-semibold text-lg-semibold text-neutral-900'>
                    Type
                  </p>
                  {pokemon.types.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                      {pokemon.types.map((typeObj) => {
                        const typeName =
                          typeof typeObj === 'string'
                            ? typeObj
                            : typeObj.type?.name;
                        return <TypeBadge key={typeName} type={typeName} />;
                      })}
                    </div>
                  )}
                </div>
                <div className='flex flex-col gap-2.5'>
                  <p className='md:text-xl-semibold text-lg-semibold text-neutral-900'>
                    Abilities
                  </p>
                  {pokemon.abilities.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                      {pokemon.abilities.map((abilityObj) => {
                        const abilityName =
                          typeof abilityObj === 'string'
                            ? abilityObj
                            : abilityObj.ability?.name;
                        return (
                          <TypeBadge key={abilityName} type={abilityName} />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2.5'>
                  <p className='md:text-xl-semibold text-lg-semibold text-neutral-900'>
                    Size
                  </p>
                  <div className='flex flex-wrap gap-12'>
                    <div className='flex flex-col gap-2'>
                      <div className='flex items-center'>
                        <Icon
                          icon='material-symbols:weight-outline'
                          width={24}
                          height={24}
                        />
                        <p className='md:text-md-regular text-sm-regular text-neutral-700'>
                          Weight
                        </p>
                      </div>
                      <p className='md:display-md-bold display-xs-bold text-neutral-900'>
                        {pokemon.weight / 10}
                        <span className='text-sm-regular md:text-md-regular text-neutral-900'>
                          {' '}
                          kg
                        </span>
                      </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <div className='flex items-center'>
                        <Icon
                          icon='fluent:ruler-24-regular'
                          width={24}
                          height={24}
                        />
                        <p className='md:text-md-regular text-sm-regular text-neutral-700'>
                          Height
                        </p>
                      </div>
                      <p className='md:display-md-bold display-xs-bold text-neutral-900'>
                        {pokemon.height / 10}
                        <span className='text-sm-regular md:text-md-regular text-neutral-900'>
                          {' '}
                          m
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-2.5'>
                  <p className='md:text-xl-semibold text-lg-semibold text-neutral-900'>
                    Artwork
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {Object.entries(
                      pokemon.sprites?.other?.['official-artwork'] ?? {}
                    ).map(([key, value]) => (
                      <Image
                        key={key}
                        src={value as string}
                        alt={key}
                        width={80}
                        height={80}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div className='gap-4'>
                <h3 className='text-xl-semibold text-neutral-900'>Stats</h3>
                <div className='gap-3'>
                  {Object.entries(pokemon.stats).map(([key, value]) => (
                    <div key={key} className='flex items-center gap-3'>
                      <span className='md:text-md-regular text-sm-regular w-33'>
                        {key.replace('_', ' ')}
                      </span>
                      <span className='md:text-md-semibold text-sm-regular w-8 text-center'>
                        {value}
                      </span>
                      <div className='flex-1'>
                        <StatBar value={value} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Box 2: Evolution Chain */}
          <div className='items-start gap-8'>
            <h3 className='md:display-md-bold display-xs-bold text-neutral-900'>
              Evolution Chain
            </h3>

            <div className='flex flex-wrap gap-5'>
              {pokemon.evolutionChain?.map((evo) => (
                <div
                  key={evo.id}
                  className='gap-3 rounded-2xl border border-neutral-300 p-4 text-left'
                >
                  <div className='relative flex h-40 w-40 items-center justify-center'>
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
                    >
                      <Image
                        src={evo.image}
                        alt={evo.name}
                        width={160}
                        height={160}
                        className='cursor-pointer'
                        onClick={() => router.push(`/pokedex/${evo.id}`)}
                      />
                    </motion.div>
                  </div>
                  <span className='text-md-regular text-neutral-500'>
                    00{evo.evoStage}
                  </span>
                  <p className='md:text-xs-semibold text-xl-semibold text-neutral-900'>
                    {evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
