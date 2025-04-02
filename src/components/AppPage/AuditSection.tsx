// src/components/AppPage/AuditSection.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// ----------------------------------------------------------------------
// VARIANTS POUR LES ANIMATIONS
// ----------------------------------------------------------------------
const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.25,
      when: 'beforeChildren',
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const bulletVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const decorativeVariants: Variants = {
  animate: {
    rotate: [0, 360],
    transition: { duration: 20, repeat: Infinity, ease: 'linear' },
  },
};

// ----------------------------------------------------------------------
// COMPOSANT AUDIT SECTION
// ----------------------------------------------------------------------
interface AuditSectionProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

const AuditSection: React.FC<AuditSectionProps> = ({ forwardedRef }) => {
  return (
    <section
      ref={forwardedRef}
      className="relative py-24 bg-gradient-to-b from-dark-900 to-dark-800 overflow-hidden"
    >
      {/* Éléments décoratifs en arrière-plan */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-neon-purple/20 rounded-full blur-3xl opacity-30"
        variants={decorativeVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-0 right-0 w-48 h-48 bg-neon-blue/20 rounded-full blur-2xl opacity-30"
        variants={decorativeVariants}
        animate="animate"
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
        className="absolute inset-0 bg-diagonal-lines"
      />

      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Titre et sous-titre */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 variants={titleVariants} className="text-4xl md:text-5xl font-extrabold text-gradient-purple mb-4">
            L’AUDIT DIGITAL ORBIT – 1’799 CHF (DÉDUCTIBLE)
          </motion.h2>
          <motion.p variants={textVariants} className="text-lg text-surface-300 max-w-3xl mx-auto">
            Pour une vision complète de la transformation digitale possible dans votre entreprise.
          </motion.p>
        </motion.div>

        {/* Détails de l'audit */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white/5 border border-neon-purple/30 rounded-3xl p-10 md:p-14 shadow-xl mx-auto max-w-3xl relative overflow-hidden"
        >
          <motion.ul className="space-y-4 text-gray-300 text-lg list-disc pl-6" variants={containerVariants}>
            <motion.li variants={bulletVariants}>
              <strong>Analyse de vos outils et process actuels :</strong> Identification des redondances, doublons et pertes de temps.
            </motion.li>
            <motion.li variants={bulletVariants}>
              <strong>Entretien avec les responsables clés :</strong> Captation des enjeux de chaque service (commercial, opérationnel, administratif, etc.).
            </motion.li>
            <motion.li variants={bulletVariants}>
              <strong>Recommandations stratégiques :</strong> Sur les solutions de digitalisation (automatisation, intégrations, etc.).
            </motion.li>
            <motion.li variants={bulletVariants}>
              <strong>Proposition d’architecture :</strong> Pour une application Orbit sur mesure ou un mix de modules existants.
            </motion.li>
            <motion.li variants={bulletVariants}>
              <strong>Estimation budgétaire et ROI :</strong> Des résultats réalistes et mesurables.
            </motion.li>
          </motion.ul>
          <motion.p variants={textVariants} className="mt-6 text-center text-sm text-gray-400">
            <strong>Avantage :</strong> Si vous décidez de passer commande pour votre app Orbit dans les 60 jours, les 1’799 CHF de l’audit sont intégralement déduits du montant final.
          </motion.p>
        </motion.div>

        {/* Bouton CTA */}
        <motion.div variants={buttonVariants} initial="hidden" whileInView="visible" className="mt-16 text-center">
          <motion.button
            onClick={() => window.location.href = '/contact'}
            className="inline-flex items-center gap-3 bg-neon-purple px-10 py-4 rounded-full text-lg font-medium hover:bg-neon-purple/80 transition-all transform hover:scale-105 hover:shadow-lg active:scale-95 group"
          >
            <span>Réserver mon Audit Digital</span>
            <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AuditSection;