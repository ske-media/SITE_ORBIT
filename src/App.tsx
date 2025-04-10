import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Import des pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Partnership from './pages/Partnership';
import StrapiBlog from './pages/StrapiBlog';
import StrapiArticlePage from './pages/StrapiArticlePage';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction pour scroller vers une ancre sur la homepage
  const scrollToAnchor = (anchor: string) => {
    // Si l'utilisateur n'est pas sur la homepage, on y navigue d'abord
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    } else {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Redirige vers la page Contact lors du clic sur "Décoller"
  const handleStartClick = () => {
    navigate('/contact');
  };

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="canonical" href={`https://agence-orbit.ch${location.pathname}`} />
      </Helmet>
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
                <a
                  href="#why-choose-us"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToAnchor('why-choose-us');
                  }}
                  className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
                >
                  Pourquoi Nous
                </a>
                <a
                  href="#process"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToAnchor('process');
                  }}
                  className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
                >
                  Processus
                </a>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToAnchor('pricing');
                  }}
                  className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
                >
                  Tarifs
                </a>
                <a
                  href="#team"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToAnchor('team');
                  }}
                  className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
                >
                  L'Équipe
                </a>
                <Link
                  to="/blog"
                  className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
                >
                  Blog
                </Link>
                <a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToAnchor('portfolio');
                  }}
                  className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
                >
                  Portfolio
                </a>
                <button className="cta-button" onClick={handleStartClick}>
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
          {/* Menu mobile */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-sm">
              <a
                href="#why-choose-us"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor('why-choose-us');
                }}
                className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
              >
                Pourquoi Nous
              </a>
              <a
                href="#process"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor('process');
                }}
                className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
              >
                Processus
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor('pricing');
                }}
                className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
              >
                Tarifs
              </a>
              <a
                href="#team"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor('team');
                }}
                className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
              >
                L'Équipe
              </a>
              <Link
                to="/blog"
                className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
              >
                Blog
              </Link>
              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor('portfolio');
                }}
                className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
              >
                Portfolio
              </a>
            </div>
          </div>
        </nav>

        {/* Contenu principal */}
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<LegalNotice />} />
            <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
            <Route path="/devenir-partenaire" element={<Partnership />} />
            <Route path="/blog" element={<StrapiBlog />} />
            <Route path="/blog/:slug" element={<StrapiArticlePage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        {/* Footer toujours affiché */}
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;