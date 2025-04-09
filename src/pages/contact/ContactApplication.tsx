// src/pages/contact/ContactApplication.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import ParticleBackground from '../../components/ParticleBackground';
import ShootingStar from '../../components/ShootingStarManager';
import { ArrowRight } from 'react-feather'; // Importation de l'icône ArrowRight

// Initialisation EmailJS avec la clé publique
emailjs.init("10GrUKNFZHhGzb83j");

// Fonction utilitaire pour récupérer la valeur d'un cookie
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Retourne la devise en fonction du cookie ("EUR" si 'fr', sinon "CHF")
const getCurrency = (): string => {
  return getCookie('selectedCountry') === 'fr' ? 'EUR' : 'CHF';
};

type Question = {
  id: string;
  type: 'text' | 'email' | 'radio' | 'textarea' | 'phone';
  question: string;
  description?: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
};

// Définition des questions du formulaire Application
const questions: Question[] = [
  {
    id: 'first_name',
    type: 'text',
    question: 'Quel est votre prénom ?',
    required: true,
  },
  {
    id: 'email',
    type: 'email',
    question: 'Quelle est votre adresse email ?',
    description: 'Nous utiliserons cette adresse pour vous contacter',
    placeholder: 'email@domaine.com',
    required: true,
  },
  {
    id: 'phone',
    type: 'phone',
    question: 'Votre numéro de téléphone',
    description: 'Pour vous joindre rapidement',
    placeholder: '077 000 00 00',
    required: true,
  },
  {
    id: 'app_type',
    type: 'radio',
    question: 'Quel type d’application souhaitez-vous réaliser ?',
    options: ['Application Web', 'Application Mobile', 'Application Hybride'],
    required: true,
  },
  {
    id: 'features',
    type: 'textarea',
    question: 'Avez-vous des idées précises quant aux fonctionnalités ou besoins spécifiques ?',
    placeholder: 'Décrivez vos idées et besoins...',
    required: false,
  },
  {
    id: 'budget',
    type: 'radio',
    question: 'Quel est votre budget ?',
    options: ["de 10'000", "10'000-19'999", "20'000-39'999", "40'000 ou plus"],
    required: true,
  },
];

type Answers = Record<string, string>;

const ContactApplication: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Animation du titre inspirée du style Hero
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  // Expression régulière stricte pour la validation d'email
  const isValidEmail = (email: string): boolean => {
    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return pattern.test(email);
  };

  // Gestion de la touche Enter dans les inputs (sauf pour le dernier champ)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (currentStep < questions.length - 1 && canProceed()) {
        handleNext();
      }
    }
  };

  // Vérifie si la réponse pour la question courante est valide
  const canProceed = (): boolean => {
    const currentQuestion = questions[currentStep];
    const answer = answers[currentQuestion.id]?.trim() || '';
    if (currentQuestion.required && answer === '') return false;
    if (currentQuestion.type === 'email' && answer && !isValidEmail(answer)) return false;
    return true;
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1 && canProceed()) {
      setEmailError('');
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateAnswer = (value: string) => {
    if (questions[currentStep].type === 'email') {
      if (!isValidEmail(value.trim())) {
        setEmailError("Veuillez renseigner un email valide (exemple : ab@cde.fg)");
      } else {
        setEmailError('');
      }
    }
    setAnswers(prev => ({
      ...prev,
      [questions[currentStep].id]: value,
    }));
  };

  // Soumission via EmailJS avec vérification du champ anti-bot
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Vérification du champ honeypot anti-bot
  const form = e.target as HTMLFormElement;
  const botField = form.elements.namedItem('bot-field') as HTMLInputElement;
  if (botField && botField.value) {
    console.warn("Détection bot");
    return;
  }

  if (!canProceed() || currentStep < questions.length - 1) return;
  setIsSubmitting(true);

  // Récupération du cookie et détermination de la provenance
  const cookieValue = getCookie('selectedCountry');
  console.log("Cookie selectedCountry:", cookieValue);
  let provenanceValue = "inconnu";
  if (cookieValue) {
    const lowerValue = cookieValue.toLowerCase();
    if (lowerValue === "fr") {
      provenanceValue = "France";
    } else if (lowerValue === "ch") {
      provenanceValue = "Suisse";
    }
  }

  // Préparation du payload en intégrant la valeur "provenance"
  const payload = {
    from_name: answers.first_name,
    reply_to: answers.email,
    phone: answers.phone,
    app_type: answers.app_type,
    features: answers.features,
    budget: answers.budget,
    provenance: provenanceValue, // Utilisation de la valeur calculée
    offer_title: "Demande d'application personnalisée",
  };

  try {
    const result = await emailjs.send('service_5dmv8dr', 'template_jmkw4hh', payload);
    console.log('EmailJS result:', result);
    setSubmitSuccess(true);
    setTimeout(() => {
      navigate('/success/contact');
    }, 1000);
  } catch (error) {
    console.error('Erreur lors de l’envoi du formulaire:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  // Rendu des questions en fonction du type
  const renderQuestion = () => {
    const q = questions[currentStep];
    switch (q.type) {
      case 'text':
      case 'email':
        return (
          <>
            <input
              type={q.type}
              value={answers[q.id] || ''}
              onChange={(e) => updateAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={q.placeholder}
              className="w-full p-4 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white placeholder-gray-500"
              required={q.required}
            />
            {q.type === 'email' && emailError && (
              <p className="mt-2 text-sm text-red-500">{emailError}</p>
            )}
          </>
        );
      case 'phone':
        return (
          <input
            type="tel"
            value={answers[q.id] || ''}
            onChange={(e) => updateAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={q.placeholder}
            className="w-full p-4 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white placeholder-gray-500"
            required={q.required}
          />
        );
      case 'radio':
        return (
          <div className="flex flex-wrap gap-4">
            {q.options?.map((option) => {
              // Pour la question du budget, on préfixe l'option avec la devise
              const displayOption = q.id === 'budget' ? `${getCurrency()} ${option}` : option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateAnswer(option)}
                  className={`px-4 py-2 rounded-xl transition ${
                    answers[q.id] === option ? 'bg-[#B026FF] text-white' : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {displayOption}
                </button>
              );
            })}
          </div>
        );
      case 'textarea':
        return (
          <textarea
            value={answers[q.id] || ''}
            onChange={(e) => updateAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={q.placeholder}
            rows={4}
            className="w-full p-4 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white placeholder-gray-500 resize-none"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Application Personnalisée | Agence Orbit</title>
        <meta
          name="description"
          content="Demandez une application personnalisée adaptée à vos besoins et à votre budget."
        />
        <style>{`html, body { overflow: hidden; }`}</style>
      </Helmet>

      {/* Fond animé et overlays */}
      <div className="relative w-screen h-screen bg-dark-900 overflow-hidden">
        <ParticleBackground />
        <ShootingStar />
        <div className="absolute inset-0 scanning-line pointer-events-none"></div>
        <div className="absolute inset-0 grid-background opacity-15 -z-10"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay -z-20"></div>

        {/* Contenu du formulaire */}
        <div className="relative z-30 flex flex-col items-center justify-center h-full px-4">
          {/* Titre hero */}
          <motion.h1
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-center gradient-text drop-shadow-lg"
          >
            <span className="bg-gradient-to-r from-[#B026FF] via-fuchsia-400 to-[#B026FF] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(176,38,255,0.6)]">
              Demande d&apos;application personnalisée.
            </span>
          </motion.h1>
          <motion.p
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-white mb-12 text-center max-w-2xl"
          >
            Laissez-nous réaliser l&apos;application qui vous ressemble.
          </motion.p>

          {/* Formulaire multi‑étapes */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (currentStep === questions.length - 1 && canProceed()) {
                handleSubmit(e);
              }
            }}
            className="w-full max-w-xl bg-white/10 p-8 rounded-2xl shadow-2xl"
          >
            {/* Honeypot anti-bot renforcé */}
            <input
              type="text"
              name="bot-field"
              autoComplete="off"
              tabIndex={-1}
              style={{ display: 'none' }}
            />
            {/* Champ caché pour transmettre la devise (cookie) */}
            <input type="hidden" name="selectedCountry" value={getCookie('selectedCountry') || ''} />

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-3">
                {questions[currentStep].question}
              </h2>
              {questions[currentStep].description && (
                <p className="text-gray-400 mb-4">{questions[currentStep].description}</p>
              )}
              {renderQuestion()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 transition"
                >
                  Précédent
                </button>
              )}
              {currentStep < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="ml-auto flex items-center px-8 py-3 rounded-full bg-[#B026FF] hover:bg-[#B026FF]/80 transition text-white"
                >
                  Suivant <ArrowRight className="ml-1 h-5 w-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canProceed() || isSubmitting}
                  className="ml-auto px-8 py-3 rounded-full bg-[#B026FF] hover:bg-[#B026FF]/80 transition text-white"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer 🚀'}
                </button>
              )}
            </div>
          </form>

          {/* Overlay de chargement lors de la soumission */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#B026FF]"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactApplication;