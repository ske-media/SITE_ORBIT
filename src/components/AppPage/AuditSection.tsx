import React from 'react';

interface AuditSectionProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

const AuditSection: React.FC<AuditSectionProps> = ({ forwardedRef }) => {
  return (
    <section ref={forwardedRef} className="py-20">
      <div className="futuristic-container">
        <h2 className="text-3xl font-bold text-gradient-purple text-center mb-4">
          Audit Digital Orbit – 1’799 CHF (Déductible)
        </h2>
        <p className="text-center text-surface-300">
          [Contenu temporaire : détails de l’audit et de ses avantages]
        </p>
      </div>
    </section>
  );
};

export default AuditSection;