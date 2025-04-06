// src/components/CountrySelector.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CountrySelector: React.FC = () => {
  const navigate = useNavigate();

  // Variantes pour l'animation globale du container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  // Animation pour la lune (effet flottant)
  const moonVariants = {
    float: {
      y: [0, -20, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // Animation pour les drapeaux (effet de hover dynamique)
  const flagVariants = {
    hover: { scale: 1.1, rotate: [0, 10, -10, 0], transition: { duration: 0.6 } },
  };

  // Animation pour les astronautes (flottement doux)
  const astronautVariants = {
    float: {
      y: [0, -15, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // Gestion de la sélection du pays et enregistrement dans un cookie
  const handleCountrySelect = (country: string) => {
    document.cookie = `selectedCountry=${country};path=/;max-age=${60 * 60 * 24 * 30}`;
    navigate(`/${country}`);
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-dark-900 text-center relative overflow-hidden px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Titre */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-gradient-purple mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Choisissez le pays de l'agence
      </motion.h1>
      
      {/* Sous-titre */}
      <motion.p
        className="text-lg text-surface-300 mb-12 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Sélectionnez votre région pour accéder aux services et à l'expertise adaptés.
      </motion.p>

      {/* Conteneur pour la lune, les drapeaux et les astronautes */}
      <div className="relative flex items-center justify-center">
        {/* Lune agrandie et atténuée */}
        <motion.img
          src="https://i.imgur.com/FOpAz73.png"  // URL de votre image de lune
          alt="Lune"
          className="w-96 h-96 object-contain"
          variants={moonVariants}
          animate="float"
          style={{ filter: 'brightness(0.7)' }}
        />

        {/* Drapeau français avec mat, positionné à gauche */}
        <motion.img
          src="https://i.imgur.com/Y1Rkp0o.png"
          alt="France"
          className="w-24 h-auto absolute left-[-10%] top-1/2 transform -translate-y-1/2"
          variants={flagVariants}
          whileHover="hover"
          onClick={() => handleCountrySelect("fr")}
        />

        {/* Drapeau suisse avec mat, positionné à droite */}
        <motion.img
          src="https://i.imgur.com/deWwaH2.png"
          alt="Suisse"
          className="w-24 h-auto absolute right-[-10%] top-1/2 transform -translate-y-1/2"
          variants={flagVariants}
          whileHover="hover"
          onClick={() => handleCountrySelect("ch")}
        />

        {/* Astronaute 1 */}
        <motion.img
          src="https://i.imgur.com/Yw2O42F.png"
          alt="Astronaute 1"
          className="w-20 h-auto absolute top-10 left-10"
          variants={astronautVariants}
          animate="float"
        />

        {/* Astronaute 2 */}
        <motion.img
          src="https://i.imgur.com/0bsqFHn.png"
          alt="Astronaute 2"
          className="w-20 h-auto absolute bottom-10 right-10"
          variants={astronautVariants}
          animate="float"
        />
      </div>
    </motion.section>
  );
};

export default CountrySelector;