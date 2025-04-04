import React from 'react';
import { motion, Variants } from 'framer-motion';

// -----------------------------------------------------------------------------
// TYPES & DONNÉES
// -----------------------------------------------------------------------------
interface Sector {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const sectors: Sector[] = [
  {
    id: 1,
    title: 'PME industrielles',
    description: 'Suivi de production, maintenance, gestion d’équipe terrain.',
    // Nouvelle icône pour PME industrielles (exemple d’icône d’usine)
    icon: 'https://img.icons8.com/fluency/96/000000/factory.png',
  },
  {
    id: 2,
    title: 'Artisans / Commerçants',
    description: 'Stocks, ventes, planning d’intervention.',
    // Icône pour Artisans / Commerçants
    icon: 'https://img.icons8.com/fluency/96/000000/shop.png',
  },
  {
    id: 3,
    title: 'Agences & Cabinets',
    description: 'Gestion de clients et projets, suivi du temps et facturation.',
    // Icône pour Agences & Cabinets
    icon: 'https://img.icons8.com/fluency/96/000000/office.png',
  },
  {
    id: 4,
    title: 'Instituts / Salles de sport',
    description: 'Gestion des rendez-vous, abonnements, paiements, CRM client.',
    // Icône pour Salles de sport
    icon: 'https://img.icons8.com/fluency/96/000000/gym.png',
  },
  {
    id: 5,
    title: 'Cabinets médicaux',
    description: 'Dossiers patients, planning, facturation.',
    // Icône pour Cabinets médicaux
    icon: 'https://img.icons8.com/fluency/96/000000/hospital-2.png',
  },
  {
    id: 6,
    title: 'Et bien d’autres',
    description: 'Solutions personnalisées adaptées à vos processus.',
    // Icône pour Autres secteurs
    icon: 'https://img.icons8.com/fluency/96/000000/plus-2-math.png',
  },
];

// -----------------------------------------------------------------------------
// VARIANTS POUR LES ANIMATIONS
// -----------------------------------------------------------------------------
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, when: 'beforeChildren' } },
};

const cardVariantsLeft: Variants = {
  hidden: { opacity: 0, x: -50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariantsRight: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const iconVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const glowHoverVariants: Variants = {
  hover: {
    scale: 1.03,
    boxShadow: '0 0 20px rgba(176,38,255,0.8)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const separatorVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' } },
};

// -----------------------------------------------------------------------------
// COMPOSANTS DÉCORATIFS
// -----------------------------------------------------------------------------
const AnimatedStarField: React.FC = () => {
  const stars = Array.from({ length: 50 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: (star % 5) * 0.2,
            ease: 'easeInOut',
          }}
          className="absolute bg-white rounded-full"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

const GlowingCircles: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-10 left-10 w-48 h-48 bg-neon-purple/20 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-10 right-10 w-32 h-32 bg-neon-blue/20 rounded-full blur-2xl opacity-20"
      />
    </div>
  );
};

const AnimatedSeparator: React.FC = () => {
  return (
    <motion.div
      variants={separatorVariants}
      initial="hidden"
      whileInView="visible"
      className="w-full h-1 bg-neon-purple my-8"
    />
  );
};

// -----------------------------------------------------------------------------
// COMPOSANT SECTOR CARD
// -----------------------------------------------------------------------------
interface SectorCardProps {
  sector: Sector;
  reverse?: boolean;
}

const SectorCard: React.FC<SectorCardProps> = ({ sector, reverse = false }) => {
  return (
    <motion.div
      variants={reverse ? cardVariantsRight : cardVariantsLeft}
      whileHover="hover"
      className={`flex flex-col md:flex-row items-center bg-white/5 border border-neon-purple/20 rounded-2xl p-6 md:p-8 transition-all duration-300 overflow-hidden ${reverse ? 'md:flex-row-reverse' : ''}`}
    >
      <motion.div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 mr-4 md:mr-8" variants={iconVariants}>
        <motion.img
          src={sector.icon}
          alt={sector.title}
          className="w-full h-full object-contain"
          variants={glowHoverVariants}
          whileHover="hover"
        />
      </motion.div>
      <div className="flex-1">
        <motion.h3
          variants={textVariants}
          className="text-2xl font-bold mb-2"
          style={{ color: '#B026FF' }}
        >
          {sector.title}
        </motion.h3>
        <motion.p variants={textVariants} className="text-lg text-surface-300">
          {sector.description}
        </motion.p>
        <motion.div
          variants={glowHoverVariants}
          whileHover="hover"
          className="mt-4 h-1 w-full bg-gradient-to-r from-neon-purple to-neon-blue"
        />
      </div>
    </motion.div>
  );
};

// -----------------------------------------------------------------------------
// COMPOSANT PRINCIPAL: SECTORS SECTION
// -----------------------------------------------------------------------------
const SectorsSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-dark-900 to-dark-800 overflow-hidden">
      <AnimatedStarField />
      <GlowingCircles />
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient-purple leading-tight">
            Un service adapté à tous les secteurs
          </h2>
          <p className="mt-4 text-lg text-surface-300 max-w-3xl mx-auto">
            Nous développons exactement ce dont vous avez besoin. Rien de plus, rien de moins.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-10"
        >
          {sectors.map((sector, index) => (
            <SectorCard key={sector.id} sector={sector} reverse={index % 2 === 1} />
          ))}
        </motion.div>
        <AnimatedSeparator />
        <motion.div variants={textVariants} initial="hidden" whileInView="visible" className="text-center mt-12">
          <p className="text-xl text-surface-300">
            En réalité, si vous avez des processus, vous pouvez les digitaliser.
          </p>
        </motion.div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
          className="absolute inset-0 bg-[radial-gradient(circle,_rgba(176,38,255,0.2)_0%,_transparent_70%)]"
        />
      </div>
    </section>
  );
};

export default SectorsSection;