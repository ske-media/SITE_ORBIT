import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TrustedBySectionProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

const TrustedBySection: React.FC<TrustedBySectionProps> = ({ forwardedRef }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ref = forwardedRef || sectionRef;
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Clients logos data
  const clientLogos = [
    { name: 'LAK Renovation', logo: 'https://i.imgur.com/RYVGz7H.png' },
    { name: 'AfterLife', logo: 'https://i.imgur.com/9fUsBd6.png' },
    { name: 'Bos Medical Center', logo: 'https://i.imgur.com/TuKHXuR.png' },
    { name: 'Association Le CAB', logo: 'https://i.imgur.com/dnpmceu.png' },
    { name: 'CleanLeman', logo: 'https://i.imgur.com/FNKn8Sh.png' },
    { name: 'HUB Environnement', logo: 'https://i.imgur.com/QrDXvdf.png' },
    { name: 'Vuache Pizza', logo: 'https://i.imgur.com/PU0psWu.png' }, 
    { name: 'Éveil Immobilier', logo: 'https://i.imgur.com/7Ld9L2x.png' },
  ];

 // Testimonials data
const testimonials = [
  {
    quote: "J'aurai aimé connaître une agence aussi pro et réactive bien plus tôt pour éviter le stress que cela peut engendrer. Vous pouvez leur faire confiance les yeux fermés !",
    name: "Flora L.",
    position: "Cliente satisfaite"
  },
  {
    quote: "Super expérience avec Orbit ! L'équipe a été ultra pro, réactive et à l'écoute de mes besoins. Le site livré est moderne, rapide et parfaitement optimisé. Un service au top, je recommande sans hésiter !",
    name: "Loryana C.",
    position: "Cliente satisfaite"
  },
  {
    quote: "Orbit a réalisé le site de notre entreprise et nous sommes très satisfaites. Le travail fut rapide et nos envies ont été correctement ciblées et réalisées. Je recommande vivement !",
    name: "Carole H.",
    position: "Cliente satisfaite"
  }
];


  return (
    <section 
      ref={ref} 
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-dark-900/30"></div>
      
      {/* Nebula effect */}
      <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 rounded-full bg-neon-purple/20 blur-[80px] opacity-20"></div>
      <div className="absolute bottom-1/4 right-1/3 w-1/3 h-1/3 rounded-full bg-neon-blue/20 blur-[60px] opacity-20"></div>
      
      {/* Star field */}
      <div className="absolute inset-0 opacity-30">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
      </div>
      
      <div className="futuristic-container relative z-10">
        
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-purple">
            Ils nous ont confié leur univers digital
          </h2>
          <p className="text-lg text-surface-300 max-w-3xl mx-auto">
            Découvrez pourquoi nos clients recommandent Orbit
          </p>
        </motion.div>
        
        {/* Clients logo carousel - Infinite rotation */}
        <div className="mb-16 relative">
          {/* Carousel container */}
          <div className="relative mx-auto max-w-5xl overflow-hidden">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-dark-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-dark-900 to-transparent z-10"></div>
            
            {/* Carousel track */}
            <div className="slider-container">
              <div className="slider">
                {/* First set of logos */}
                {clientLogos.map((client, index) => (
                  <div key={`first-${index}`} className="slide">
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-h-14 object-contain"
                    />
                  </div>
                ))}
                {/* Second set for seamless loop */}
                {clientLogos.map((client, index) => (
                  <div key={`second-${index}`} className="slide">
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-h-14 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              className="p-6 md:p-8 bg-dark-300/50 backdrop-blur-sm rounded-2xl border border-neon-purple/20 hover:border-neon-purple/40 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Quote decoration */}
              <span className="absolute top-4 left-4 text-6xl text-neon-purple/10 font-serif select-none">"</span>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <p className="text-white mb-6 text-lg relative">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-neon-purple transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-neon-purple/80">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;