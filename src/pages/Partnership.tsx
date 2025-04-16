import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Rocket, Target, DollarSign, Users, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

function Partnership() {
  return (
    <>
      <Helmet>
        <title>Devenez Partenaire | Agence Orbit</title>
        <link rel="canonical" href="https://agence-orbit.fr/devenir-partenaire" />
        <meta
          name="description"
          content="Devenez partenaire d'Agence Orbit et gagnez 20% de commission sur chaque vente tout en bénéficiant d'un support marketing complet et d'une formation dédiée."
        />
      </Helmet>
      <div className="min-h-screen pt-24 pb-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 mb-20">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
            <ArrowLeft className="h-5 w-5" />
            Retour à l'accueil
          </Link>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 gradient-text">
              Devenez Partenaire Orbit et Gagnez 20% de Commission
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Rejoignez notre programme d'affiliation et générez des revenus récurrents en recommandant 
              nos services de création de sites web premium.
            </p>
            <div className="flex justify-center">
              <Link
                to="/devenir-partenaire/formulaire"
                className="inline-flex items-center gap-2 bg-[#B026FF] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#B026FF]/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95"
              >
                Devenir partenaire maintenant
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-[#B026FF]/5 py-20 mb-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "20%",
                  text: "Commission sur chaque vente"
                },
                {
                  number: "399 CHF",
                  text: "Commission moyenne par client"
                },
                {
                  number: "∞",
                  text: "Potentiel de gains illimité"
                }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-[#B026FF] mb-2 stats-glow">{stat.number}</div>
                  <div className="text-xl text-gray-300">{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comment ça marche */}
        <div className="max-w-7xl mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 text-[#B026FF]" />,
                title: "1. Recommandez Orbit",
                description: "Faites découvrir Orbit à votre entourage, clients et partenaires en leur présentant nos solutions adaptées à leurs besoins."
              },
              {
                icon: <DollarSign className="h-8 w-8 text-[#B026FF]" />,
                title: "2. Générez des revenus",
                description: "Lorsque vos contacts deviennent clients, vous recevez automatiquement une commission attractive de 20% sur chaque vente."
              },
              {
                icon: <Rocket className="h-8 w-8 text-[#B026FF]" />,
                title: "3. Suivez vos gains",
                description: "Orbit s'occupe de tout ! Vous n'avez qu'à recommander, nous assurons la conception, le suivi et la satisfaction du client."
              }
            ].map((step, index) => (
              <div key={index} className="bg-white/5 p-8 rounded-2xl gradient-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#B026FF]/20 rounded-xl">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Avantages */}
        <div className="max-w-7xl mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi devenir partenaire ?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Target className="h-6 w-6 text-[#B026FF]" />,
                title: "Un argument de vente solide",
                description: "Le client ne paie que s'il valide le service fourni, sans engagement préalable."
              },
              {
                icon: <Shield className="h-6 w-6 text-[#B026FF]" />,
                title: "Zéro risque pour vous",
                description: "Vous ne gagnez que lorsque nous réussissons ensemble."
              },
              {
                icon: <Zap className="h-6 w-6 text-[#B026FF]" />,
                title: "Simplicité garantie",
                description: "Aucune expertise technique requise, nous gérons toute la partie développement avec le client."
              },
              {
                icon: <DollarSign className="h-6 w-6 text-[#B026FF]" />,
                title: "Rémunération rapide",
                description: "Vous recevez votre commission dans les 48 heures après le paiement du client."
              }
            ].map((advantage, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white/5 rounded-xl gradient-border">
                <div className="p-3 bg-[#B026FF]/20 rounded-xl">
                  {advantage.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                  <p className="text-gray-400">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features détaillées */}
        <div className="bg-[#B026FF]/5 py-20 mb-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Ce que nous offrons à nos partenaires</h2>
            <div className="grid gap-6 max-w-3xl mx-auto">
              {[
                "Commission de 20% sur chaque vente",
                "Matériel marketing professionnel",
                "Formation complète sur nos services",
                "Support prioritaire 7j/7"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <CheckCircle2 className="h-5 w-5 text-[#B026FF] flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à développer votre activité ?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Rejoignez notre programme d'affiliation dès aujourd'hui et commencez à générer des revenus récurrents en recommandant des solutions web de qualité.
          </p>
          <Link
            to="/devenir-partenaire/formulaire"
            className="inline-flex items-center gap-2 bg-[#B026FF] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#B026FF]/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95 group"
          >
            Commencer maintenant
            <Rocket className="h-5 w-5 transform transition-transform group-hover:-rotate-45" />
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            Notre équipe vous contactera sous 48h après avoir examiné votre candidature
          </p>
        </div>
      </div>
    </>
  );
}

export default Partnership;