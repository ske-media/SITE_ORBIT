import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { smoothScrollTo } from '../lib/utils';

// Import all homepage section components
import HeroSection from '../components/homepage/HeroSection';
import TrustedBySection from '../components/homepage/TrustedBySection';
import StatsSection from '../components/homepage/StatsSection';
import PricingPlanetSection from '../components/homepage/PricingPlanetSection';
import OrbitDifferenceSection from '../components/homepage/OrbitDifferenceSection';
import FutureTunnelSection from '../components/homepage/FutureTunnelSection';
import ProcessSection from '../components/homepage/ProcessSection';
import ServicesSection from '../components/homepage/ServicesSection';
import WhyChooseUsSection from '../components/homepage/WhyChooseUsSection';
import PortfolioSection from '../components/homepage/PortfolioSection';
import CTASection from '../components/homepage/CTASection';
import TeamSection from '../components/homepage/TeamSection';

function Homepage() {
  // Refs for sections
  const trustedByRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const pricingPlanetRef = useRef<HTMLDivElement>(null);
  const orbitDifferenceRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    if (trustedByRef.current) {
      const offset = trustedByRef.current.offsetTop - 80;
      smoothScrollTo(offset, 800);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Agence Orbit | Votre site web sur mesure</title>
        <meta name="description" content="Agence Orbit - Votre partenaire pour la création de sites web, gestion de réseaux sociaux et développement d'applications sur mesure." />
      </Helmet>

      {/* Hero Section */}
      <HeroSection onScrollNext={scrollToNext} />
      
      {/* Avis & Logo */}
      <TrustedBySection forwardedRef={trustedByRef} />

      {/* Chiffre clés */}
      <StatsSection forwardedRef={statsRef} />

      {/* Prix + Avantage Planète */}
      <PricingPlanetSection forwardedRef={pricingPlanetRef} />

      {/* Process Section */}
      <ProcessSection forwardedRef={processRef} />

      {/* Pourquoi Orbit */}
      <OrbitDifferenceSection forwardedRef={orbitDifferenceRef} />
      
      {/* Why Choose Us Section */}
      <WhyChooseUsSection forwardedRef={whyUsRef} />    
      
      {/* Portfolio Preview Section */}
      <PortfolioSection />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Team Section */}
      <TeamSection forwardedRef={teamRef} />
    </div>
  );
}

export default Homepage;