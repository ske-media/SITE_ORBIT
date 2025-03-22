import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Hexagon, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import gsap from 'gsap';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Check if on homepage
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    // Initial animation
    const tl = gsap.timeline();
    tl.fromTo(headerRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0.5
    );
    
    if (logoRef.current) {
      tl.fromTo(logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        0.8
      );
    }

    // Handle scroll events
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleStartClick = () => {
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        action_category: 'engagement',
        action_label: 'start_project',
      });
    }
    navigate('/contact');
  };

  const navLinks = [
    { text: 'Accueil', to: '/' },
    { text: 'Création de Site Web', to: '/creation-site-web' },
    { text: 'Réseaux Sociaux', to: '/reseaux-sociaux' },
    { text: 'Applications', to: '/creation-application' },
    { text: 'Blog', to: '/blog' },
  ];

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-500
    ${isScrolled || !isHomepage 
      ? 'glass-effect-dark border-b border-neon-purple/10 backdrop-blur-md h-20' 
      : 'bg-transparent h-24'}
  `;

  return (
    <header ref={headerRef} className={headerClasses}>
      <div className="futuristic-container h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <div 
              ref={logoRef} 
              className="flex items-center space-x-2 relative"
            >
              <div className="relative group">
                <motion.img 
                  src="https://i.imgur.com/aM3st2Q.png" 
                  alt="Orbit Logo" 
                  className="h-12 md:h-16 relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
                <div className="absolute inset-0 bg-neon-purple/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                  location.pathname === link.to
                    ? 'text-neon-purple'
                    : 'text-white/80 hover:text-white'
                }`}
                onMouseEnter={() => setHoveredItem(link.to)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="relative z-10">{link.text}</span>
                
                {/* Animated highlight effect */}
                {hoveredItem === link.to && (
                  <motion.span 
                    className="absolute inset-0 bg-dark-100/50 rounded-full -z-0"
                    layoutId="navHighlight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                {/* Active indicator */}
                {location.pathname === link.to && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neon-purple rounded-full"></span>
                )}
              </Link>
            ))}
            <div className="ml-4">
              <Button
                onClick={handleStartClick}
                variant="primary"
                size="sm"
                glowing
              >
                Décoller
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative z-10 p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative">
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
              <div className="absolute -inset-2 bg-neon-purple/20 rounded-full opacity-0 hover:opacity-100 transition-opacity -z-10"></div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#1a1a1a]/95 backdrop-blur-lg z-40 pt-24 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="futuristic-container py-10"
            >
              <div className="grid-background transform scale-150 opacity-30"></div>
              <div className="scanning-line"></div>
                
              <nav className="flex flex-col space-y-6 relative z-10">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                  >
                    <Link
                      to={link.to}
                      className={`text-2xl font-display py-3 border-b border-neon-purple/20 flex items-center justify-between ${
                        location.pathname === link.to
                          ? 'text-neon-purple text-shadow-neon'
                          : 'text-white/80'
                      }`}
                    >
                      <span>{link.text}</span>
                      {location.pathname === link.to && (
                        <Hexagon className="h-4 w-4 text-neon-purple fill-neon-purple/20" />
                      )}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6"
                >
                  <Button
                    onClick={handleStartClick}
                    variant="primary"
                    fullWidth
                    glowing
                  >
                    Décoller
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;