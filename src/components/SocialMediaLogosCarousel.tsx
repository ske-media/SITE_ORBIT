import React, { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const SocialMediaLogosCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Logos des réseaux sociaux
  const socialMediaLogos = [
    { name: 'Meta', logo: 'https://branditechture.agency/wp-content/uploads/2021/11/Instagram-Meta-Gradient-Logo-SVG-1.svg' },
    { name: 'Instagram', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' },
    { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_(square).png' },
    { name: 'TikTok', logo: 'https://www.hubspot.com/hs-fs/hubfs/TikTok-logo-RGB-Horizontal-white.png?width=10001&height=4168&name=TikTok-logo-RGB-Horizontal-white.png' },
    { name: 'YouTube', logo: 'https://freelogopng.com/images/all_img/1656504144youtube-logo-png-white.png' },
    { name: 'Pinterest', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Pinterest_Logo.svg/2560px-Pinterest_Logo.svg.png' },
    { name: 'X', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/X_logo_2023_(white).png/800px-X_logo_2023_(white).png' },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden">
      {/* Fond d’effets */}
      <div className="absolute inset-0 bg-dark-900/30"></div>

      {/* Effets Nebula */}
      <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 rounded-full bg-neon-purple/20 blur-[80px] opacity-20"></div>
      <div className="absolute bottom-1/4 right-1/3 w-1/3 h-1/3 rounded-full bg-neon-blue/20 blur-[60px] opacity-20"></div>

      {/* Champ d’étoiles */}
      <div className="absolute inset-0 opacity-30">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
      </div>

      <div className="futuristic-container relative z-10">
        {/* Titre de la section */}
        <AnimatePresence>
          {isInView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-purple">
                Nos partenaires sociaux
              </h2>
              <p className="text-lg text-surface-300 max-w-3xl mx-auto">
                Découvrez les plateformes avec lesquelles nous collaborons pour booster votre présence digitale.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carousel de logos */}
        <div className="mb-16 relative">
          <div className="relative mx-auto max-w-5xl overflow-hidden">
            {/* Gradient fade aux extrémités */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-dark-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-dark-900 to-transparent z-10"></div>

            {/* Piste du carousel – la liste est dupliquée pour un défilement continu */}
            <div className="slider-container">
              <div className="slider">
                {socialMediaLogos.map((logo, index) => (
                  <div key={`first-${index}`} className="slide">
                    <img 
                      src={logo.logo} 
                      alt={logo.name} 
                      className="max-h-14 object-contain"
                    />
                  </div>
                ))}
                {socialMediaLogos.map((logo, index) => (
                  <div key={`second-${index}`} className="slide">
                    <img 
                      src={logo.logo} 
                      alt={logo.name} 
                      className="max-h-14 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaLogosCarousel;