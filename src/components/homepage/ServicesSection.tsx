import React from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Globe, Instagram, Smartphone, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

interface ServicesSectionProps {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ forwardedRef }) => {
  const servicesInView = useInView(forwardedRef, { once: true, amount: 0.2 });

  return (
    <section ref={forwardedRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-purple/5"></div>
      <div className="scanning-line"></div>
      
      <AnimatePresence>
        {servicesInView && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="futuristic-container"
          >
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="futuristic-subtitle mb-4 text-gradient-purple"
              >
                Nos solutions digitales
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-surface-300 max-w-2xl mx-auto"
              >
                Des services premium qui mettent votre entreprise en valeur et génèrent des résultats concrets.
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Globe className="w-8 h-8 text-neon-purple" />,
                  title: "Création de Site Web",
                  description: "Des sites performants, modernes et optimisés SEO pour augmenter votre visibilité et convertir vos visiteurs.",
                  link: "/creation-site-web"
                },
                {
                  icon: <Instagram className="w-8 h-8 text-neon-purple" />,
                  title: "Réseaux Sociaux",
                  description: "Développez votre audience avec des stratégies puissantes et du contenu engageant pour construire votre communauté.",
                  link: "/reseaux-sociaux"
                },
                {
                  icon: <Smartphone className="w-8 h-8 text-neon-purple" />,
                  title: "Applications Web & Mobiles",
                  description: "Des solutions digitales sur-mesure pour vos projets, développées avec les technologies les plus récentes.",
                  link: "/creation-application"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  whileHover={{ y: -8 }}
                  className="futuristic-card group border border-neon-purple/20 hover:border-neon-purple/40 transition-all duration-300"
                >
                  <div className="p-3 bg-neon-purple/10 rounded-xl w-fit mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-neon-purple transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-surface-300 mb-6">
                    {service.description}
                  </p>
                  <Button to={service.link} variant="text" className="p-0 text-neon-purple">
                    Découvrir <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;