import React from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '../AnimatedCounter';
import TechCircuit from '../TechCircuit';

const StatsSection: React.FC<{ forwardedRef: React.RefObject<HTMLDivElement> }> = ({ forwardedRef }) => {
  const statsInView = useInView(forwardedRef, { once: true, amount: 0.3 });

  return (
    <section ref={forwardedRef} className="py-20 relative">
      {/* Gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 to-transparent"></div>
      <div className="scanning-line-reverse"></div>
      
      <div className="futuristic-container relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { number: 98, text: "de clients satisfaits", suffix: "%" },
            { number: 7, text: "pour la première version", suffix: " jours" },
            { number: 0, text: "si vous n'êtes pas satisfait", suffix: "€" }
          ].map((stat, index) => (
            <AnimatePresence key={index}>
              {statsInView && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className="futuristic-card text-center"
                >
                  <AnimatedCounter 
                    end={stat.number} 
                    suffix={stat.suffix}
                  />
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