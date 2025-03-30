import React from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Clock, TrendingUp, PiggyBank, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AppCreationSectionProps {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

const AppCreationSection: React.FC<AppCreationSectionProps> = ({ forwardedRef }) => {
  const inView = useInView(forwardedRef, { once: true, amount: 0.2 });

  const features = [
    {
      icon: <Clock className="w-6 h-6 text-neon-purple" />,
      title: 'Gagnez du temps au quotidien',
      desc: "Un restaurateur qui automatise ses réservations. Un coach qui programme ses rendez-vous en ligne. Une app bien pensée vous libère des tâches chronophages."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-neon-purple" />,
      title: 'Développez votre activité',
      desc: "Suivi client, statistiques, rappels, notifications... Tout ce qu’il faut pour booster votre productivité et améliorer l’expérience de vos clients."
    },
    {
      icon: <PiggyBank className="w-6 h-6 text-neon-purple" />,
      title: 'Maîtrisez vos coûts',
      desc: "Un artisan peut suivre ses devis et paiements depuis une app unique. Fini les pertes de temps ou les oublis qui coûtent cher."
    },
    {
      icon: <Settings2 className="w-6 h-6 text-neon-purple" />,
      title: 'Une solution faite pour vous',
      desc: "Pas besoin d’un outil générique. On crée exactement ce qu’il vous faut : simple, intuitif, sécurisé – et évolutif si besoin."
    }
  ];

  return (
    <section ref={forwardedRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 to-transparent pointer-events-none" />
      <div className="scanning-line" />

      <div className="futuristic-container z-10 relative">
        <AnimatePresence>
          {inView && (
            <>
              {/* Intro */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center mb-10 max-w-3xl mx-auto"
              >
                <h2 className="futuristic-subtitle text-gradient-purple mb-4">
                  Et si votre entreprise avait sa propre application ?
                </h2>
                <p className="text-surface-300 text-lg">
                  Imaginez un outil 100% pensé pour votre quotidien : gain de temps, fluidité, simplicité. Et surtout... plus de résultats.
                </p>
              </motion.div>

              {/* Image réduite et centrée */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="max-w-4xl mx-auto mb-14"
              >
                <img
                  src="https://i.imgur.com/gvp0XwH.png"
                  alt="Mockup application Orbit"
                  className="w-full h-auto object-cover rounded-none"
                />
              </motion.div>

              {/* Grille des features */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="futuristic-card border border-neon-purple/20 hover:border-neon-purple/40 transition-all"
                  >
                    <div className="p-3 bg-neon-purple/10 rounded-xl w-fit mb-4">
                      {f.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-surface-300 text-sm">{f.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center"
              >
                <Link
                  to="/creation-application"
                  className="inline-block px-6 py-3 rounded-full bg-neon-purple text-white font-semibold shadow-lg hover:bg-purple-600 transition"
                >
                  Créer mon app personnalisée
                </Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AppCreationSection;
