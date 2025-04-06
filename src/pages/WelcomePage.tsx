// src/pages/WelcomePage.tsx
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ShootingStar from '../components/ShootingStarManager'; // Assurez-vous que ce chemin correspond à votre fichier

const NUM_STARS = 150;

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

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const floatAnimation = {
    float: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const flagVariants = {
    initial: { scale: 1, filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0))' },
    hover: {
      scale: 1.1,
      filter: 'drop-shadow(0px 0px 8px rgba(255,255,255,0.8))',
      transition: { duration: 0.3 },
    },
  };

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

      {/* Conteneur principal */}
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

        {/* Lune centrée */}
        <motion.img
          src="https://i.imgur.com/FOpAz73.png"
          alt="Lune"
          className="object-contain z-20"
          style={{ width: '35rem', filter: 'brightness(0.8)' }}
          variants={floatAnimation}
          animate="float"
        />

        {/* Drapeau français, incliné */}
        <motion.img
          src="https://i.imgur.com/Y1Rkp0o.png"
          alt="France"
          className="absolute z-30"
          style={{
            width: '7rem',
            top: '50%',
            left: '40%',
            transform: 'translate(-50%, -50%) rotate(-15deg)',
          }}
          initial="initial"
          variants={flagVariants}
          whileHover="hover"
          onClick={() => handleCountrySelect('fr')}
        />

        {/* Drapeau suisse, incliné */}
        <motion.img
          src="https://i.imgur.com/deWwaH2.png"
          alt="Suisse"
          className="absolute z-30"
          style={{
            width: '7.5rem',
            top: '50%',
            left: '60%',
            transform: 'translate(-50%, -50%) rotate(15deg)',
          }}
          initial="initial"
          variants={flagVariants}
          whileHover="hover"
          onClick={() => handleCountrySelect('ch')}
        />

        {/* Astronaute 1 */}
        <motion.img
          src="https://i.imgur.com/Yw2O42F.png"
          alt="Astronaute 1"
          className="absolute z-10"
          style={{
            width: '7rem',
            top: '30%',
            left: '10%',
          }}
          variants={floatAnimation}
          animate="float"
        />

        {/* Astronaute 2 */}
        <motion.img
          src="https://i.imgur.com/0bsqFHn.png"
          alt="Astronaute 2"
          className="absolute z-10"
          style={{
            width: '7rem',
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