import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { ChevronDown, X, Menu } from 'lucide-react'; // Ajout des icônes
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FirstContactForm from './pages/FirstContactForm';
import FirstContactFormComplexSite from './pages/FirstContactFormComplexSite';
import OrderForm from './pages/OrderForm';
import Home from './pages/Home';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Partnership from './pages/Partnership';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PartnershipForm from './pages/PartnershipForm';
import FormSuccess from './pages/FormSuccess';
import { AnalyticsProvider } from './components/AnalyticsProvider';
import Intranet from './pages/Intranet';
import Homepage from './pages/Homepage';
import WebsiteCreation from './pages/WebsiteCreation';
import SocialMedia from './pages/SocialMedia';
import AppCreation from './pages/AppCreation';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Vérifie si l'utilisateur est sur la homepage
  const isHomepage = location.pathname === '/';

  // Suivi des pages vues
  React.useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  // Suivi des clics sur les CTA
  const trackCTAClick = (action: string) => {
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        action_category: 'engagement',
        action_label: action,
      });
    }
  };

  const handleStartClick = () => {
    trackCTAClick('start_project');
    navigate('/contact');
  };

  return (
    <HelmetProvider>
      <AnalyticsProvider>
        <Helmet>
          <link rel="canonical" href={`https://agence-orbit.ch${location.pathname}`} />
        </Helmet>
        <div className="bg-black text-white min-h-screen relative">

          {/* Navigation - Transparente sur la homepage, semi-transparente ailleurs */}
          <nav className={`w-full z-50 transition-all duration-300 ${
            isHomepage 
              ? 'absolute top-0 left-0 bg-transparent' 
              : 'fixed bg-black/80 backdrop-blur-md shadow-lg'
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <Link to="/">
                    <img src="https://i.imgur.com/aM3st2Q.png" alt="Orbit Logo" className="h-32" />
                  </Link>
                </div>

                {/* Menu Desktop */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link to="/" className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Accueil</Link>
                  <Link to="/creation-site-web" className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Création de Site Web</Link>
                  <Link to="/reseaux-sociaux" className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Réseaux Sociaux</Link>
                  <Link to="/creation-application" className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Création d'Application</Link>
                  <Link to="/blog" className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Blog</Link>
                  <button 
                    className="cta-button"
                    onClick={handleStartClick}
                    onMouseEnter={() => window.gtag?.('event', 'cta_hover', { element: 'nav_start' })}
                  >
                    <span className="uppercase tracking-wider text-sm font-medium text-white">Décoller</span>
                  </button>
                </div>

                {/* Bouton Menu Mobile */}
                <button 
                  className="md:hidden flex items-center focus:outline-none z-50 relative"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <>
                      {/* Icône croix (fermeture) */}
                      <X className="h-8 w-8 text-white transition-transform" />
                    </>
                  ) : (
                    <>
                      {/* Icône burger (ouverture) */}
                      <Menu className="h-8 w-8 text-white transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Menu Mobile - Plein écran */}
            <div className={`fixed inset-0 w-full h-full bg-black text-white z-50 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}>
              
              {/* Bouton de fermeture en haut à droite */}
              <button className="absolute top-6 right-6" onClick={() => setIsMenuOpen(false)}>
                <X className="h-8 w-8 text-white" />
              </button>

              {/* Liens de navigation */}
              <nav className="space-y-6 text-center text-2xl">
                <Link to="/" className="block hover:text-[#B026FF] transition" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
                <Link to="/creation-site-web" className="block hover:text-[#B026FF] transition" onClick={() => setIsMenuOpen(false)}>Création de Site Web</Link>
                <Link to="/reseaux-sociaux" className="block hover:text-[#B026FF] transition" onClick={() => setIsMenuOpen(false)}>Réseaux Sociaux</Link>
                <Link to="/creation-application" className="block hover:text-[#B026FF] transition" onClick={() => setIsMenuOpen(false)}>Création d'Application</Link>
                <Link to="/blog" className="block hover:text-[#B026FF] transition" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              </nav>
            </div>
          </nav>

          <Routes>
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
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/intranet" element={<Intranet />} />
            <Route path="/success/:formType" element={<FormSuccess />} />
          </Routes>
        </div>
      </AnalyticsProvider>
    </HelmetProvider>
  );
}

export default App;