import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';

// Import des composants de chaque section
import AppHeroSection from '../components/AppPage/AppHeroSection';
import AudienceSection from '../components/AppPage/AudienceSection';
import BenefitsSection from '../components/AppPage/BenefitsSection';
import ProcessSection from '../components/AppPage/ProcessSection';
import FormulasSection from '../components/AppPage/FormulasSection';
import AuditSection from '../components/AppPage/AuditSection';
import SectorsSection from '../components/AppPage/SectorsSection';
import WhyChooseSection from '../components/AppPage/WhyChooseSection';
import FAQSection from '../components/AppPage/FAQSection';
import NextStepSection from '../components/AppPage/NextStepSection';
import ConclusionSection from '../components/AppPage/ConclusionSection';

const AppCreationPage: React.FC = () => {
  // Déclaration des refs pour chaque section
  const appHeroRef = useRef<HTMLDivElement>(null);
  const audienceRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const formulasRef = useRef<HTMLDivElement>(null);
  const auditRef = useRef<HTMLDivElement>(null);
  const sectorsRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const nextStepRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Helmet>
        <title>Création d'Applications | Agence Orbit</title>
        <meta
          name="description"
          content="Transformez le quotidien de votre entreprise avec une application sur mesure. Découvrez notre processus et nos offres adaptées pour simplifier, automatiser et centraliser votre gestion."
        />
      </Helmet>
      <div>
        {/* Section 1: HERO SECTION */}
        <AppHeroSection 
          forwardedRef={appHeroRef}
          videoUrl="https://res.cloudinary.com/agence-orbit/video/upload/v1743616165/galaxy_orbit_xneixx.mp4"
        />

        {/* Section 2: À QUI S’ADRESSE CETTE OFFRE */}
        <AudienceSection forwardedRef={audienceRef} />

        {/* Section 3: LES PRINCIPAUX BÉNÉFICES */}
        <BenefitsSection forwardedRef={benefitsRef} />

        {/* Section 4: NOTRE PROCESSUS DE CRÉATION */}
        <ProcessSection forwardedRef={processRef} />

        {/* Section 5: LES FORMULES : BASE + MODULES */}
        <FormulasSection forwardedRef={formulasRef} />

        {/* Section 6: L’AUDIT DIGITAL ORBIT – 1’799 CHF (DÉDUCTIBLE) */}
        <AuditSection forwardedRef={auditRef} />

        {/* Section 7: SECTEURS CONCERNÉS */}
        <SectorsSection forwardedRef={sectorsRef} />

        {/* Section 8: POURQUOI CHOISIR AGENCE ORBIT ? */}
        <WhyChooseSection forwardedRef={whyChooseRef} />

        {/* Section 9: FAQ & POINTS DE DÉTAIL */}
        <FAQSection forwardedRef={faqRef} />

        {/* Section 10: PROCHAINE ÉTAPE */}
        <NextStepSection forwardedRef={nextStepRef} />

        {/* Section 11: CONCLUSION */}
        <ConclusionSection forwardedRef={conclusionRef} />
      </div>
    </>
  );
};

export default AppCreationPage;