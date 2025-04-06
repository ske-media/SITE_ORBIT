// src/pages/WelcomePage.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  // Animation de flottement pour la lune et les astronautes
  const floatAnimation = {
    float: {
      y: [0, -8, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  // Variants pour les drapeaux avec effet hover (seulement pendant le hover)
  const flagVariants = {
    initial: { scale: 1, filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0))' },
    hover: {
      scale: 1.1,
      filter: 'drop-shadow(0px 0px 8px rgba(255,255,255,0.8))',
      transition: { duration: 0.3 },
    },
  };

  // Gestion de la sélection du pays
  const handleCountrySelect = (country: string) => {
    document.cookie = `selectedCountry=${country};path=/;max-age=${60 * 60 * 24 * 30}`;
    navigate(`/${country}`);
  };

  return (
    <>
      <Helmet>
        <title>Bienvenue chez Agence Orbit</title>
        <meta
          name="description"
          content="Choisissez votre pays pour accéder aux services locaux d'Agence Orbit."
        />
      </Helmet>
      {/* Effet espace en arrière-plan */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none">
        {/* Constellation 1 */}
        <motion.img
          src="https://i.imgur.com/constellation_example.png" // Remplacez par l'URL de votre image de constellation
          alt="Constellation"
          className="absolute"
          style={{ width: '15rem', top: '10%', left: '20%', opacity: 0.5 }}
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        {/* Constellation 2 */}
        <motion.img
          src="https://i.imgur.com/constellation_example.png" // Remplacez par une autre image ou la même pour varier
          alt="Constellation"
          className="absolute"
          style={{ width: '10rem', bottom: '15%', right: '15%', opacity: 0.4 }}
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
        {/* Étoile filante 1 */}
        <motion.div
          className="absolute bg-white rounded-full"
          style={{ width: '3px', height: '3px', top: '30%', left: '80%' }}
          animate={{ x: [0, -100], y: [0, 50], opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
        />
        {/* Étoile filante 2 */}
        <motion.div
          className="absolute bg-white rounded-full"
          style={{ width: '3px', height: '3px', top: '60%', left: '10%' }}
          animate={{ x: [0, 80], y: [0, -40], opacity: [1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 3 }}
        />
      </motion.div>

      {/* Container principal plein écran sans scroll */}
      <div className="relative w-screen h-screen overflow-hidden bg-dark-900 flex items-center justify-center">
        {/* Titre et sous-titre */}
        <div className="absolute top-8 text-center z-40 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Choisissez votre pays
          </h1>
          <p className="text-sm md:text-base text-gray-300">
            Pour une expérience locale optimale, sélectionnez votre pays.
          </p>
        </div>

        {/* Lune au centre */}
        <motion.img
          src="https://i.imgur.com/FOpAz73.png"
          alt="Lune"
          className="object-contain z-20"
          style={{ width: '35rem', filter: 'brightness(0.8)' }}
          variants={floatAnimation}
          animate="float"
        />

        {/* Drapeau français, positionné sur la partie gauche de la lune, incliné */}
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

        {/* Drapeau suisse, positionné sur la partie droite de la lune, incliné */}
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

        {/* Astronaute 1, agrandi */}
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

        {/* Astronaute 2, agrandi */}
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