import React from 'react';

interface FormulasSectionProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

const FormulasSection: React.FC<FormulasSectionProps> = ({ forwardedRef }) => {
  return (
    <section ref={forwardedRef} className="py-20">
      <div className="futuristic-container">
        <h2 className="text-3xl font-bold text-gradient-purple text-center mb-4">
          Les Formules : Base + Modules
        </h2>
        <p className="text-center text-surface-300">
          [Contenu temporaire : description de la base commune et des modules premium]
        </p>
      </div>
    </section>
  );
};

export default FormulasSection;