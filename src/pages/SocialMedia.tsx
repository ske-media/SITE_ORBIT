import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ArrowUp,
  ArrowRight,
} from 'lucide-react';
import Button from '../components/ui/Button';
import ParticleBackground from '../components/ParticleBackground'; 
import SocialMediaLogosCarousel from '../components/SocialMediaLogosCarousel'; 
import SocialMediaImpact from '../components/SocialMediaPage/SocialMediaImpact'; 
import Footer from '../components/Footer';

const HERO_VIDEO_URL = "https://res.cloudinary.com/agence-orbit/video/upload/v1743362272/Fond_univers_Orbit_p7qvqe.mp4";

// Variantes d'animation pour les titres et textes
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

interface Offer {
  id: number;
  label: string;
  title: string;
  icon: string;
  ideal: string;
  content: string[];
  tarif: string;
  note?: string;
}

const offers: Offer[] = [
  {
    id: 1,
    label: "La Base",
    title: "Identité Visuelle",
    icon: "https://i.imgur.com/KLT36HJ.png",
    ideal: "Idéal si vous savez ce que vous voulez dire mais avez du mal à le mettre en valeur.",
    content: [
      "1h de brief créatif pour capter l’essence de votre marque",
      "Création de votre univers graphique (logo, typographies, palette de couleurs – 2 propositions)",
      "Livrable : charte graphique complète (palette, déclinaisons du logo, typographies, ton et style)"
    ],
    tarif: "799 CHF",
  },
  {
    id: 2,
    label: "Pour savoir où l’on va",
    title: "Stratégie de Contenu",
    icon: "https://i.imgur.com/Arupf9T.png",
    ideal: "Idéal si vous ne savez pas par où commencer sur Instagram.",
    content: [
      "1h de brief pour comprendre votre projet et positionnement",
      "Définition de votre avatar client",
      "Clarification des objectifs (visibilité, engagement, conversion)",
      "Création d’une ligne éditoriale avec document stratégique"
    ],
    tarif: "499 CHF",
  },
  {
    id: 3,
    label: "Pour bien démarrer",
    title: "Kit Insta",
    icon: "https://i.imgur.com/SptyCnD.png",
    ideal: "Idéal si vous souhaitez gérer vous-même votre contenu tout en gardant une esthétique cohérente.",
    content: [
      "9 templates de posts prêts à l’emploi",
      "1 template de carousel",
      "4 fonds de stories",
      "Pastilles pour stories à la une"
    ],
    tarif: "399 CHF",
  },
  {
    id: 4,
    label: "Pour se professionnaliser",
    title: "Optimisation de Profil",
    icon: "https://i.imgur.com/SANrOHi.png",
    ideal: "Idéal si vous souhaitez une page professionnelle soignée sans être actif.",
    content: [
      "1h de brief pour comprendre votre image de marque",
      "12 publications (dont 1 carousel) avec textes et hashtags",
      "2 reels",
      "5 pastilles de stories à la une",
      "Optimisation complète du compte (photo de profil, bio, etc.)"
    ],
    tarif: "849 CHF",
  },
  {
    id: 5,
    label: "Pour briller en ligne",
    title: "Gestion Totale",
    icon: "https://i.imgur.com/U1kJdFL.png",
    ideal: "Idéal si vous souhaitez déléguer entièrement votre présence sur Instagram.",
    content: [
      "1h de brief pour définir vos objectifs",
      "Définition de stratégie de contenu (thématiques, storytelling, piliers)",
      "Création d’un univers visuel sur-mesure",
      "3 publications/semaine, 3 stories/semaine, 2 reels/mois",
      "Planification & calendrier éditorial"
    ],
    tarif: "1’050 CHF / mois",
    note: "Engagement minimum de 3 mois",
  },
];

// Logos des plateformes sociales pour le bandeau défilant
const socialLogos: { name: string; logo: string }[] = [
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Logo.svg' },
  { name: 'Instagram', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' },
  { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
  { name: 'TikTok', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg' },
  { name: 'Pinterest', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Pinterest_Logo.svg' },
  { name: 'YouTube', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg' },
  { name: 'X', logo: 'https://upload.wikimedia.org/wikipedia/en/9/9f/X_%28logo%29.png' },
];

const SocialMediaPage: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
      setShowBackToTop(scrolled > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleStartClick = () => navigate('/contact');

  return (
    <>
      <Helmet>
        <title>Réseaux Sociaux | Agence Orbit</title>
        <meta
          name="description"
          content="Boostez votre présence sur les réseaux sociaux grâce à nos offres sur-mesure, de l'identité visuelle à la gestion totale."
        />
      </Helmet>

      <div className="relative">
        {/* Barre de progression */}
        <div className="scroll-progress fixed top-0 left-0 h-1 bg-neon-purple z-50" style={{ width: `${scrollProgress}%` }} />

        {/* Bouton Back-to-Top */}
        <button
          onClick={scrollToTop}
          className={`back-to-top fixed bottom-8 right-8 p-3 bg-neon-purple rounded-full z-50 transition transform ${showBackToTop ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Retour en haut"
        >
          <ArrowUp className="h-6 w-6 text-white" />
        </button>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden">
          <div className="h-screen relative">
            <div className="absolute inset-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={HERO_VIDEO_URL} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div
              className="absolute bottom-12 left-0 right-0 mx-auto w-fit cursor-pointer animate-bounce"
              onClick={() => {
                const section = document.getElementById('offers');
                if (section) {
                  const offset = section.offsetTop - 64;
                  window.scrollTo({ top: offset, behavior: 'smooth' });
                }
              }}
            >
              <ChevronDown className="h-12 w-12 text-white hover:text-neon-purple transition-colors" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.h1
                  variants={titleVariants}
                  initial="hidden"
                  whileInView="visible"
                  className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 max-w-5xl mx-auto"
                >
                  <span className="block bg-gradient-to-r from-[#B026FF] via-fuchsia-400 to-[#B026FF] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(176,38,255,0.6)]">
                    Boostez votre présence sur les réseaux sociaux
                  </span>
                  <br className="hidden md:block" />
                  <span className="block text-white">
                    et laissez votre marque rayonner.
                  </span>
                </motion.h1>
                <motion.p
                  variants={titleVariants}
                  initial="hidden"
                  whileInView="visible"
                  className="text-lg md:text-xl text-surface-300 mb-10 md:mb-12 max-w-2xl mx-auto"
                >
                  Nos solutions sur-mesure allient créativité et stratégie pour propulser votre communication digitale.
                </motion.p>
              </div>
            </div>
          </div>
        </section>



        {/* CHIFFRES CLÉS SUR LES RÉSEAUX SOCIAUX */}
        <SocialMediaImpact />

        
        {/* OFFRES SOCIAL MEDIA */}
        <section id="offers" className="py-20 bg-gradient-to-b from-neon-purple/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence>
              <motion.div
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-purple">
                  Nos Offres Réseaux Sociaux
                </h2>
                <p className="text-lg text-surface-300 max-w-3xl mx-auto">
                  Choisissez l’offre qui vous permettra de communiquer avec impact et de convertir vos prospects.
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="space-y-16">
              {offers.map((offer, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={offer.id}
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    className={`flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto border border-neon-purple/30 rounded-3xl p-10 md:p-14 shadow-lg overflow-hidden ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="relative w-24 h-24 md:w-32 md:h-32">
                        <img
                          src={offer.icon}
                          alt={offer.title}
                          className="w-full h-full object-contain rounded-full"
                        />
                        {/* Halo décoratif */}
                        <div className="absolute inset-0 rounded-full bg-neon-purple/20 blur-xl opacity-70"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-2 text-white">
                        <span className="text-neon-purple">{offer.label}</span> : {offer.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        <strong>Idéal si :</strong> {offer.ideal}
                      </p>
                      <ul className="list-disc ml-6 space-y-1 text-gray-300 mb-4">
                        {offer.content.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                      <div className="text-4xl font-extrabold text-neon-purple mb-4">
                        {offer.tarif}
                      </div>
                      {offer.note && (
                        <p className="text-sm text-gray-400 italic mb-4">{offer.note}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAROUSEL LOGO RÉSEAUX SOCIAUX */}
        <SocialMediaLogosCarousel />

        {/* SERVICES À LA CARTE */}
        <section className="py-20 bg-gradient-to-b from-transparent to-neon-purple/10">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.h2
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              className="text-4xl md:text-5xl font-bold mb-4 text-gradient-purple"
            >
              Services à la carte
            </motion.h2>
            <motion.p
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              className="text-lg text-surface-300 mb-10"
            >
              Vous recherchez une solution personnalisée ? Demandez un devis sur-mesure.
            </motion.p>
            <motion.div variants={titleVariants} initial="hidden" whileInView="visible">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-neon-purple px-10 py-4 rounded-full text-lg font-medium hover:bg-neon-purple/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95"
              >
                Demander un devis
                <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 bg-gradient-to-b from-neon-purple/10 to-transparent">
          <div className="max-w-4xl mx-auto px-4">
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
            <div className="space-y-4">
              {[
                {
                  question: "Je ne connais rien au digital, comment allez-vous m'accompagner ?",
                  answer: "Pas d'inquiétude, nous nous occupons de tout, de la conception à la mise en ligne. Remplissez un formulaire simple et bénéficiez d'un accompagnement clair, sans jargon."
                },
                {
                  question: "C’est quoi un site vitrine ?",
                  answer: "Il présente votre activité, vos services et vos valeurs. Simple, efficace et pensé pour inspirer confiance."
                },
                {
                  question: "Combien de temps faut-il pour créer mon site web ?",
                  answer: "Après une consultation visio de 30 minutes, la première version est livrée en 7 jours, suivie d’ajustements jusqu’à validation."
                },
                {
                  question: "Que se passe-t-il si le design ne me plaît pas ?",
                  answer: "Vous pouvez demander autant d'ajustements que nécessaire. Si vous n'êtes toujours pas satisfait, le projet est annulé sans frais."
                },
                {
                  question: "Le pack à 1'999 CHF est-il suffisant pour mon activité ?",
                  answer: "Pour la plupart des petites entreprises, notre offre clé en main offre un site professionnel, responsive et optimisé, reflétant parfaitement votre image."
                },
                {
                  question: "Puis-je utiliser mon propre nom de domaine ?",
                  answer: "Oui, nous pouvons utiliser votre nom de domaine existant ou vous guider pour en choisir un idéal."
                },
                {
                  question: "Comment se passe la collaboration après la mise en ligne ?",
                  answer: "Nous restons à vos côtés pour toute question ou mise à jour, avec des options de gestion adaptées pour assurer l'évolution de votre site."
                },
                {
                  question: "Le prix inclut-il l'hébergement ?",
                  answer: "L'hébergement n'est pas inclus dans le prix de base, mais nous proposons une solution clé en main dans notre pack premium."
                },
                {
                  question: "Pourquoi investir dans un site si je ne vends pas en ligne ?",
                  answer: "Un site vitrine renforce votre crédibilité, valorise votre expertise et vous permet de vous démarquer dans un monde numérique compétitif."
                },
                {
                  question: "Comment puis-je vous contacter ?",
                  answer: "Nous sommes disponibles par email ou téléphone et nous nous engageons à vous répondre sous 24 heures."
                }
              ].map((faq, index) => (
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
            <div className="mt-16 text-center">
              <motion.button
                onClick={handleStartClick}
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                className="inline-flex items-center gap-3 bg-neon-purple px-10 py-4 rounded-full text-lg font-medium hover:bg-neon-purple/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95 group"
              >
                <span>Je veux mon site</span>
                <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>
      </section>
    </div>
    </>
  );
};

export default SocialMediaPage;