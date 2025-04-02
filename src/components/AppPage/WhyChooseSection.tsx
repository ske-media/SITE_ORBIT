// src/components/AppPage/WhyChooseSection.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Briefcase, Activity, Settings, CreditCard, LifeBuoy } from 'lucide-react';

// Définition du type de donnée pour chaque avantage
interface WhyChooseItem {
  id: number;
  title: string;
  description: string;
  // L'icône est un composant React (importé depuis lucide-react)
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  // Couleur principale pour l’icône et le glow
  color: string;
}

// Données à afficher
const whyChooseItems: WhyChooseItem[] = [
  {
    id: 1,
    title: "Expérience en développement sur mesure",
    description: "Une équipe à l’aise avec la Suisse, ses spécificités, et les attentes de qualité élevées du marché.",
    Icon: Briefcase,
    color: "#B026FF",
  },
  {
    id: 2,
    title: "Process Agile & Transparent",
    description: "Suivez l’avancement pas à pas, sans mauvaise surprise sur le budget.",
    Icon: Activity,
    color: "#2F73FF",
  },
  {
    id: 3,
    title: "Approche Premium & Clé en Main",
    description: "Nous gérons tout : développement, intégration, hébergement, maintenance et formation.",
    Icon: Settings,
    color: "#05D9E8",
  },
  {
    id: 4,
    title: "Tarifs Clairs",
    description: "Une base solide + des modules premium, et, si besoin, un audit déductible pour optimiser votre investissement.",
    Icon: CreditCard,
    color: "#FFE53B",
  },
  {
    id: 5,
    title: "Support & Évolutions",
    description: "Nous restons à vos côtés pour les mises à jour et l’évolution de votre outil, afin qu’il grandisse avec vous.",
    Icon: LifeBuoy,
    color: "#FF3864",
  },
];

// Variantes d'animation pour le conteneur
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

// Variantes d'animation pour chaque carte
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

// Variantes d'animation pour le contenu textuel à l'intérieur des cartes
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Variantes d'animation pour l'icône et son effet glow
const iconVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0.7 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  hover: {
    scale: 1.2,
    filter: "drop-shadow(0 0 12px rgba(176,38,255,0.8))",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Variante pour un élément décoratif en bas
const decorativeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.1, transition: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" } },
};

const WhyChooseSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-dark-900 to-dark-800 overflow-hidden">
      {/* Éléments de fond décoratifs */}
      <motion.div variants={decorativeVariants} initial="hidden" animate="visible" className="absolute inset-0">
        <div className="absolute inset-0 bg-dark-900 opacity-60"></div>
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-black to-transparent opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-black to-transparent opacity-30"></div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0.4 }}
          animate={{ scale: 1.2, opacity: 0.2 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="w-64 h-64 bg-neon-purple rounded-full mx-auto"
        ></motion.div>
      </motion.div>

      {/* Conteneur principal */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Titre et sous-titre de la section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-purple mb-4">
            POURQUOI CHOISIR AGENCE ORBIT ?
          </h2>
          <p className="text-lg text-surface-300 max-w-3xl mx-auto">
            Nos solutions sur mesure, notre approche agile et notre expertise premium vous garantissent un accompagnement complet, du développement à la maintenance.
          </p>
        </motion.div>

        {/* Grille des cartes avec les avantages */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {whyChooseItems.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              className="p-6 bg-white/10 border border-neon-purple/20 rounded-2xl shadow-lg transition-transform duration-300"
            >
              <div className="flex flex-col md:flex-row items-center">
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: item.color + "33" }}
                >
                  <item.Icon className="w-8 h-8" style={{ color: item.color }} />
                </motion.div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <motion.h3 variants={textVariants} className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </motion.h3>
                  <motion.p variants={textVariants} className="text-base text-surface-300">
                    {item.description}
                  </motion.p>
                </div>
              </div>
              <div className="mt-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full h-px bg-neon-purple/40"
                ></motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-4 text-sm text-gray-400"
              >
                &nbsp;
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Élément décoratif en bas */}
        <motion.div
          variants={decorativeVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark-800 to-transparent pointer-events-none"
        ></motion.div>
      </div>
      {/* Espacement additionnel pour l'esthétique */}
      <div className="h-16"></div>
    </section>
  );
};

export default WhyChooseSection;