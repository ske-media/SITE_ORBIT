import React from 'react';
import ReactorAnimation from './ReactorAnimation';

const MissionVisionSection: React.FC = () => {
  return (
    <section 
      className="relative w-full min-h-[80vh] flex items-center bg-dark-900 text-white overflow-hidden"
    >
      {/* Dégradé radial pour un fond plus sophistiqué */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(closest-corner at 20% 40%, rgba(47,115,255,0.1), transparent 80%)'
        }}
      />

      {/* Conteneur texte */}
      <div className="max-w-5xl mx-auto px-8 md:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gradient-purple leading-tight mb-6">
          Mission & Vision
        </h2>
        <p className="text-surface-300 text-lg md:text-xl max-w-2xl leading-relaxed">
          Nous propulsons votre transformation digitale en plaçant l'innovation 
          et l'humain au cœur de chaque projet. Notre mission est de vous accompagner 
          vers de nouveaux horizons, tandis que notre vision est de faire du numérique 
          un levier d’inspiration et de liberté pour toutes les entreprises.
        </p>
      </div>

      {/* Animation placée en bas à droite */}
      <div className="absolute bottom-0 right-0 mr-8 mb-8">
        <ReactorAnimation />
      </div>
    </section>
  );
};

export default MissionVisionSection;