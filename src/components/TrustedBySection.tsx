import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

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

  // First row testimonials
const testimonialsRow1 = [
  {
    quote: "J'aurai aimé connaître une agence aussi pro et réactive bien plus tôt pour éviter le stress que cela peut engendrer. Vous pouvez leur faire confiance les yeux fermés !",
    name: "Flora L.",
    position: "Cliente satisfaite",
    rating: 5
  },
  {
    quote: "Super expérience avec Orbit ! L'équipe a été ultra pro, réactive et à l'écoute de mes besoins. Le site livré est moderne, rapide et parfaitement optimisé. Un service au top, je recommande sans hésiter !",
    name: "Loryana C.",
    position: "Cliente satisfaite",
    rating: 5
  },
  {
    quote: "Orbit a réalisé le site de notre entreprise et nous sommes très satisfaites. Le travail fut rapide et nos envies ont été correctement ciblées et réalisées. Je recommande vivement !",
    name: "Carole H.",
    position: "Cliente satisfaite",
    rating: 5
  },
  {
    quote: "Une équipe professionnelle qui a su transformer notre vision en réalité. Le résultat est au-delà de nos attentes !",
    name: "Thomas R.",
    position: "Client satisfait",
    rating: 5
  },
  {
    quote: "Service client exceptionnel et résultat impeccable. Je recommande vivement !",
    name: "Marie P.",
    position: "Cliente satisfaite",
    rating: 5
  }
];

// Second row testimonials
const testimonialsRow2 = [
  {
    quote: "Une équipe à l'écoute qui a su parfaitement comprendre nos besoins. Le résultat dépasse nos attentes !",
    name: "Marc D.",
    position: "Client satisfait",
    rating: 5
  },
  {
    quote: "Professionnalisme, créativité et réactivité. Orbit a donné vie à notre vision exactement comme nous le souhaitions.",
    name: "Sophie M.",
    position: "Cliente satisfaite",
    rating: 5
  },
  {
    quote: "Un grand merci à toute l'équipe pour leur patience et leur expertise. Notre nouveau site est magnifique !",
    name: "Pierre L.",
    position: "Client satisfait",
    rating: 5
  },
  {
    quote: "Délais respectés et communication parfaite tout au long du projet. Un vrai plaisir de travailler avec Orbit !",
    name: "Julie B.",
    position: "Cliente satisfaite",
    rating: 5
  },
  {
    quote: "Notre site web est devenu un véritable atout pour notre entreprise grâce à Orbit. Merci !",
    name: "David M.",
    position: "Client satisfait",
    rating: 5
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
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-purple">
            Ils nous ont confié leur univers digital
          </h2>
          <p className="text-base md:text-lg text-surface-300 max-w-3xl mx-auto px-4">
            Découvrez pourquoi nos clients recommandent Orbit
          </p>
        </motion.div>
        
        {/* Clients logo carousel - Infinite rotation */}
        <div className="mb-8 md:mb-16 relative">
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
                      className="max-h-10 md:max-h-14 object-contain"
                    />
                  </div>
                ))}
                {/* Second set for seamless loop */}
                {clientLogos.map((client, index) => (
                  <div key={`second-${index}`} className="slide">
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-h-10 md:max-h-14 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="hidden md:block space-y-12">
          {/* First row - sliding left to right */}
          <div 
            className="testimonial-container"
          >
            <div className="testimonial-track">
              {[...testimonialsRow1, ...testimonialsRow1].map((testimonial, index) => (
                <div
                  key={index}
                  className="w-[320px] p-4 md:p-6 bg-gradient-to-br from-[#B026FF]/10 to-transparent backdrop-blur-sm rounded-2xl border border-[#B026FF]/20 hover:border-[#B026FF]/40 transition-all duration-300 group"
                >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-[#B026FF] fill-[#B026FF]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#B026FF]/40 mb-3 md:mb-4" />
                <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 leading-relaxed line-clamp-4 md:line-clamp-none">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#B026FF]/20 flex items-center justify-center text-[#B026FF] text-sm md:text-base font-bold group-hover:bg-[#B026FF]/30 transition-colors">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-xs md:text-sm text-[#B026FF]">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>

          {/* Second row - sliding right to left */}
          <div 
            className="testimonial-container"
          >
            <div className="testimonial-track-reverse">
              {[...testimonialsRow2, ...testimonialsRow2].map((testimonial, index) => (
                <div
                  key={index}
                  className="w-[320px] p-4 md:p-6 bg-gradient-to-br from-[#B026FF]/10 to-transparent backdrop-blur-sm rounded-2xl border border-[#B026FF]/20 hover:border-[#B026FF]/40 transition-all duration-300 group"
                >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-[#B026FF] fill-[#B026FF]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#B026FF]/40 mb-3 md:mb-4" />
                <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 leading-relaxed line-clamp-4 md:line-clamp-none">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#B026FF]/20 flex items-center justify-center text-[#B026FF] text-sm md:text-base font-bold group-hover:bg-[#B026FF]/30 transition-colors">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-xs md:text-sm text-[#B026FF]">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Mobile Testimonials - Single Row */}
        <div className="md:hidden">
          <div className="testimonial-container">
            <div className="testimonial-track">
              {[...testimonialsRow1].map((testimonial, index) => (
                <div
                  key={index}
                  className="w-[300px] p-4 bg-gradient-to-br from-[#B026FF]/10 to-transparent backdrop-blur-sm rounded-2xl border border-[#B026FF]/20 hover:border-[#B026FF]/40 transition-all duration-300 group"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#B026FF] fill-[#B026FF]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#B026FF]/40 mb-3" />
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#B026FF]/20 flex items-center justify-center text-[#B026FF] text-sm font-bold group-hover:bg-[#B026FF]/30 transition-colors">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-[#B026FF]">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;