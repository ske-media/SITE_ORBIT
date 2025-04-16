import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Rocket, Calendar, Mail, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Merci | Agence Orbit</title>
        <link rel="canonical" href="https://agence-orbit.fr/success" />
        <meta
          name="description"
          content="Votre demande a bien été envoyée ! Nous vous remercions de votre confiance et vous contacterons sous peu."
        />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-[#B026FF] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <Check className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 bg-[#B026FF] rounded-full animate-ping opacity-20"></div>
            </div>
            <h1 className="text-4xl font-bold mb-4 gradient-text">Merci pour votre confiance !</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Nous avons bien reçu votre demande et nous sommes impatients de commencer à travailler sur votre projet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-[#B026FF]/20">
              <h2 className="text-2xl font-bold mb-6">Prochaines étapes</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#B026FF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#B026FF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Premier contact</h3>
                    <p className="text-gray-400">Nous vous appellerons dans les 24h pour discuter de votre projet</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#B026FF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-[#B026FF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Planification</h3>
                    <p className="text-gray-400">Nous définirons ensemble le planning et les détails de votre site</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#B026FF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-5 h-5 text-[#B026FF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Démarrage</h3>
                    <p className="text-gray-400">Première version de votre site livrée sous 7 jours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-[#B026FF]/20">
              <h2 className="text-2xl font-bold mb-6">Besoin de nous contacter ?</h2>
              <div className="space-y-6">
                <a
                  href="tel:+41228860069"
                  className="flex items-center gap-4 text-gray-400 hover:text-white transition group"
                >
                  <div className="w-8 h-8 bg-[#B026FF]/20 rounded-full flex items-center justify-center group-hover:bg-[#B026FF]/30 transition">
                    <Phone className="w-5 h-5 text-[#B026FF]" />
                  </div>
                  <span>022 886 00 69</span>
                </a>
                <a
                  href="mailto:info@agence-orbit.ch"
                  className="flex items-center gap-4 text-gray-400 hover:text-white transition group"
                >
                  <div className="w-8 h-8 bg-[#B026FF]/20 rounded-full flex items-center justify-center group-hover:bg-[#B026FF]/30 transition">
                    <Mail className="w-5 h-5 text-[#B026FF]" />
                  </div>
                  <span>info@agence-orbit.ch</span>
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 bg-[#B026FF] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#B026FF]/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95"
            >
              Retour à l'accueil
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;