// src/components/NextStepSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

// ------------------------------
// FONCTIONS UTILITAIRES
// ------------------------------
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function getFormattedPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ------------------------------
// VARIANTS FRAMER MOTION
// ------------------------------
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { staggerChildren: 0.15, duration: 0.8 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8 } 
  },
};

const decorativeCircleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 0.5, 
    transition: { duration: 1.2, ease: 'easeOut' } 
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// ------------------------------
// COMPOSANT NEXT STEP SECTION
// ------------------------------
const NextStepSection: React.FC = () => {
  // Détermine la devise : par défaut CHF, et en EUR si le cookie "selectedCountry" vaut "fr"
  const selectedCountry = getCookie('selectedCountry');
  const currency = selectedCountry === 'fr' ? 'EUR' : 'CHF';
  const auditPrice = getFormattedPrice(1799, currency);

  return (
    <section className="relative py-24 bg-gradient-to-b from-transparent to-neon-purple/10 overflow-hidden">
      {/* Fond décoratif animé */}
      <motion.div 
        className="absolute top-0 left-0 w-40 h-40 bg-neon-purple rounded-full mix-blend-screen blur-2xl"
        variants={decorativeCircleVariants}
        initial="hidden"
        animate="visible"
        style={{ top: '10%', left: '5%' }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-56 h-56 bg-neon-purple rounded-full mix-blend-screen blur-3xl"
        variants={decorativeCircleVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3, duration: 1.5 }}
        style={{ bottom: '5%', right: '5%' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre principal et sous-titre */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold text-gradient-purple tracking-tight"
          >
            Prochaine Étape
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-xl text-surface-300 max-w-3xl mx-auto"
          >
            Contactez-nous pour un échange gratuit et découvrez comment structurer votre projet digital.
          </motion.p>
        </motion.div>

        {/* Options principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Option 1: Audit Digital */}
          <motion.div
            variants={itemVariants}
            className="relative bg-white/5 p-8 rounded-2xl border border-neon-purple/30 shadow-lg transform transition hover:scale-105"
          >
            <div className="absolute -top-4 -right-4">
              <motion.div 
                className="w-16 h-16 rounded-full bg-neon-purple opacity-40 blur-lg"
                variants={decorativeCircleVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            <motion.h3
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-4"
            >
              Audit Digital
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 mb-6"
            >
              Analysez en profondeur vos process, outils et objectifs pour structurer votre projet dès le départ.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="text-4xl font-extrabold text-neon-purple mb-6"
            >
              {auditPrice}
            </motion.div>
            <motion.button
              onClick={() => window.location.href = '/contact'}
              variants={itemVariants}
              className="inline-flex items-center gap-3 bg-neon-purple px-8 py-4 rounded-full text-lg font-medium transition transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)]"
            >
              <span>Demander l'audit</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>

          {/* Option 2: Entretien Découverte */}
          <motion.div
            variants={itemVariants}
            className="relative bg-white/5 p-8 rounded-2xl border border-neon-purple/30 shadow-lg transform transition hover:scale-105"
          >
            <div className="absolute -top-4 -right-4">
              <motion.div 
                className="w-16 h-16 rounded-full bg-neon-purple opacity-40 blur-lg"
                variants={decorativeCircleVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2, duration: 1.2 }}
              />
            </div>
            <motion.h3
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-4"
            >
              Entretien Découverte
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 mb-6"
            >
              Clarifiez vos idées et obtenez une proposition personnalisée, avec un planning réaliste pour votre futur outil.
            </motion.p>
            <motion.button
              onClick={() => window.location.href = '/contact'}
              variants={itemVariants}
              className="inline-flex items-center gap-3 bg-neon-purple px-8 py-4 rounded-full text-lg font-medium transition transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)]"
            >
              <span>Planifier l'entretien</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Zone finale de conclusion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="mt-16 text-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 mb-6"
          >
            Recevez une proposition chiffrée et un planning personnalisé pour transformer votre vision en réalité.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button onClick={() => window.location.href = '/contact'} size="lg" glowing>
              Discutons de votre projet
            </Button>
          </motion.div>
        </motion.div>

        {/* Ligne décorative finale */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="mt-16 mx-auto w-full max-w-2xl h-1 bg-neon-purple/50"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 text-center"
        >
          <motion.p className="text-lg text-gray-300">
            Prenez votre décision et franchissez le pas vers une transformation digitale réussie.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default NextStepSection;