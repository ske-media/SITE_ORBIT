// src/pages/TestBackgroundPage.tsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const NUM_STARS = 5000;

const StarrySky: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: NUM_STARS }).map((_, index) => ({
      id: index,
      top: Math.random() * 100, // en pourcentage
      left: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5, // entre 0.5 et 2px
      duration: Math.random() * 3 + 2, // durée de scintillement
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: star.size,
            height: star.size,
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const ShootingStar: React.FC<{
  startX: number; // en pourcentage
  startY: number; // en pourcentage
  delay: number;
  duration: number;
}> = ({ startX, startY, delay, duration }) => {
  return (
    <motion.div
      className="absolute bg-white rounded-full"
      style={{
        width: '2px',
        height: '100px',
        top: `${startY}%`,
        left: `${startX}%`,
        transform: 'rotate(45deg)',
      }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ opacity: [0, 1, 0], x: [0, 300], y: [0, 300] }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

const TestBackgroundPage: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-dark-900 flex items-center justify-center">
      <StarrySky />
      <ShootingStar startX={80} startY={20} delay={2} duration={1.5} />
      <ShootingStar startX={20} startY={70} delay={3} duration={1.8} />
    </div>
  );
};

export default TestBackgroundPage;