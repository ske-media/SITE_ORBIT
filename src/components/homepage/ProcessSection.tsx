import React from 'react';
import { useInView } from 'framer-motion';
import { Rocket, Activity, Cpu, Globe } from 'lucide-react';
import ProcessFlow from '../ProcessFlow';

interface ProcessSectionProps {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ forwardedRef }) => {
  const processInView = useInView(forwardedRef, { once: true, amount: 0.2 });

  const processSteps = [
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "1. Consultation Gratuite",
      description: "Discussion approfondie pour comprendre votre vision, vos objectifs et votre public cible."
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "2. Design & Prototype",
      description: "Création de maquettes interactives pour vous donner un aperçu concret de votre futur site."
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "3. Développement",
      description: "Codage soigné avec les technologies les plus récentes pour un site robuste et performant."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "4. Lancement & Optimisation",
      description: "Publication de votre site et ajustements pour maximiser son efficacité et sa visibilité."
    }
  ];

  return (
    <section ref={forwardedRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-purple/5"></div>
      <div className="futuristic-container relative">
        <div className="text-center mb-16">
          <h2 className="futuristic-subtitle mb-4 text-gradient-purple">Notre Process</h2>
          <p className="text-surface-300 max-w-2xl mx-auto">
            Une approche structurée pour transformer votre vision en réalité digitale
          </p>
        </div>
        
        <ProcessFlow steps={processSteps} />
      </div>
    </section>
  );
};

export default ProcessSection;