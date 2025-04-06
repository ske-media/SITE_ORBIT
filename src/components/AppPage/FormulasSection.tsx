// src/components/FormulasSection.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';

// ------------------------------
// FONCTIONS UTILITAIRES
// ------------------------------

// Fonction utilitaire pour récupérer un cookie par nom
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Fonction pour formater le prix sans décimales
function getFormattedPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ------------------------------
// DONNÉES (Mise à jour avec tarifs numériques)
// ------------------------------

interface BaseCommon {
  title: string;
  description: string;
  inclus: string[];
  livraison: string;
  tarif: number;
}

interface ModuleAdvanced {
  title: string;
  details: string[];
  tarif: number | string;
  note?: string;
  icon: string;
}

const baseCommon: BaseCommon = {
  title: "Base Commune – À Partir de 9’900 CHF",
  description:
    "Le socle complet qui réunit toutes les fonctionnalités essentielles pour centraliser et optimiser votre gestion.",
  inclus: [
    "CRM (Clients/Prospects) : gestion des contacts, relances, suivi des opportunités.",
    "Planning & Gestion des Tâches : attribution, deadlines, notifications.",
    "Suivi de Facturation & Devis : création, envoi et tracking de paiement.",
    "Communication Interne : espace d’échange et documentation centralisée.",
    "Reporting de base : vue globale de la productivité et de l’activité.",
  ],
  livraison:
    "Inclus : ateliers de cadrage, développement du socle, hébergement & maintenance pour la première année, formation et documentation. Livraison en 4 à 8 semaines selon complexité.",
  tarif: 9900,
};

const modulesAdvanced: ModuleAdvanced[] = [
  {
    title: "Module RH Complet",
    details: [
      "Fiches de paie exportables",
      "Suivi du temps de travail, congés, absences",
      "Stockage sécurisé des documents RH",
    ],
    tarif: 4500,
    icon: "https://via.placeholder.com/64?text=RH",
  },
  {
    title: "Module Finance & Comptabilité",
    details: [
      "Tableaux de bord financiers",
      "Suivi des dépenses et recettes",
      "Gestion de la trésorerie et intégration comptable",
    ],
    tarif: 4900,
    icon: "https://via.placeholder.com/64?text=Finance",
  },
  {
    title: "Module Stock & Logistique",
    details: [
      "Gestion des stocks et alertes de réapprovisionnement",
      "Suivi des commandes et fournisseurs",
      "Codes-barres et QR codes pour l’inventaire",
    ],
    tarif: 3500,
    icon: "https://via.placeholder.com/64?text=Stock",
  },
  {
    title: "Module Gestion de Projet Avancée",
    details: [
      "Outils Kanban et Gantt",
      "Suivi des temps par projet et facturation",
      "Rapports automatisés pour clients et interne",
    ],
    tarif: 3000,
    icon: "https://via.placeholder.com/64?text=Projet",
  },
  {
    title: "Module Automatisations & Règles Intelligentes",
    details: [
      "Rappels automatiques et notifications",
      "Génération automatique de documents",
      "Intégration avec Slack, Zapier, etc.",
    ],
    tarif: 2500,
    icon: "https://via.placeholder.com/64?text=Auto",
  },
  {
    title: "Module Réservation & Planning Client",
    details: [
      "Prise de rendez-vous en ligne",
      "Paiement sécurisé intégré",
      "Notifications de confirmation et rappels",
    ],
    tarif: 2900,
    icon: "https://via.placeholder.com/64?text=Réserv",
  },
  {
    title: "Module Sur-Mesure Métier",
    details: [
      "Fonctionnalités spécifiques adaptées à votre secteur",
      "Intégration à vos API et logiciels internes",
      "Workflows ultra-personnalisés",
    ],
    tarif: "Sur devis",
    icon: "https://via.placeholder.com/64?text=Sur-Mesure",
  },
];

// ------------------------------
// VARIANTS FRAMER MOTION
// ------------------------------
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, when: "beforeChildren" },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// ------------------------------
// COMPOSANT FORMULAS SECTION
// ------------------------------
const FormulasSection: React.FC = () => {
  // Détermine la devise à utiliser
  // Par défaut, c'est CHF. Si le cookie "selectedCountry" vaut "fr", alors on affiche EUR.
  const selectedCountry = getCookie('selectedCountry');
  const currency = selectedCountry === 'fr' ? 'EUR' : 'CHF';

  return (
    <section className="relative py-24 bg-gradient-to-b from-dark-900 to-dark-800 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Titre de la section */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient-purple leading-tight">
            Les Formules d’Applications
          </h2>
          <p className="mt-4 text-lg text-surface-300 max-w-3xl mx-auto">
            Une base solide et des modules premium à la carte pour ne payer que ce dont vous avez réellement besoin.
          </p>
        </motion.div>

        {/* Section Base Commune */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <motion.div variants={titleVariants} className="mb-8 text-center">
            <h3 className="text-3xl font-bold text-white">Base Commune</h3>
            <p className="mt-2 text-lg text-gray-300">
              Le socle complet pour une gestion centralisée et performante.
            </p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            className="relative bg-white/5 border border-neon-purple/30 rounded-3xl p-10 md:p-14 shadow-lg mx-auto max-w-4xl overflow-hidden"
          >
            {/* Étiquette d'offre */}
            <motion.div
              className="absolute top-0 left-0 z-20 bg-neon-purple text-white text-xs font-semibold px-4 py-2 rounded-br-xl uppercase tracking-wider shadow-lg"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Offre Principale
            </motion.div>
            <motion.h3
              variants={titleVariants}
              className="text-3xl font-bold mb-4 text-white mt-8 text-center"
            >
              {baseCommon.title}
            </motion.h3>
            <motion.p
              variants={titleVariants}
              className="text-gray-300 text-lg mb-6 max-w-3xl mx-auto text-center"
            >
              {baseCommon.description}
            </motion.p>
            <motion.ul
              variants={titleVariants}
              className="space-y-2 text-gray-300 text-left max-w-xl mx-auto mb-6 list-disc pl-6"
            >
              {baseCommon.inclus.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </motion.ul>
            <motion.p
              variants={titleVariants}
              className="text-gray-300 text-lg mb-4 max-w-3xl mx-auto text-center"
            >
              <strong>Inclus :</strong> {baseCommon.livraison}
            </motion.p>
            <motion.div
              variants={titleVariants}
              className="text-4xl font-extrabold text-neon-purple text-center mb-4"
            >
              {getFormattedPrice(baseCommon.tarif, currency)}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Section Modules Avancés */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <motion.div variants={titleVariants} className="mb-8 text-center">
            <h3 className="text-3xl font-bold text-white">Modules Avancés</h3>
            <p className="mt-2 text-lg text-gray-300">
              Complétez votre solution avec des modules optionnels, 100% personnalisables.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={containerVariants}
          >
            {modulesAdvanced.map((module, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="relative bg-white/5 border border-neon-purple/30 rounded-2xl p-8 shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.img
                    src={module.icon}
                    alt={module.title}
                    className="w-16 h-16 object-contain"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                  <motion.div
                    className="text-2xl font-bold text-neon-purple"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {typeof module.tarif === 'number'
                      ? `+${getFormattedPrice(module.tarif, currency)}`
                      : module.tarif}
                  </motion.div>
                </div>
                <motion.h4
                  variants={titleVariants}
                  className="text-2xl font-bold mb-3"
                  style={{ color: "#B026FF" }}
                >
                  {module.title}
                </motion.h4>
                <motion.ul
                  variants={titleVariants}
                  className="space-y-2 text-gray-300 text-left list-disc pl-6 mb-4"
                >
                  {module.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </motion.ul>
                {module.note && (
                  <motion.p variants={titleVariants} className="text-sm text-gray-400 italic text-center">
                    {module.note}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Final pour devis personnalisé */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          className="mt-16 text-center"
        >
          <motion.button
            onClick={() => window.location.href = '/contact'}
            className="inline-flex items-center gap-3 bg-neon-purple px-10 py-4 rounded-full text-lg font-medium hover:bg-neon-purple/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95 group"
          >
            <span>Obtenir mon devis personnalisé</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
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
          </motion.button>
        </motion.div>
      </div>

      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 0] }}
          transition={{ duration: 5, ease: "easeOut", repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-purple/20 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 0] }}
          transition={{ duration: 6, ease: "easeOut", repeat: Infinity, repeatType: "mirror" }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-neon-blue/20 rounded-full blur-2xl opacity-20"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          className="absolute inset-0 bg-diagonal-lines"
        />
      </div>
    </section>
  );
};

export default FormulasSection;