import React from 'react';

interface NextStepSectionProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

const NextStepSection: React.FC<NextStepSectionProps> = ({ forwardedRef }) => {
  return (
    <section ref={forwardedRef} className="py-20">
      <div className="futuristic-container">
        <h2 className="text-3xl font-bold text-gradient-purple text-center mb-4">
          Ne laissez plus la complexité freiner votre croissance
        </h2>
        <p className="text-center text-surface-300 mb-8">
          [Contenu temporaire : invitation à prendre contact ou à réserver un audit]
        </p>
      </div>
    </section>
  );
};

export default NextStepSection;