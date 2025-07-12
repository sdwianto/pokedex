// src/components/Header.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { ICONS } from '@/lib/image';

interface HeaderProps {
  className?: string;
  // currentView: string;
  // favoritesCount: number;
  // onShowFavorites: () => void;
}

export default function Navbar({
  className = '',
  // currentView,
  // favoritesCount,
  // onShowFavorites,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-30 flex h-16 w-full items-center justify-center p-2 transition-all duration-300 md:h-20 ${className} ${
        scrolled ? 'backdrop-blur-md' : 'backdrop-blur-0'
      }`}
    >
      <header className='flex items-center gap-[7.11px]'>
        <Image
          src={ICONS.pokeball}
          alt='pokeball'
          width='28'
          height='28'
          className='md:h-10 md:w-10'
        />
        <h1 className='font-display text-[19.91px] leading-[24.9px] font-semibold tracking-[-0.04em] text-neutral-900 md:text-[28.44px] md:leading-[35.6px]'>
          Pokedex
        </h1>
        {/* <div className='flex items-center gap-2'>
          <button
            className={`text-lg-semibold md:display-xs-semibold col-span-full text-left text-neutral-900 ${currentView === 'favorites' ? 'active' : ''}`}
            onClick={onShowFavorites}
          >
            ♥ Favorites {favoritesCount > 0 && `(${favoritesCount})`}
          </button>
        </div> */}
      </header>
    </div>
  );
}
