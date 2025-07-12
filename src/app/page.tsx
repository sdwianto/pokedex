// src/app/page.tsx
import Footer from '@/components/Footer';
import Navbar from '@/components/Header';
import Hero from '@/components/Hero';

import ClientPokemonList from './ClientPokemonList';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <ClientPokemonList />
      <Footer />
    </div>
  );
};

export default Home;
