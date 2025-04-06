// src/App.tsx
import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import { AnalyticsProvider } from './components/AnalyticsProvider';
import { ArrowUp } from 'lucide-react';
import { smoothScrollTo } from './lib/utils';
import WelcomePage from './pages/WelcomePage';
import TestBackgroundPage from './pages/TestBackgroundPage'; // Import de la page de test

// Loader pour le chargement initial
const InitialLoader = () => (
  <div className="fixed inset-0 bg-dark-900 flex items-center justify-center z-50">
    <div className="loader"></div>
  </div>
);

// Loader pour le code-splitting (fallback)
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-900">
    <div className="flex flex-col items-center">
      <div className="h-16 w-16 mb-6 flex items-center justify-center">
        <div className="loader"></div>
      </div>
    </div>
  </div>
);

// Chargement lazy des autres pages
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
const PortfolioDetail = React.lazy(() => import('./pages/PortfolioDetail'));
const FormSuccess = React.lazy(() => import('./pages/FormSuccess'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

/**
 * Fonction utilitaire pour récupérer la valeur d'un cookie par son nom
 */
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [appLoaded, setAppLoaded] = useState(false);

  // Effet de chargement initial (affichage du loader pendant 500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Gestion de la redirection selon le cookie "selectedCountry"
  useEffect(() => {
    const selectedCountry = getCookie('selectedCountry');
    if (!selectedCountry && location.pathname !== '/welcome' && location.pathname !== '/test') {
      navigate('/welcome', { replace: true });
    }
    if (selectedCountry && location.pathname === '/welcome') {
      navigate(`/${selectedCountry}`, { replace: true });
    }
  }, [location, navigate]);

  // Scroll to top lors du changement de route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Suivi des vues de page (pour analytics)
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  // Gestion du scroll pour la barre de progression et le bouton "Back to Top"
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

  if (!appLoaded) {
    return <InitialLoader />;
  }

  return (
    <HelmetProvider>
      <AnalyticsProvider>
        <Helmet>
          <link rel="canonical" href={`https://agence-orbit.ch${location.pathname}`} />
        </Helmet>

        {/* Barre de progression */}
        <div
          className="scroll-progress"
          style={{ '--scroll': `${scrollProgress}%` } as React.CSSProperties}
        />

        {/* Arrière-plans globaux */}
        <div className="fixed inset-0 bg-dark-900 -z-50"></div>
        <div className="fixed inset-0 grid-background opacity-15 -z-40"></div>
        <div className="fixed inset-0 bg-noise opacity-[0.02] mix-blend-overlay -z-30"></div>

        {/* Bouton "Back to Top" */}
        <button
          onClick={scrollToTop}
          className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
          aria-label="Retour en haut"
        >
          <ArrowUp className="h-5 w-5" />
        </button>

        <div className="flex flex-col min-h-screen">
          {/* Affichage conditionnel du Header et Footer */}
          {location.pathname !== '/welcome' && location.pathname !== '/test' && <Header />}
          <main className="flex-grow relative">
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  {/* Page de test pour les animations de fond */}
                  <Route path="/test" element={<TestBackgroundPage />} />
                  {/* Page de bienvenue / sélection du pays */}
                  <Route path="/welcome" element={<WelcomePage />} />
                  {/* Autres pages */}
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
                  <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
                  <Route path="/success/:formType" element={<FormSuccess />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
          {location.pathname !== '/welcome' && location.pathname !== '/test' && <Footer />}
        </div>
      </AnalyticsProvider>
    </HelmetProvider>
  );
}

export default App;