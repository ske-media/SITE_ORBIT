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

  // Gestion de la sélection du pays
  const handleCountrySelect = (country: string) => {
    // Redirige vers la route associée au pays sélectionné
    navigate(`/${country}`);
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-dark-900 text-center px-4 relative"
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

      {/* Conteneur pour la lune et les drapeaux */}
      <div className="relative flex items-center justify-center">
        {/* Image de la lune */}
        <motion.img
          src="https://i.imgur.com/FOpAz73.png"  // Remplacez par l'URL de votre image de lune
          alt="Lune"
          className="w-64 h-64 object-contain"
          variants={moonVariants}
          animate="float"
        />

        {/* Drapeau français, positionné à gauche */}
        <motion.img
          src="https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg"
          alt="France"
          className="w-16 h-16 absolute left-0 transform -translate-x-1/2"
          variants={flagVariants}
          whileHover="hover"
          onClick={() => handleCountrySelect("fr")}
        />

        {/* Drapeau suisse, positionné à droite */}
        <motion.img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg"
          alt="Suisse"
          className="w-16 h-16 absolute right-0 transform translate-x-1/2"
          variants={flagVariants}
          whileHover="hover"
          onClick={() => handleCountrySelect("ch")}
        />
      </div>
    </motion.section>
  );
};

export default CountrySelector;