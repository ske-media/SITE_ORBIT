import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, Variants } from 'framer-motion';

/*
===============================================================================
  TYPES ET DONNÉES
===============================================================================
*/
interface Value {
  title: string;
  icon: string; // Exemple : un emoji ou une icône SVG inline
}

const values: Value[] = [
  { title: 'Créativité', icon: '🎨' },
  { title: 'Fiabilité', icon: '🔒' },
  { title: 'Accessibilité', icon: '🌍' },
  { title: 'Réactivité', icon: '⚡' },
  { title: 'Innovation', icon: '🚀' },
  { title: 'Honnêteté', icon: '❤️' },
];

/*
===============================================================================
  PARAMÈTRES DE DIMENSIONNEMENT ET POSITIONNEMENT
===============================================================================
*/
const containerSize = 800; // Taille globale du conteneur (en pixels)
const center = containerSize / 2; // Centre du conteneur
const baseRadius = 300; // Rayon de base pour la position statique des cartes
const cardSize = 150; // Taille de chaque carte
const oscillation = 80; // Amplitude maximale d'oscillation (en pixels)

/*
===============================================================================
  FONCTION DE CALCUL DE LA POSITION INITIALE
===============================================================================
*/
const computePosition = (index: number, total: number, radius: number, center: number) => {
  // Répartition uniforme sur le cercle, en commençant par le haut (-90°)
  const angleDeg = (360 / total) * index - 90;
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = center + radius * Math.cos(angleRad);
  const y = center + radius * Math.sin(angleRad);
  return { x, y, initialAngle: angleDeg };
};

/*
===============================================================================
  COMPOSANT ORBITING VALUE
  Chaque carte de valeur est positionnée initialement sur le cercle autour du
  logo central, puis son mouvement est animé de façon autonome selon un angle qui
  augmente continuellement. Le contenu de la carte est compensé (rotation inverse)
  pour rester lisible.
===============================================================================
*/
interface OrbitingValueProps {
  value: Value;
  index: number;
  total: number;
  delay: number;
}

const OrbitingValue: React.FC<OrbitingValueProps> = ({ value, index, total, delay }) => {
  // Position initiale et angle de départ pour cette carte
  const { x: initialX, y: initialY, initialAngle } = computePosition(index, total, baseRadius, center);
  
  // Crée une motion value pour l'angle, initialisé à l'angle de départ
  const angle = useMotionValue(initialAngle);

  // Anime l'angle de façon continue de initialAngle à initialAngle + 360°
  useEffect(() => {
    const controls = animate(angle, initialAngle + 360, {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
      delay: delay,
    });
    return () => controls.stop();
  }, [angle, initialAngle, delay]);

  // Calcul des décalages en x et y basés sur l'angle courant pour un mouvement oscillatoire
  const offsetX = useTransform(angle, (a) => {
    const rad = (a * Math.PI) / 180;
    return oscillation * Math.cos(rad);
  });
  const offsetY = useTransform(angle, (a) => {
    const rad = (a * Math.PI) / 180;
    return oscillation * Math.sin(rad);
  });
  // Pour que le contenu reste droit, on applique une rotation inverse égale à -angle
  const inverseRotation = useTransform(angle, (a) => -a);

  return (
    <motion.div
      className="absolute"
      style={{
        width: cardSize,
        height: cardSize,
        left: initialX,
        top: initialY,
        x: offsetX,
        y: offsetY,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.div
        className="bg-dark-800 rounded-xl border border-neon-purple/30 shadow-neon flex flex-col items-center justify-center transition-all duration-300"
        style={{ width: '100%', height: '100%', rotate: inverseRotation }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <span className="text-4xl mb-2">{value.icon}</span>
          <h3 className="text-xl font-bold text-gradient-purple">{value.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

/*
===============================================================================
  COMPOSANT NOSVALEURSSECTION
  Cette section présente le titre et un sous-texte, puis affiche un conteneur
  statique de 800x800 pixels où le logo central fixe est positionné, et autour
  duquel chaque carte de valeur oscille indépendamment sur une trajectoire ample.
===============================================================================
*/
const NosValeursSection: React.FC = () => {
  return (
    <section className="relative py-24 min-h-[80vh] flex flex-col items-center justify-center">
      {/* En-tête de la section */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <h2 className="font-display font-bold text-5xl text-gradient-purple leading-tight mb-6">
          Nos Valeurs
        </h2>
        <p className="text-surface-300 text-xl max-w-2xl mx-auto leading-relaxed">
          Découvrez les principes qui inspirent notre action et façonnent notre vision pour un avenir digital.
        </p>
      </div>

      {/* Conteneur principal pour l'animation orbitale */}
      <div className="relative mx-auto" style={{ width: containerSize, height: containerSize }}>
        {/* Fond spatial subtil */}
        <div className="absolute inset-0 -z-10">
          <svg width={containerSize} height={containerSize}>
            <defs>
              <radialGradient id="starsGradient" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#starsGradient)" />
          </svg>
        </div>

        {/* Logo central fixe */}
        <div
          className="absolute z-20 rounded-full overflow-hidden shadow-neon flex items-center justify-center"
          style={{
            width: 120,
            height: 120,
            left: center,
            top: center,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img
            src="https://i.imgur.com/aM3st2Q.png"
            alt="Logo Orbit"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Affichage des cartes de valeurs */}
        {values.map((val, index) => (
          <OrbitingValue
            key={index}
            value={val}
            index={index}
            total={values.length}
            delay={index * 0.2}
          />
        ))}
      </div>

      {/* Texte additionnel */}
      <div className="max-w-3xl mx-auto px-4 mt-12 text-center">
        <p className="text-surface-300 text-xl leading-relaxed">
          Nos valeurs incarnent notre engagement pour l'excellence, l'innovation et la confiance. Elles nous guident dans chaque projet et inspirent notre démarche créative.
        </p>
      </div>
    </section>
  );
};

export default NosValeursSection;