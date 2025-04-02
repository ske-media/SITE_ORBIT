import React from 'react';

interface FAQSectionProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

const FAQSection: React.FC<FAQSectionProps> = ({ forwardedRef }) => {
  return (
    <section ref={forwardedRef} className="py-20">
      <div className="futuristic-container">
        <h2 className="text-3xl font-bold text-gradient-purple text-center mb-4">
          Questions Fréquentes
        </h2>
        <p className="text-center text-surface-300 mb-12">
          [Contenu temporaire : FAQ en accordéon]
        </p>
      </div>
    </section>
  );
};

export default FAQSection;