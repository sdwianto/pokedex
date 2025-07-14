//src/app/pokedex/page.tsx
//pokemon list & search

'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import Footer from '@/components/Footer';
import PokemonList from '@/components/PokemonList';

import { ICONS } from '@/lib/image';
import { selectFavoritesCount } from '@/features/favoritePokemon/favoritesSlice';
import { useAppSelector } from '@/store/hooks';

function PokedexContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const queryFromURL = searchParams.get('search');
    setSearchQuery(queryFromURL || '');
  }, [searchParams]);

  const handlePokemonClick = (id: number) => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <PokemonList
      searchQuery={searchQuery}
      pokemonList={`Search Results for "${searchQuery}"`}
      onPokemonClick={handlePokemonClick}
      value='text-lg-semibold md:display-xs-semibold col-span-full text-left text-neutral-900'
    />
  );
}

export default function PokedexPage() {
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const favoritesCount = useAppSelector(selectFavoritesCount);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/pokedex?search=${query}`);
    setQuery('');
  };

  return (
    <div>
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
              className='text-sm-medium md:text-md-medium cursor-pointer rounded-md border border-neutral-300 p-1 px-2 text-center text-red-500 hover:bg-red-500 hover:text-white'
              onClick={() => router.push('/favorites')}
            >
              ♥ My Favorites {favoritesCount > 0 && `(${favoritesCount})`}
            </button>
          </div>
        </div>
      </header>
      <main className='mt-30'>
        <Suspense fallback={<div>Loading...</div>}>
          <PokedexContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
