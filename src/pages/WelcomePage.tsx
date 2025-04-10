// src/pages/WelcomePage.tsx
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import ShootingStar from '../components/ShootingStarManager';

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

const floatAnimation = {
  float: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

const MoonAndFlags: React.FC<{ handleCountrySelect: (country: string) => void }> = ({ handleCountrySelect }) => {
  return (
    <motion.div
      className="relative z-20"
      variants={floatAnimation}
      animate="float"
      style={{ width: '20rem' }}
    >
      {/* Lune */}
      <motion.img
        src="https://i.imgur.com/FOpAz73.png"
        alt="Lune"
        className="object-contain w-full"
        style={{ filter: 'brightness(1)' }}
      />
      {/* Drapeau français (à gauche) */}
      <motion.img
        src="https://i.imgur.com/Y1Rkp0o.png"
        alt="France"
        className="absolute"
        style={{ width: '9rem', top: '-20%', left: '1%' }}
        initial={{ rotate: -15, scale: 1 }}
        whileHover={{
          scale: 1.1,
          filter: 'drop-shadow(0px 0px 8px rgba(255,255,255,0.8))',
        }}
        onClick={() => handleCountrySelect('fr')}
      />
      {/* Drapeau suisse (à droite) */}
      <motion.img
        src="https://i.imgur.com/deWwaH2.png"
        alt="Suisse"
        className="absolute"
        style={{ width: '10rem', top: '-20%', right: '-20%' }}
        initial={{ rotate: 15, scale: 1 }}
        whileHover={{
          scale: 1.1,
          filter: 'drop-shadow(0px 0px 8px rgba(255,255,255,0.8))',
        }}
        onClick={() => handleCountrySelect('ch')}
      />
    </motion.div>
  );
};

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Récupère l'URL d'origine via le paramètre "redirect", ou "/" par défaut.
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirect') || '/';

  // Lorsqu’un utilisateur choisit son pays, on enregistre le cookie et on redirige vers l'URL d'origine.
  const handleCountrySelect = (country: string) => {
    document.cookie = `selectedCountry=${country};path=/;max-age=${60 * 60 * 24 * 30}`;
    navigate(redirectTo, { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>Bienvenue chez Agence Orbit</title>
        <meta name="description" content="Choisissez votre pays pour accéder aux services locaux d'Agence Orbit." />
        {/* Empêcher l'indexation par les moteurs de recherche */}
        <meta name="robots" content="noindex, nofollow" />
        <style>{`html, body { overflow: hidden; }`}</style>
      </Helmet>

      {/* Fond animé avec étoiles et effet de scanning (via ShootingStar) */}
      <div className="absolute inset-0 pointer-events-none">
        <StarrySky />
        <ShootingStar />
      </div>

      {/* Conteneur principal en plein écran, sans header ni footer */}
      <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Titres du Hero */}
        <div className="absolute top-8 text-center z-40 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-[#B026FF] via-fuchsia-400 to-[#B026FF] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(176,38,255,0.6)]">
              Choisissez votre pays
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-300"
          >
            Pour une expérience locale optimale, sélectionnez votre pays.
          </motion.p>
        </div>

        {/* Composant affichant la Lune et les drapeaux */}
        <MoonAndFlags handleCountrySelect={handleCountrySelect} />

        {/* Éléments décoratifs optionnels (astronautes) */}
        <motion.img
          src="https://i.imgur.com/Yw2O42F.png"
          alt="Astronaute 1"
          className="absolute z-10"
          style={{ width: '11rem', top: '30%', left: '10%' }}
          variants={floatAnimation}
          animate="float"
        />
        <motion.img
          src="https://i.imgur.com/0bsqFHn.png"
          alt="Astronaute 2"
          className="absolute z-10"
          style={{ width: '9.5rem', bottom: '20%', right: '10%' }}
          variants={floatAnimation}
          animate="float"
        />
      </div>
    </>
  );
};

export default WelcomePage;