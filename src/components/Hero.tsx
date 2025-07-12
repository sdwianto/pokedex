'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ICONS } from '../lib/image';

export default function Hero() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/pokedex?search=${query}`);
    setQuery('');
  };
  return (
    <section className='bg-primary-300 relative h-130 w-full overflow-hidden md:h-169.25'>
      {/* background */}
      <div
        className='absolute inset-0 h-full w-full'
        style={{
          backgroundImage: `url(${ICONS.graphy})`,
          backgroundRepeat: 'repeat-x',
        }}
      />

      {/* konten utama */}
      <div className='relative z-20 flex w-full flex-col'>
        {/* Logo & Description */}
        <div className='mt-16 flex w-full flex-col items-center justify-center gap-4 px-4 pt-16 pb-30 md:mt-20 md:gap-7.5 md:px-30 md:pt-15 md:pb-30'>
          <div className='relative flex flex-col items-center gap-2 md:gap-3.75'>
            <Image
              src={ICONS.pokemon}
              alt='pokemon'
              width='104'
              height='38'
              className='md:h-16 md:w-43.75'
            />
            <h1 className='md:display-2xl-bold display-sm-bold w-74.25 text-center text-neutral-900 md:w-171.5'>
              Discover the Most Powerful Pokémon in the Wild!
            </h1>
            <h2 className='text-sm-medium md:text-md-medium text-center text-neutral-900'>
              Train, Battle, and Collect Your Favorites!
            </h2>
          </div>

          <div className='flex w-full justify-center'>
            <form
              onSubmit={handleSubmit}
              className='relative flex h-12 w-90.25 items-center justify-between gap-1.5 rounded-full bg-neutral-100 px-4 md:h-14 md:w-129.5 md:px-6'
            >
              <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search Pokemon'
                className='text-md-regular placeholder:text-md placeholder:font-regular bg-transparent px-4 pr-12 text-neutral-900 placeholder:text-neutral-500 focus:outline-none'
              />
              <div className='flex gap-4'>
                <Icon
                  icon='mynaui:search-circle-solid'
                  width='28'
                  height='28'
                  onClick={handleSubmit}
                  className='text-secondary-300 hover:text-secondary-500 cursor-pointer md:h-10 md:w-10'
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Charizard */}
      <Image
        src={ICONS.charizard}
        alt='charizard'
        width='161'
        height='161'
        className='absolute bottom-[-14] left-2 z-10 md:left-19 md:h-82 md:w-82'
      />

      {/* Pikachu */}
      <Image
        src={ICONS.pikachu}
        alt='pikachu'
        width='147'
        height='147'
        className='absolute right-2 bottom-[-14] z-10 md:right-19 md:h-69.5 md:w-69.5'
      />

      {/* claude */}
      <div className='pointer-events-none absolute bottom-0 left-1/2 z-10 h-20 w-full -translate-x-1/2 md:left-0 md:h-33 md:w-[calc(50%+2px)] md:translate-x-0'>
        <Image
          src={ICONS.claude}
          alt='claude'
          fill
          className='object-fill'
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        />
      </div>
      <div className='pointer-events-none absolute right-0 bottom-0 z-10 hidden h-20 w-1/2 md:block md:h-33 md:w-[calc(50%+2px)]'>
        <Image
          src={ICONS.claude}
          alt='claude'
          fill
          className='object-fill'
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        />
      </div>
    </section>
  );
}
