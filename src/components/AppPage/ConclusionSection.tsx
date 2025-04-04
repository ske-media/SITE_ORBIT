import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 1 },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

const decorativeVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 0.3,
    scale: 1,
    transition: { duration: 1.5, ease: 'easeOut' },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1, ease: 'easeInOut' },
  },
};

const ConclusionSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-transparent to-neon-purple/10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-neon-purple rounded-full mix-blend-overlay blur-3xl"
          variants={decorativeVariants}
          style={{ top: '-10%', left: '-10%' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-neon-purple rounded-full mix-blend-overlay blur-2xl"
          variants={decorativeVariants}
          style={{ bottom: '-10%', right: '-10%' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-neon-purple rounded-full mix-blend-overlay blur-2xl"
          variants={decorativeVariants}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.h2
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-gradient-purple mb-8"
        >
          Ne laissez plus la complexité freiner votre croissance
        </motion.h2>

        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl text-surface-300 max-w-3xl mx-auto leading-relaxed">
            Avec Agence Orbit, vous choisissez un partenaire qui comprend vos enjeux, qui connaît les exigences du marché suisse et qui s’engage à livrer un outil complet, fiable et personnalisable.
          </p>
        </motion.div>

        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-surface-300 max-w-3xl mx-auto leading-relaxed">
            Notre objectif est simple :
          </p>
        </motion.div>

        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-2xl md:text-3xl text-white font-extrabold leading-tight max-w-4xl mx-auto">
            Vous faire gagner du temps, de l’argent et de la sérénité, en créant une application à votre mesure.
          </p>
        </motion.div>

        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.95 }}
            className="bg-neon-purple px-10 py-4 rounded-full text-lg font-medium text-white shadow-neon hover:shadow-neon-strong transition-all"
            onClick={() => window.location.href = '/contact'}
          >
            Discutons de votre projet
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-neon-purple px-10 py-4 rounded-full text-lg font-medium text-neon-purple hover:bg-neon-purple hover:text-white transition-all"
            onClick={() => window.location.href = '/contact'}
          >
            Obtenir mon devis personnalisé
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 mx-auto w-full max-w-2xl h-1 bg-neon-purple/50"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-8 text-center"
        >
          <p className="text-lg text-surface-300">
            Contactez-nous dès aujourd'hui et transformez votre avenir digital.
          </p>
        </motion.div>
      </div>

      {/* Section supplémentaire "Mot de la Direction" */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-24 mx-auto max-w-4xl px-4 text-center"
      >
        <motion.h3
          variants={textVariants}
          className="text-4xl md:text-5xl font-bold text-gradient-purple mb-4"
        >
          Un mot de la Direction
        </motion.h3>
        <motion.p
          variants={textVariants}
          className="text-xl md:text-2xl text-surface-300 leading-relaxed mb-8"
        >
          "Nous croyons que chaque outil digital doit être un catalyseur de succès. Notre équipe met tout en œuvre pour transformer vos défis en opportunités et vous propulser vers l'excellence."
        </motion.p>
        <motion.div
          variants={textVariants}
          className="flex flex-col md:flex-row justify-center items-center gap-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.95 }}
            className="bg-neon-purple px-10 py-4 rounded-full text-lg font-medium text-white shadow-neon hover:shadow-neon-strong transition-all"
            onClick={() => window.location.href = '/contact'}
          >
            Parlez à notre Directeur
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-neon-purple px-10 py-4 rounded-full text-lg font-medium text-neon-purple hover:bg-neon-purple hover:text-white transition-all"
            onClick={() => window.location.href = '/contact'}
          >
            Découvrir notre vision
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Section décorative finale */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 1.6 }}
        className="mt-24 mx-auto w-full max-w-2xl h-1 bg-neon-purple/50"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="mt-8 text-center"
      >
        <p className="text-xl text-surface-300">
          Chez Agence Orbit, nous sommes convaincus qu'une solution digitale est un investissement stratégique pour votre croissance.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.0 }}
        className="mt-12 mx-auto max-w-3xl"
      >
        <motion.img
          src="https://i.imgur.com/aM3st2Q.png"
          alt="Signature de la Direction"
          className="w-32 mx-auto"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="mt-6 text-center"
      >
        <p className="text-lg text-surface-300">
          - La Direction d'Agence Orbit
        </p>
      </motion.div>
    </section>
  );
};

export default ConclusionSection;