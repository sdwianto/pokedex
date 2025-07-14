'use client';

import Image from 'next/image';

import { ICONS } from '../lib/image';

export default function Footer() {
  return (
    <footer className='flex h-25 items-start justify-center gap-4 border border-neutral-300 px-4 py-6 md:gap-2 md:px-35 md:py-2'>
      <div className='flex h-16 w-full p-2 md:h-20'>
        <div className='flex w-full flex-col justify-center gap-2 px-4 py-6 md:flex-row md:items-center md:justify-start md:gap-[7.11px]'>
          {/* Icon + Title */}
          <div className='flex items-center gap-4 gap-[7.11px]'>
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
          </div>

          {/* Copyright */}
          <p className='md:text-md-regular text-xs-regular text-neutral-600'>
            Copyright Singgih &#169;2025 Pokedex
          </p>
        </div>
      </div>
    </footer>
  );
}
