import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
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

  // Check if current route is homepage
  const isHomepage = location.pathname === '/';

  // Track page views
  React.useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  // Track CTA clicks
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

      {/* Menu Mobile */}
      <button 
        className="md:hidden flex items-center"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <ChevronDown className={`h-6 w-6 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  </div>

  {/* Mobile menu */}
  <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} ${
    isHomepage ? 'bg-black/40' : 'bg-black/90 backdrop-blur-sm'
  }`}>
    <div className="px-2 pt-2 pb-3 space-y-1">
      <Link to="/" className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Accueil</Link>
      <Link to="/creation-site-web" className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Création de Site Web</Link>
      <Link to="/reseaux-sociaux" className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Réseaux Sociaux</Link>
      <Link to="/creation-application" className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Création d'Application</Link>
      <Link to="/blog" className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Blog</Link>
    </div>
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