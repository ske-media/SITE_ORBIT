import React from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, MessageCircle, PieChart } from 'lucide-react';

interface SocialMediaService {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: SocialMediaService[] = [
  {
    icon: <FileText className="w-6 h-6 text-neon-purple" />,
    title: "Stratégie de Contenu",
    description: "Planification et création de contenus engageants pour renforcer votre présence digitale."
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-neon-purple" />,
    title: "Community Management",
    description: "Animation de communautés et interactions authentiques pour fidéliser votre audience."
  },
  {
    icon: <PieChart className="w-6 h-6 text-neon-purple" />,
    title: "Analytique & Reporting",
    description: "Suivi précis et analyse de vos performances pour optimiser votre stratégie sur les réseaux sociaux."
  },
];

const SocialMediaSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative py-20 min-h-[80vh] overflow-hidden">
      {/* Fond de la section */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/5 to-transparent"></div>
      <div className="scanning-line-reverse"></div>
      
      <div className="futuristic-container relative z-10 max-w-5xl mx-auto px-4 text-center">
        <AnimatePresence>
          {inView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="futuristic-subtitle text-gradient-purple text-4xl md:text-5xl font-bold leading-tight mb-6">
                Gestion des Réseaux Sociaux
              </h2>
              <p className="text-surface-300 text-lg max-w-3xl mx-auto">
                Engagez votre audience, développez votre communauté et optimisez votre visibilité grâce à une approche sur-mesure.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grille de cartes de services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <AnimatePresence key={index}>
              {inView && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="futuristic-card border border-neon-purple/20 hover:border-neon-purple/40 transition-all"
                >
                  <div className="p-3 bg-neon-purple/10 rounded-xl w-fit mb-4 mx-auto">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-surface-300 text-sm">
                    {service.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Bouton CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link to="/reseaux-sociaux">
            <button className="futuristic-button inline-flex items-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 hover:bg-purple-600">
              Découvrir plus
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
