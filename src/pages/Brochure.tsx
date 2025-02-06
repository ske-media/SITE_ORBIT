import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Rocket, Shield, Zap, Clock, Users, ArrowRight, Monitor, Mail } from 'lucide-react';

function Brochure() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <ArrowLeft className="h-5 w-5" />
          Retour à l'accueil
        </Link>

        {/* Contrôles */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setIsFlipped(false)}
            className={`px-6 py-2 rounded-full transition ${
              !isFlipped ? 'bg-[#B026FF] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Recto
          </button>
          <button
            onClick={() => setIsFlipped(true)}
            className={`px-6 py-2 rounded-full transition ${
              isFlipped ? 'bg-[#B026FF] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Verso
          </button>
        </div>

        {/* Dépliant */}
        <div className="grid md:grid-cols-3 gap-4 max-w-[1050px] mx-auto">
          {!isFlipped ? (
            // RECTO
            <>
              {/* Volet 1 */}
              <div className="bg-gradient-to-br from-[#B026FF]/20 to-black p-8 rounded-2xl border border-[#B026FF]/20 space-y-6 aspect-[1.414/3]">
                <div className="h-32 w-32 mx-auto mb-8">
                  <img src="https://i.imgur.com/aM3st2Q.png" alt="Orbit Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-3xl font-bold text-center gradient-text">
                  Votre Site Web Sur-Mesure
                </h1>
                <p className="text-gray-300 text-center">
                  Une solution clé en main pour booster votre présence en ligne
                </p>
                <div className="text-center text-4xl font-bold text-[#B026FF] stats-glow">
                  1'999 CHF
                </div>
                <p className="text-center text-sm text-gray-400">
                  Paiement uniquement après satisfaction
                </p>
              </div>

              {/* Volet 2 */}
              <div className="bg-white/5 p-8 rounded-2xl border border-[#B026FF]/20 space-y-6 aspect-[1.414/3]">
                <h2 className="text-2xl font-bold mb-6">Notre Promesse</h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Clock className="h-6 w-6 text-[#B026FF]" />,
                      text: "Première version en 7 jours"
                    },
                    {
                      icon: <Shield className="h-6 w-6 text-[#B026FF]" />,
                      text: "Paiement après satisfaction"
                    },
                    {
                      icon: <Zap className="h-6 w-6 text-[#B026FF]" />,
                      text: "Modifications illimitées"
                    },
                    {
                      icon: <Users className="h-6 w-6 text-[#B026FF]" />,
                      text: "Support 7j/7"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-2 bg-[#B026FF]/10 rounded-lg">
                        {item.icon}
                      </div>
                      <span className="text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volet 3 */}
              <div className="bg-white/5 p-8 rounded-2xl border border-[#B026FF]/20 aspect-[1.414/3]">
                <h2 className="text-2xl font-bold mb-6">Inclus</h2>
                <ul className="space-y-3">
                  {[
                    "Design sur-mesure",
                    "Optimisé pour mobile",
                    "Hébergement sécurisé",
                    "Nom de domaine",
                    "Formulaire de contact",
                    "Intégration réseaux sociaux",
                    "Statistiques de visite",
                    "Support technique",
                    "Formation utilisation",
                    "Maintenance mensuelle"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[#B026FF]" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            // VERSO
            <>
              {/* Volet 1 */}
              <div className="bg-white/5 p-8 rounded-2xl border border-[#B026FF]/20 aspect-[1.414/3]">
                <h2 className="text-2xl font-bold mb-6">Notre Processus</h2>
                <div className="space-y-6">
                  {[
                    {
                      step: "1",
                      title: "Consultation",
                      text: "Discussion de vos besoins et objectifs"
                    },
                    {
                      step: "2",
                      title: "Design",
                      text: "Création de votre maquette personnalisée"
                    },
                    {
                      step: "3",
                      title: "Ajustements",
                      text: "Modifications selon vos retours"
                    },
                    {
                      step: "4",
                      title: "Validation",
                      text: "Approbation finale et mise en ligne"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#B026FF]/20 flex items-center justify-center text-[#B026FF] font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volet 2 */}
              <div className="bg-white/5 p-8 rounded-2xl border border-[#B026FF]/20 aspect-[1.414/3]">
                <h2 className="text-2xl font-bold mb-6">Options de Gestion</h2>
                <div className="space-y-8">
                  {[
                    {
                      title: "Pack Essentiel",
                      price: "50 CHF",
                      features: [
                        "Nom de domaine",
                        "Hébergement",
                        "Certificat SSL",
                        "Sauvegardes",
                        "Mises à jour"
                      ]
                    },
                    {
                      title: "Pack Premium",
                      price: "100 CHF",
                      features: [
                        "Pack Essentiel +",
                        "Support prioritaire",
                        "Modifications mineures",
                        "Rapports mensuels",
                        "Maintenance"
                      ]
                    }
                  ].map((pack, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-xl">
                      <h3 className="font-semibold text-[#B026FF] mb-2">{pack.title}</h3>
                      <div className="text-xl font-bold mb-3">{pack.price}<span className="text-sm text-gray-400">/mois</span></div>
                      <ul className="space-y-2">
                        {pack.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-300">
                            <Check className="h-4 w-4 text-[#B026FF]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volet 3 */}
              <div className="bg-white/5 p-8 rounded-2xl border border-[#B026FF]/20 aspect-[1.414/3]">
                <h2 className="text-2xl font-bold mb-6">Contactez-nous</h2>
                <div className="space-y-6">
                  <p className="text-gray-300">
                    Prêt à lancer votre projet ? Contactez-nous dès maintenant pour une consultation gratuite.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#B026FF]/10 rounded-lg">
                        <Monitor className="h-6 w-6 text-[#B026FF]" />
                      </div>
                      <a href="https://agence-orbit.ch" className="text-gray-300 hover:text-white transition">
                        agence-orbit.ch
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#B026FF]/10 rounded-lg">
                        <Mail className="h-6 w-6 text-[#B026FF]" />
                      </div>
                      <a href="mailto:contact@agence-orbit.ch" className="text-gray-300 hover:text-white transition">
                        contact@agence-orbit.ch
                      </a>
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-[#B026FF] px-6 py-3 rounded-full hover:bg-[#B026FF]/80 transition mt-4"
                  >
                    Démarrer mon projet
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Brochure;