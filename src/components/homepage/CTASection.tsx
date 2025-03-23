import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import Button from '../ui/Button';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleStartClick = () => {
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        action_category: 'engagement',
        action_label: 'start_project',
      });
    }
    navigate('/contact');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient effects */}
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute right-1/4 bottom-1/4 w-72 h-72 bg-neon-purple/15 rounded-full blur-[100px] -z-10"></div>
      <div className="scanning-line"></div>
      
      <div className="futuristic-container relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="futuristic-card-highlight text-center py-16 max-w-4xl mx-auto"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="futuristic-subtitle mb-6 text-gradient-purple">Votre projet mérite le meilleur</h2>
            <p className="text-xl text-surface-300 mb-8">
              Échangeons dès maintenant et créons ensemble votre succès digital.
            </p>
            <Button
              onClick={handleStartClick}
              size="lg"
              icon={<Rocket className="w-5 h-5" />}
              glowing
            >
              Obtenir un devis gratuit
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;