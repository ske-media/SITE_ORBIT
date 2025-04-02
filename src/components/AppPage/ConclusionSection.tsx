import React from 'react';

interface ConclusionSectionProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

const ConclusionSection: React.FC<ConclusionSectionProps> = ({ forwardedRef }) => {
  return (
    <section ref={forwardedRef} className="py-20">
      <div className="futuristic-container">
        <h2 className="text-3xl font-bold text-gradient-purple text-center mb-4">
          Mot de la Direction
        </h2>
        <p className="text-center text-surface-300">
          [Contenu temporaire : message final, signature ou concept pour conclure]
        </p>
      </div>
    </section>
  );
};

export default ConclusionSection;