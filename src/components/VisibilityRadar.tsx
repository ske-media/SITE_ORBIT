import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Search, Zap, BarChart, Globe, Users, CheckCircle } from 'lucide-react';

interface VisibilityRadarProps {
  className?: string;
}

const VisibilityRadar: React.FC<VisibilityRadarProps> = ({ className = '' }) => {
  const radarRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeBenefit, setActiveBenefit] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Radar ping animation setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (radarRef.current) {
      observer.observe(radarRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // GSAP animations for radar elements
  useEffect(() => {
    if (!isInView || !svgRef.current) return;
    
    // Setup radar scan animation
    const scanLine = svgRef.current.querySelector('.scan-line');
    const pingElements = svgRef.current.querySelectorAll('.radar-ping');
    const gridRings = svgRef.current.querySelectorAll('.grid-ring');
    const gridLines = svgRef.current.querySelectorAll('.grid-line');
    
    // Initial animations
    gsap.set(scanLine, { rotation: 0, transformOrigin: 'center' });
    gsap.set(gridRings, { scale: 0, opacity: 0, transformOrigin: 'center' });
    gsap.set(gridLines, { opacity: 0 });
    gsap.set(pingElements, { scale: 0, opacity: 0 });
    
    // Create animation timeline
    const tl = gsap.timeline();
    
    // Animate grid rings appearing
    tl.to(gridRings, {
      scale: 1,
      opacity: 0.6,
      duration: 1.5,
      stagger: 0.2,
      ease: "power2.out"
    });
    
    // Animate grid lines appearing
    tl.to(gridLines, {
      opacity: 0.4,
      duration: 0.8,
      stagger: 0.1
    }, "-=1");
    
    // Create the continuous scan rotation
    gsap.to(scanLine, {
      rotation: 360,
      duration: 6,
      ease: "linear",
      repeat: -1
    });
    
    // Setup ping animations with random intervals
    pingElements.forEach((ping, index) => {
      const randomDelay = 1 + Math.random() * 3;
      
      gsap.to(ping, {
        scale: 1,
        opacity: 0.8,
        duration: 0.4,
        delay: randomDelay,
        onComplete: () => {
          gsap.to(ping, {
            scale: 1.5,
            opacity: 0,
            duration: 0.8,
            onComplete: function() {
              // Reset and repeat with random delay
              gsap.set(ping, { scale: 0, opacity: 0 });
              this.repeat(1);
              this.delay(2 + Math.random() * 4);
            }
          });
        }
      });
    });
    
    return () => {
      // Cleanup animations
      gsap.killTweensOf(scanLine);
      gsap.killTweensOf(pingElements);
      gsap.killTweensOf(gridRings);
      gsap.killTweensOf(gridLines);
    };
  }, [isInView]);
  
  // Benefits data
  const benefits = [
  {
    id: 1,
    title: "Gagner en notoriété",
    description: "Augmentez votre visibilité et faites connaître votre marque au-delà de votre cercle actuel.",
    icon: <Globe className="h-5 w-5" />,
    color: "#b026ff",
    position: { top: "10%", left: "85%" }
  },
  {
    id: 2,
    title: "Attirer des prospects qualifiés",
    description: "Captez l'attention de clients potentiels réellement intéressés par vos produits ou services.",
    icon: <Users className="h-5 w-5" />,
    color: "#2f73ff",
    position: { top: "30%", left: "88%" }
  },
  {
    id: 3,
    title: "Se démarquer de la concurrence",
    description: "Positionnez-vous comme leader dans votre secteur grâce à une présence digitale distinctive.",
    icon: <BarChart className="h-5 w-5" />,
    color: "#05d9e8",
    position: { top: "70%", left: "85%" }
  },
  {
    id: 4,
    title: "Être présent là où vos clients cherchent",
    description: "Soyez visible exactement au moment où vos clients potentiels ont besoin de vos services.",
    icon: <Search className="h-5 w-5" />,
    color: "#36f9c5",
    position: { top: "88%", left: "50%" }
  }
];
  
  // Handle benefit hover
  const handleBenefitHover = (benefitId: number | null) => {
    setActiveBenefit(benefitId);
  };

  return (
    <div ref={radarRef} className={`${className} relative flex flex-col md:flex-row items-center`}>
      {/* Radar visualization - left side for medium screens and up */}
      <div className="w-full md:w-1/2 h-[400px] md:h-[500px] relative">
        <svg 
          ref={svgRef}
          viewBox="0 0 400 400" 
          className="w-full h-full"
        >
          {/* Background gradient */}
          <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="rgba(176, 38, 255, 0.15)" />
              <stop offset="70%" stopColor="rgba(176, 38, 255, 0.05)" />
              <stop offset="100%" stopColor="rgba(176, 38, 255, 0)" />
            </radialGradient>
          </defs>
          
          {/* Background circle */}
          <circle cx="200" cy="200" r="180" fill="url(#radarGradient)" />
          
          {/* Radar grid rings */}
          <circle className="grid-ring" cx="200" cy="200" r="180" fill="none" stroke="rgba(176, 38, 255, 0.3)" strokeWidth="1" />
          <circle className="grid-ring" cx="200" cy="200" r="135" fill="none" stroke="rgba(176, 38, 255, 0.25)" strokeWidth="1" />
          <circle className="grid-ring" cx="200" cy="200" r="90" fill="none" stroke="rgba(176, 38, 255, 0.2)" strokeWidth="1" />
          <circle className="grid-ring" cx="200" cy="200" r="45" fill="none" stroke="rgba(176, 38, 255, 0.15)" strokeWidth="1" />
          
          {/* Radar grid lines */}
          <line className="grid-line" x1="20" y1="200" x2="380" y2="200" stroke="rgba(176, 38, 255, 0.2)" strokeWidth="1" />
          <line className="grid-line" x1="200" y1="20" x2="200" y2="380" stroke="rgba(176, 38, 255, 0.2)" strokeWidth="1" />
          <line className="grid-line" x1="55" y1="55" x2="345" y2="345" stroke="rgba(176, 38, 255, 0.15)" strokeWidth="1" />
          <line className="grid-line" x1="55" y1="345" x2="345" y2="55" stroke="rgba(176, 38, 255, 0.15)" strokeWidth="1" />
          
          {/* Scanning line */}
          <line 
            className="scan-line" 
            x1="200" y1="200" 
            x2="380" y2="200" 
            stroke="rgba(176, 38, 255, 0.8)" 
            strokeWidth="2"
          />
          
          {/* Center point */}
          <circle cx="200" cy="200" r="8" fill="rgba(176, 38, 255, 1)" className="animate-pulse-slow" />
          <circle cx="200" cy="200" r="15" fill="none" stroke="rgba(176, 38, 255, 0.6)" strokeWidth="1" className="animate-pulse-slow" />
          
          {/* Radar pings - positioned at strategic points */}
          <circle className="radar-ping" cx="260" cy="120" r="5" fill="rgba(176, 38, 255, 0.8)" />
          <circle className="radar-ping" cx="150" cy="280" r="4" fill="rgba(47, 115, 255, 0.8)" />
          <circle className="radar-ping" cx="300" cy="220" r="6" fill="rgba(5, 217, 232, 0.8)" />
          <circle className="radar-ping" cx="100" cy="150" r="4" fill="rgba(54, 249, 197, 0.8)" />
          
          {/* Highlight active benefit with line if one is active */}
          {activeBenefit && (
            <line 
              x1="200" 
              y1="200" 
              x2={benefits.find(b => b.id === activeBenefit)?.id === 1 ? "350" : 
                  benefits.find(b => b.id === activeBenefit)?.id === 2 ? "350" :
                  benefits.find(b => b.id === activeBenefit)?.id === 3 ? "350" : "200"}
              y2={benefits.find(b => b.id === activeBenefit)?.id === 1 ? "50" : 
                 benefits.find(b => b.id === activeBenefit)?.id === 2 ? "150" :
                 benefits.find(b => b.id === activeBenefit)?.id === 3 ? "300" : "350"}
              stroke={benefits.find(b => b.id === activeBenefit)?.color || "rgba(176, 38, 255, 0.8)"}
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}
        </svg>
        
        {/* Small detailed descriptions that appear on hover around the radar */}
        <div className="absolute inset-0">
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              className="absolute hidden md:block" 
              style={{ 
                top: benefit.position.top, 
                left: benefit.position.left,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                scale: isInView ? 1 : 0.8,
                transition: { delay: 0.5 + benefit.id * 0.2 }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div 
                className={`p-2 rounded-lg transition-all cursor-pointer ${activeBenefit === benefit.id ? 'bg-dark-200/80 shadow-neon' : 'bg-dark-300/50 hover:bg-dark-200/80'}`}
                style={{ borderLeft: `3px solid ${benefit.color}` }}
                onMouseEnter={() => handleBenefitHover(benefit.id)}
                onMouseLeave={() => handleBenefitHover(null)}
              >
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <div className="p-1.5 rounded-full" style={{ backgroundColor: `${benefit.color}30` }}>
                    {benefit.icon}
                  </div>
                  <span>{benefit.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Content - right side for medium screens and up */}
      <div className="w-full md:w-1/2 px-4 md:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-purple">
            Être visible, c'est exister.
          </h2>
          
          <p className="text-lg text-surface-300 mb-8">
            Dans un monde ultra-connecté, votre présence en ligne n'est plus optionnelle — 
            c'est un véritable levier stratégique pour votre entreprise.
          </p>
          
          {/* Benefits for mobile view */}
          <div className="md:hidden space-y-4 mb-6">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * benefit.id }}
                className="flex items-start gap-3 p-3 rounded-lg bg-dark-300/50 border-l-4"
                style={{ borderLeftColor: benefit.color }}
              >
                <div className="p-1.5 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: `${benefit.color}30` }}>
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-medium mb-1">{benefit.title}</h3>
                  <p className="text-sm text-surface-400">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Desktop view - description of active benefit or default message */}
          <div className="hidden md:block h-[160px] mb-6">
            <AnimatePresence mode="wait">
              {activeBenefit ? (
                <motion.div
                  key={`benefit-${activeBenefit}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-dark-300/70 rounded-xl border-l-4"
                  style={{ borderLeftColor: benefits.find(b => b.id === activeBenefit)?.color || '#b026ff' }}
                >
                  <h3 className="font-medium text-lg mb-2">
                    {benefits.find(b => b.id === activeBenefit)?.title}
                  </h3>
                  <p className="text-surface-300">
                    {benefits.find(b => b.id === activeBenefit)?.description}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="default-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-dark-300/30 rounded-xl flex items-center h-full"
                >
                  <p className="text-surface-400 italic">
                    Passez votre souris sur les points du radar pour découvrir les bénéfices d'une présence en ligne optimisée...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-dark-200/50 p-6 rounded-xl border border-neon-purple/20">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-neon-purple/10 rounded-full flex-shrink-0 mt-1">
                  <CheckCircle className="h-6 w-6 text-neon-purple" />
                </div>
                <div>
                  <h3 className="font-medium text-neon-purple mb-1">Notre expertise à votre service</h3>
                  <p className="text-surface-300 mb-4">
                    Orbit analyse votre positionnement actuel et développe une stratégie digitale sur mesure pour maximiser votre visibilité et votre impact.
                  </p>
                  <button 
                    className="inline-flex items-center gap-2 bg-neon-purple px-6 py-2.5 rounded-full hover:bg-neon-purple/90 transition-colors text-white"
                    onClick={() => window.location.href = '/contact'}
                  >
                    <Zap className="h-4 w-4" />
                    <span>Demander un audit gratuit</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VisibilityRadar;