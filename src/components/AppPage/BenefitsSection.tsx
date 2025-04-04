import React from 'react';
import { motion, Variants } from 'framer-motion';

// -----------------------------------------------------------------------------
// Définition du type et des données
// -----------------------------------------------------------------------------
interface Benefit {
  id: number;
  title: string;
  description: string;
  // Icônes en couleur unie pour un rendu épuré
  icon: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    title: "Automatisation des tâches",
    description: "Fini le copier-coller et la saisie redondante. Gagnez du temps et réduisez les erreurs.",
    icon: "https://img.icons8.com/fluency/96/000000/automation.png",
  },
  {
    id: 2,
    title: "Centralisation de l’information",
    description: "Regroupez CRM, projets, finances, RH et plus en un seul endroit pour une vue d'ensemble optimale.",
    icon: "https://img.icons8.com/fluency/96/000000/data-configuration.png",
  },
  {
    id: 3,
    title: "Collaboration fluide",
    description: "Optimisez la communication et le travail d'équipe avec des outils intégrés et intuitifs.",
    icon: "https://img.icons8.com/fluency/96/000000/communication.png",
  },
  {
    id: 4,
    title: "Réduction des erreurs",
    description: "Des processus automatisés et validés pour minimiser les risques et augmenter la fiabilité.",
    icon: "https://img.icons8.com/fluency/96/000000/error.png",
  },
  {
    id: 5,
    title: "ROI tangible",
    description: "Améliorez la productivité et rentabilisez rapidement votre investissement grâce à une solution sur-mesure.",
    icon: "https://img.icons8.com/fluency/96/000000/money-bag.png",
  },
];

// -----------------------------------------------------------------------------
// Variantes d'animation pour le conteneur et les cartes
// -----------------------------------------------------------------------------
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const iconGlowVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0.8 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  hover: {
    scale: 1.2,
    filter: "drop-shadow(0 0 10px rgba(176,38,255,0.8))",
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// -----------------------------------------------------------------------------
// Composant BenefitCard
// -----------------------------------------------------------------------------
interface BenefitCardProps {
  benefit: Benefit;
  reverse?: boolean;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ benefit, reverse = false }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover="hover"
      className={`flex flex-col md:flex-row items-center p-6 border border-neon-purple/20 rounded-2xl bg-white/10 transition-transform duration-300 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.div
        variants={iconGlowVariants}
        className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-neon-purple/20 mr-4 md:mr-8"
      >
        <img
          src={benefit.icon}
          alt={benefit.title}
          className="w-10 h-10 md:w-12 md:h-12 object-contain"
        />
      </motion.div>
      <div>
        <motion.h3
          variants={textVariants}
          className="text-xl md:text-2xl font-bold mb-2 text-white"
        >
          {benefit.title}
        </motion.h3>
        <motion.p
          variants={textVariants}
          className="text-sm md:text-base text-surface-300"
        >
          {benefit.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

// -----------------------------------------------------------------------------
// Composant principal : BenefitsSection
// -----------------------------------------------------------------------------
const BenefitsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-800 overflow-hidden relative">
      <div className="container mx-auto px-4">
        {/* Titre et sous-titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-purple">
            Les avantages concrets pour votre entreprise
          </h2>
          <p className="mt-4 text-lg text-surface-300 max-w-3xl mx-auto">
            Transformez vos processus et boostez votre performance grâce à une solution entièrement adaptée.
          </p>
        </motion.div>

        {/* Grille des cartes de bénéfices */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              reverse={index % 2 === 1}
            />
          ))}
        </motion.div>

        {/* Effet décoratif en bas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark-800 to-transparent pointer-events-none"
        />
      </div>
    </section>
  );
};

export default BenefitsSection;