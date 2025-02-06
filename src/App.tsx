import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
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
import { AnalyticsProvider } from './components/AnalyticsProvider';
import Intranet from './pages/Intranet';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    <AnalyticsProvider>
    <div className="bg-black text-white min-h-screen relative">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50 border-b border-[#B026FF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Link to="/">
                <img src="https://i.imgur.com/aM3st2Q.png" alt="Orbit Logo" className="h-32" />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#why-choose-us" className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Pourquoi Nous</a>
              <a href="#process" className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Processus</a>
              <a href="#portfolio" className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Avant/Après</a>
              <a href="#pricing" className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Tarifs</a>
              <a href="#team" className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">L'Équipe</a>
              <button 
                className="cta-button"
                onClick={handleStartClick}
                onMouseEnter={() => window.gtag?.('event', 'cta_hover', { element: 'nav_start' })}
              >
                <span className="uppercase tracking-wider text-sm font-medium text-white">Décoller</span>
              </button>
            </div>
            <button 
              className="md:hidden flex items-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <ChevronDown className={`h-6 w-6 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-sm">
            <a href="#why-choose-us" className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Pourquoi Nous</a>
            <a href="#process" className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Processus</a>
            <a href="#portfolio" className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Avant/Après</a>
            <a href="#pricing" className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">Tarifs</a>
            <a href="#team" className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition">L'Équipe</a>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </div>
    </AnalyticsProvider>
  );
}

export default App;