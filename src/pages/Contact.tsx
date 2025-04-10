import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowRight, ArrowLeft, Phone, Mail, MapPin, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    availability: '',
    company: '',
    website: '',
    projectType: '',
    timeline: '',
    wantsBranding: '',
    budget: '',
    message: '',
    provenance: 'Suisse'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const questions = [
    {
      key: 'name',
      question: 'Comment puis-je vous appeler ?',
      placeholder: 'Votre nom',
      type: 'text',
      required: true,
    },
    {
      key: 'email',
      question: 'Quelle est votre adresse email ?',
      placeholder: 'exemple@domaine.ch',
      type: 'email',
      required: true,
      validate: validateEmail,
      errorMessage: 'Veuillez entrer une adresse email valide'
    },
    {
      key: 'phone',
      question: 'Et votre numéro de téléphone ?',
      placeholder: 'Votre numéro de téléphone',
      type: 'tel',
      required: true,
    },
    {
      key: 'company',
      question: 'Quel est le nom de votre entreprise ?',
      placeholder: 'Nom de votre entreprise',
      type: 'text',
      required: true,
    },
    {
      key: 'website',
      question: 'Avez-vous déjà un site web ?',
      placeholder: 'www.votresite.com (optionnel)',
      type: 'url',
      required: false,
    },
    {
      key: 'projectType',
      question: 'Quel type de site souhaitez-vous ?',
      type: 'select',
      options: [
        'Site vitrine classique',
        'Site avec blog',
        'Site avec portfolio',
        'Site avec réservation',
        'Autre',
      ],
      required: true,
    },
    {
      key: 'timeline',
      question: 'Quand souhaitez-vous commencer ?',
      type: 'select',
      options: [
        'Immédiatement',
        'Dans les 2 semaines',
        'Dans le mois',
        'Dans les 3 mois',
        'Pas encore décidé',
      ],
      required: true,
    },
    {
      key: 'availability',
      question: 'Quelles sont vos disponibilités pour échanger sur votre projet ?',
      type: 'select',
      options: [
        'En matinée (9h-12h)',
        'En après-midi (14h-17h)',
        'En soirée (17h-19h)',
        'Flexible',
      ],
      required: true,
    },
    {
      key: 'wantsBranding',
      question: 'Souhaitez-vous également une charte graphique complète pour votre marque ? (799 CHF)',
      type: 'select',
      options: [
        'Oui, je suis intéressé(e)',
        'Non merci'
      ],
      required: true,
    },
    {
      key: 'message',
      question: 'Avez-vous des détails supplémentaires à partager ?',
      placeholder: 'Parlez-nous de votre projet...',
      type: 'textarea',
      required: false,
    },
  ];

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Only proceed if we're not on the last step
      if (step === questions.length - 1) {
        return;
      }
      
      const currentQuestion = questions[step];
      const value = formData[currentQuestion.key as keyof typeof formData];
      
      if (currentQuestion.required && !value) {
        return;
      }
      
      if (currentQuestion.validate && !currentQuestion.validate(value as string)) {
        return;
      }

      handleNext();
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    const currentQuestion = questions[step];
    const value = formData[currentQuestion.key as keyof typeof formData];
    
    if (currentQuestion.required && !value) {
      return;
    }
    
    if (currentQuestion.validate && !currentQuestion.validate(value as string)) {
      return;
    }
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        'service_5dmv8dr',
        'template_4yw9i4o',
        formRef.current!,
        '10GrUKNFZHhGzb83j'
      );
      navigate('/success');
    } catch (error) {
      console.error('Failed to send email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-4 pt-20 lg:pt-4">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-xl w-full space-y-4 sm:space-y-8"
        >
          <div className="bg-white/5 p-4 sm:p-6 md:p-8 rounded-2xl backdrop-blur-sm">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className={`text-gray-400 hover:text-white transition ${step === 0 ? 'invisible' : ''}`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-400">
                  Question {step + 1} sur {questions.length}
                </span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full">
                <div
                  className="bg-[#B026FF] h-1 rounded-full transition-all duration-300"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">{questions[step].question}</h2>
              <p className="hidden md:block text-sm text-gray-400 mb-6">
                Appuyez sur <kbd className="px-2 py-1 bg-white/10 rounded-md">Entrée ↵</kbd> pour continuer
              </p>
              
              {questions[step].errorMessage && questions[step].validate && formData[questions[step].key] && 
               !questions[step].validate(formData[questions[step].key]) && (
                <div className="text-red-500 mb-4">{questions[step].errorMessage}</div>
              )}
              
              {questions[step].type === 'select' ? (
                <div className="grid gap-3">
                  {questions[step].options!.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`text-left p-4 rounded-xl border transition-all ${
                        formData[questions[step].key as keyof typeof formData] === option
                          ? 'border-[#B026FF] bg-[#B026FF]/10'
                          : 'border-white/10 hover:border-white/30'
                      } text-sm sm:text-base`}
                      onClick={() => {
                        handleInputChange({
                          target: {
                            name: questions[step].key,
                            value: option,
                          },
                        } as React.ChangeEvent<HTMLInputElement>);
                        setTimeout(handleNext, 300);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : questions[step].type === 'textarea' ? (
                <textarea
                  name={questions[step].key}
                  value={formData[questions[step].key as keyof typeof formData]}
                  onChange={handleInputChange}
                  placeholder={questions[step].placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 focus:outline-none focus:border-[#B026FF] transition-colors min-h-[120px] sm:min-h-[150px] text-sm sm:text-base"
                  required={questions[step].required}
                />
              ) : (
                <input
                  type={questions[step].type}
                  name={questions[step].key}
                  value={formData[questions[step].key as keyof typeof formData]}
                  onChange={handleInputChange}
                  placeholder={questions[step].placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 focus:outline-none focus:border-[#B026FF] transition-colors text-sm sm:text-base"
                  required={questions[step].required}
                  pattern={questions[step].type === 'email' ? '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$' : undefined}
                />
              )}

              <input 
                type="hidden" 
                name="provenance" 
                value={formData.provenance} 
              />

              {step < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className={`w-full bg-[#B026FF] text-white p-4 rounded-xl hover:bg-[#B026FF]/80 transition flex items-center justify-center gap-2 mt-6 ${
                    (questions[step].required && !formData[questions[step].key as keyof typeof formData]) ||
                    (questions[step].validate && !questions[step].validate(formData[questions[step].key])) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                  disabled={
                    (questions[step].required && !formData[questions[step].key as keyof typeof formData]) ||
                    (questions[step].validate && !questions[step].validate(formData[questions[step].key]))
                  }
                >
                  Continuer
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className={`w-full bg-[#B026FF] text-white p-4 rounded-xl hover:bg-[#B026FF]/80 transition flex items-center justify-center gap-2 mt-6 ${
                    isSubmitting || !formData[questions[step].key as keyof typeof formData] ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting || !formData[questions[step].key as keyof typeof formData]}
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      Envoyer
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Info Section */}
      <div className="w-full lg:w-96 bg-[#B026FF]/5 p-4 sm:p-6 lg:p-12">
        <div className="sticky top-20 lg:top-24">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Votre site web sur mesure</h2>
          <div className="space-y-6 text-gray-300">
            <p className="text-sm sm:text-base">
              Pour seulement 1'999 CHF, obtenez un site web professionnel qui reflète parfaitement votre activité. 
              {formData.wantsBranding === 'Oui, je suis intéressé(e)' && (
                <span className="block mt-2 text-[#B026FF]">+ 799 CHF pour votre charte graphique personnalisée</span>
              )}
            </p>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#B026FF] flex-shrink-0 mt-1" />
                <span className="text-sm sm:text-base">Première version en 7 jours</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#B026FF] flex-shrink-0 mt-1" />
                <span className="text-sm sm:text-base">Modifications illimitées</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#B026FF] flex-shrink-0 mt-1" />
                <span className="text-sm sm:text-base">Paiement uniquement si satisfait</span>
              </li>
            </ul>

            <div className="border-t border-white/10 pt-4 sm:pt-6 mt-6 sm:mt-8">
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contactez-nous directement</h3>
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="tel:+41228860069"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition text-sm sm:text-base"
                >
                  <Phone className="w-5 h-5" />
                  022 886 00 69
                </a>
                <a
                  href="mailto:info@agence-orbit.ch"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition"
                >
                  <Mail className="w-5 h-5" />
                  info@agence-orbit.ch
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  420 Route de Saint-Julien, 74520 Valleiry
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;