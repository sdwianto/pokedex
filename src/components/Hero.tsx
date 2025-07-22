'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

import { ICONS } from '../lib/image';

function getPokemonNameFromUrl(url: string) {
  const match = url.match(/\/([0-9]+)\.(png|jpg|jpeg)$/);
  if (match) {
    const id = parseInt(match[1], 10);
    if (window.pokeNames && window.pokeNames[id]) {
      return window.pokeNames[id];
    }
    return `#${id}`;
  }
  return '';
}

declare global {
  interface Window {
    pokeNames?: Record<number, string>;
  }
}

export default function Hero() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  // GSAP refs
  const charizardRef = useRef<HTMLDivElement>(null);
  const pikachuRef = useRef<HTMLDivElement>(null);

  // Ganti inisialisasi agar SSR dan client konsisten
  const [imageSize, setImageSize] = useState({ charizard: 161, pikachu: 147 });

  const [mousePokes, setMousePokes] = useState<
    {
      id: number;
      x: number;
      y: number;
      icon: string;
      loaded?: boolean;
    }[]
  >([]);
  const pokeId = useRef(0);

  const [pokeImages, setPokeImages] = useState<string[]>([]);
  const [pokeNamesReady, setPokeNamesReady] = useState(false);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((res) => res.json())
      .then(async (data) => {
        const results: Array<{ name: string; id: number; img: string }> =
          await Promise.all(
            data.results.map((p: any) =>
              fetch(p.url)
                .then((res) => res.json())
                .then((detail) => ({
                  name: detail.name,
                  id: detail.id,
                  img: detail.sprites.other['official-artwork'].front_default,
                }))
            )
          );
        setPokeImages(results.map((r) => r.img).filter(Boolean));
        const nameMap: Record<number, string> = {};
        results.forEach((r) => {
          nameMap[r.id] = r.name.charAt(0).toUpperCase() + r.name.slice(1);
        });
        window.pokeNames = nameMap;
        setPokeNamesReady(true);
      });
  }, []);

  // Handler mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!pokeNamesReady) return;
      if (mousePokes.length > 0) return;
      const section = e.currentTarget;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!pokeImages.length) return;
      const icon = pokeImages[Math.floor(Math.random() * pokeImages.length)];
      const id = pokeId.current++;
      setMousePokes([{ id, x: x + 10, y: y + 10, icon, loaded: false }]);
      setTimeout(() => {
        setMousePokes([]);
      }, 200);
    },
    [pokeImages, mousePokes.length, pokeNamesReady]
  );

  useEffect(() => {
    const charizard = charizardRef.current;
    const pikachu = pikachuRef.current;
    if (!charizard || !pikachu) return;

    // Get section width for responsive animation
    const section = charizard.parentElement;
    if (!section) return;

    // Fungsi untuk mendapatkan width gambar sesuai breakpoint
    function getImageWidths() {
      if (window.innerWidth >= 768) {
        return { charizardWidth: 328, pikachuWidth: 278 };
      } else {
        return { charizardWidth: 161, pikachuWidth: 147 };
      }
    }

    let { charizardWidth, pikachuWidth } = getImageWidths();
    const sectionWidth = section.offsetWidth;
    const charizardTarget = sectionWidth - charizardWidth;
    const pikachuTarget = sectionWidth - pikachuWidth;

    // Reset positions
    gsap.set(charizard, { left: 0, right: 'auto' });
    gsap.set(pikachu, { right: 0, left: 'auto' });

    // Timeline bolak-balik saja
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'power1.inOut' },
    });
    tl.to(charizard, { left: charizardTarget, duration: 7 })
      .to(pikachu, { right: pikachuTarget, duration: 7 }, '<')
      .to(charizard, { left: 0, duration: 7 })
      .to(pikachu, { right: 0, duration: 7 }, '<');

    // Responsive: update on resize
    const handleResize = () => {
      ({ charizardWidth, pikachuWidth } = getImageWidths());
      const newSectionWidth = section.offsetWidth;
      const newCharizardTarget = newSectionWidth - charizardWidth;
      const newPikachuTarget = newSectionWidth - pikachuWidth;
      tl.clear();
      gsap.set(charizard, { left: 0, right: 'auto' });
      gsap.set(pikachu, { right: 0, left: 'auto' });
      tl.to(charizard, { left: newCharizardTarget, duration: 7 })
        .to(pikachu, { right: newPikachuTarget, duration: 7 }, '<')
        .to(charizard, { left: 0, duration: 7 })
        .to(pikachu, { right: 0, duration: 7 }, '<');
    };
    window.addEventListener('resize', handleResize);
    return () => {
      tl.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const updateSize = () => {
      setImageSize(
        window.innerWidth >= 768
          ? { charizard: 328, pikachu: 278 }
          : { charizard: 161, pikachu: 147 }
      );
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/pokedex?search=${query}`);
    setQuery('');
  };
  return (
    <section
      className='bg-primary-300 relative h-130 w-full overflow-hidden md:h-169.25'
      onMouseMove={handleMouseMove}
    >
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
      <div
        ref={charizardRef}
        style={{ position: 'absolute', bottom: '-14px', left: 0, zIndex: 10 }}
        className='md:left-19 md:h-82 md:w-82'
      >
        <Image
          src={ICONS.charizard}
          alt='charizard'
          width={imageSize.charizard}
          height={imageSize.charizard}
        />
      </div>

      {/* Pikachu */}
      <div
        ref={pikachuRef}
        style={{ position: 'absolute', bottom: '-14px', right: 0, zIndex: 10 }}
        className='md:right-19 md:h-69.5 md:w-69.5'
      >
        <Image
          src={ICONS.pikachu}
          alt='pikachu'
          width={imageSize.pikachu}
          height={imageSize.pikachu}
        />
      </div>

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

      {/* Render efek pokemon kecil di posisi mouse */}
      {mousePokes.map((poke) => (
        <div
          key={poke.id}
          style={{
            position: 'absolute',
            left: poke.x,
            top: poke.y,
            pointerEvents: 'none',
            zIndex: 51,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image
            src={poke.icon}
            alt='poke-effect'
            width={60}
            height={60}
            style={{
              opacity: 0.7,
              transition: 'opacity 1s',
              animation: 'fadeout 1s linear forwards',
            }}
            unoptimized
            onLoadingComplete={() => {
              setMousePokes((prev) =>
                prev.map((p) => (p.id === poke.id ? { ...p, loaded: true } : p))
              );
            }}
          />
          {poke.loaded && (
            <span
              style={{
                marginTop: 2,
                fontSize: 10,
                color: '#222',
                background: 'rgba(255,255,255,0.7)',
                borderRadius: 4,
                padding: '0 4px',
                opacity: 0.7,
                pointerEvents: 'none',
                userSelect: 'none',
                fontWeight: 500,
                textShadow: '0 1px 2px #fff',
              }}
            >
              {getPokemonNameFromUrl(poke.icon)}
            </span>
          )}
        </div>
      ))}
      {/* Keyframes fadeout */}
      <style>{`
        @keyframes fadeout {
          from { opacity: 0.7; }
          to { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
