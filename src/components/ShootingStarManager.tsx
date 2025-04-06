// src/components/ShootingStarManager.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type StarParams = {
  id: number;
  startX: number; // en pourcentage
  startY: number; // en pourcentage
  dx: number;     // déplacement horizontal (pixels)
  dy: number;     // déplacement vertical (pixels)
  duration: number;
  delay: number;
  rotation: number;
};

type ShootingStarProps = {
  star: StarParams;
  onComplete: (id: number) => void;
};

const ShootingStar: React.FC<ShootingStarProps> = ({ star, onComplete }) => {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: '3px', // Traînée fine
        height: '120px', // Longueur de la traînée
        top: `${star.startY}%`,
        left: `${star.startX}%`,
        transform: `rotate(${star.rotation}deg)`,
        background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))',
      }}
      initial={{ opacity: 1, x: 0, y: 0 }}
      animate={{ opacity: [1, 0], x: [0, star.dx], y: [0, star.dy] }}
      transition={{
        duration: star.duration,
        delay: star.delay,
        ease: 'linear',
      }}
      onAnimationComplete={() => onComplete(star.id)}
    />
  );
};

const ShootingStarManager: React.FC = () => {
  const [stars, setStars] = useState<StarParams[]>([]);
  const nextIdRef = useRef(0);

  const addStar = () => {
    const id = nextIdRef.current++;
    // Choix aléatoire d'un bord de départ
    const edges = ['top', 'bottom', 'left', 'right'];
    const chosenEdge = edges[Math.floor(Math.random() * edges.length)];

    let startX = 0;
    let startY = 0;
    if (chosenEdge === 'top') {
      startX = Math.random() * 100;
      startY = 0;
    } else if (chosenEdge === 'bottom') {
      startX = Math.random() * 100;
      startY = 100;
    } else if (chosenEdge === 'left') {
      startX = 0;
      startY = Math.random() * 100;
    } else if (chosenEdge === 'right') {
      startX = 100;
      startY = Math.random() * 100;
    }

    // Pour obtenir une trajectoire longue, choisissez une distance entre 400 et 800 pixels.
    const distance = Math.random() * 400 + 400;

    // Définir un angle dépendant du bord pour que l'étoile se dirige vers l'intérieur
    let angle = 0;
    if (chosenEdge === 'top') {
      angle = (Math.random() * 40 + 70) * (Math.PI / 180); // 70° à 110°
    } else if (chosenEdge === 'bottom') {
      angle = (Math.random() * 40 + 250) * (Math.PI / 180); // 250° à 290°
    } else if (chosenEdge === 'left') {
      angle = (Math.random() * 40 - 20) * (Math.PI / 180); // -20° à 20°
    } else if (chosenEdge === 'right') {
      angle = (Math.random() * 40 + 160) * (Math.PI / 180); // 160° à 200°
    }

    const dx = distance * Math.cos(angle);
    const dy = distance * Math.sin(angle);
    const duration = Math.random() * 0.4 + 0.6; // entre 0.6 et 1.0 secondes
    const delay = 0; // On gère le délai via le manager
    const rotation = (angle * 180) / Math.PI;
    const newStar: StarParams = { id, startX, startY, dx, dy, duration, delay, rotation };
    setStars(prev => [...prev, newStar]);
  };

  // Crée une nouvelle étoile filante toutes les 2 à 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      addStar();
    }, Math.random() * 1000 + 2000); // intervalle entre 2000 et 3000ms
    return () => clearInterval(interval);
  }, []);

  const handleComplete = (id: number) => {
    setStars(prev => prev.filter(star => star.id !== id));
  };

  return (
    <>
      {stars.map(star => (
        <ShootingStar key={star.id} star={star} onComplete={handleComplete} />
      ))}
    </>
  );
};

export default ShootingStarManager;