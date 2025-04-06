// src/pages/WelcomePage.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  // Variantes d'animation pour le container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  // Animation pour la lune (flottement)
  const moonAnimation = {
    float: {
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // Animation pour les drapeaux (effet hover et léger ajustement)
  const flagAnimation = {
    hover: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.6 },
    },
  };

  // Animation pour les astronautes (flottement doux)
  const astronautAnimation = {
    float: {
      y: [0, -15, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // Fonction de gestion de la sélection du pays
  const handleCountrySelect = (country: string) => {
    // Enregistrement du choix dans un cookie (30 jours)
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
      <motion.div
        className="min-h-screen relative bg-dark-900 overflow-hidden flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Titre et sous-titre */}
        <div className="z-30 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Choisissez votre pays</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Pour une expérience locale optimale, sélectionnez votre pays.
          </p>
        </div>

        {/* Lune agrandie, en premier plan avec effet de flottement et atténuation */}
        <motion.img
          src="https://i.imgur.com/FOpAz73.png"  // Votre image de lune
          alt="Lune"
          className="w-[80%] md:w-[60%] lg:w-[50%] object-contain z-20"
          style={{ filter: 'brightness(0.7)' }}
          variants={moonAnimation}
          animate="float"
        />

        {/* Drapeau français avec mât, positionné à gauche */}
        <motion.img
          src="https://i.imgur.com/Y1Rkp0o.png"  // Drapeau avec mât pour la France
          alt="France"
          className="absolute z-10"
          style={{
            top: '50%',
            left: '5%',
            transform: 'translateY(-50%) rotate(-10deg)',
          }}
          variants={flagAnimation}
          whileHover="hover"
          onClick={() => handleCountrySelect("fr")}
        />

        {/* Drapeau suisse avec mât, positionné à droite (légèrement plus grand) */}
        <motion.img
          src="https://i.imgur.com/deWwaH2.png"  // Drapeau avec mât pour la Suisse
          alt="Suisse"
          className="absolute z-10"
          style={{
            top: '50%',
            right: '5%',
            transform: 'translateY(-50%) rotate(10deg)',
          }}
          variants={flagAnimation}
          whileHover="hover"
          onClick={() => handleCountrySelect("ch")}
        />

        {/* Astronaute 1, flottant sur le côté gauche */}
        <motion.img
          src="https://i.imgur.com/Yw2O42F.png"
          alt="Astronaute 1"
          className="absolute z-0"
          style={{
            top: '10%',
            left: '2%',
          }}
          variants={astronautAnimation}
          animate="float"
        />

        {/* Astronaute 2, flottant sur le côté droit */}
        <motion.img
          src="https://i.imgur.com/0bsqFHn.png"
          alt="Astronaute 2"
          className="absolute z-0"
          style={{
            bottom: '10%',
            right: '2%',
          }}
          variants={astronautAnimation}
          animate="float"
        />
      </motion.div>
    </>
  );
};

export default WelcomePage;