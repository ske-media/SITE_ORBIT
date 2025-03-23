import React from 'react';
import TechCircuit from '../TechCircuit';
import FutureTunnel from '../FutureTunnel';

const FutureTunnelSection: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 to-transparent"></div>
      <div className="futuristic-container">
        <div className="relative h-40 mb-16">
          <TechCircuit className="absolute inset-0" />
        </div>
        <FutureTunnel />
      </div>
    </section>
  );
};

export default FutureTunnelSection;