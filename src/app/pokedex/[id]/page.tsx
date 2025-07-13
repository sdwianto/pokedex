//src/app/pokedex/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';

import { PokemonDetail } from '@/components/PokemonDetail';

export default function PokemonDetailPage() {
  const params = useParams();
  const router = useRouter();

  const idParam = params?.id;
  const pokemonId = typeof idParam === 'string' ? Number(idParam) : NaN;

  if (isNaN(pokemonId)) return <div>Invalid Pokémon ID</div>;

  return (
    <PokemonDetail
      pokemonId={pokemonId}
      onBack={() => router.back()}
      onShowFavorites={() => router.push('/favorites')}
      currentView='detail'
    />
  );
}
