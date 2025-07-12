//src/app/favorites/page.tsx

'use client';

import { FavoritesList } from '@/components/FavoritesList';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function FavoritesPage() {
  return (
    <div>
      <Header />
      <FavoritesList onPokemonSelect={() => {}} />
      <Footer />
    </div>
  );
}
