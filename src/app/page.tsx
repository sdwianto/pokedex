//src/app/page.tsx

'use client';

import { useEffect, useState } from 'react';

import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import ClientPokemonList from './ClientPokemonList';
import { FavoritesList } from '@/components/FavoritesList';
import SmoothScroll from '@/components/SmoothScroll';
import AnimatedSection from '@/components/AnimatedSection';

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
      <SmoothScroll>
        <Navbar
          currentView={currentView}
          onShowPokemonList={handleShowPokemonList}
        />
        <AnimatedSection>
          <Hero />
          {currentView === 'favorites' ? (
            <FavoritesList onPokemonSelect={onPokemonClick} />
          ) : (
            <ClientPokemonList onPokemonClick={onPokemonClick} />
          )}
        </AnimatedSection>
      </SmoothScroll>
      <Footer />
    </div>
  );
};

export default Home;

// import AnimatedSection from '@/components/AnimatedSection';
// import Footer1 from '@/components/Footer1';
// import Hero1 from '@/components/Hero1';
// import Navbar1 from '@/components/Navbar1';
// import SmoothScroll from '@/components/SmoothScroll';
// import React from 'react';

// const page = () => {
//   return (
//     <SmoothScroll>
//       <Navbar1 />
//       <main className='pt-20'>
//         <Hero1 />
//         <AnimatedSection id='features' className='bg-white text-center'>
//           <h2 className='mb-4 text-4xl font-bold text-red-500'>Features</h2>
//           <p className='text-blue-900'>
//             Powerful animation engine, smooth scroll, responsive design.
//           </p>
//         </AnimatedSection>
//         <AnimatedSection id='contact' className='bg-white text-center'>
//           <h2 className='mb-4 text-4xl font-bold text-red-500'>Contact</h2>
//           <p className='text-blue-900'>
//             Get in touch with us for any inquiries.
//           </p>
//         </AnimatedSection>
//         <AnimatedSection id='about' className='bg-white text-center'>
//           <h2 className='mb-4 text-4xl font-bold text-red-500'>About</h2>
//           <p className='text-blue-900'>
//             This project integrates GSAP, Lenis, and Tailwind CSS seamlessly in
//             React.
//           </p>
//         </AnimatedSection>
//       </main>
//       <Footer1 />
//     </SmoothScroll>
//   );
// };

// export default page;
