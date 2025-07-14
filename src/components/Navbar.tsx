// src/components/Navbar.tsx

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { ICONS } from '@/lib/image';
import { useAppSelector } from '@/store/hooks';
import { selectFavoritesCount } from '@/features/favoritePokemon/favoritesSlice';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  currentView: 'list' | 'detail' | 'favorites';
  onShowPokemonList?: () => void;
}

export default function Navbar({
  currentView,
  onShowPokemonList,
}: HeaderProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-30 flex h-16 w-full items-center justify-center p-2 transition-all duration-300 md:h-20 ${
        scrolled ? 'backdrop-blur-md' : 'backdrop-blur-0'
      }`}
    >
      <header className='relative flex h-full w-full items-center px-4'>
        {/* Logo + Title di tengah */}
        <div
          className='absolute left-1/2 flex -translate-x-1/2 transform cursor-pointer items-center gap-[7.11px]'
          onClick={() => {
            onShowPokemonList?.();
            router.replace('/');
          }}
        >
          <Image
            src={ICONS.pokeball}
            alt='pokeball'
            width={28}
            height={28}
            className='md:h-10 md:w-10'
          />
          <h1 className='font-display text-[19.91px] leading-[24.9px] font-semibold tracking-[-0.04em] text-neutral-900 md:text-[28.44px] md:leading-[35.6px]'>
            Pokedex
          </h1>
        </div>

        {/* Tombol Favorites di kanan */}
        <div className='ml-auto flex items-center gap-2'>
          <button
            className={`text-sm-medium md:text-md-medium cursor-pointer rounded-md border border-neutral-300 p-1 px-2 text-center text-red-500 hover:bg-red-500 hover:text-white ${
              currentView === 'favorites' ? 'active' : ''
            }`}
            onClick={() => router.push('/favorites')}
          >
            ♥ My Favorites {favoritesCount > 0 && `(${favoritesCount})`}
          </button>
        </div>
      </header>
    </div>
  );
}
