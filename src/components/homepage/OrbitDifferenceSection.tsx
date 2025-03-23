import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const OrbitDifferenceSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const orbitNeedleControls = useAnimation();
  const agenciesNeedleControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      async function animateOrbitNeedle() {
        // Démarrage à -90° pour Orbit (0%)
        await orbitNeedleControls.start({ rotate: -90, transition: { duration: 0 } });
        const steps = 6;
        const startAngle = -90;
        const endAngle = 90; // 100% = 90°
        const angleStep = (endAngle - startAngle) / steps;
        for (let i = 1; i <= steps; i++) {
          const targetAngle = startAngle + i * angleStep;
          await orbitNeedleControls.start({ rotate: targetAngle, transition: { duration: 0.4 } });
          // Effet de pulsation (overshoot)
          await orbitNeedleControls.start({ rotate: targetAngle + 5, transition: { duration: 0.1 } });
          await orbitNeedleControls.start({ rotate: targetAngle, transition: { duration: 0.1 } });
        }
      }
      animateOrbitNeedle();

      // Pour les agences, l'aiguille est fixée à environ 40% (-18°) avec une oscillation légère
      agenciesNeedleControls.start({ rotate: -18, transition: { duration: 0 } });
      agenciesNeedleControls.start({
        rotate: [-18, -15, -18],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      });
    }
  }, [isInView, orbitNeedleControls, agenciesNeedleControls]);

  // Génère les marques de graduation (ticks) sur le cadran
  const renderTicks = () => {
    const ticks = [];
    const centerX = 100;
    const centerY = 180;
    const innerRadius = 70;
    const outerRadius = 90;
    for (let angle = -90; angle <= 90; angle += 30) {
      const rad = (angle * Math.PI) / 180;
      const x1 = centerX + innerRadius * Math.cos(rad);
      const y1 = centerY + innerRadius * Math.sin(rad);
      const x2 = centerX + outerRadius * Math.cos(rad);
      const y2 = centerY + outerRadius * Math.sin(rad);
      ticks.push(
        <line
          key={angle}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(176,38,255,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      );
    }
    return ticks;
  };

  const comparisonData = [
    { label: "Délai<br/>Première version de votre site", orbit: "7 jours", agencies: "4-8 semaines" },
    { label: "Paiement<br/>Conditions de règlement", orbit: "Après satisfaction", agencies: "50% d'acompte" },
    { label: "Retouches<br/>Modifications de design", orbit: "Illimitées", agencies: "2-3 incluses" },
    { label: "Accompagnement<br/>Suivi et conseil", orbit: "Personnalisé", agencies: "Standard" },
    { label: "Engagement<br/>Durée d’engagement", orbit: "Aucun", agencies: "1 an min." },
    { label: "Support<br/>Disponibilité", orbit: "7j/7", agencies: "Heures de bureau" },
  ];

  return (
    <section ref={sectionRef} className="futuristic-section relative overflow-hidden">
      {/* Arrière-plans spatiaux */}
      <div className="absolute inset-0 bg-dark-900/30"></div>
      <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 rounded-full bg-neon-purple/20 blur-[80px] opacity-20"></div>
      <div className="absolute bottom-1/4 right-1/3 w-1/3 h-1/3 rounded-full bg-neon-blue/20 blur-[60px] opacity-20"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
      </div>
      
      <div className="futuristic-container relative z-10">
        {/* Titres et sous-titres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-purple">
            Pourquoi Orbit est différent
          </h2>
          <p className="text-lg text-surface-300 max-w-3xl mx-auto">
            Découvrez ce qui nous distingue des agences traditionnelles
          </p>
        </motion.div>
        
        {/* Cadrans/jauges */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Cadran Orbit */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <motion.svg width="220" height="220" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="orbitDialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b026ff" />
                    <stop offset="100%" stopColor="#2f73ff" />
                  </linearGradient>
                </defs>
                {/* Arc du cadran */}
                <path
                  d="M20 180 A80 80 0 0 1 180 180"
                  fill="none"
                  stroke="url(#orbitDialGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Marques */}
                {renderTicks()}
                {/* Aiguille animée */}
                <motion.line
                  x1="100"
                  y1="180"
                  x2="100"
                  y2="120"
                  stroke="#b026ff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ rotate: -90, originX: "100px", originY: "180px" }}
                  animate={orbitNeedleControls}
                />
              </motion.svg>
            </div>
            <p className="mt-4 text-xl font-bold">Orbit</p>
          </div>
          
          {/* Cadran Agences */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <motion.svg width="220" height="220" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="agenciesDialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2f73ff" />
                    <stop offset="100%" stopColor="#b026ff" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 180 A80 80 0 0 1 180 180"
                  fill="none"
                  stroke="url(#agenciesDialGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {renderTicks()}
                <motion.line
                  x1="100"
                  y1="180"
                  x2="100"
                  y2="120"
                  stroke="#2f73ff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ rotate: -18, originX: "100px", originY: "180px" }}
                  animate={agenciesNeedleControls}
                />
              </motion.svg>
            </div>
            <p className="mt-4 text-xl font-bold">Agences</p>
          </div>
        </div>
        
        {/* Tableau comparatif repensé en grille */}
        <div className="mt-12">
          <div className="grid grid-cols-3 gap-2 bg-gradient-to-t from-dark-950 to-dark-800 p-2">
            {/* En-tête */}
            <div className="p-4 text-center font-bold border-b border-white/20"></div>
            <div className="p-4 text-center font-bold border-b border-white/20">Orbit</div>
            <div className="p-4 text-center font-bold border-b border-white/20">Agences</div>
            {comparisonData.map((item, index) => (
              <React.Fragment key={index}>
                <div className="p-4 text-center border border-white/10 bg-dark-900">
                  <span className="font-bold" dangerouslySetInnerHTML={{ __html: item.label }} />
                </div>
                <div className="p-4 text-center border border-white/10 bg-dark-900 text-green-300 font-medium">
                  {item.orbit}
                </div>
                <div className="p-4 text-center border border-white/10 bg-dark-900 text-red-300 font-medium">
                  {item.agencies}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrbitDifferenceSection;
