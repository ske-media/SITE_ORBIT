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
    { name: 'Éveil Immobilier', logo: 'https://i.imgur.com/7Ld9L2x.png' },
    { name: 'Vuache Pizza', logo: 'https://i.imgur.com/PU0psWu.png' }, 
  ];

 // Testimonials data
const testimonials = [
  {
    quote: "J'aurai aimé connaître une agence aussi pro et réactive bien plus tôt pour éviter le stress que cela peut engendrer. Vous pouvez leur faire confiance les yeux fermés !",
    name: "F",
    fullName: "Flora L.",
    position: "Cliente satisfaite"
  },
  {
    quote: "Super agence à l’écoute du début à la fin, un grand merci à Océane pour son temps et ses précieux conseils ! Ils m’ont fait un site digne de se nom et ajoute une belle plus value à mon entreprise !! Merci beaucoup !",
    name: "Y",
    fullName: "Yanis B.",
    position: "Client satisfait"
  },
  {
    quote: "Orbit a réalisé le site de notre entreprise et nous sommes très satisfaites. Le travail fut rapide et nos envies ont été correctement ciblées et réalisées. Je recommande vivement !",
    name: "C",
    fullName: "Carole H.",
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="p-8 rounded-2xl border border-[#B026FF]/20 bg-gradient-to-br from-[#B026FF]/10 to-transparent backdrop-blur-sm hover:border-[#B026FF]/40 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#B026FF] rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#B026FF] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
      
      <div className="relative z-10">
        <div className="mb-6">
          <span className="text-6xl text-[#B026FF]/20 select-none leading-none">"</span>
        </div>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          {testimonial.quote}
        </p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#B026FF]/20 border border-[#B026FF]/30 flex items-center justify-center text-[#B026FF] font-bold text-lg shadow-[0_0_15px_rgba(176,38,255,0.2)] group-hover:shadow-[0_0_20px_rgba(176,38,255,0.3)] transition-all">
            {testimonial.name}
          </div>
          <div>
            <h4 className="font-bold text-white group-hover:text-[#B026FF] transition-colors">
              {testimonial.fullName}
            </h4>
            <p className="text-sm text-[#B026FF]/70">
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