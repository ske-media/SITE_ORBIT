// src/components/AppPage/AudienceSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AudienceSectionProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.8 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const AudienceSection: React.FC<AudienceSectionProps> = ({ forwardedRef }) => {
  return (
    <section ref={forwardedRef} className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="futuristic-container mx-auto px-4">
        {/* Titre scindé pour renforcer l'impact */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gradient-purple">
            Pour ceux qui n'ont pas encore identifié leur besoin...
          </motion.h2>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gradient-purple mt-2">
            ...et pour ceux qui savent déjà ce qu'ils veulent.
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-lg text-surface-300 max-w-3xl mx-auto">
            Découvrez comment une application sur-mesure peut transformer votre organisation.
          </motion.p>
        </motion.div>

        {/* Présentation en deux colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Colonne A : Besoin non identifié */}
          <motion.div
            variants={itemVariants}
            className="bg-white/5 rounded-2xl p-8 border border-neon-purple/30 shadow-neon transition-all duration-300 hover:shadow-neon-lg"
          >
            <h3 className="text-2xl font-semibold text-neon-purple mb-4">
              Vous ne savez pas encore ce qui vous manque…
            </h3>
            <ul className="list-disc ml-6 text-gray-300 space-y-2">
              <li>Dossiers Excel dispersés</li>
              <li>Multiples e-mails sans coordination</li>
              <li>Perte de temps et de productivité</li>
              <li>Difficultés à suivre vos performances</li>
            </ul>
            <motion.p variants={itemVariants} className="mt-4 text-lg text-surface-300">
              Il existe une méthode plus simple pour organiser vos process et booster votre efficacité.
            </motion.p>
          </motion.div>

          {/* Colonne B : Besoin clairement défini */}
          <motion.div
            variants={itemVariants}
            className="bg-white/5 rounded-2xl p-8 border border-neon-purple/30 shadow-neon transition-all duration-300 hover:shadow-neon-lg"
          >
            <h3 className="text-2xl font-semibold text-neon-purple mb-4">
              Vous savez exactement ce que vous attendez…
            </h3>
            <ul className="list-disc ml-6 text-gray-300 space-y-2">
              <li>ERP personnalisé sur mesure</li>
              <li>Logiciel métier adapté</li>
              <li>Intégrations techniques avancées</li>
              <li>Automatisation des processus critiques</li>
            </ul>
            <motion.p variants={itemVariants} className="mt-4 text-lg text-surface-300">
              Orbit concrétise votre vision grâce à une approche agile et premium.
            </motion.p>
          </motion.div>
        </div>

        {/* Bouton CTA pour faire défiler vers la section suivante */}
        <div className="mt-12 text-center">
          <motion.button
            variants={itemVariants}
            onClick={() => {
              const processSection = document.getElementById('process-section');
              if (processSection) {
                processSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-3 bg-neon-purple px-8 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95"
          >
            Découvrir le processus
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;