import React, { useCallback, useEffect, useState } from 'react';
import Particles from 'react-particles';
import type { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className }) => {
  const [isReady, setIsReady] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  // Initialize with a delay to prevent performance issues during initial page load
  useEffect(() => {
    try {
      // Check if running in browser environment with required APIs
      if (typeof window !== 'undefined' && window.document && window.requestAnimationFrame) {
        const timer = setTimeout(() => setIsReady(true), 1000);
        return () => clearTimeout(timer);
      } else {
        // Not in browser or missing required APIs
        setIsSupported(false);
      }
    } catch (e) {
      console.error("Error initializing particles:", e);
      setIsSupported(false);
    }
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      await loadSlim(engine);
    } catch (e) {
      console.error("Error loading particles:", e);
      setIsSupported(false);
    }
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Container loaded, animation will start
  }, []);

  // Fallback component when particles are not supported
  if (!isSupported) {
    return (
      <div className={`${className || ''} bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900 opacity-50`} />
    );
  }

  if (!isReady) return null;

  return (
    <Particles
      id="tsparticles"
      className={`${className || ''}`}
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 30,
        particles: {
          color: {
            value: "#b026ff",
          },
          links: {
            color: "#b026ff",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 30,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;