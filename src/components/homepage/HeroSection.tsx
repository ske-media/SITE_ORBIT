import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

interface HeroSectionProps {
  onScrollNext: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollNext }) => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Handle video loading
  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.readyState >= 3) {
        setVideoLoaded(true);
      } else {
        videoRef.current.addEventListener('loadeddata', () => {
          setVideoLoaded(true);
        });

        videoRef.current.addEventListener('error', () => {
          console.error("Video failed to load");
          setVideoError(true);
          setVideoLoaded(true); // Consider it "loaded" so the UI shows
        });

        // Fallback in case video takes too long
        const timeout = setTimeout(() => {
          setVideoLoaded(true);
        }, 3000);

        return () => clearTimeout(timeout);
      }
    }
  }, []);
  
  const handleStartClick = () => {
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        action_category: 'engagement',
        action_label: 'start_project',
      });
    }
    navigate('/contact');
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background video with overlay */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {!videoLoaded && (
          <div className="absolute inset-0 bg-dark-900 flex items-center justify-center">
            <div className="loader"></div>
          </div>
        )}
        
        {!videoError ? (
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
            <source src="https://res.cloudinary.com/agence-orbit/video/upload/v1741712025/planet-earth-orbit_xe79ic.mp4" type="video/mp4" />
          </video>
        ) : (
          <div 
            className="w-full h-full bg-dark-900"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          ></div>
        )}
        
        <div className="absolute inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm"></div>
      </div>
      
      
      
      {/* Grid background and scanning effect */}
      <div className="absolute inset-0 grid-background opacity-10"></div>
      <div className="scanning-line"></div>
      
      {/* Gradient effects */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-neon-purple/20 mix-blend-soft-light rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-[400px] h-[400px] bg-neon-purple/20 mix-blend-soft-light rounded-full blur-[100px] opacity-40"></div>
      
      {/* Hero content */}
<motion.div 
  style={{ opacity: heroOpacity, y: heroY }}
  className="futuristic-container relative z-10 text-center"
>
 <motion.h1 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-5xl mx-auto leading-normal"
>
  <span className="block bg-gradient-to-r from-[#B026FF] via-fuchsia-400 to-[#B026FF] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(176,38,255,0.6)] leading-tight">
    Offrez-vous une vitrine digitale
  </span>
  <span className="block text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.25)] mt-2">
    à la hauteur de votre ambition.
  </span>
</motion.h1>


  <motion.p 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.5 }}
    className="text-lg md:text-xl text-surface-300 mb-10 md:mb-12 max-w-2xl mx-auto"
  >
    Votre présence en ligne mérite ce qu’il y a de mieux, et nous le créons pour vous.
  </motion.p>

  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.7 }}
    className="flex flex-col sm:flex-row gap-4 justify-center"
  >
    <Button
      onClick={handleStartClick}
      size="lg"
      glowing
    >
      Créer mon site web
    </Button>
    
    <Button
      to="/creation-site-web#portfolio"
      variant="secondary"
      size="lg"
    >
      Voir nos réalisations
    </Button>
  </motion.div>
</motion.div>


      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={onScrollNext}
      >
        <span className="text-surface-300 text-sm mb-2">Découvrir</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-8 h-8 text-neon-purple"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;