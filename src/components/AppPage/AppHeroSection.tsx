// src/components/AppPage/AppHeroSection.tsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import ParticleBackground from "../ParticleBackground";

interface AppHeroSectionProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
  videoUrl: string;
}

const AppHeroSection: React.FC<AppHeroSectionProps> = ({ forwardedRef, videoUrl }) => {
  const heroRef = forwardedRef || useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Parallax effect : modifie l'opacité et la position verticale du contenu en fonction du scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
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
          console.error("La vidéo n'a pas pu être chargée");
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
    // Redirige vers la page de contact pour la prise de rendez-vous
    window.location.href = '/contact';
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fond vidéo avec overlay */}
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
            <source src={videoUrl} type="video/mp4" />
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

      {/* Contenu du Hero */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-20 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 max-w-5xl mx-auto"
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
          Simplifiez, automatisez et centralisez tout, grâce à un partenaire qui connaît les exigences suisses.
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
        {/* Indicateur de scroll (optionnel) */}
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
  );
};

export default AppHeroSection;