import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Variantes d'animation pour les titres et textes
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "Quel délai prévoir pour une application sur mesure ?",
      answer: "En général, entre 4 et 12 semaines, selon le nombre de modules et la complexité des fonctionnalités."
    },
    {
      question: "Et si j’ai déjà un logiciel métier ou un ERP ?",
      answer: "Nous pouvons nous connecter à votre outil via des API (s’il en dispose) ou le remplacer progressivement, selon votre stratégie. Rien n’est figé."
    },
    {
      question: "Existe-t-il un abonnement mensuel ?",
      answer: "La première année de maintenance et d’hébergement est souvent incluse. Au-delà, un contrat de maintenance est possible pour assurer les mises à jour, le support et l’évolution de la plateforme."
    },
    {
      question: "Comment justifier le ROI ?",
      answer: "Le gain de temps, la réduction d’erreurs et la meilleure collaboration ont un impact direct sur le chiffre d’affaires et la rentabilité. Nous aidons à estimer ce ROI dès l’audit initial."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-neon-purple/10 to-transparent">
      <div className="max-w-4xl mx-auto px-4">
        {/* Titre de la section */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          className="text-center mb-4"
        >
          <h2 className="text-5xl font-bold gradient-text">Questions Fréquentes</h2>
        </motion.div>
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          className="text-center mb-12 max-w-2xl mx-auto text-gray-400"
        >
          <p>Tout ce que vous devez savoir sur notre processus et nos services</p>
        </motion.div>
        {/* Liste des FAQ */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white/5 hover:bg-white/10 rounded-xl overflow-hidden border border-neon-purple/20 hover:border-neon-purple/40 transition-all duration-300"
            >
              <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-white/5 transition-colors">
                <span className="font-medium text-lg pr-4">{faq.question}</span>
                <ChevronDown className="h-5 w-5 text-neon-purple transform transition-transform group-open:rotate-180" />
              </summary>
              <div className="p-6 pt-0 text-gray-300 leading-relaxed border-t border-neon-purple/10">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;