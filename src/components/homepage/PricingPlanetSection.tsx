import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const PricingPlanetSection = () => {
  const features = [
    "Design sur mesure",
    "Ajustements illimités",
    "Adapté & simple",
    "Un site qui attire des clients",
    "Accompagnement marketing",
    "Support réactif"
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-dark-950">
      <div className="absolute inset-0 flex justify-center items-end">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="h-[600px] w-[600px] rounded-full bg-gradient-to-t from-purple-700 to-transparent opacity-40 blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Votre site web <span className="text-purple-400">1999 CHF</span>
        </h2>
        <p className="text-xl text-purple-200 mb-10">Livraison en 7 jours - Satisfait ou Gratuit</p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center justify-center text-purple-100">
              <CheckCircle className="mr-3 text-purple-400" />
              {feature}
            </li>
          ))}
        </ul>

        <p className="text-purple-300 font-medium">
          <span className="underline">Bonus :</span> 1 an de gestion premium au prix du pack essentiel
        </p>

        <button
          className="mt-8 inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
          onClick={() => window.location.href = '/contact'}
        >
          Démarrer maintenant
        </button>
      </div>
    </section>
  );
};

export default PricingPlanetSection;
