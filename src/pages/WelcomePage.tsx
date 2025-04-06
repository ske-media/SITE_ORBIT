// src/pages/WelcomePage.tsx
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ShootingStar from '../components/ShootingStarManager'; // Vérifiez le chemin

const NUM_STARS = 400;

const StarrySky: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: NUM_STARS }).map((_, index) => ({
      id: index,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: star.size,
            height: star.size,
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Animation de flottement commune pour la lune et le conteneur de drapeaux
const floatAnimation = {
  float: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Composant regroupant la lune et les deux drapeaux qui flottent ensemble
const MoonAndFlags: React.FC<{ handleCountrySelect: (country: string) => void }> = ({ handleCountrySelect }) => {
  return (
    <motion.div
      className="relative z-20"
      variants={floatAnimation}
      animate="float"
      style={{ width: '20rem' }} // Conteneur de la lune et des drapeaux
    >
      {/* Lune (prend toute la largeur du conteneur) */}
      <motion.img
        src="https://i.imgur.com/FOpAz73.png"
        alt="Lune"
        className="object-contain w-full"
        style={{ filter: 'brightness(1)' }}
      />

      {/* Drapeau français (positionné à gauche) */}
      <motion.img
        src="https://i.imgur.com/Y1Rkp0o.png"
        alt="France"
        className="absolute"
        style={{
          width: '9rem',
          top: '-20%',
          left: '1%', // à ajuster pour l'alignement par rapport à la lune
        }}
        initial={{ rotate: -15, scale: 1 }}
        whileHover={{
          scale: 1.1,
          filter: 'drop-shadow(0px 0px 8px rgba(255,255,255,0.8))',
        }}
        // Lorsque la souris quitte, le composant revient à son état initial
        onHoverEnd={() => {}}
        onClick={() => handleCountrySelect('fr')}
      />

      {/* Drapeau suisse (positionné à droite) */}
      <motion.img
        src="https://i.imgur.com/deWwaH2.png"
        alt="Suisse"
        className="absolute"
        style={{
          width: '10rem',
          top: '-20%',
          right: '-20%', // à ajuster pour l'alignement par rapport à la lune
        }}
        initial={{ rotate: 15, scale: 1 }}
        whileHover={{
          scale: 1.1,
          filter: 'drop-shadow(0px 0px 8px rgba(255,255,255,0.8))',
        }}
        onHoverEnd={() => {}}
        onClick={() => handleCountrySelect('ch')}
      />
    </motion.div>
  );
};

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCountrySelect = (country: string) => {
    document.cookie = `selectedCountry=${country};path=/;max-age=${60 * 60 * 24 * 30}`;
    navigate(`/${country}`);
  };

  return (
    <>
      <Helmet>
        <title>Bienvenue chez Agence Orbit</title>
        <meta name="description" content="Choisissez votre pays pour accéder aux services locaux d'Agence Orbit." />
        <style>{`
          html, body {
            overflow: hidden;
          }
        `}</style>
      </Helmet>

      {/* Fond animé : ciel étoilé et étoiles filantes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarrySky />
        <ShootingStar />
      </div>

      {/* Conteneur principal en plein écran */}
      <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
        {/* Titres */}
        <div className="absolute top-8 text-center z-40 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg mb-2">
            Choisissez votre pays
          </h1>
          <p className="text-lg md:text-xl text-gray-300 drop-shadow-sm">
            Pour une expérience locale optimale, sélectionnez votre pays.
          </p>
        </div>

        {/* Groupe de la Lune et des drapeaux qui flottent ensemble */}
        <MoonAndFlags handleCountrySelect={handleCountrySelect} />

        {/* Astronautes */}
        <motion.img
          src="https://i.imgur.com/Yw2O42F.png"
          alt="Astronaute 1"
          className="absolute z-10"
          style={{
            width: '11rem',
            top: '30%',
            left: '10%',
          }}
          variants={floatAnimation}
          animate="float"
        />
        <motion.img
          src="https://i.imgur.com/0bsqFHn.png"
          alt="Astronaute 2"
          className="absolute z-10"
          style={{
            width: '9.5rem',
            bottom: '20%',
            right: '10%',
          }}
          variants={floatAnimation}
          animate="float"
        />
      </div>
    </>
  );
};

export default WelcomePage;