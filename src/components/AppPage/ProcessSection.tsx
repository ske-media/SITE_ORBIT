import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// ---------------------------------------------------------------------------
// TYPES ET DONNÉES
// ---------------------------------------------------------------------------

/**
 * Interface représentant une étape du processus.
 */
interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

/**
 * Tableau des étapes du processus.
 * Chaque étape contient un titre, une description détaillée et l'URL d'une icône.
 */
const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Audit Digital Orbit",
    description:
      "Audit initial (conseillé, pas obligatoire) – Analyse complète de vos process, outils actuels et objectifs. Recommandations concrètes et proposition d’architecture logicielle sur mesure.",
    icon: "https://i.imgur.com/0Pb71xL.png",
  },
  {
    id: 2,
    title: "Cadrage & Conception",
    description:
      "Ateliers de définition des fonctionnalités indispensables (ou “MVP”), choix des modules et options adaptés à votre secteur (CRM, planning, facturation, etc.) et validation du périmètre et du budget global.",
    icon: "https://i.imgur.com/SUfPU6I.png",
  },
  {
    id: 3,
    title: "Développement Agile",
    description:
      "Sprints courts avec retours réguliers, démonstrations intermédiaires pour ajuster les fonctionnalités, tests et validations en continu pour garantir la qualité du produit final.",
    icon: "https://i.imgur.com/n8r1JfU.png",
  },
  {
    id: 4,
    title: "Mise en Production & Formation",
    description:
      "Déploiement de la solution, formation de votre équipe avec guides pratiques et support initial, ainsi que des ajustements basés sur vos retours d’expérience.",
    icon: "https://i.imgur.com/bTmucfe.png",
  },
  {
    id: 5,
    title: "Maintenance & Évolutions",
    description:
      "Support continu, mises à jour régulières et ajout progressif de nouveaux modules ou intégrations (API, outils tiers, etc.) pour assurer la performance et la satisfaction sur le long terme.",
    icon: "https://i.imgur.com/kd5Qmxv.png",
  },
];

// ---------------------------------------------------------------------------
// VARIANTS D'ANIMATION
// ---------------------------------------------------------------------------

/**
 * Variants pour l'animation globale du conteneur de la frise.
 */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, when: "beforeChildren" },
  },
};

/**
 * Variants pour chaque élément de la frise (pour les éléments positionnés à droite).
 */
const rightItemVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

/**
 * Variants pour les éléments positionnés à gauche.
 */
const leftItemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

/**
 * Variants pour l'effet de pulsation du halo derrière les icônes.
 */
const glowVariants: Variants = {
  animate: {
    opacity: [0, 0.5, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
};

// ---------------------------------------------------------------------------
// COMPOSANT PRINCIPAL : ProcessSection
// ---------------------------------------------------------------------------

const ProcessSection: React.FC = () => {
  // Référence pour détecter l'affichage de la section
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  // Lance l'animation lorsque la section est visible
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-dark-900 to-dark-800 overflow-hidden"
    >
      {/* Conteneur principal */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Titre de section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.h2 className="text-4xl md:text-5xl font-extrabold text-gradient-purple leading-tight">
            Comment nous transformons vos idées en solutions concrètes
          </motion.h2>
          <motion.p className="mt-4 text-lg text-surface-300 max-w-3xl mx-auto">
            Découvrez notre processus étape par étape, conçu pour répondre aux défis de votre entreprise.
          </motion.p>
        </motion.div>

        {/* Ligne verticale centrale de la frise */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-neon-purple/20"></div>

        {/* Affichage des étapes de la frise */}
        <div className="relative">
          {processSteps.map((step, index) => {
            // Détermine la position (gauche ou droite) selon l'indice
            const isEven = index % 2 === 0;
            const variants = isEven ? leftItemVariants : rightItemVariants;

            return (
              <motion.div
                key={step.id}
                className={`mb-16 flex flex-col md:flex-row items-center ${
                  isEven ? "md:justify-start" : "md:justify-end"
                }`}
                variants={variants}
                initial="hidden"
                animate={controls}
                transition={{ delay: index * 0.3 }}
              >
                {/* Contenu de l'étape pour les éléments à gauche */}
                {isEven && (
                  <div className="w-full md:w-1/2 pr-4 text-right">
                    <div className="inline-block p-6 bg-white/10 rounded-xl border border-neon-purple/30 shadow-lg">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                )}

                {/* Icône centrale */}
                <div className="relative z-20 mx-4 flex-shrink-0">
                  <div className="relative inline-block">
                    <motion.img
                      src={step.icon}
                      alt={step.title}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                    {/* Halo pulsant autour de l'icône */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      variants={glowVariants}
                      animate="animate"
                      style={{ boxShadow: "0 0 20px rgba(176,38,255,0.8)" }}
                    ></motion.div>
                  </div>
                </div>

                {/* Contenu de l'étape pour les éléments à droite */}
                {!isEven && (
                  <div className="w-full md:w-1/2 pl-4">
                    <div className="inline-block p-6 bg-white/10 rounded-xl border border-neon-purple/30 shadow-lg">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bouton d'appel à l'action final */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => window.location.href = '/contact'}
            className="inline-flex items-center gap-3 bg-neon-purple px-10 py-4 rounded-full text-lg font-medium hover:bg-neon-purple/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95 group"
          >
            <span>Ça vous intéresse ? Contactez-nous !</span>
            <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>

      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cercle nébuleux en haut à gauche */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{ duration: 5, ease: "easeOut", repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-purple/20 rounded-full blur-3xl opacity-20"
        ></motion.div>
        {/* Cercle nébuleux en bas à droite */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 6, ease: "easeOut", repeat: Infinity, repeatType: "mirror" }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-neon-blue/20 rounded-full blur-2xl opacity-20"
        ></motion.div>
        {/* Effet de lignes diagonales */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          className="absolute inset-0 bg-diagonal-lines"
        ></motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;


