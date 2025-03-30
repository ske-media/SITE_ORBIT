// utils/useResponsiveOrbitConfig.ts
import { useEffect, useState } from 'react';

export const useResponsiveOrbitConfig = () => {
  const [config, setConfig] = useState({
    containerSize: 800,
    cardSize: 150,
    baseRadius: 300,
  });

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      if (width < 500) {
        setConfig({ containerSize: 350, cardSize: 90, baseRadius: 120 });
      } else if (width < 768) {
        setConfig({ containerSize: 500, cardSize: 110, baseRadius: 170 });
      } else if (width < 1024) {
        setConfig({ containerSize: 650, cardSize: 130, baseRadius: 230 });
      } else {
        setConfig({ containerSize: 800, cardSize: 150, baseRadius: 300 });
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return config;
};
