import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  BarChart2,
  UserCheck,
  Rocket,
  DollarSign,
  ShoppingCart,
  ArrowRight
} from 'lucide-react';

const facts = [
  {
    stat: "5x",
    label: "d'interactions générées par des campagnes sociales ciblées",
    icon: <TrendingUp className="w-10 h-10 text-neon-purple" />,
  },
  {
    stat: "4€",
    label: "de revenus pour chaque euro investi en social media",
    icon: <BarChart2 className="w-10 h-10 text-neon-purple" />,
  },
  {
    stat: "7/10",
    label: "des clients préfèrent les marques actives en ligne",
    icon: <UserCheck className="w-10 h-10 text-neon-purple" />,
  },
  {
    stat: "3x",
    label: "l'engagement moyen peut tripler grâce à une stratégie efficace",
    icon: <Rocket className="w-10 h-10 text-neon-purple" />,
  },
  {
    stat: "2x",
    label: "la notoriété de votre marque peut se doubler via les réseaux sociaux",
    icon: <DollarSign className="w-10 h-10 text-neon-purple" />,
  },
  {
    stat: "2.5x",
    label: "le taux de conversion peut être multiplié avec une présence optimisée",
    icon: <ShoppingCart className="w-10 h-10 text-neon-purple" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 }
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const SocialMediaImpact: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-neon-purple/10 to-transparent overflow-hidden">
      {/* Fond similaire aux autres sections */}
      <div className="absolute inset-0 bg-dark-900/30"></div>
      <div className="absolute inset-0 grid-background opacity-10"></div>
      <div className="scanning-line absolute inset-0"></div>

      <div className="relative z-10 futuristic-container mx-auto px-4">
        {/* Titre et sous-titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-purple">
            L'impact des réseaux sociaux
          </h2>
          <p className="text-lg text-surface-300 max-w-2xl mx-auto">
            Une stratégie sociale bien pensée propulse votre entreprise vers de nouveaux sommets.
          </p>
        </motion.div>

        {/* Grille des faits avec six éléments */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="bg-white/5 p-6 rounded-2xl shadow-neon border border-neon-purple/20 hover:border-neon-purple/40 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {fact.icon}
              </div>
              <div className="text-3xl font-extrabold text-neon-purple mb-2 text-center">
                {fact.stat}
              </div>
              <p className="text-base text-gray-300 text-center">
                {fact.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bouton d'appel à l'action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.button
            onClick={() => window.location.href = "/contact"}
            className="inline-flex items-center gap-3 bg-neon-purple px-10 py-4 rounded-full text-lg font-medium hover:bg-neon-purple/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95 group"
          >
            <span>Transformez votre présence</span>
            <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMediaImpact;