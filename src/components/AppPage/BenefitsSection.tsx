// src/components/AppPage/BenefitsSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

const benefits: Benefit[] = [
  {
    title: "Automatisation des tâches",
    description:
      "Fini le copier-coller et la double saisie – gagnez du temps et réduisez les erreurs au quotidien.",
    icon: "https://i.imgur.com/HTIEMJA.png",
  },
  {
    title: "Centralisation de l’information",
    description:
      "Tous vos outils (CRM, projets, RH, finances, stock) réunis en un seul endroit pour une gestion optimale.",
    icon: "https://i.imgur.com/NihmV1F.png",
  },
  {
    title: "Collaboration fluide",
    description:
      "Une communication interne simplifiée et un suivi en temps réel pour booster l'efficacité de votre équipe.",
    icon: "https://i.imgur.com/8kj66dn.png",
  },
  {
    title: "Réduction des erreurs",
    description:
      "Des processus automatisés et des validations intégrées pour limiter les erreurs humaines et garantir la qualité.",
    icon: "https://i.imgur.com/Bf0iw5t.png",
  },
  {
    title: "Croissance facilitée",
    description:
      "Un outil évolutif qui s’intègre à vos systèmes existants pour accompagner l’expansion de votre entreprise.",
    icon: "https://i.imgur.com/diLN6Yd.png",
  },
  {
    title: "ROI tangible",
    description:
      "Investissez intelligemment : réduisez les coûts, améliorez la productivité et boostez votre rentabilité rapidement.",
    icon: "https://i.imgur.com/syAbpgL.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-dark-900 to-dark-800 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        {/* Titre et Sous-titre */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-5xl font-extrabold text-gradient-purple leading-tight"
          >
            Les Avantages Concrets
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="mt-4 text-lg text-surface-300 max-w-3xl mx-auto"
          >
            Découvrez comment une application Orbit transforme votre quotidien en boostant votre efficacité et en simplifiant vos processus.
          </motion.p>
        </motion.div>

        {/* Grille des Cartes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotate: [0, 2, -2, 0],
                transition: { duration: 0.4 },
              }}
              className="relative p-6 bg-white/10 rounded-xl border border-neon-purple/30 shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <motion.img
                  src={benefit.icon}
                  alt={benefit.title}
                  className="w-16 h-16 object-contain"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </div>
              <h3 className="text-2xl font-bold text-neon-purple mb-2">{benefit.title}</h3>
              <p className="text-gray-300 text-base">{benefit.description}</p>
              {/* Effet de Glow pulsant en arrière-plan */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ boxShadow: "0 0 20px rgba(176,38,255,0.8)" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;