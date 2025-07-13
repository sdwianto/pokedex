//src/app/favorites/page.tsx

'use client';

import { FavoritesList } from '@/components/FavoritesList';
import Footer from '@/components/Footer';
import Header from '@/components/Navbar';

export default function FavoritesPage() {
  return (
    <div>
      <Header onShowFavorites={() => {}} currentView='favorites' />
      <FavoritesList onPokemonSelect={() => {}} />
      <Footer />
    </div>
  );
}
