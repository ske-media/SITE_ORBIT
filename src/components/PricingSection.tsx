// src/components/PricingSection.tsx
import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Fonction utilitaire pour récupérer un cookie par nom
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Fonction de formatage du prix sans décimales
function getFormattedPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const PricingSection: React.FC = () => {
  // Par défaut, on affiche les montants en CHF. Si le cookie "selectedCountry" vaut "fr", on affiche en EUR.
  const selectedCountry = getCookie('selectedCountry');
  const currency = selectedCountry === 'fr' ? 'EUR' : 'CHF';

  const features = [
    "Design sur mesure",
    "Ajustements illimités",
    "Adapté & simple",
    "Un site qui attire des clients",
    "Accompagnement marketing",
    "Support réactif"
  ];

  const mainPrice = 1999;
  const essentialPrice = 50;
  const premiumPrice = 100;

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-[#B026FF]/10 to-transparent relative">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 to-transparent"></div>
      <div className="scanning-line-reverse"></div>
      
      <div className="futuristic-container relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="futuristic-card text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="flex items-center justify-center text-purple-100"
              >
                <Check className="mr-3 text-purple-400" />
                {feature}
              </motion.div>
            </div>
          ))}
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center mt-12">
          <h2 className="text-4xl font-bold text-white mb-6">
            Votre site web <span className="text-purple-400">{getFormattedPrice(mainPrice, currency)}</span>
          </h2>
          <p className="text-xl text-purple-200 mb-10">Livraison en 7 jours - Satisfait ou Gratuit</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-[#B026FF] rounded-3xl p-10 md:p-14 mb-20 relative overflow-hidden shadow-lg max-w-4xl mx-auto"
        >
          <div className="absolute top-0 left-0 z-20 bg-[#B026FF] text-white text-xs font-semibold px-4 py-2 rounded-br-xl uppercase tracking-wider shadow-lg">
            Offre Principale
          </div>

          <h3 className="text-3xl font-bold mb-4 text-white">Site Vitrine – Clé en Main</h3>
          <p className="text-gray-300 text-lg mb-6">
            Un site web sur-mesure livré en <strong>7 jours</strong> (première version), avec des <strong>ajustements illimités</strong> jusqu’à validation finale.
          </p>

          <div className="text-4xl font-extrabold text-[#B026FF] mb-6">
            {getFormattedPrice(mainPrice, currency)}
          </div>

          <ul className="space-y-4 text-left text-gray-300 max-w-xl mx-auto mb-12">
            {[
              "Accompagnement personnalisé",
              "Design unique et professionnel",
              "Version test sous 7 jours",
              "Mise en ligne optimisée",
              "Conformité légale et sécurité",
              "Photos libres de droits incluses",
              "1 an de gestion premium au tarif du pack essentiel"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#B026FF] mt-1" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto"
        >
          {/* Pack Essentiel */}
          <div className="bg-white/5 border border-[#B026FF]/30 rounded-2xl p-8">
            <h4 className="text-2xl font-bold mb-4 text-white">Pack Essentiel</h4>
            <div className="text-3xl font-bold text-[#B026FF] mb-2">
              {getFormattedPrice(essentialPrice, currency)} <span className="text-base text-gray-400 font-medium">/mois</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">Inclus pendant 1 an à l'achat du site</p>
            <ul className="space-y-3 text-gray-300 text-sm">
              {[
                "Nom de domaine inclus",
                "Hébergement sécurisé",
                "Certificat HTTPS",
                "Sauvegardes régulières",
                "Mises à jour techniques & sécurité"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#B026FF] mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pack Premium */}
          <div className="bg-white/5 border border-[#B026FF]/30 rounded-2xl p-8">
            <h4 className="text-2xl font-bold mb-4 text-white">Gestion Premium</h4>
            <div className="text-3xl font-bold text-[#B026FF] mb-2">
              {getFormattedPrice(premiumPrice, currency)} <span className="text-base text-gray-400 font-medium">/mois</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">Support prioritaire et assistance renforcée</p>
            <ul className="space-y-3 text-gray-300 text-sm">
              {[
                "Tout du Pack Essentiel",
                "Modifications mineures incluses",
                "Rapports mensuels",
                "Maintenance active",
                "Support client 6j/7"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#B026FF] mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Final CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-24 text-center"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Vous êtes prêt à passer à l’action ?
        </h3>
        <p className="text-lg text-surface-300 mb-8 max-w-xl mx-auto">
          Lancez votre projet dès aujourd’hui et recevez une première version de votre site en 7 jours.
        </p>
        <a
          href="/contact"
          className="futuristic-button inline-flex items-center text-lg"
        >
          Je veux mon site maintenant
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </motion.div>
    </section>
  );
};

export default PricingSection;