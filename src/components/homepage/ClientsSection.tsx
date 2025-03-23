import React from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface ClientsSectionProps {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

const ClientsSection: React.FC<ClientsSectionProps> = ({ forwardedRef }) => {
  const clientsInView = useInView(forwardedRef, { once: true, amount: 0.3 });

  // Client testimonials data
  const testimonials = [
    {
      content: "Orbit a transformé notre présence en ligne. Non seulement notre site est magnifique, mais les résultats sont bien au-delà de nos attentes.",
      author: "Thomas Renaud",
      role: "CEO, Entreprise XYZ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
      content: "Un travail d'une qualité exceptionnelle. L'équipe a su capturer l'essence de notre marque et la transposer dans un site web élégant et performant.",
      author: "Sophia Martin",
      role: "Directrice Marketing, Studio Créatif",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
      content: "Ce qui m'a impressionné, c'est l'accompagnement personnalisé et la réactivité. Chaque détail a été soigné et le résultat est simplement parfait.",
      author: "Alexandre Dubois",
      role: "Fondateur, Startup Innovante",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <section ref={forwardedRef} className="py-20 relative">
      <div className="absolute inset-0 bg-dark-500/5"></div>
      <div className="futuristic-container relative">
        <AnimatePresence>
          {clientsInView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="futuristic-subtitle mb-4 text-gradient-purple">Ils nous font confiance</h2>
              <p className="text-surface-300 max-w-2xl mx-auto">
                Rejoignez nos clients satisfaits et transformez votre présence en ligne.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Logo cloud */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center mb-16">
          {Array.from({ length: 4 }).map((_, index) => (
            <AnimatePresence key={index}>
              {clientsInView && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex justify-center items-center grayscale hover:grayscale-0 transition opacity-60 hover:opacity-100"
                >
                  <img 
                    src={`https://images.unsplash.com/photo-161468037${6300 + index}?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80`}
                    alt={`Client logo ${index + 1}`} 
                    className="max-h-12"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimatePresence key={index}>
              {clientsInView && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                  className="futuristic-card relative overflow-hidden group"
                >
                  {/* Quote mark */}
                  <div className="absolute -top-2 -left-2 text-6xl text-neon-purple/20 font-serif">"</div>
                  
                  {/* Testimonial content */}
                  <div className="relative z-10">
                    <p className="text-surface-300 italic mb-6 relative z-10">
                      {testimonial.content}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-neon-purple/30 group-hover:ring-neon-purple/60 transition-all">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold group-hover:text-neon-purple transition-colors">{testimonial.author}</p>
                        <p className="text-sm text-neon-purple/80">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute -z-10 inset-0 bg-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;