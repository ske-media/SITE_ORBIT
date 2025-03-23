import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Button from '../ui/Button';

const PortfolioSection: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="futuristic-container">
        <div className="text-center mb-16">
          <h2 className="futuristic-subtitle mb-4 text-gradient-purple">Nos réalisations</h2>
          <p className="text-surface-300 max-w-2xl mx-auto">
            Des projets dont nous sommes fiers, pour des clients qui le sont tout autant.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              title: "E-commerce Premium",
              category: "Site de vente en ligne",
            },
            {
              image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              title: "Résidences Élégance",
              category: "Site immobilier",
            },
            {
              image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              title: "TaskFlow App",
              category: "Application de productivité",
            }
          ].map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
              className="group overflow-hidden rounded-2xl border border-neon-purple/20 hover:border-neon-purple/40 transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent flex items-end">
                  <div className="p-6 w-full transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-neon-purple transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-surface-300 flex items-center gap-1">
                      {project.category}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Button to="/creation-site-web#portfolio" variant="secondary">
            Voir tous nos projets <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;