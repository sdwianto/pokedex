//src/app/page.tsx

'use client';

import { useEffect, useState } from 'react';

import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import ClientPokemonList from './ClientPokemonList';
import { FavoritesList } from '@/components/FavoritesList';

const Home = () => {
  const [currentView, setCurrentView] = useState<
    'list' | 'detail' | 'favorites'
  >('list');

  const handleShowFavorites = () => {
    setCurrentView('favorites');
  };

  const onPokemonClick = () => {
    setCurrentView('detail');
  };

  useEffect(() => {
    if (currentView === 'favorites') {
      handleShowFavorites();
    }
  }, [currentView]);

  const handleShowPokemonList = () => {
    setCurrentView('list');
  };

  return (
    <div>
      <Navbar
        onShowFavorites={handleShowFavorites}
        currentView={currentView}
        onShowPokemonList={handleShowPokemonList}
      />
      <Hero />

      {currentView === 'favorites' ? (
        <FavoritesList onPokemonSelect={onPokemonClick} />
      ) : (
        <ClientPokemonList onPokemonClick={onPokemonClick} />
      )}

      <Footer />
    </div>
  );
};

export default Home;
