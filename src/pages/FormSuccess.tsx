import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Rocket } from 'lucide-react';

type SuccessContent = {
  title: string;
  description: string[];
  trackingEvent: string;
};

const successContent: Record<string, SuccessContent> = {
  'contact': {
    title: 'Merci pour toutes ces informations !',
    description: [
      'Nous vous recontacterons rapidement pour un échange d\'environ 30 minutes, afin de discuter de votre projet et de mieux comprendre vos envies et besoins avant de commencer la création de votre site web.',
      'Rappelez-vous : il n\'y a aucun risque pour vous. Vous ne payez que si vous êtes entièrement satisfait.e et souhaitez acquérir votre site.',
      'Nous savons que l\'univers du digital peut parfois sembler aussi vaste qu\'une galaxie inconnue, mais notre mission est de vous guider, étape par étape, pour que tout soit simple et fluide. Préparez-vous à voir votre projet décoller avec sérénité ! 🚀✨'
    ],
    trackingEvent: 'contact_form_success'
  },
  'contact-complex': {
    title: 'Merci pour toutes ces informations !',
    description: [
      'Nous vous recontacterons rapidement pour un échange approfondi d\'environ 45 minutes, afin de discuter en détail de votre projet et de mieux comprendre vos besoins spécifiques avant de commencer la création de votre solution sur-mesure.',
      'Nous prendrons le temps d\'analyser vos objectifs, vos contraintes et vos attentes pour vous proposer une solution parfaitement adaptée à votre situation.',
      'L\'univers du digital est vaste, mais notre expertise vous guidera vers la meilleure solution pour votre entreprise. Préparez-vous à voir votre projet prendre son envol ! 🚀✨'
    ],
    trackingEvent: 'complex_form_success'
  },
  'order': {
    title: 'Commande reçue avec succès !',
    description: [
      'Nous avons bien reçu votre commande et nous vous remercions de votre confiance.',
      'Notre équipe va analyser vos besoins en détail et reviendra vers vous sous 24h pour planifier la suite.',
      'Préparez-vous pour un décollage imminent vers votre nouveau site web ! 🚀'
    ],
    trackingEvent: 'order_form_success'
  },
  'partnership': {
    title: 'Merci pour votre demande de partenariat !',
    description: [
      'Nous avons bien reçu votre candidature et nous vous recontacterons dans les 24 heures pour discuter des détails de notre collaboration.',
      'En attendant, vous pouvez consulter notre documentation partenaire pour en savoir plus sur notre programme d\'affiliation.',
      'Préparez-vous à faire décoller vos revenus avec Orbit ! 🚀'
    ],
    trackingEvent: 'partnership_form_success'
  }
};

function FormSuccess() {
  const { formType } = useParams<{ formType: keyof typeof successContent }>();
  const content = formType ? successContent[formType] : null;

  useEffect(() => {
    if (content && window.gtag) {
      window.gtag('event', content.trackingEvent, {
        event_category: 'form',
        event_label: formType
      });
    }
  }, [content, formType]);

  if (!content) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 gradient-text">
          {content.title}
        </h2>
        <div className="space-y-6 text-gray-300">
          {content.description.map((paragraph, index) => (
            <p key={index} className={index === 2 ? "text-[#B026FF]" : ""}>
              {paragraph}
            </p>
          ))}
          <div className="mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#B026FF] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#B026FF]/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95"
            >
              <Rocket className="h-5 w-5" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormSuccess;