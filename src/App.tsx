import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import { AnalyticsProvider } from './components/AnalyticsProvider';
import { ArrowUp } from 'lucide-react';
import { smoothScrollTo } from './lib/utils';

// Code-splitting for routes
const Homepage = React.lazy(() => import('./pages/Homepage'));
const WebsiteCreation = React.lazy(() => import('./pages/WebsiteCreation'));
const SocialMedia = React.lazy(() => import('./pages/SocialMedia'));
const AppCreation = React.lazy(() => import('./pages/AppCreation'));
const FirstContactForm = React.lazy(() => import('./pages/FirstContactForm'));
const FirstContactFormComplexSite = React.lazy(() => import('./pages/FirstContactFormComplexSite'));
const OrderForm = React.lazy(() => import('./pages/OrderForm'));
const LegalNotice = React.lazy(() => import('./pages/LegalNotice'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const Partnership = React.lazy(() => import('./pages/Partnership'));
const PartnershipForm = React.lazy(() => import('./pages/PartnershipForm'));
const StrapiBlog = React.lazy(() => import('./pages/StrapiBlog'));
const StrapiArticlePage = React.lazy(() => import('./pages/StrapiArticle'));
const FormSuccess = React.lazy(() => import('./pages/FormSuccess'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
    <div className="flex flex-col items-center">
      <img 
        src="https://i.imgur.com/aM3st2Q.png" 
        alt="Orbit Logo" 
        className="h-16 md:h-20 animate-pulse mb-6"
      />
      <div className="loader"></div>
    </div>
  </div>
);

function App() {
  const location = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Track page views
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      
      setScrollProgress(progress);
      setShowBackToTop(scrolled > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    smoothScrollTo(0, 800);
  };

  return (
    <HelmetProvider>
      <AnalyticsProvider>
        <Helmet>
          <link rel="canonical" href={`https://agence-orbit.ch${location.pathname}`} />
        </Helmet>
        
        {/* Progress Bar */}
        <div 
          className="scroll-progress" 
          style={{ '--scroll': `${scrollProgress}%` } as React.CSSProperties}
        />
        
        {/* Global Background Elements */}
        <div className="fixed inset-0 bg-[#1a1a1a] -z-50"></div>
        <div className="fixed inset-0 grid-background opacity-15 -z-40"></div>
        <div className="fixed inset-0 bg-noise opacity-[0.02] mix-blend-overlay -z-30"></div>
        
        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
          aria-label="Retour en haut"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
        
        <div className="flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-grow relative">
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/creation-site-web" element={<WebsiteCreation />} />
                  <Route path="/reseaux-sociaux" element={<SocialMedia />} />
                  <Route path="/creation-application" element={<AppCreation />} />
                  <Route path="/contact" element={<FirstContactForm />} />
                  <Route path="/contact-complex" element={<FirstContactFormComplexSite />} />
                  <Route path="/order" element={<OrderForm />} />
                  <Route path="/mentions-legales" element={<LegalNotice />} />
                  <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
                  <Route path="/devenir-partenaire" element={<Partnership />} />
                  <Route path="/devenir-partenaire/formulaire" element={<PartnershipForm />} />
                  <Route path="/blog" element={<StrapiBlog />} />
                  <Route path="/blog/:slug" element={<StrapiArticlePage />} />
                  <Route path="/success/:formType" element={<FormSuccess />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
          
          <Footer />
        </div>
      </AnalyticsProvider>
    </HelmetProvider>
  );
}

export default App;