import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Send, Check, Loader } from 'lucide-react';

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
  {
    id: 'hosting',
    type: 'radio',
    question: 'Avez-vous un hébergement ?',
    options: ['Oui', 'Non', 'Je ne sais pas'],
    required: true
  },
  {
    id: 'domain',
    type: 'radio',
    question: 'Avez-vous un nom de domaine ?',
    options: ['Oui', 'Non', 'Je ne sais pas'],
    required: true
  },
  {
    id: 'essential_elements',
    type: 'checkbox',
    question: 'Quels sont les éléments essentiels à inclure sur votre site ?',
    options: [
      'Tarifs',
      'Témoignages',
      'Menu',
      'Avis Clients',
      'Horaires',
      'Formulaire de contact',
      'Outil de réservation',
      'Adresse',
      'Je ne suis pas sûr.e'
    ],
    required: true
  },
  // Section 3 : Le design
  {
    id: 'site_examples',
    type: 'textarea',
    question: 'Avez-vous des exemples de sites que vous aimez ?',
    description: 'Vous pouvez copier les liens ici',
    section: 'Le design',
    required: false
  },
  {
    id: 'graphic_elements',
    type: 'radio',
    question: 'Avez-vous déjà des éléments graphiques ?',
    options: ['Logo', 'Images', 'Vidéos', 'Aucun', 'Autre'],
    required: true
  },
  {
    id: 'graphic_evolution',
    type: 'table',
    question: 'Souhaitez-vous faire évoluer vos éléments graphiques actuels ou les conserver tels quels ?',
    rows: ['Logo', 'Couleurs', 'Typographies'],
    columns: ['Conservation totale', 'Légères retouches', 'Transformation complète', 'Je ne sais pas'],
    required: true
  },
  // Section 4 : Contact
  {
    id: 'contact_preference',
    type: 'checkbox',
    question: 'Comment préférez-vous être contacté.e pour discuter du projet ?',
    section: 'Contact',
    options: [
      'Visio-call (Google Meet)',
      'Visio-call (Zoom)',
      'Appel téléphonique',
      'Appel via Whatsapp',
      'RDV physique (disponible selon la localisation)'
    ],
    required: true
  },
  {
    id: 'phone',
    type: 'text',
    question: 'Quel est votre numéro de téléphone ?',
    required: true
  }
];

function OrderForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsTransitioning(true);
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
      // Préparer les données dans le format attendu par StaticForms
      const formData = {
        accessKey: '13c4808a-4972-42e9-ae15-c09f728d0933',
        subject: 'Nouvelle commande - Orbit',
        message: Object.entries(answers)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n'),
        email: answers.email,
        replyTo: answers.email,
        honeypot: ''
      };

      await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      setShowThankYou(true);
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
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const canProceed = () => {
    return answers[currentQuestion.id] || !currentQuestion.required;
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen pt-16 flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-3xl font-bold mb-8 gradient-text">
          Merci pour toutes ces informations !
        </h2>
        <div className="max-w-2xl space-y-6 text-gray-300">
          <p>
            Nous vous recontacterons rapidement pour un échange d'environ 30 minutes, afin de 
            discuter de votre projet et de mieux comprendre vos envies et besoins avant de 
            commencer la création de votre site web.
          </p>
          <p>
            Rappelez-vous : il n'y a aucun risque pour vous. Vous ne payez que si vous êtes 
            entièrement satisfait.e et souhaitez acquérir votre site.
          </p>
          <p className="text-[#B026FF]">
            Nous savons que l'univers du digital peut parfois sembler aussi vaste qu'une 
            galaxie inconnue, mais notre mission est de vous guider, étape par étape, pour 
            que tout soit simple et fluide. Préparez-vous à voir votre projet décoller avec 
            sérénité ! 🚀✨
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 flex flex-col">
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
          {currentQuestion.section && (
            <div className="text-[#B026FF] font-medium mb-4">
              {currentQuestion.section}
            </div>
          )}

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-3 gradient-text">
              {currentQuestion.question}
            </h2>
            {currentQuestion.description && (
              <p className="text-gray-400">{currentQuestion.description}</p>
            )}
          </div>

          {/* Input */}
          <div className="mb-8">
            {currentQuestion.type === 'radio' && (
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

            {currentQuestion.type === 'table' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-2"></th>
                      {currentQuestion.columns?.map((column, i) => (
                        <th key={i} className="p-2 text-center text-sm text-gray-400">{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentQuestion.rows?.map((row, rowIndex) => {
                      const currentAnswers = (answers[currentQuestion.id] as Record<string, string>) || {};
                      return (
                        <tr key={rowIndex}>
                          <td className="p-2 text-left">{row}</td>
                          {currentQuestion.columns?.map((column, colIndex) => (
                            <td key={colIndex} className="p-2 text-center">
                              <button
                                onClick={() => {
                                  const newAnswers = {
                                    ...currentAnswers,
                                    [row]: column
                                  };
                                  updateAnswer(newAnswers);
                                }}
                                className={`w-6 h-6 rounded-full border-2 ${
                                  currentAnswers[row] === column
                                    ? 'bg-[#B026FF] border-[#B026FF]'
                                    : 'border-gray-400 hover:border-[#B026FF]'
                                }`}
                              />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {(currentQuestion.type === 'text' || currentQuestion.type === 'email') && (
              <input
                type={currentQuestion.type}
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => updateAnswer(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full p-4 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white placeholder-gray-500"
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

export default OrderForm;