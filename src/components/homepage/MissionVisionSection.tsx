import React from 'react';
import { motion } from 'framer-motion';
import ReactorAnimation from './ReactorAnimation';

const MissionVisionSection: React.FC = () => {
  // Variants pour l'animation du contenu
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="relative py-20 min-h-[50vh] flex items-center overflow-hidden">
      {/* Surcouche de fond inspirée du style TeamSection */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 to-transparent"></div>

      {/* Conteneur central du contenu */}
      <div className="futuristic-container relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="font-display font-bold text-3xl md:text-4xl mb-4 text-gradient-purple leading-tight"
        >
          Mission & Vision
        </motion.h2>
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-surface-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Nous propulsons votre transformation digitale en plaçant l'innovation et l'humain au cœur de chaque projet.
          Notre mission est de vous accompagner vers de nouveaux horizons, tandis que notre vision transforme le numérique
          en un levier d’inspiration et de liberté.
        </motion.p>
      </div>

      {/* ReactorAnimation positionné en bas à droite */}
      <div className="absolute bottom-4 right-4">
        <ReactorAnimation />
      </div>
    </section>
  );
};

export default MissionVisionSection;