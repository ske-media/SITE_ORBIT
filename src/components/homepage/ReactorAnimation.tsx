import React from 'react';
import { motion, Variants } from 'framer-motion';

/**
 * Un composant ReactorAnimation plus élaboré, combinant :
 * 1) Un anneau externe en rotation
 * 2) Des arcs (arcs swirl) qui tournent autour du centre
 * 3) Un pulsar central avec effet de glow
 * 4) Des particules lumineuses autour
 */
const ReactorAnimation: React.FC = () => {
  // --- CONFIGURATION DES ARCS (swirls) ---
  // On génère plusieurs arcs, chacun aura un angle, un décalage, etc.
  const arcs = [
    { size: 240, strokeWidth: 8, rotate: 0, delay: 0 },
    { size: 200, strokeWidth: 6, rotate: 45, delay: 0.5 },
    { size: 160, strokeWidth: 4, rotate: 90, delay: 1.0 },
  ];

  // --- CONFIGURATION DES PARTICULES ---
  const particles = [
    { top: '10%', left: '70%', delay: 0.3 },
    { top: '80%', left: '80%', delay: 0.6 },
    { top: '60%', left: '15%', delay: 0.9 },
    { top: '20%', left: '20%', delay: 1.2 },
    { top: '50%', left: '90%', delay: 1.5 },
    { top: '85%', left: '40%', delay: 1.8 },
  ];

  // --- VARIANTS FRAMER MOTION ---

  // Variants pour l'anneau externe
  const outerRingVariants: Variants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  // Variants pour le centre (pulsation)
  const coreVariants: Variants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.9, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Arc swirl : on le fait tourner sur lui-même
  const arcVariants: Variants = {
    animate: (custom: { rotate: number; delay: number }) => ({
      rotate: [custom.rotate, custom.rotate + 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
        delay: custom.delay,
      },
    }),
  };

  // Particules : on les fait pulser + disparaitre
  const particleVariants: Variants = {
    animate: (custom: { delay: number }) => ({
      scale: [0, 1.5, 0],
      opacity: [1, 0.5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: custom.delay,
      },
    }),
  };

  return (
    <div className="relative" style={{ width: 300, height: 300 }}>
      {/* Anneau externe rotatif */}
      <motion.div
        className="absolute rounded-full border-4 border-neon-purple"
        style={{ width: 300, height: 300 }}
        variants={outerRingVariants}
        animate="animate"
      />

      {/* Arcs swirl */}
      {arcs.map((arc, i) => (
        <motion.svg
          key={i}
          custom={{ rotate: arc.rotate, delay: arc.delay }}
          variants={arcVariants}
          animate="animate"
          width={arc.size}
          height={arc.size}
          viewBox="0 0 100 100"
          className="absolute"
          style={{
            top: (300 - arc.size) / 2,
            left: (300 - arc.size) / 2,
          }}
        >
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#b026ff"
            strokeWidth={arc.strokeWidth}
            strokeOpacity="0.7"
            strokeDasharray="30 40"
          />
        </motion.svg>
      ))}

      {/* Coeur pulsant */}
      <motion.div
        className="absolute rounded-full bg-[#b026ff]"
        style={{
          width: 60,
          height: 60,
          top: 120,
          left: 120,
          boxShadow: '0 0 30px rgba(176,38,255,0.8)',
        }}
        variants={coreVariants}
        animate="animate"
      />

      {/* Particules lumineuses */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          custom={{ delay: p.delay }}
          variants={particleVariants}
          animate="animate"
          className="absolute rounded-full bg-[#b026ff]"
          style={{
            width: 8,
            height: 8,
            top: p.top,
            left: p.left,
            boxShadow: '0 0 10px rgba(176,38,255,0.8)',
          }}
        />
      ))}
    </div>
  );
};

export default ReactorAnimation;