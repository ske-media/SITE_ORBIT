import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, Variants } from 'framer-motion';

/* ============================================================================
   Données et paramètres
============================================================================ */

interface Value {
  title: string;
  icon: string;
}

const values: Value[] = [
  { title: 'Créativité', icon: '🎨' },
  { title: 'Fiabilité', icon: '🔒' },
  { title: 'Accessibilité', icon: '🌍' },
  { title: 'Réactivité', icon: '⚡' },
  { title: 'Innovation', icon: '🚀' },
  { title: 'Honnêteté', icon: '❤️' },
];

// Configuration responsive
const desktopContainerSize = 800;
const mobileContainerSize = 360;
const cardSize = 120;
const baseRadius = 140;
const oscillation = 50;

/* ============================================================================
   Orbiting Card (interne)
============================================================================ */

const OrbitingCard: React.FC<{
  value: Value;
  index: number;
  total: number;
  delay: number;
  radius: number;
  center: number;
}> = ({ value, index, total, delay, radius, center }) => {
  const angleInitial = (360 / total) * index - 90;
  const angle = useMotionValue(angleInitial);

  useEffect(() => {
    const controls = animate(angle, angleInitial + 360, {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
      delay: delay,
    });
    return () => controls.stop();
  }, [angle, angleInitial, delay]);

  const x = useTransform(angle, (a) => {
    const rad = (a * Math.PI) / 180;
    return radius * Math.cos(rad) + oscillation * Math.cos(rad);
  });

  const y = useTransform(angle, (a) => {
    const rad = (a * Math.PI) / 180;
    return radius * Math.sin(rad) + oscillation * Math.sin(rad);
  });

  const rotateBack = useTransform(angle, (a) => -a);

  return (
    <motion.div
      className="absolute"
      style={{
        width: cardSize,
        height: cardSize,
        left: center,
        top: center,
        x,
        y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.div
        style={{ rotate: rotateBack }}
        className="bg-dark-800 rounded-xl border border-neon-purple/30 shadow-neon flex flex-col items-center justify-center p-4 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-3xl mb-1">{value.icon}</span>
        <h3 className="text-sm sm:text-base font-bold text-gradient-purple text-center">
          {value.title}
        </h3>
      </motion.div>
    </motion.div>
  );
};

/* ============================================================================
   Section principale
============================================================================ */

const NosValeursSection: React.FC = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const containerSize = isMobile ? mobileContainerSize : desktopContainerSize;
  const radius = isMobile ? 100 : baseRadius;
  const center = containerSize / 2;

  return (
    <section className="relative py-24 flex flex-col items-center justify-center">
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-gradient-purple font-display mb-4">
          Nos Valeurs
        </h2>
        <p className="text-surface-300 max-w-2xl mx-auto text-base sm:text-xl leading-relaxed">
          Découvrez les principes qui inspirent notre action et façonnent notre vision pour un avenir digital.
        </p>
      </div>

      {/* Conteneur principal */}
      <div className="relative" style={{ width: containerSize, height: containerSize }}>
        {/* Fond radial subtil */}
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

        {/* Logo central */}
        <div
          className="absolute z-20 rounded-full overflow-hidden shadow-neon flex items-center justify-center"
          style={{
            width: 100,
            height: 100,
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

        {/* Cartes orbitantes */}
        {values.map((val, i) => (
          <OrbitingCard
            key={i}
            value={val}
            index={i}
            total={values.length}
            delay={i * 0.3}
            radius={radius}
            center={center}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-2xl text-center mt-12 px-4">
        <p className="text-surface-300 text-base sm:text-lg leading-relaxed">
          Nos valeurs incarnent notre engagement pour l'excellence, l'innovation et la confiance. Elles nous guident dans chaque projet et inspirent notre démarche créative.
        </p>
      </div>
    </section>
  );
};

export default NosValeursSection;
