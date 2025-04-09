import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ParticleBackground from '../../components/ParticleBackground';
import ShootingStar from '../../components/ShootingStarManager';

// Tableau des options de contact
const contactOptions = [
  {
    emoji: '🏠',
    title: 'Site Web Vitrine',
    description: 'Un site moderne et élégant livré en 7 jours, idéal pour présenter votre entreprise.',
    link: '/contact/site-vitrine'
  },
  {
    emoji: '🔧',
    title: 'Site Web Complexe',
    description: 'Des fonctionnalités avancées pour des projets robustes et interactifs.',
    link: '/contact/site-complexe'
  },
  {
    emoji: '📱',
    title: 'Réseaux Sociaux',
    description: 'Optimisez votre présence en ligne et boostez votre engagement.',
    link: '/contact/reseaux-sociaux'
  },
  {
    emoji: '🚀',
    title: 'Application Personnalisée',
    description: 'Créez une solution sur-mesure pour automatiser vos processus.',
    link: '/contact/application'
  }
];

// Variants pour le titre hero
const heroTitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: 'easeOut' } 
  }
};

// Variants pour les cartes d'option
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.2 + i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

const ContactChoicesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Agence Orbit</title>
        <meta
          name="description"
          content="Choisissez le service qui vous intéresse et contactez-nous pour un devis personnalisé."
        />
        <style>{`
          html, body { overflow: hidden; }
        `}</style>
      </Helmet>

      {/* Conteneur principal en plein écran */}
      <div className="relative w-screen h-screen bg-dark-900 overflow-hidden">
        {/* Fond animé et effets Orbit */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <ParticleBackground />
          <ShootingStar />
          {/* Effet scan (la classe "scanning-line" doit être définie dans votre CSS global) */}
          <div className="absolute inset-0 scanning-line pointer-events-none"></div>
          <div className="absolute inset-0 grid-background opacity-15 -z-10"></div>
          <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay -z-20"></div>
        </div>

        {/* Contenu central */}
        <div className="relative z-30 flex flex-col items-center justify-center h-full px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={heroTitleVariants}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-2">
              <span className="bg-gradient-to-r from-[#B026FF] via-fuchsia-400 to-[#B026FF] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(176,38,255,0.6)]">
                Contactez-nous
              </span>
              <br className="hidden md:block" />
              <span className="text-white">
                Nous sommes prêts à propulser votre projet !
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Choisissez le service qui correspond à vos besoins ci-dessous.
            </p>
          </motion.div>

          {/* Options de contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.title}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-white/5 p-6 rounded-2xl transition transform hover:scale-105 hover:bg-white/10 shadow-lg"
              >
                <Link to={option.link} className="flex flex-col items-center text-center">
                  <div className="text-6xl mb-4">{option.emoji}</div>
                  <h2 className="text-2xl font-bold mb-2 text-white">{option.title}</h2>
                  <p className="text-sm text-gray-300">{option.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Message de contact alternatif */}
          <div className="mt-12">
            <p className="text-gray-400 text-lg">
              Vous préférez nous écrire directement ? Envoyez-nous un e-mail à&nbsp;
              <a href="mailto:info@agence-orbit.ch" className="underline text-neon-purple">
                info@agence-orbit.ch
              </a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactChoicesPage;