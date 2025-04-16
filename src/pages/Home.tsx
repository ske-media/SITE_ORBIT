import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import {
  Rocket, Check, Globe2, Zap, Shield, Clock, Mail, ChevronDown, ArrowRight, Monitor, Smartphone, Settings, Users, ArrowUp, Timer, CreditCard, Pencil} from 'lucide-react';
import TrustedBySection from '../components/TrustedBySection';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import PortfolioSection from '../components/PortfolioSection';

function Home() {
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
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
    // Handle email submission
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div>
      {/* Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ '--scroll': `${scrollProgress}%` } as React.CSSProperties}
      />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        aria-label="Retour en haut"
      >
        <ArrowUp className="h-6 w-6 text-white" />
      </button>

      {/* Ajout du bloc Helmet pour définir les métadonnées de la homepage */}
      <Helmet>
        <title>Agence Orbit | Votre site web sur mesure</title>
        <link rel="canonical" href="https://agence-orbit.fr/" />
        <meta 
          name="description" 
          content="Agence web à Genève spécialisée dans la création de sites web sur mesure. Paiement uniquement si satisfait. Première version en 7 jours. Devis gratuit." 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="h-screen relative">
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
<source src="https://res.cloudinary.com/damvotg5h/video/upload/v1738938684/k489z6pa98ea1xpb9ops.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div 
            className="absolute bottom-12 left-0 right-0 mx-auto w-fit cursor-pointer animate-bounce"
            onClick={() => {
              const section = document.getElementById('why-choose-us');
              if (section) {
                const offset = section.offsetTop - 64; // 64px is the header height
                window.scrollTo({
                  top: offset,
                  behavior: 'smooth'
                });
              }
            }}
          >
            <ChevronDown className="h-12 w-12 text-white hover:text-[#B026FF] transition-colors" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-title gradient-text">
                Un site vitrine sur mesure. Payez uniquement si vous êtes 100 % satisfait.
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* TrustedBy Section */}
        <TrustedBySection />

      
      <section id="orbit-effect" className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-white/5 rounded-2xl p-8 mb-8 gradient-border">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Pour 1'999 EUR, offrez-vous un site moderne, qui s’adapte parfaitement à tous les écrans et conçu pour attirer et retenir vos clients.
                Recevez une première version en 7 jours, profitez d’ajustements illimités, et ne versez pas un centime tant que vous n’êtes pas pleinement conquis.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleStartClick}
              className="relative overflow-hidden bg-[#B026FF] px-8 py-3 rounded-full text-lg hover:bg-[#B026FF]/80 transition flex items-center gap-2 w-full sm:w-auto justify-center group hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95"
            >
              <span className="relative z-10">Je lance mon projet maintenant</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#B026FF] via-[#cc26ff] to-[#B026FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              <ArrowRight className="h-5 w-5" />
            </button>
            <a 
              href="#pricing"
              className="border border-[#B026FF]/50 px-8 py-3 rounded-full text-lg hover:bg-[#B026FF]/10 transition w-full sm:w-auto text-center"
            >
              Voir les offres
            </a>
          </div>
        </div>
      </section>

      
      
      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Choisir l'Agence Orbit ?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Monitor className="h-8 w-8 text-[#B026FF]" />,
                title: "Création 100 % personnalisée",
                description: "Un design unique, à l'image de votre marque."
              },
              {
                icon: <Shield className="h-8 w-8 text-[#B026FF]" />,
                title: "Sérénité : Payez seulement si vous êtes satisfait",
                description: "Ajustements illimités avant validation."
              },
              {
                icon: <Zap className="h-8 w-8 text-[#B026FF]" />,
                title: "Rapidité : première version en 7 jours",
                description: "Une première version de votre site dès la première semaine."
              },
              {
                icon: <Users className="h-8 w-8 text-[#B026FF]" />,
                title: "Accompagnement complet",
                description: "Conseils stratégiques en communication et marketing digital."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`transform p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-[background] duration-300 gradient-border ${
                  index % 2 === 0 ? 'translate-y-0' : 'translate-y-12'
                } float`}
                data-tooltip={
                  item.title === "Création 100 % personnalisée" ? "Design unique adapté à votre marque"
                  : item.title === "Sérénité : Payez seulement si vous êtes satisfait" ? "Paiement uniquement si satisfait"
                  : item.title === "Rapidité : préproduction en 7 jours" ? "Site web en 7 jours"
                  : "Accompagnement stratégique complet"
                }
              >
                <div className="relative">
                  {item.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-xl text-gray-300 mb-6">
              Prêt à transformer votre présence en ligne ?
            </p>
            <button
              onClick={handleStartClick}
              className="inline-flex items-center gap-3 bg-[#B026FF] px-10 py-4 rounded-full text-lg font-medium hover:bg-[#B026FF]/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95 group"
            >
              <span>Je veux mon site</span>
              <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gradient-to-b from-[#B026FF]/10 to-transparent">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-bold text-center mb-4">Comment ça marche ?</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Suivez nos 4 étapes simples pour passer de l'idée au site en ligne.
          </p>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-[#B026FF]/20" />
            
            <div className="space-y-16">
              {[
                {
                  title: "1. Consultation Gratuite",
                  description: "Nous définissons ensemble vos objectifs, votre univers visuel et votre message.",
                  icon: <Rocket className="h-8 w-8" />
                },
                {
                  title: "2. Première version en 7 jours",
                  description: "Création d'une première maquette.\nVous voyez directement à quoi ressemblera votre futur site.",
                  icon: <Monitor className="h-8 w-8" />
                },
                {
                  title: "3. Ajustements illimités",
                  description: "Vous pouvez demander tous les changements nécessaires (textes, images, mise en page) jusqu’à ce que le site corresponde parfaitement à vos attentes.",
                  icon: <Settings className="h-8 w-8" />
                },
                {
                  title: "4. Validation & Mise en ligne",
                  description: "Dès que vous validez, votre site est immédiatement publié. Vous ne réglez les 1'999 EUR qu'à ce moment-là.",
                  icon: <Globe2 className="h-8 w-8" />
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="timeline-dot w-4 h-4 bg-[#B026FF] rounded-full absolute left-4 md:left-1/2 transform md:-translate-x-1/2" />
                  <div className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}>
                    <div className="hidden md:block md:w-1/2" />
                    <div className={`w-[calc(100%-2rem)] md:w-1/2 ml-12 md:ml-0 timeline-card bg-white/5 p-6 md:p-8 rounded-2xl gradient-border ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}>
                      <div className={`flex items-center gap-4 mb-4 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}>
                        <div className="p-2 md:p-3 bg-[#B026FF]/20 rounded-xl text-[#B026FF] flex-shrink-0">
                          {step.icon}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-gray-400 text-left md:text-inherit text-sm md:text-base">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-16">
            <button
              onClick={handleStartClick}
              className="inline-flex items-center gap-2 bg-[#B026FF] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#B026FF]/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95"
            >
              Démarrer mon projet
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

 {/* Portfolio */}
      <section id="portfolio" className="py-20 bg-gradient-to-b from-transparent via-[#B026FF]/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <h2 className="text-4xl font-bold text-center mb-4 gradient-text">L'effet Orbit</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Explorez un exemple avant/après d'un projet conçu sur-mesure pour mettre en valeur l'image et l'atmosphère d'une pizzeria.
          </p>
          <BeforeAfterSlider
            beforeImage="https://i.imgur.com/sUBjFGZ.jpg"
            afterImage="https://i.imgur.com/OUH2NM5.jpg"
          />
          <p className="text-gray-400 text-center mt-8 max-w-2xl mx-auto italic">
            Refonte de l’identité visuelle pour valoriser l’authenticité et le savoir-faire artisanal de cette pizzeria familiale,
            alliant tradition italienne et expérience moderne.
          </p>
        </div>
      </section>
      
      <PortfolioSection />
      
      {/* Services */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Une offre complète</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Sans engagement ni compromis, pour un site qui vous ressemble vraiment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {[
              {
                number: "98%",
                text: "de clients satisfaits"
              },
              {
                number: "7 jours",
                text: "de délai"
              },
              {
                number: "GRATUIT",
                text: "si vous n'êtes pas satisfait"
              }
            ].map((stat, index) => (
              <div key={index} className="text-center p-8 bg-white/5 rounded-2xl gradient-border">
                <div className="text-4xl font-bold text-[#B026FF] mb-2 stats-glow">{stat.number}</div>
                <div className="text-xl font-semibold">{stat.text}</div>
              </div>
            ))}
          </div>
          <div className="grid gap-8 max-w-3xl mx-auto">
            {[
              {
                icon: <Monitor className="h-8 w-8 text-[#B026FF] float" />,
                title: "Design sur mesure",
                description: "Votre site reflète fidèlement votre entreprise.",
                stat: "94 % des internautes jugent la crédibilité d'un site sur son design."
              },
              {
                icon: <Settings className="h-8 w-8 text-[#B026FF] float" />,
                title: "Ajustements illimités",
                description: "Tant que vous n'avez pas validé, on continue à peaufiner.",
                stat: "0 stress et 0 frais supplémentaires pour les modifications."
              },
              {
                icon: <Smartphone className="h-8 w-8 text-[#B026FF] float" />,
                title: "Adapté & simple",
                description: "Votre site s'adapte à tous les écrans (ordinateur, tablette, mobile).",
                stat: "61 % des gens quittent un site s'il n'est pas facile à lire sur mobile."
              },
              {
                icon: <Zap className="h-8 w-8 text-[#B026FF] float" />,
                title: "Un site qui attire des clients",
                description: "Structure pensée pour transformer vos visiteurs en clients.",
                stat: "Un site web stratégique qui valorise votre activité et génère de nouvelles opportunités."
              },
              {
                icon: <Rocket className="h-8 w-8 text-[#B026FF] float" />,
                title: "Accompagnement marketing",
                description: "Conseils sur la mise en valeur de vos offres et la rédaction de vos pages.",
                stat: "Des conseils personnalisés pour révéler tout le potentiel de votre activité."
              },
              {
                icon: <Users className="h-8 w-8 text-[#B026FF] float" />,
                title: "Support réactif",
                description: "Un interlocuteur dédié, prêt à répondre rapidement à vos questions.",
                stat: "Un accompagnement chaleureux, comme si nous faisions partie de votre équipe."
              }
            ].map((service, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition gradient-border">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 p-3 bg-[#B026FF]/20 rounded-xl flex items-center justify-center float">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-[#B026FF] transition">{service.title}</h3>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    <div className="pt-4 border-t border-[#B026FF]/20">
                      <div className="text-[#B026FF] font-semibold">{service.stat}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-xl text-gray-300 mb-6">
              Prêt à transformer votre présence en ligne ?
            </p>
            <button
              onClick={handleStartClick}
              className="inline-flex items-center gap-3 bg-[#B026FF] px-10 py-4 rounded-full text-lg font-medium hover:bg-[#B026FF]/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95 group"
            >
              <span>Je veux mon site</span>
              <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-[#B026FF]/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Tarifs</h2>
          <div className="flex flex-col gap-12">
            {/* Site Vitrine */}
            <div className="max-w-3xl mx-auto w-full bg-gradient-to-br from-[#B026FF]/20 to-transparent rounded-2xl p-8 border border-[#B026FF] transition pulse relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#B026FF] text-white px-4 py-2 rounded-bl-lg">
                <span className="font-bold">SANS ENGAGEMENT</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 mt-8">Votre Site Vitrine – Clé en Main dans 7j</h3>
              <p className="text-gray-300 mb-6">Un site web sur-mesure qui reflète votre image et attire vos clients, sans tracas ni engagement.</p>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-bold">1'999 EUR</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Accompagnement personnalisé",
                  "Design unique et professionnel",
                  "Version test avant lancement",
                  "Mise en ligne optimisée",
                  "Conformité légale et sécurité",
                  "Des photos libre de droit pour votre site",
                  "Gestion premium au prix du pack Essentiel pendant 12 mois"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#B026FF] flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleStartClick}
                className="w-full bg-[#B026FF] py-3 rounded-full hover:bg-[#B026FF]/80 transition"
              >
                Commencer
              </button>
            </div>

            <div className="text-center text-gray-400 my-4">
              <h3 className="text-xl mb-2">Options de Gestion</h3>
              <p>Des solutions flexibles pour maintenir votre site à jour</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
             {/* Gestion Essentielle */}
<div className="bg-white/5 rounded-2xl p-8 border border-[#B026FF]/20 hover:border-[#B026FF] transition">
  <h3 className="text-2xl font-bold mb-4">Pack Essentiel</h3>
  <div className="flex items-end gap-2 mb-6">
    <span className="text-4xl font-bold">50 EUR</span>
    <span className="text-gray-400">/mois</span>
  </div>
  <ul className="space-y-4 mb-8">
    {[
      {
        title: "Nom de domaine (votrenom.com/ch)",
        description: "Obtenez une adresse web unique et professionnelle pour votre entreprise."
      },
      {
        title: "Hébergement (espace en ligne)",
        description: "Votre site est hébergé sur des serveurs sécurisés et disponibles 24/7."
      },
      {
        title: "Lien en httpS",
        description: "Profitez d'une connexion sécurisée pour renforcer la confiance de vos visiteurs."
      },
      {
        title: "Sauvegardes régulières",
        description: "Des sauvegardes automatiques garantissent la protection de vos données."
      },
      {
        title: "Mises à jour de sécurité & techniques",
        description: "Nous mettons à jour régulièrement votre site pour optimiser ses performances et sa sécurité."
      }
    ].map((feature, index) => (
      <li key={index} className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-[#B026FF] flex-shrink-0" />
          <span className="text-gray-300">{feature.title}</span>
        </div>
        <p className="text-xs text-gray-400 ml-7">{feature.description}</p>
      </li>
    ))}
  </ul>
  <button 
    onClick={handleStartClick}
    className="w-full bg-[#B026FF] py-3 rounded-full hover:bg-[#B026FF]/80 transition"
  >
    Choisir
  </button>
</div>

{/* Gestion Premium */}
<div className="bg-white/5 rounded-2xl p-8 border border-[#B026FF]/20 hover:border-[#B026FF] transition">
  <h3 className="text-2xl font-bold mb-4">Gestion Premium</h3>
  <div className="flex items-end gap-2 mb-6">
    <span className="text-4xl font-bold">100 EUR</span>
    <span className="text-gray-400">/mois</span>
  </div>
  <ul className="space-y-4 mb-8">
    {[
      {
        title: "Tout du pack Essentiel plus...",
        description: "Inclut toutes les fonctionnalités du Pack Essentiel, avec des options supplémentaires pour une gestion optimale."
      },
      {
        title: "Rapports mensuels",
        description: "Recevez un compte-rendu détaillé de l'activité de votre site et des recommandations."
      },
      {
        title: "Maintenance",
        description: "Des interventions régulières pour assurer le bon fonctionnement et la performance de votre site."
      },
      {
        title: "Support prioritaire",
        description: "Obtenez une assistance rapide et dédiée pour toute question ou problème."
      },
      {
        title: "Modifications mineures incluses (3/mois)",
        description: "Profitez de jusqu'à trois ajustements ou mises à jour de contenu chaque mois pour garder votre site à jour."
      }
    ].map((feature, index) => (
      <li key={index} className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-[#B026FF] flex-shrink-0" />
          <span className="text-gray-300">{feature.title}</span>
        </div>
        <p className="text-xs text-gray-400 ml-7">{feature.description}</p>
      </li>
    ))}
  </ul>
  <button 
    onClick={handleStartClick}
    className="w-full bg-[#B026FF] py-3 rounded-full hover:bg-[#B026FF]/80 transition"
  >
    Choisir
  </button>
</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Comparison Table */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[#B026FF]/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Pourquoi Orbit est différent</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto px-4">
            Découvrez ce qui nous distingue des agences traditionnelles
          </p>
          
          <div className="max-w-3xl mx-auto overflow-hidden rounded-2xl border border-[#B026FF]/20">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-[#B026FF]/10">
              <div className="p-4 md:p-6 text-lg font-semibold"></div>
              <div className="p-4 md:p-6 text-lg font-semibold text-center text-[#B026FF]">Orbit</div>
              <div className="p-4 md:p-6 text-lg font-semibold text-center text-gray-400">Agences</div>
            </div>
            
            {/* Table Rows */}
            {[
              {
                label: "Délai",
                icon: <Timer className="h-5 w-5 text-[#B026FF]" />,
                orbit: "7 jours",
                others: "4-8 semaines",
                description: "Première version de votre site"
              },
              {
                label: "Paiement",
                icon: <CreditCard className="h-5 w-5 text-[#B026FF]" />,
                orbit: "Après\nsatisfaction",
                others: "50% à la cmd",
                description: "Conditions de règlement"
              },
              {
                label: "Retouches",
                icon: <Pencil className="h-5 w-5 text-[#B026FF]" />,
                orbit: "Illimitées",
                others: "2-3 incluses",
                description: "Modifications du design"
              },
              {
                label: "Suivi",
                icon: <Users className="h-5 w-5 text-[#B026FF]" />,
                orbit: "Personnalisé",
                others: "Standard",
                description: "Suivi et conseils"
              },
              {
                label: "Engagement",
                icon: <Shield className="h-5 w-5 text-[#B026FF]" />,
                orbit: "Aucun",
                others: "1 an min.",
                description: "Durée d'engagement"
              },
              {
                label: "Support",
                icon: <Zap className="h-5 w-5 text-[#B026FF]" />,
                orbit: "7j/7",
                others: "Heures\nde bureau",
                description: "Disponibilité"
              }
            ].map((row, index) => (
              <div 
                key={index}
                className={`grid grid-cols-3 ${
                  index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                }`}
              > 
                <div className="p-4 md:p-6 border-t border-[#B026FF]/20">
                  <div className="font-medium flex items-center gap-1 md:gap-2">
                    <span className="hidden md:block">{row.icon}</span>
                    <span className="text-sm md:text-base">
                      {row.label === "Suivi" ? (
                        <>
                          <span className="md:hidden">Suivi</span>
                          <span className="hidden md:inline">Accompagnement</span>
                        </>
                      ) : (
                        row.label
                      )}
                    </span>
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">{row.description}</div>
                </div>
                <div className="p-2 md:p-6 text-center border-t border-[#B026FF]/20 font-medium">
                  <div className="flex items-center justify-center gap-1 md:gap-2">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="h-4 w-4 text-emerald-500" />
                    </div>
                    <span className="text-[#B026FF] text-sm md:text-base whitespace-pre-line text-center">{row.orbit}</span>
                  </div>
                </div>
                <div className="p-2 md:p-6 text-center border-t border-[#B026FF]/20 text-gray-400">
                  <div className="flex items-center justify-center gap-1 md:gap-2">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                      <div className="relative w-4 h-4">
                        <div className="absolute inset-0 rotate-45 w-4 h-0.5 bg-red-500 translate-y-[8px]"></div>
                        <div className="absolute inset-0 -rotate-45 w-4 h-0.5 bg-red-500 translate-y-[8px]"></div>
                      </div>
                    </div>
                    <span className="text-sm md:text-base whitespace-pre-line text-center">{row.others}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button
              onClick={handleStartClick}
              className="inline-flex items-center gap-3 bg-[#B026FF] px-10 py-4 rounded-full text-lg font-medium hover:bg-[#B026FF]/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95 group"
            >
              <span>Je veux mon site</span>
              <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gradient-to-b from-transparent to-[#B026FF]/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Qui sommes-nous ?</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Une équipe passionnée par l'innovation et déterminée à faire briller votre entreprise sur le web
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Océane's Profile */}
            <div className="group">
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img 
                  src="https://i.imgur.com/Fgukxs3.png" 
                  alt="Océane Pougea" 
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#B026FF] name-glow">Océane Pougea</h3>
                <p className="text-lg font-medium text-gray-300">Votre Experte en Organisation & Processus</p>
                <p className="text-gray-400 leading-relaxed text-justify">
                  Passionnée par l'optimisation et la gestion, Océane a fondé Orbit pour simplifier la vie des petites entreprises 
                  et libérer leur potentiel. Forte d'un parcours international en marketing et en management, elle met son expertise 
                  au service d'une structure claire et efficace. Son approche : combiner une écoute empathique, un sens du détail et 
                  des solutions pratiques pour un impact durable.
                </p>
              </div>
            </div>

            {/* Steven's Profile */}
            <div className="group">
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img 
                  src="https://i.imgur.com/iarHiKC.png" 
                  alt="Steven C. K. Eldring" 
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#B026FF] name-glow">Steven C. K. Eldring</h3>
                <p className="text-lg font-medium text-gray-300">Votre Stratège Digital</p>
                <p className="text-gray-400 leading-relaxed text-justify">
                  Avec plus de dix ans d'expérience dans la création de sites web, Steven met à profit ses nombreux voyages 
                  et son parcours international pour apporter une vision unique à chaque projet. Originaire de Genève, il allie 
                  sens du design, expertise marketing et écoute attentive pour offrir des solutions simples, efficaces et accessibles. 
                  Son ambition ? Permettre à chaque entreprise de se démarquer et de booster sa présence en ligne, sans risque ni complexité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-[#B026FF]/10 to-transparent">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Questions Fréquentes</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur notre processus et nos services
          </p>
          <div className="space-y-4">
            {[
              {
                question: "Je ne connais rien au digital, comment allez-vous m'accompagner ?",
                answer: "Pas d'inquiétude, nous nous occupons de tout, de la conception à la mise en ligne. Vous n'avez qu'à remplir un formulaire simple et nous nous chargeons du reste. Nous vous accompagnons pas à pas, en langage clair, sans jargon technique."
              },
              {
                question: "C’est quoi un site vitrine ?",
                answer: "Son rôle est de présenter votre activité, vos services et vos valeurs. Sans fonctionnalités complexes comme la vente en ligne ou la gestion d'espaces clients, il se concentre sur l'essentiel : informer, inspirer confiance et attirer des clients."
              },
              {
                question: "Combien de temps faut-il pour créer mon site web ?",
                answer: "Après une consultation visio de 30 minutes, nous livrons une première version de votre site sous 7 jours seulement. Vous aurez alors la possibilité de demander des ajustements avant la mise en ligne."
              },
              {
                question: "Que se passe-t-il si le design ne me plaît pas ?",
                answer: "Nous vous présentons une première version et vous avez la possibilité de demander autant d'ajustements que nécessaire avant validation. Si vous n'êtes toujours pas satisfait, nous annulons le projet sans frais."
              },
              {
                question: "Mon activité est simple, est-ce que l'offre à 1'999 EUR est suffisante pour moi ?",
                answer: "Dans la plupart des cas, le pack à 1'999 EUR est largement suffisant pour répondre aux besoins des petites entreprises et indépendants. Il offre un site vitrine professionnel, responsive et optimisé, idéal pour présenter vos services et attirer de nouveaux clients."
              },
              {
                question: "Puis-je utiliser mon propre nom de domaine ?",
                answer: "Absolument ! Si vous possédez déjà un nom de domaine, nous pouvons l'utiliser pour votre site. Sinon, nous vous guidons pour en choisir un qui reflète au mieux votre activité."
              },
              {
                question: "Comment se passe la collaboration après la mise en ligne ?",
                answer: "Nous ne vous abandonnons pas après la mise en ligne ! Nous restons à votre disposition pour toute question ou mise à jour. Vous pouvez également opter pour notre pack de gestion afin de garantir la sécurité et l'évolution de votre site sans effort de votre part."
              },
              {
                question: "Le prix inclut-il l'hébergement ?",
                answer: "L'hébergement n'est pas inclus dans le prix de base, mais vous avez toute liberté de choisir votre propre hébergeur. Toutefois, nous proposons une solution clé en main avec notre pack premium, conçu pour garantir performance et sécurité, au même tarif qu'un hébergement classique, mais avec un accompagnement dédié."
              },
              {
                question: "Pourquoi devrais-je investir dans un site alors que je ne vends pas en ligne ?",
                answer: "Un site, c’est une vitrine accessible en permanence qui présente vos services, rassure vos clients et montre votre sérieux. Il vous rend visible, crédible et vous aide à vous démarquer dans un monde où tout passe par internet."
              },
              {
                question: "Comment puis-je vous contacter pour poser mes questions ?",
                answer: "Nous sommes à votre écoute ! Vous pouvez nous contacter à tout moment par email ou téléphone, et nous nous engageons à vous répondre sous 24 heures pour toute demande d'information ou assistance."
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white/5 hover:bg-white/10 rounded-xl overflow-hidden border border-[#B026FF]/20 hover:border-[#B026FF]/40 transition-all duration-300"
              >
                <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-white/5 transition-colors">
                  <span className="font-medium text-lg pr-4">{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-[#B026FF] transform transition-transform group-open:rotate-180" />
                </summary>
                <div className="p-6 pt-0 text-gray-300 leading-relaxed border-t border-[#B026FF]/10">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
          <div className="mt-16 text-center">
            <button
              onClick={handleStartClick}
              className="inline-flex items-center gap-3 bg-[#B026FF] px-10 py-4 rounded-full text-lg font-medium hover:bg-[#B026FF]/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95 group"
            >
              <span>Je veux mon site</span>
              <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Advanced Services Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[#B026FF]/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-6">Solutions Avancées</h2>
            <p className="text-xl text-gray-300">
              Besoin d'une solution plus complexe ? Nous créons des plateformes web sur-mesure
              pour répondre à vos besoins spécifiques à partir de <span className="text-[#B026FF] font-bold stats-glow">2'999 EUR</span>.
            </p>
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
              <div key={index} className="bg-white/5 p-8 rounded-2xl gradient-border hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-2xl font-semibold mb-4 text-[#B026FF]">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center text-white hover:text-[#B026FF] transition-colors"
                >
                  En savoir plus
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#B026FF] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#B026FF]/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95"
            >
              Démarrer votre projet
              <Rocket className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
    
  );
}

export default Home;