import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Rocket, Palette, Code, Globe } from 'lucide-react';
import gsap from 'gsap';

interface FutureTunnelProps {
  className?: string;
}

const FutureTunnel: React.FC<FutureTunnelProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Tunnel animation effects
  useEffect(() => {
    if (!tunnelRef.current) return;
    
    const tunnel = tunnelRef.current;
    const lines = tunnel.querySelectorAll('.tunnel-line');
    
    gsap.set(lines, { 
      scaleX: 0,
      opacity: 0 
    });
    
    gsap.to(lines, {
      scaleX: 1,
      opacity: 0.3,
      duration: 1.5,
      stagger: 0.1,
      ease: "power2.out"
    });
    
    // Create the continuous tunnel animation
    gsap.to(lines, {
      opacity: 0.1,
      duration: 2,
      stagger: {
        each: 0.1,
        repeat: -1,
        yoyo: true
      },
      ease: "power1.inOut"
    });
    
    return () => {
      gsap.killTweensOf(lines);
    };
  }, []);

  const steps = [
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Consultation Gratuite",
      description: "Embarquez pour une session stratégique où nous définissons ensemble la trajectoire parfaite pour votre projet digital.",
      bgClass: "bg-gradient-to-br from-neon-purple/20 to-transparent"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Design & Prototype",
      description: "Dans notre laboratoire créatif, nous donnons vie à vos idées à travers des maquettes interactives futuristes.",
      bgClass: "bg-gradient-to-br from-neon-blue/20 to-transparent"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Développement",
      description: "Nos ingénieurs transforment les concepts en réalité, codant chaque fonctionnalité avec précision et innovation.",
      bgClass: "bg-gradient-to-br from-neon-cyan/20 to-transparent"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Lancement & Optimisation",
      description: "Décollage imminent ! Votre site est mis en orbite, optimisé pour conquérir votre marché.",
      bgClass: "bg-gradient-to-br from-neon-green/20 to-transparent"
    }
  ];

  return (
    <div ref={containerRef} className={`${className} relative min-h-screen py-20 overflow-hidden`}>
      {/* Tunnel Effect Background */}
      <div 
        ref={tunnelRef}
        className="absolute inset-0 perspective-1000"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={`tunnel-line absolute left-1/2 top-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 border border-neon-purple/30 rounded-full transform-gpu`}
            style={{
              transform: `translateZ(${index * -100}px) scale(${1 - index * 0.1})`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="space-y-32 md:space-y-64">
          {steps.map((step, index) => {
            const isInView = useInView(containerRef, { once: true, amount: 0.2 });
            const delay = index * 0.2;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay }}
                className={`relative ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'} max-w-xl`}
              >
                <div 
                  className={`${step.bgClass} p-8 rounded-2xl border border-neon-purple/20 backdrop-blur-sm transform-gpu transition-transform duration-500 hover:scale-105`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-neon-purple/10 rounded-xl text-neon-purple">
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-surface-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Lines */}
                {index < steps.length - 1 && (
                  <div 
                    className={`hidden md:block absolute ${
                      index % 2 === 0 ? '-left-32' : '-right-32'
                    } top-1/2 w-32 h-px bg-gradient-to-r from-neon-purple/50 to-transparent`}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-dark-900 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </div>
  );
};

export default FutureTunnel;