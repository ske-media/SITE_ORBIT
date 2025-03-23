import React from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Users, Zap, Shield, Star } from 'lucide-react';

interface WhyChooseUsSectionProps {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ forwardedRef }) => {
  const whyUsInView = useInView(forwardedRef, { once: true, amount: 0.2 });

  return (
    <section ref={forwardedRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/5 to-transparent"></div>
      <div className="scanning-line-reverse"></div>
      
      <div className="futuristic-container">
        <AnimatePresence>
          {whyUsInView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="futuristic-subtitle mb-4 text-gradient-purple">Pourquoi choisir Orbit ?</h2>
              <p className="text-surface-300 max-w-2xl mx-auto">
                Notre approche unique et notre expertise nous distinguent des autres agences.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Users className="w-6 h-6 text-neon-purple" />,
              title: "Un accompagnement 360°",
              description: "Du design au référencement, notre équipe s'occupe de tout pour vous offrir une expérience sans stress."
            },
            {
              icon: <Zap className="w-6 h-6 text-neon-purple" />,
              title: "Sites 100% optimisés",
              description: "Rapides, responsive et prêts pour la conversion, nos sites respectent les dernières normes du web."
            },
            {
              icon: <Shield className="w-6 h-6 text-neon-purple" />,
              title: "Garantie satisfaction",
              description: "Vous ne payez que si vous êtes pleinement satisfait de votre site, sans risque ni engagement."
            },
            {
              icon: <Star className="w-6 h-6 text-neon-purple" />,
              title: "Approche sur-mesure",
              description: "Chaque solution est unique, conçue spécifiquement pour répondre à vos besoins et objectifs."
            }
          ].map((feature, index) => (
            <AnimatePresence key={index}>
              {whyUsInView && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  whileHover={{ y: -5 }}
                  className="futuristic-card border border-neon-purple/20 hover:border-neon-purple/40 transition-all"
                >
                  <div className="p-3 bg-neon-purple/10 rounded-xl w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-surface-300 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;