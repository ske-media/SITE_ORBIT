import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import {
  Rocket, Check, Globe2, Zap, Shield, Monitor, Smartphone,
  Settings, Users, ArrowUp, Timer, CreditCard, Pencil,
  ChevronDown, ArrowRight
} from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import TrustedBySection from '../components/homepage/TrustedBySection';
import Footer from '../components/Footer';
import PortfolioSection from '../components/homepage/PortfolioSection';
import Button from '../components/ui/Button';
import PricingSection from '../components/PricingSection';
import { motion } from 'framer-motion';

// Variants pour les titres et textes de section
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

function WebsiteCreation() {
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function getFormattedPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
  
  // Suivi du scroll pour la barre de progression et le bouton "Back to Top"
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartClick = () => {
    navigate('/contact');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <>
      <Helmet>
        <title>Création de Site Web | Agence Orbit</title>
        <meta
          name="description"
          content="Services de création de sites web sur mesure par l'Agence Orbit"
        />
      </Helmet>

      <div className="relative">
        {/* Barre de progression fixe */}
        <div
          className="scroll-progress fixed top-0 left-0 h-1 bg-neon-purple z-50"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Bouton Retour en haut */}
        <button
          onClick={scrollToTop}
          className={`back-to-top fixed bottom-8 right-8 p-3 bg-neon-purple rounded-full z-50 transition transform ${
            showBackToTop ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Retour en haut"
        >
          <ArrowUp className="h-6 w-6 text-white" />
        </button>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden">
          <div className="h-screen relative">
            {/* Vidéo de fond avec overlay et effets */}
            <div className="absolute inset-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source
                  src="https://res.cloudinary.com/damvotg5h/video/upload/v1738938684/k489z6pa98ea1xpb9ops.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            {/* Bouton scroll vers la section suivante */}
            <div
              className="absolute bottom-12 left-0 right-0 mx-auto w-fit cursor-pointer animate-bounce"
              onClick={() => {
                const section = document.getElementById('why-choose-us');
                if (section) {
                  const offset = section.offsetTop - 64;
                  window.scrollTo({ top: offset, behavior: 'smooth' });
                }
              }}
            >
              <ChevronDown className="h-12 w-12 text-white hover:text-neon-purple transition-colors" />
            </div>
            {/* Contenu du Hero */}
<div className="absolute inset-0 flex items-center justify-center z-10">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
    >
      <span className="bg-gradient-to-r from-[#B026FF] via-fuchsia-400 to-[#B026FF] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(176,38,255,0.6)]">
        Un site vitrine sur mesure.
      </span>
      <br className="hidden md:block" />
      <span className="text-white">
        Payez uniquement si vous êtes 100% satisfait.
      </span>
    </motion.h1>
  </div>
</div>





          </div>
        </section>

        
        {/* Avis & Logo */}
        <TrustedBySection />
        
        {/* ORBIT EFFECT SECTION */}
        <section id="orbit-effect" className="py-20 bg-gradient-to-b from-neon-purple/10 to-transparent">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-3xl mx-auto bg-white/5 rounded-2xl p-8 mb-8 gradient-border"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                Pour 1'999 CHF, offrez-vous un site moderne, responsive et pensé pour convertir.
                Recevez une première version en 7 jours et bénéficiez d’ajustements illimités.
                Ne payez qu’après votre satisfaction totale.
              </p>
            </motion.div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={handleStartClick}
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                className="relative overflow-hidden bg-neon-purple px-8 py-3 rounded-full text-lg transition flex items-center gap-2 w-full sm:w-auto justify-center group hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95"
              >
                <span className="relative z-10">Je lance mon projet maintenant</span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-[#cc26ff] to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              <Link
                to="#pricing"
                className="border border-neon-purple/50 px-8 py-3 rounded-full text-lg hover:bg-neon-purple/10 transition w-full sm:w-auto text-center"
              >
                Voir nos offres
              </Link>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section id="why-choose-us" className="py-20 bg-gradient-to-b from-neon-purple/10 to-transparent">
           <div className="scanning-line-reverse"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-5xl font-bold mb-6 text-gradient-purple">
                Pourquoi Choisir l'Agence Orbit ?
              </h2>
              <p className="text-lg text-surface-300 max-w-3xl mx-auto">
                Nos services innovants et personnalisés propulsent votre présence digitale.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Monitor className="h-8 w-8 text-neon-purple" />,
                  title: "Création 100 % personnalisée",
                  description: "Un design unique, fidèle à l'image de votre marque."
                },
                {
                  icon: <Shield className="h-8 w-8 text-neon-purple" />,
                  title: "Sérénité garantie",
                  description: "Ajustements illimités jusqu'à satisfaction totale."
                },
                {
                  icon: <Zap className="h-8 w-8 text-neon-purple" />,
                  title: "Rapidité d'exécution",
                  description: "Première version de votre site en 7 jours."
                },
                {
                  icon: <Users className="h-8 w-8 text-neon-purple" />,
                  title: "Accompagnement complet",
                  description: "Stratégie digitale et support dédié."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={titleVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`transform p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition duration-300 gradient-border ${index % 2 === 0 ? 'translate-y-0' : 'translate-y-12'}`}
                >
                  <div className="p-3 bg-neon-purple/10 rounded-xl w-fit mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <motion.p
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                className="text-xl text-gray-300 mb-6"
              >
                Prêt à transformer votre présence en ligne ?
              </motion.p>
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


{/* SERVICES SECTION */}
        <section id="services" className="py-20 bg-gradient-to-b from-neon-purple/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="scanning-line-reverse"></div>
            
            <motion.div
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              className="text-center mb-4"
            >
              <h2 className="text-5xl font-bold text-gradient-purple">Une offre complète</h2>
              <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
               Sans engagement ni compromis, pour un site qui vous ressemble vraiment.
              </p>
           
            </motion.div>
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
              {[
                { number: "98%", text: "de clients satisfaits" },
                { number: "7 jours", text: "de délai" },
                { number: "GRATUIT", text: "si vous n'êtes pas satisfait" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={titleVariants}
                  initial="hidden"
                  whileInView="visible"
                  className="text-center p-8 bg-white/5 rounded-2xl gradient-border"
                >
                  <div className="text-4xl font-bold text-neon-purple mb-2 stats-glow">
                    {stat.number}
                  </div>
                  <div className="text-xl font-semibold">{stat.text}</div>
                </motion.div>
              ))}
            </div>
            <div className="grid gap-8 max-w-3xl mx-auto">
              {[
                {
                  icon: <Monitor className="h-8 w-8 text-neon-purple" />,
                  title: "Design sur mesure",
                  description: "Votre site reflète fidèlement votre entreprise.",
                  stat: "94 % des internautes jugent la crédibilité d'un site sur son design."
                },
                {
                  icon: <Settings className="h-8 w-8 text-neon-purple" />,
                  title: "Ajustements illimités",
                  description: "Tant que vous n'avez pas validé, on continue à peaufiner.",
                  stat: "0 stress et 0 frais supplémentaires pour les modifications."
                },
                {
                  icon: <Smartphone className="h-8 w-8 text-neon-purple" />,
                  title: "Adapté & simple",
                  description: "Votre site s'adapte à tous les écrans (ordinateur, tablette, mobile).",
                  stat: "61 % des gens quittent un site s'il n'est pas facile à lire sur mobile."
                },
                {
                  icon: <Zap className="h-8 w-8 text-neon-purple" />,
                  title: "Un site qui attire des clients",
                  description: "Structure pensée pour transformer vos visiteurs en clients.",
                  stat: "Un site web stratégique qui valorise votre activité et génère de nouvelles opportunités."
                },
                {
                  icon: <Rocket className="h-8 w-8 text-neon-purple" />,
                  title: "Accompagnement marketing",
                  description: "Conseils sur la mise en valeur de vos offres et la rédaction de vos pages.",
                  stat: "Des conseils personnalisés pour révéler tout le potentiel de votre activité."
                },
                {
                  icon: <Users className="h-8 w-8 text-neon-purple" />,
                  title: "Support réactif",
                  description: "Un interlocuteur dédié, prêt à répondre rapidement à vos questions.",
                  stat: "Un accompagnement chaleureux, comme si nous faisions partie de votre équipe."
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={titleVariants}
                  initial="hidden"
                  whileInView="visible"
                  className="p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition gradient-border"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 p-3 bg-neon-purple/20 rounded-xl flex items-center justify-center">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-gray-400 mb-4">{service.description}</p>
                      <div className="pt-4 border-t border-neon-purple/20">
                        <div className="text-neon-purple font-semibold">{service.stat}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <motion.p
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                className="text-xl text-gray-300 mb-6"
              >
                Prêt à transformer votre présence en ligne ?
              </motion.p>
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
        
        {/* PROCESS SECTION */}
        <section id="process" className="py-20 bg-gradient-to-b from-neon-purple/10 to-transparent">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              className="text-center mb-4"
            >
              <h2 className="text-5xl font-bold text-gradient-purple">Comment ça marche ?</h2>
              <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                Suivez nos 4 étapes simples pour passer de l'idée au site en ligne.
              </p>
            </motion.div>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-neon-purple/20" />
              <div className="space-y-16">
                {[
                  {
                    title: "1. Consultation Gratuite",
                    description: "Nous définissons ensemble vos objectifs, votre univers visuel et votre message.",
                    icon: <Rocket className="h-8 w-8" />
                  },
                  {
                    title: "2. Première version en 7 jours",
                    description: "Création d'une première maquette. Vous voyez directement à quoi ressemblera votre futur site.",
                    icon: <Monitor className="h-8 w-8" />
                  },
                  {
                    title: "3. Ajustements illimités",
                    description: "Vous pouvez demander tous les changements nécessaires jusqu’à ce que le site corresponde parfaitement à vos attentes.",
                    icon: <Settings className="h-8 w-8" />
                  },
                  {
                    title: "4. Validation & Mise en ligne",
                    description: "Dès validation, votre site est publié. Vous ne payez que si vous êtes entièrement satisfait.",
                    icon: <Globe2 className="h-8 w-8" />
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative"
                  >
                    <div className="timeline-dot w-4 h-4 bg-neon-purple rounded-full absolute left-4 md:left-1/2 transform md:-translate-x-1/2" />
                    <div className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="hidden md:block md:w-1/2" />
                      <div className={`w-[calc(100%-2rem)] md:w-1/2 ml-12 md:ml-0 timeline-card bg-white/5 p-6 md:p-8 rounded-2xl gradient-border ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                          <div className="p-2 md:p-3 bg-neon-purple/20 rounded-xl text-neon-purple flex-shrink-0">
                            {step.icon}
                          </div>
                          <h3 className="text-lg md:text-xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-gray-400 text-sm md:text-base">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="text-center mt-16">
              <motion.button
                onClick={handleStartClick}
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                className="inline-flex items-center gap-2 bg-neon-purple px-8 py-4 rounded-full text-lg font-medium hover:bg-neon-purple/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95 group"
              >
                Démarrer mon projet
                <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>
        </section>

        

   


        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="py-20 bg-gradient-to-b from-neon-purple/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
             <div className="scanning-line-reverse"></div>

         <motion.div
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              className="text-center mb-4"
            >
              <h2 className="text-5xl font-bold text-gradient-purple">L'effet Orbit</h2>
              <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                Explorez un exemple avant/après d'un projet conçu sur-mesure pour valoriser l'image et l'atmosphère d'une pizzeria.
              </p>
           
            </motion.div>
            <BeforeAfterSlider
              beforeImage="https://i.imgur.com/sUBjFGZ.jpg"
              afterImage="https://i.imgur.com/OUH2NM5.jpg"
            />
            <motion.div
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              className="text-center mt-8 max-w-2xl mx-auto italic text-gray-400"
            >
              <p>
                Refonte de l’identité visuelle pour valoriser l’authenticité et le savoir-faire artisanal de cette pizzeria familiale,
                alliant tradition italienne et expérience moderne.
              </p>
            </motion.div>
          </div>
        </section>

{/* Portfolio Table Section */}
      <PortfolioSection />

{/* Pricing Section */}

      <PricingSection />



        
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
                answer: "Pas d'inquiétude, nous nous occupons de tout, de la conception à la mise en ligne. Vous n'avez qu'à remplir un formulaire simple et nous nous chargeons du reste. Nous vous accompagnons pas à pas, en langage clair, sans jargon technique."
              },
              {
                question: "C’est quoi un site vitrine ?",
                answer: "Il présente votre activité, vos services et vos valeurs. Il inspire confiance et attire des clients, sans fonctionnalités complexes."
              },
              {
                question: "Combien de temps faut-il pour créer mon site web ?",
                answer: "Après une consultation visio de 30 minutes, nous livrons une première version sous 7 jours. Vous pourrez ensuite demander des ajustements avant validation."
              },
              {
                question: "Que se passe-t-il si le design ne me plaît pas ?",
                answer: "Vous pouvez demander autant d'ajustements que nécessaire avant validation. Si vous n'êtes toujours pas satisfait, le projet est annulé sans frais."
              },
              {
                question: "Mon activité est simple, est-ce que l'offre à 1'999 CHF est suffisante pour moi ?",
                answer: "Pour la plupart des petites entreprises et indépendants, le pack à 1'999 CHF est largement suffisant pour créer un site vitrine professionnel, responsive et optimisé."
              },
              {
                question: "Puis-je utiliser mon propre nom de domaine ?",
                answer: "Oui, nous pouvons utiliser votre nom de domaine existant, ou vous aider à en choisir un."
              },
              {
                question: "Comment se passe la collaboration après la mise en ligne ?",
                answer: "Nous restons disponibles pour toute question ou mise à jour, avec des options de gestion pour assurer la sécurité et l'évolution de votre site."
              },
              {
                question: "Le prix inclut-il l'hébergement ?",
                answer: "L'hébergement n'est pas inclus, mais nous proposons une solution clé en main avec notre pack premium."
              },
              {
                question: "Pourquoi investir dans un site si je ne vends pas en ligne ?",
                answer: "Un site vitrine renforce votre crédibilité et vous démarque de la concurrence en présentant votre expertise et vos valeurs."
              },
              {
                question: "Comment puis-je vous contacter pour poser mes questions ?",
                answer: "Nous sommes à votre écoute ! Vous pouvez nous contacter par email ou téléphone, et nous vous répondrons sous 24 heures."
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

     
{/* ADVANCED SERVICES SECTION */}
<section className="py-20 bg-gradient-to-b from-neon-purple/10 to-transparent">
  <div className="max-w-7xl mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center mb-12">
      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        className="text-center mb-6"
      >
        <h2 className="text-4xl font-bold gradient-text">Solutions Avancées</h2>
      </motion.div>
      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        className="text-center mb-8 max-w-2xl mx-auto text-gray-300"
      >
        {(() => {
          const selectedCountry = getCookie('selectedCountry');
          const currency = selectedCountry === 'fr' ? 'EUR' : 'CHF';
          const advancedPrice = getFormattedPrice(2999, currency);
          return (
            <p>
              Besoin d'une solution plus complexe ? Nous créons des plateformes web sur-mesure pour répondre à vos besoins spécifiques à partir de <span className="text-neon-purple font-bold stats-glow">{advancedPrice}</span>.
            </p>
          );
        })()}
      </motion.div>
    </div>
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {[
        {
          title: "E-commerce",
          description: "Plateforme de vente en ligne complète avec gestion des stocks et paiements sécurisés"
        },
        {
          title: "Réservation",
          description: "Système de réservation automatisé avec gestion des disponibilités en temps réel"
        },
        {
          title: "Espace Membres",
          description: "Plateforme communautaire avec authentification et contenus exclusifs"
        }
      ].map((service, index) => (
        <motion.div
          key={index}
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          className="bg-white/5 p-8 rounded-2xl gradient-border hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
        >
          <h3 className="text-2xl font-semibold mb-4 text-neon-purple">{service.title}</h3>
          <p className="text-gray-400 mb-6">{service.description}</p>
          <Link
            to="/contact-complex"
            className="inline-flex items-center text-white hover:text-neon-purple transition-colors"
          >
            En savoir plus
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </motion.div>
      ))}
    </div>
    <div className="text-center">
      <Link
        to="/contact-complex"
        className="inline-flex items-center gap-2 bg-neon-purple px-8 py-4 rounded-full text-lg font-medium hover:bg-neon-purple/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95"
      >
        Démarrer un projet complexe
        <Rocket className="h-5 w-5" />
      </Link>
    </div>
  </div>
</section>

     
    </div>
    </>
  );
}

export default WebsiteCreation;