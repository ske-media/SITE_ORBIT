import React from 'react';
import { motion } from 'framer-motion';
import ReactorAnimation from './ReactorAnimation';

const MissionVisionSection: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="relative py-20 px-4 min-h-[60vh] overflow-hidden">
      {/* Fond subtil comme les autres sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 to-transparent" />
      <div className="scanning-line-reverse" />

      <div className="futuristic-container relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
        
        {/* Texte Mission & Vision */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full max-w-xl text-center md:text-left"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-gradient-purple leading-tight">
            Mission & Vision
          </h2>
          <p className="text-surface-300 text-base md:text-lg leading-relaxed">
            Nous propulsons votre transformation digitale en plaçant l'innovation et l'humain au cœur de chaque projet.
            <br className="hidden md:block" />
            <br />
            Notre mission est de vous accompagner vers de nouveaux horizons, tandis que notre vision transforme le numérique
            en un levier d’inspiration et de liberté.
          </p>
        </motion.div>

        {/* Reactor Animation */}
        <div className="w-full max-w-[300px] mx-auto md:mx-0">
          <ReactorAnimation />
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
