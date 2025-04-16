import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Import des pages existantes
import Home from './pages/Home';
import Contact from './pages/Contact';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Success from './pages/Success';
import Partnership from './pages/Partnership';
import StrapiBlog from './pages/StrapiBlog';
import StrapiArticlePage from './pages/StrapiArticlePage';
import Footer from './components/Footer';

// Import des pages SEO
import StrapiSeoBlog from './pages/StrapiSeoBlog';
import StrapiSeoArticlePage from './pages/StrapiSeoArticlePage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Fonction pour scroller vers une ancre sur la homepage
  const scrollToAnchor = (anchor: string) => {
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
        <html lang="fr-CH" />
        <link rel="canonical" href={`https://agence-orbit.com${location.pathname}`} />
        <meta
          name="description"
          content={
            location.pathname === "/" 
              ? "Agence web à Genève spécialisée dans la création de sites web sur mesure. Paiement uniquement si satisfait."
              : location.pathname === "/contact"
              ? "Contactez l'Agence Orbit pour votre projet de site web sur mesure. Devis gratuit et sans engagement."
              : "Agence Orbit - Votre partenaire web à Genève"
          }
        />
        <title>
          {location.pathname === "/" 
            ? "Agence Orbit | Votre site web sur mesure"
            : location.pathname === "/contact"
            ? "Contact | Agence Orbit"
            : "Agence Orbit"}
        </title>
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
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToAnchor('portfolio');
                  }}
                  className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
                >
                  Portfolio
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
                <Link
                  to="/seo-blog"
                  className="uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
                >
                  Blog SEO
                </Link>
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
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor('portfolio');
                }}
                className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
              >
                Portfolio
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
              <Link
                to="/seo-blog"
                className="block px-3 py-2 uppercase tracking-wider text-sm font-medium hover:text-[#B026FF] transition"
              >
                Blog SEO
              </Link>
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
            <Route path="/success" element={<Success />} />
            <Route path="/blog" element={<StrapiBlog />} />
            <Route path="/blog/:slug" element={<StrapiArticlePage />} />
            {/* Routes pour le blog SEO */}
            <Route path="/seo-blog" element={<StrapiSeoBlog />} />
            <Route path="/seo-blog/:slug" element={<StrapiSeoArticlePage />} />
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