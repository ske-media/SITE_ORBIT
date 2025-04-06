// src/components/StatsSection.tsx
import React, { useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '../AnimatedCounter';
import TechCircuit from '../TechCircuit';

// Fonction utilitaire pour récupérer un cookie par nom
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

type StatsSectionProps = {
  forwardedRef: React.RefObject<HTMLDivElement>;
};

const StatsSection: React.FC<StatsSectionProps> = ({ forwardedRef }) => {
  const statsInView = useInView(forwardedRef, { once: true, amount: 0.3 });
  
  // Définir la devise : par défaut "CHF", et "EUR" si le cookie "selectedCountry" vaut "fr"
  const selectedCountry = getCookie('selectedCountry');
  const currencySuffix = selectedCountry === 'fr' ? ' EUR' : ' CHF';

  // Tableau des statistiques avec le suffixe adapté pour la statistique liée au prix
  const stats = [
    { number: 98, text: "de clients satisfaits", suffix: "%" },
    { number: 7, text: "pour la première version", suffix: " jours" },
    { number: 1999, text: "pour votre site web", suffix: currencySuffix }
  ];

  return (
    <section ref={forwardedRef} className="py-20 relative">
      {/* Gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 to-transparent"></div>
      <div className="scanning-line-reverse"></div>
      
      <div className="futuristic-container relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <AnimatePresence key={index}>
              {statsInView && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className="futuristic-card text-center"
                >
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  <div className="text-xl font-medium">{stat.text}</div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
        
        {/* Tech Circuit Effect */}
        <div className="mt-16 relative h-40">
          <TechCircuit className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;