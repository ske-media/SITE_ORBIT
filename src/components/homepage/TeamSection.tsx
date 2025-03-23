import React from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface TeamSectionProps {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

const TeamSection: React.FC<TeamSectionProps> = ({ forwardedRef }) => {
  const teamInView = useInView(forwardedRef, { once: true, amount: 0.2 });

  return (
    <section ref={forwardedRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 to-transparent"></div>
      <div className="scanning-line-reverse" />

      <div className="futuristic-container">
        <AnimatePresence>
          {teamInView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="futuristic-subtitle mb-4 text-gradient-purple">Qui sommes-nous ?</h2>
              <p className="text-surface-300 max-w-2xl mx-auto">
                Une équipe passionnée par l'innovation et déterminée à faire briller votre entreprise sur le web.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Team Profiles */}
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Océane's Profile */}
          <AnimatePresence>
            {teamInView && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl border border-neon-purple/20 group-hover:border-neon-purple/40 transition-colors">
                  <img
                    src="https://i.imgur.com/Fgukxs3.png"
                    alt="Océane Pougea"
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl font-bold mb-1 text-gradient-purple">Océane Pougea</h3>
                    <p className="text-lg font-medium text-white">Experte en Organisation & Processus</p>
                  </div>
                </div>
                <div>
                  <p className="text-surface-300 leading-relaxed text-justify">
                    Passionnée par l'optimisation et la gestion, Océane a fondé Orbit pour simplifier la vie des petites entreprises
                    et libérer leur potentiel. Forte d'un parcours international en marketing et en management, elle met son expertise
                    au service d'une structure claire et efficace. Son approche : combiner une écoute empathique, un sens du détail et
                    des solutions pratiques pour un impact durable.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Steven's Profile */}
          <AnimatePresence>
            {teamInView && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl border border-neon-purple/20 group-hover:border-neon-purple/40 transition-colors">
                  <img
                    src="https://i.imgur.com/iarHiKC.png"
                    alt="Steven C. K. Eldring"
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl font-bold mb-1 text-gradient-purple">Steven C. K. Eldring</h3>
                    <p className="text-lg font-medium text-white">Stratège Digital</p>
                  </div>
                </div>
                <div>
                  <p className="text-surface-300 leading-relaxed text-justify">
                    Avec plus de dix ans d'expérience dans la création de sites web, Steven met à profit ses nombreux voyages
                    et son parcours international pour apporter une vision unique à chaque projet. Originaire de Genève, il allie
                    sens du design, expertise marketing et écoute attentive pour offrir des solutions simples, efficaces et accessibles.
                    Son ambition ? Permettre à chaque entreprise de se démarquer et de booster sa présence en ligne, sans risque ni complexité.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;