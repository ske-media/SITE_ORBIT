import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ArrowLeft, ArrowRight, Send, Check, Loader } from 'lucide-react';

const countryTranslations = {
  fr: {
    // Same translations as FirstContactForm
    'France': 'France',
    'Switzerland': 'Suisse',
    'Belgium': 'Belgique',
    // ... (keeping the same translations)
  }
};

type Question = {
  id: string;
  type: 'text' | 'email' | 'radio' | 'textarea' | 'checkbox' | 'table';
  question: string;
  description?: string;
  options?: string[];
  rows?: string[];
  columns?: string[];
  placeholder?: string;
  required?: boolean;
  section?: string;
};

const questions: Question[] = [
  // Section 1: Informations personnelles
  {
    id: 'first_name',
    type: 'text',
    question: 'Quel est votre prénom ?',
    section: 'Informations personnelles',
    required: true
  },
  {
    id: 'email',
    type: 'email',
    question: 'Quelle est votre adresse email ?',
    description: 'Nous utiliserons cette adresse pour vous recontacter',
    placeholder: 'exemple@email.com',
    required: true
  },
  {
    id: 'company_name',
    type: 'text',
    question: 'Quel est le nom de votre entreprise ?',
    section: 'Informations sur l\'entreprise',
    required: true
  },
  {
    id: 'current_website',
    type: 'text',
    question: 'Quelle est l\'adresse de votre site web actuel (si applicable) ?',
    placeholder: 'https://...',
    required: false
  },
  {
    id: 'business_description',
    type: 'textarea',
    question: 'Pouvez-vous nous décrire brièvement votre activité ?',
    description: 'Quel service proposez-vous ou dans quel domaine évoluez-vous ?',
    required: true
  },
  // Section 2: Besoins spécifiques
  {
    id: 'project_type',
    type: 'radio',
    question: 'Quel type de projet souhaitez-vous réaliser ?',
    section: 'Votre Projet',
    options: [
      'Site e-commerce',
      'Système de réservation',
      'Plateforme communautaire',
      'Espace membres',
      'Autre'
    ],
    required: true
  },
  {
    id: 'specific_features',
    type: 'checkbox',
    question: 'Quelles fonctionnalités spécifiques vous intéressent ?',
    options: [
      'Paiement en ligne',
      'Gestion de stock',
      'Système de réservation',
      'Espace membres',
      'Forum/Communauté',
      'Blog intégré',
      'Automatisations',
      'Intégrations API',
      'Je ne suis pas sûr.e'
    ],
    required: true
  },
  {
    id: 'project_goals',
    type: 'textarea',
    question: 'Quels sont vos objectifs principaux avec ce projet ?',
    description: 'Ex: Augmenter les ventes, automatiser les réservations, créer une communauté...',
    required: true
  },
  {
    id: 'timeline',
    type: 'radio',
    question: 'Quel est votre calendrier souhaité pour ce projet ?',
    options: [
      'Le plus tôt possible',
      'Dans les 3 mois',
      'Dans les 6 mois',
      'Pas de délai particulier'
    ],
    required: true
  },
  {
    id: 'budget_range',
    type: 'radio',
    question: 'Quel est votre budget ?',
    description: 'Cette information nous aide à vous proposer une solution adaptée',
    options: [
      '3\'000 - 5\'000 CHF',
      '5\'000 - 10\'000 CHF',
      '10\'000 - 20\'000 CHF',
      'Plus de 20\'000 CHF',
      'À définir'
    ],
    required: true
  },
  {
    id: 'phone',
    type: 'phone',
    question: 'Votre numéro de téléphone',
    description: 'Pour vous contacter plus facilement',
    required: true
  }
];

function FirstContactFormComplexSite() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
  const navigate = useNavigate();

  const FORM_ENDPOINT = 'https://api.staticforms.xyz/submit';

  const submitPartialForm = async () => {
    if (answers.email && answers.email !== lastSubmittedEmail) {
      // Préparer les données dans le format attendu par StaticForms
      const formData = {
        accessKey: '13c4808a-4972-42e9-ae15-c09f728d0933',
        subject: '[PARTIEL] Nouveau contact projet complexe - Orbit',
        message: `Email: ${answers.email}`,
        email: answers.email,
        replyTo: answers.email,
        honeypot: ''
      };

      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      setLastSubmittedEmail(answers.email);
    }
  };
  
  useEffect(() => {
    setCurrentQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsTransitioning(true);
      if (currentQuestion.id === 'email' && canProceed()) {
        submitPartialForm();
      }
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Préparer les données pour Netlify Forms
      const formData = new FormData();
      formData.append('form-name', 'contact-complex');
      
      // Ajouter toutes les réponses
      Object.entries(answers).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      navigate('/success/contact-complex');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && canProceed()) {
      handleNext();
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestionIndex, answers]);

  const updateAnswer = (value: string | string[]) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value
    };
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
    
    // Submit partial form immediately when email is entered and valid
    if (currentQuestion.id === 'email' && value) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(value as string)) {
        submitPartialForm();
      }
    }
  };

  const canProceed = () => {
    if (!currentQuestion.required) return true;
    if (!answers[currentQuestion.id]) return false;

    if (currentQuestion.type === 'email') {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(answers[currentQuestion.id] as string);
    }

    return true;
  };


  return (
    <div className="min-h-screen pt-16 flex flex-col">
      {/* Netlify Forms hidden form */}
      <form name="contact-complex" data-netlify="true" hidden>
        <input type="text" name="first_name" />
        <input type="email" name="email" />
        <input type="text" name="company_name" />
        <input type="text" name="current_website" />
        <textarea name="business_description"></textarea>
        <input type="text" name="project_type" />
        <input type="text" name="specific_features" />
        <textarea name="project_goals"></textarea>
        <input type="text" name="timeline" />
        <input type="text" name="budget_range" />
        <input type="text" name="phone" />
      </form>

      {/* Progress bar */}
      <div className="fixed top-16 left-0 w-full h-1 bg-[#B026FF]/20">
        <div 
          className="h-full bg-[#B026FF] transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div 
          className={`max-w-2xl w-full transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Section title */}
          {currentQuestion?.section && (
            <div className="text-[#B026FF] font-medium mb-4">
              {currentQuestion.section}
            </div>
          )}

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-3 gradient-text">
              {currentQuestion?.question}
            </h2>
            {currentQuestion?.description && (
              <p className="text-gray-400">{currentQuestion.description}</p>
            )}
          </div>

          {/* Input */}
          <div className="mb-8">
            {currentQuestion?.type === 'radio' && (
              <div className="grid gap-4">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      updateAnswer(option);
                      setTimeout(handleNext, 300);
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      answers[currentQuestion.id] === option
                        ? 'bg-[#B026FF] text-white'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'checkbox' && (
              <div className="grid gap-4">
                {currentQuestion.options?.map((option) => {
                  const currentAnswers = (answers[currentQuestion.id] as string[]) || [];
                  const isSelected = currentAnswers.includes(option);
                  
                  return (
                    <button
                      key={option}
                      onClick={() => {
                        const newAnswers = isSelected
                          ? currentAnswers.filter(a => a !== option)
                          : [...currentAnswers, option];
                        updateAnswer(newAnswers);
                      }}
                      className={`w-full p-4 rounded-xl text-left transition-all flex items-center ${
                        isSelected
                          ? 'bg-[#B026FF] text-white'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                        isSelected ? 'border-white bg-white' : 'border-[#B026FF]'
                      }`}>
                        {isSelected && (
                          <Check className={`w-4 h-4 ${isSelected ? 'text-[#B026FF]' : 'text-white'}`} />
                        )}
                      </div>
                      {option}
                    </button>
                  );
                })}
              </div>
            )}

            {(currentQuestion.type === 'text' || currentQuestion.type === 'email') && (
              <input
                type={currentQuestion.type}
                pattern={currentQuestion.type === 'email' ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" : undefined}
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => updateAnswer(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className={`w-full p-4 bg-white/5 rounded-xl focus:outline-none focus:ring-2 ${
                  currentQuestion.type === 'email' && answers[currentQuestion.id] && !canProceed()
                    ? 'focus:ring-red-500 ring-2 ring-red-500'
                    : 'focus:ring-[#B026FF]'
                } text-white placeholder-gray-500`}
              />
            )}

            {currentQuestion.type === 'phone' && (
              <PhoneInput
                country={'ch'}
                preferredCountries={['ch', 'fr']}
                value={answers[currentQuestion.id] || ''}
                onChange={(phone) => updateAnswer(phone)}
                localization={countryTranslations.fr}
                containerClass="phone-input-container"
                inputClass="!w-full !p-4 !bg-[rgba(255,255,255,0.05)] !rounded-xl !text-white !border-0 focus:!ring-2 focus:!ring-[#B026FF] !outline-none"
                buttonClass="!bg-[rgba(255,255,255,0.05)] !border-0 !rounded-l-xl"
                dropdownClass="!bg-black !text-white"
                searchClass="!bg-[rgba(255,255,255,0.05)] !text-white"
                enableSearch={true}
              />
            )}

            {currentQuestion.type === 'textarea' && (
              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => updateAnswer(e.target.value)}
                placeholder={currentQuestion.placeholder}
                rows={6}
                className="w-full p-4 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white placeholder-gray-500 resize-none"
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition ${
                currentQuestionIndex === 0
                  ? 'opacity-0 cursor-default'
                  : 'hover:bg-white/10'
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
              Précédent
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-3 rounded-full transition relative ${
                  canProceed()
                    ? 'bg-[#B026FF] hover:bg-[#B026FF]/80'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
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
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-3 rounded-full transition ${
                  canProceed()
                    ? 'bg-[#B026FF] hover:bg-[#B026FF]/80'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                Suivant
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-400">
        Appuyez sur <kbd className="px-2 py-1 bg-white/10 rounded">Entrée ↵</kbd> pour continuer
      </div>
    </div>
  );
}

export default FirstContactFormComplexSite;