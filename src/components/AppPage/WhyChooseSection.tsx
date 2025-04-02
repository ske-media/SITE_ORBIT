import React from 'react';

interface WhyChooseSectionProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ forwardedRef }) => {
  return (
    <section ref={forwardedRef} className="py-20">
      <div className="futuristic-container">
        <h2 className="text-3xl font-bold text-gradient-purple text-center mb-4">
          Pourquoi Choisir Agence Orbit ?
        </h2>
        <p className="text-center text-surface-300">
          [Contenu temporaire : 4 points clés avec icônes et courts textes]
        </p>
      </div>
    </section>
  );
};

export default WhyChooseSection;