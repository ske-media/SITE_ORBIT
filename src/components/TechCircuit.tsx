import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TechCircuitProps {
  className?: string;
}

const TechCircuit: React.FC<TechCircuitProps> = ({ className = '' }) => {
  const circuitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!circuitRef.current) return;

    const dots = circuitRef.current.querySelectorAll('.circuit-dot');
    const lines = circuitRef.current.querySelectorAll('.circuit-line');

    // Animation for dots
    gsap.fromTo(
      dots,
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1,
        ease: "power3.out"
      }
    );

    // Animation for lines
    gsap.fromTo(
      lines,
      { width: 0, opacity: 0 },
      { 
        width: "100%", 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15,
        ease: "power3.inOut",
        delay: 0.2
      }
    );

    // Pulsing animation for dots
    gsap.to(dots, {
      scale: 1.3,
      opacity: 0.7,
      duration: 1,
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.2,
        from: "random"
      }
    });

    // Glow animation for lines
    gsap.to(lines, {
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.3,
        from: "random"
      }
    });

  }, []);

  return (
    <div ref={circuitRef} className={`${className} relative`}>
      {/* Horizontal Circuit Lines */}
      <div className="absolute top-1/2 left-0 right-0 h-px circuit-line bg-neon-purple/50"></div>
      
      {/* Vertical Circuit Lines */}
      <div className="absolute left-1/4 top-0 bottom-0 w-px circuit-line bg-neon-purple/50"></div>
      <div className="absolute left-1/2 top-0 bottom-0 w-px circuit-line bg-neon-purple/50"></div>
      <div className="absolute left-3/4 top-0 bottom-0 w-px circuit-line bg-neon-purple/50"></div>
      
      {/* Diagonal Circuit Lines */}
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
        <div className="absolute left-0 top-0 w-[calc(100%*1.414)] h-px origin-left rotate-45 circuit-line bg-neon-purple/50"></div>
        <div className="absolute right-0 top-0 w-[calc(100%*1.414)] h-px origin-right -rotate-45 circuit-line bg-neon-purple/50"></div>
      </div>
      
      {/* Circuit Dots/Nodes */}
      <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neon-purple circuit-dot"></div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neon-purple circuit-dot"></div>
      <div className="absolute left-3/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neon-purple circuit-dot"></div>
      
      <div className="absolute left-1/4 top-0 transform -translate-x-1/2 w-3 h-3 rounded-full bg-neon-purple circuit-dot"></div>
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-3 h-3 rounded-full bg-neon-purple circuit-dot"></div>
      <div className="absolute left-3/4 top-0 transform -translate-x-1/2 w-3 h-3 rounded-full bg-neon-purple circuit-dot"></div>
      
      <div className="absolute left-1/4 bottom-0 transform -translate-x-1/2 w-3 h-3 rounded-full bg-neon-purple circuit-dot"></div>
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-3 h-3 rounded-full bg-neon-purple circuit-dot"></div>
      <div className="absolute left-3/4 bottom-0 transform -translate-x-1/2 w-3 h-3 rounded-full bg-neon-purple circuit-dot"></div>
    </div>
  );
};

export default TechCircuit;