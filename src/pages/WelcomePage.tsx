// src/pages/WelcomePage.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import ParticleBackground from '../components/ParticleBackground';
import CountrySelector from '../components/CountrySelector'; // Composant que vous avez déjà créé

// URL de la vidéo d'arrière-plan
const HERO_VIDEO_URL = "https://res.cloudinary.com/agence-orbit/video/upload/v1743616165/galaxy_orbit_xneixx.mp4";

const WelcomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Effet parallax pour le contenu de la section héro
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Gestion du chargement de la vidéo
  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.readyState >= 3) {
        setVideoLoaded(true);
      } else {
        const onLoaded = () => setVideoLoaded(true);
        const onError = () => {
          console.error("Erreur lors du chargement de la vidéo");
          setVideoError(true);
          setVideoLoaded(true);
        };
        videoRef.current.addEventListener('loadeddata', onLoaded);
        videoRef.current.addEventListener('error', onError);
        const timeout = setTimeout(() => setVideoLoaded(true), 3000);
        return () => {
          videoRef.current?.removeEventListener('loadeddata', onLoaded);
          videoRef.current?.removeEventListener('error', onError);
          clearTimeout(timeout);
        };
      }
    }
  }, []);

  const handleCTAClick = () => {
    // Redirige vers une section contact ou une autre page
    window.location.href = '/contact';
  };

  return (
    <>
      <Helmet>
        <title>Bienvenue chez Agence Orbit</title>
        <meta name="description" content="Découvrez comment Agence Orbit transforme votre présence digitale grâce à des solutions innovantes et sur mesure." />
      </Helmet>
      <div className="relative min-h-screen bg-dark-900">
        {/* Section HERO */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Vidéo d'arrière-plan avec overlay */}
          <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
                <source src={HERO_VIDEO_URL} type="video/mp4" />
              </video>
            ) : (
              <div
                className="w-full h-full bg-gray-900"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            )}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Particules en fond */}
          <ParticleBackground className="absolute inset-0 z-10" />

          {/* Contenu du HERO */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative z-20 text-center px-4 max-w-5xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6"
            >
              <span className="block bg-gradient-to-r from-[#B026FF] via-fuchsia-400 to-[#B026FF] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(176,38,255,0.6)]">
                Transformez le quotidien de votre entreprise
              </span>
              <span className="block text-white mt-2">
                avec une application sur mesure.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-surface-300 mb-10 max-w-2xl mx-auto"
            >
              Simplifiez, automatisez et centralisez vos processus, grâce à un partenaire qui comprend les exigences du marché suisse.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button onClick={handleCTAClick} size="lg" glowing>
                Prendre Rendez-vous
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
              onClick={() => {
                const nextSection = document.getElementById('audience-section');
                nextSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="text-surface-300 text-sm mb-2">Découvrir</span>
              <ChevronDown className="w-8 h-8 text-neon-purple" />
            </motion.div>
          </motion.div>
        </section>

        {/* Section de sélection du pays */}
        <section className="py-12 bg-dark-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Choisissez votre pays</h2>
            <p className="text-lg text-gray-300 mb-8">Pour une expérience locale optimale, sélectionnez votre pays.</p>
            <CountrySelector />
          </div>
        </section>

        {/* Ici vous pourrez ajouter d'autres composants ou sections spécifiques */}
      </div>
    </>
  );
};

export default WelcomePage;