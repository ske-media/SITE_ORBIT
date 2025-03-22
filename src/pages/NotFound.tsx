import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, RotateCcw, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

function NotFound() {
  const navigate = useNavigate();
  
  // Animation effect for stars
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      
      const starField = document.getElementById('star-field');
      if (starField) {
        starField.appendChild(star);
      }
      
      // Remove star after animation
      setTimeout(() => {
        if (star.parentNode === starField) {
          starField.removeChild(star);
        }
      }, 5000);
    };
    
    // Create initial stars
    for (let i = 0; i < 50; i++) {
      createStar();
    }
    
    // Create new stars periodically
    const interval = setInterval(() => {
      createStar();
    }, 300);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Page non trouvée | Agence Orbit</title>
        <meta name="description" content="La page que vous recherchez n'existe pas ou a été déplacée." />
        <style>
          {`
            @keyframes twinkle {
              0%, 100% { opacity: 0; transform: scale(0.5); }
              50% { opacity: 1; transform: scale(1); }
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
            
            .star {
              position: absolute;
              width: 3px;
              height: 3px;
              background: white;
              border-radius: 50%;
              animation: twinkle 5s infinite;
              z-index: 1;
            }
            
            .astronaut {
              animation: float 6s ease-in-out infinite;
            }
          `}
        </style>
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 flex flex-col relative overflow-hidden">
        {/* Star field background */}
        <div id="star-field" className="absolute inset-0 z-0"></div>
        
        {/* Planet graphic with glow */}
        <div className="absolute z-0 w-[600px] h-[600px] rounded-full bg-[#B026FF]/5 blur-3xl -bottom-[300px] -right-[300px]"></div>
        <div className="absolute z-0 w-[400px] h-[400px] rounded-full bg-[#B026FF]/5 blur-3xl -top-[200px] -left-[200px]"></div>
        
        <div className="flex-grow flex items-center justify-center z-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Main Content */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              {/* Astronaut illustration */}
              <div className="astronaut">
                <img
                  src="https://images.unsplash.com/photo-1614726365952-510103b1bbb4?q=80&w=300&h=300&auto=format&fit=crop"
                  alt="Astronaut floating in space"
                  className="w-48 h-48 object-cover rounded-full border-4 border-[#B026FF] shadow-[0_0_30px_rgba(176,38,255,0.5)]"
                />
              </div>
              
              <div className="text-left max-w-lg">
                <h1 className="text-7xl font-bold mb-4 gradient-text">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Houston, nous avons un problème</h2>
                <p className="text-gray-400 mb-8">
                  La page que vous recherchez semble s'être perdue dans l'espace. Elle n'existe pas ou a été déplacée vers une autre orbite.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Retour
                  </button>
                  
                  <Link 
                    to="/" 
                    className="flex items-center gap-2 px-4 py-2 bg-[#B026FF] hover:bg-[#B026FF]/80 rounded-full transition"
                  >
                    <Home className="h-4 w-4" />
                    Accueil
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Search suggestion */}
            <div className="bg-white/5 rounded-2xl p-6 max-w-2xl mx-auto border border-[#B026FF]/20">
              <h3 className="text-xl font-semibold mb-4">Ou explorez nos services</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link 
                  to="/creation-site-web" 
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition group"
                >
                  <span>Création de Site Web</span>
                  <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  to="/reseaux-sociaux" 
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition group"
                >
                  <span>Réseaux Sociaux</span>
                  <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  to="/creation-application" 
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition group"
                >
                  <span>Création d'Applications</span>
                  <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  to="/blog" 
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition group"
                >
                  <span>Blog</span>
                  <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}

export default NotFound;