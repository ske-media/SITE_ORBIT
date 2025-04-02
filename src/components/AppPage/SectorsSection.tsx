import React from 'react';

interface SectorsSectionProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

const SectorsSection: React.FC<SectorsSectionProps> = ({ forwardedRef }) => {
  return (
    <section ref={forwardedRef} className="py-20">
      <div className="futuristic-container">
        <h2 className="text-3xl font-bold text-gradient-purple text-center mb-4">
          Un service adapté à tous les secteurs
        </h2>
        <p className="text-center text-surface-300">
          [Contenu temporaire : vignettes ou liste des secteurs concernés]
        </p>
      </div>
    </section>
  );
};

export default SectorsSection;