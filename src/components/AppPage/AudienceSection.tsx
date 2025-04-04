import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface AudienceSectionProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

// Variants pour le conteneur global (staggering)
const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Variants pour les titres
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

// Variants pour les listes (chaque item)
const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const AudienceSection: React.FC<AudienceSectionProps> = ({ forwardedRef }) => {
  return (
    <section ref={forwardedRef} className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="futuristic-container mx-auto px-4 text-center">
        {/* Titre et introduction */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <motion.h2 variants={titleVariants} className="text-3xl md:text-4xl font-extrabold text-gradient-purple leading-tight">
            Pour ceux qui ignorent encore leur besoin...
          </motion.h2>
          <motion.p variants={titleVariants} className="mt-4 text-lg text-surface-300 max-w-3xl mx-auto">
            Vos processus actuels vous freinent. Il existe une manière plus simple et efficace de travailler.
          </motion.p>
        </motion.div>

        {/* Présentation en deux colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Colonne gauche : Besoin non identifié */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="p-6 bg-white/10 rounded-xl border border-neon-purple/30 shadow-neon transition-transform duration-300 hover:scale-105"
          >
            <motion.h3 variants={titleVariants} className="text-2xl font-semibold text-neon-purple mb-4">
              Votre Chaos Digital
            </motion.h3>
            <motion.ul variants={containerVariants} className="space-y-3">
              {[
                "Dossiers Excel mal organisés",
                "Emails en pagaille",
                "Perte de temps et erreurs répétées"
              ].map((item, index) => (
                <motion.li key={index} variants={listItemVariants} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-6 h-6 text-neon-purple" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Colonne droite : Vision clarifiée */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="p-6 bg-white/10 rounded-xl border border-neon-purple/30 shadow-neon transition-transform duration-300 hover:scale-105"
          >
            <motion.h3 variants={titleVariants} className="text-2xl font-semibold text-neon-purple mb-4">
              Votre Vision Clarifiée
            </motion.h3>
            <motion.ul variants={containerVariants} className="space-y-3">
              {[
                "Besoin d’un ERP personnalisé",
                "Automatisation intelligente",
                "Intégration d’outils performants"
              ].map((item, index) => (
                <motion.li key={index} variants={listItemVariants} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-6 h-6 text-neon-purple" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Bouton CTA */}
        <motion.div variants={titleVariants} className="mt-10">
          <button
            onClick={() => {
              const nextSection = document.getElementById('process-section');
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-3 bg-neon-purple px-8 py-4 rounded-full text-lg font-bold transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(176,38,255,0.5)]"
          >
            Découvrir le processus
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AudienceSection;