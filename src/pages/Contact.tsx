// src/pages/Contact.tsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import ParticleBackground from '../../components/ParticleBackground';
import ShootingStar from '../../components/ShootingStarManager';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ArrowLeft, ArrowRight, Send, Check, Loader } from 'lucide-react';

// Initialisation d'EmailJS avec la clé publique
emailjs.init("10GrUKNFZHhGzb83j");

// Fonction utilitaire pour récupérer la valeur d'un cookie
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Formate le prix, en CHF par défaut et en EUR si le cookie "selectedCountry" est "fr"
const formatPrice = (amount: number): string => {
  const selectedCountry = getCookie('selectedCountry');
  const currency = selectedCountry === 'fr' ? 'EUR' : 'CHF';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

type Question = {
  id: string;
  type: 'text' | 'email' | 'radio' | 'textarea' | 'phone';
  question: string;
  description?: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  section?: string;
};

// Définition des questions du formulaire multi‑étapes
const questions: Question[] = [
  {
    id: 'first_name',
    type: 'text',
    question: 'Quel est votre prénom ?',
    section: 'Informations personnelles',
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
    id: 'multilingual',
    type: 'radio',
    question: 'Votre site doit-il être multilingue ?',
    options: ['Oui', 'Non'],
    required: true,
  },
  {
    id: 'charte_graphique',
    type: 'radio',
    question: 'Souhaitez-vous que nous réalisions également une charte graphique personnalisée ? (Supplément)',
    options: ['Oui', 'Non'],
    required: true,
  },
];

type Answers = Record<string, string>;

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  const FORM_ENDPOINT = 'https://api.staticforms.xyz/submit'; // Non utilisé ici puisque l'envoi se fait via EmailJS

  // Variante pour l'animation du titre
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  // Validation simple de l'email
  const isValidEmail = (email: string): boolean => {
    const pattern = /^[A-Za-z]{2,}@[A-Za-z]{3,}\.[A-Za-z]{2,}$/;
    return pattern.test(email);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (currentStep < questions.length - 1 && canProceed()) {
        handleNext();
      }
    }
  };

  const canProceed = (): boolean => {
    const q = questions[currentStep];
    const answer = answers[q.id]?.trim() || '';
    if (q.required && answer === '') return false;
    if (q.type === 'email' && answer && !isValidEmail(answer)) return false;
    return true;
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1 && canProceed()) {
      setEmailError('');
      setIsTransitioning(true);
      // Envoi partiel pour l'email dès validation
      if (questions[currentStep].id === 'email') {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(answers.email || '')) {
          submitPartialForm();
        }
      }
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const submitPartialForm = async () => {
    if (answers.email && answers.email !== lastSubmittedEmail) {
      const formData = {
        accessKey: '13c4808a-4972-42e9-ae15-c09f728d0933',
        subject: '[PARTIEL] Nouveau contact - Orbit',
        message: `Email: ${answers.email}`,
        email: answers.email,
        replyTo: answers.email,
        honeypot: ''
      };

      console.log('Submitting partial form:', formData);

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Réseau non ok');
        const result = await response.json();
        console.log('Partial form submission response:', result);
      } catch (error) {
        console.error('Error submitting partial form:', error);
      }
      setLastSubmittedEmail(answers.email);
    }
  };

  const updateAnswer = (value: string | string[]) => {
    if (questions[currentStep].type === 'email') {
      if (!isValidEmail((value as string).trim())) {
        setEmailError("Veuillez renseigner un email valide (exemple : ab@cde.fg)");
      } else {
        setEmailError('');
      }
    }
    setAnswers(prev => ({
      ...prev,
      [questions[currentStep].id]: Array.isArray(value) ? value.join(', ') : value,
    }));

    if (questions[currentStep].id === 'email' && value) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(value as string)) {
        console.log('Valid email entered, submitting partial form');
        submitPartialForm();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Vérification anti-bot (honeypot)
    const form = e.target as HTMLFormElement;
    const botField = form.elements.namedItem('bot-field') as HTMLInputElement;
    if (botField && botField.value) {
      console.warn("Détection bot");
      return;
    }
    if (!canProceed() || currentStep < questions.length - 1) return;
    setIsSubmitting(true);
    const payload = {
      from_name: answers.first_name,
      reply_to: answers.email,
      phone: answers.phone,
      multilingual: answers.multilingual,
      charte_graphique: answers.charte_graphique,
      offer_title: 'Un site vitrine sur mesure',
      price: formatPrice(2000),
    };
    try {
      const result = await emailjs.send('service_5dmv8dr', 'template_4yw9i4o', payload);
      console.log('EmailJS result:', result);
      setFormSuccess(true);
      setTimeout(() => {
        navigate('/success');
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de l’envoi du formulaire:', error);
      setFormError('Une erreur est survenue lors de l’envoi du formulaire. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Tracker le début du formulaire si besoin avec votre outil analytics
    // trackFormInteraction('contact_form', 'start');
    setCurrentQuestion(questions[currentStep]);
  }, [currentStep]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && canProceed()) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, answers]);

  const isLastQuestion = currentStep === questions.length - 1;

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
          <PhoneInput
            country={'ch'}
            preferredCountries={['ch', 'fr']}
            value={answers[q.id] || ''}
            onChange={(phone) => updateAnswer(phone)}
            localization={countryTranslations.fr}
            containerClass="phone-input-container"
            inputClass="!w-full !p-4 !bg-[rgba(255,255,255,0.05)] !rounded-xl !text-white !border-0 focus:!ring-2 focus:!ring-[#B026FF] !outline-none"
            buttonClass="!bg-[rgba(255,255,255,0.05)] !border-0 !rounded-l-xl"
            dropdownClass="!bg-black !text-white"
            searchClass="!bg-[rgba(255,255,255,0.05)] !text-white"
            enableSearch={true}
          />
        );
      case 'radio':
        return (
          <div className="flex flex-wrap gap-4">
            {q.options?.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  updateAnswer(option);
                  setTimeout(handleNext, 300);
                }}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  answers[q.id] === option
                    ? 'bg-[#B026FF] text-white'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      case 'textarea':
        return (
          <textarea
            value={answers[q.id] || ''}
            onChange={(e) => updateAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={q.placeholder}
            rows={6}
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
        <title>Site Vitrine | Agence Orbit</title>
        <meta name="description" content="Découvrez notre offre Site Vitrine sur mesure à un prix fixe de 2000, livraison en 7 jours - Payez uniquement si vous êtes 100% satisfait." />
        <style>{`html, body { overflow: hidden; }`}</style>
      </Helmet>

      <div className="relative w-screen h-screen bg-dark-900 overflow-hidden">
        <ParticleBackground />
        <ShootingStar />
        <div className="absolute inset-0 scanning-line pointer-events-none"></div>
        <div className="absolute inset-0 grid-background opacity-15 -z-10"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay -z-20"></div>

        <div className="relative z-30 flex flex-col items-center justify-center h-full px-4">
          {/* Titre hero */}
          <motion.h1
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-center gradient-text drop-shadow-lg"
          >
            <span className="bg-gradient-to-r from-[#B026FF] via-fuchsia-400 to-[#B026FF] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(176,38,255,0.6)]">
              Un site vitrine sur mesure.
            </span>
          </motion.h1>
          <motion.p
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-white mb-12 text-center max-w-2xl"
          >
            Payez uniquement si vous êtes 100% satisfait.
          </motion.p>

          <form onSubmit={(e) => {
              e.preventDefault();
              if (currentStep === questions.length - 1 && canProceed()) {
                handleSubmit();
              }
            }}
            className="w-full max-w-xl bg-white/10 p-8 rounded-2xl shadow-2xl"
          >
            <input type="text" name="bot-field" autoComplete="off" tabIndex={-1} style={{ display: 'none' }} />
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-3 gradient-text">
                {currentQuestion?.question}
              </h2>
              {currentQuestion?.description && (
                <p className="text-gray-400 mb-4">{currentQuestion.description}</p>
              )}
              {renderQuestion()}
            </div>

            <div className="flex justify-between items-center">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 transition flex items-center gap-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Précédent
                </button>
              )}
              {isLastQuestion ? (
                <button
                  type="submit"
                  disabled={!canProceed() || isSubmitting}
                  className="ml-auto flex items-center gap-2 px-8 py-3 rounded-full transition relative bg-[#B026FF] hover:bg-[#B026FF]/80 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="ml-auto flex items-center gap-2 px-8 py-3 rounded-full transition flex items-center gap-2 bg-[#B026FF] hover:bg-[#B026FF]/80 text-white"
                >
                  Suivant
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>

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

export default Contact;