import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowRight, ArrowLeft, Phone, Mail, MapPin, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';

emailjs.init("10GrUKNFZHhGzb83j");

type Question = {
  key: string;
  question: string;
  placeholder?: string;
  type: 'text' | 'email' | 'tel' | 'url' | 'select' | 'textarea';
  required: boolean;
  options?: string[];
  validate?: (value: string) => boolean;
  errorMessage?: string;
};

const questions: Question[] = [
  {
    key: 'name',
    question: '1. Votre prénom et nom',
    placeholder: '📝 Pour savoir à qui on s’adresse',
    type: 'text',
    required: true,
  },
  {
    key: 'phone',
    question: '2. Votre numéro de téléphone',
    placeholder: '📞 Entrez votre numéro',
    type: 'tel',
    required: true,
  },
  {
    key: 'email',
    question: '3. Votre adresse email',
    placeholder: '✉️ exemple@domaine.com',
    type: 'email',
    required: true,
    validate: (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
    errorMessage: 'Veuillez entrer une adresse email valide',
  },
  {
    key: 'activity',
    question: '4. Que faites-vous ?',
    placeholder: '🛠 Dites-nous en quelques mots votre activité ou métier',
    type: 'text',
    required: true,
  },
  {
    key: 'company',
    question: '5. Le nom de votre entreprise ou activité',
    placeholder: '🏢 Si vous en avez un',
    type: 'text',
    required: true,
  },
  {
    key: 'contactPreference',
    question: "6. Comment préférez-vous qu'on vous contacte ?",
    type: 'select',
    options: [
      'Téléphone – Appel',
      'Téléphone – SMS',
      'WhatsApp',
      'Email',
      'Visio rapide (Google Meet)'
    ],
    required: true,
  },
  {
    key: 'contactTiming',
    question: '7. Quand souhaitez-vous être recontacté ?',
    type: 'select',
    options: [
      'Dès que possible',
      'Cette semaine',
      'Semaine prochaine',
      'Je suis flexible'
    ],
    required: true,
  },
  {
    key: 'availability',
    question: '8. À quels moments êtes-vous le plus disponible ?',
    type: 'select',
    options: [
      'Matin (8h–12h)',
      'Après-midi (12h–18h)',
      'Soirée (après 18h)',
      'Je suis flexible'
    ],
    required: true,
  },
  {
    key: 'websiteStatus',
    question: '9. Avez-vous déjà un site web ?',
    type: 'select',
    options: [
      'Non, jamais eu',
      'Oui, mais il ne me convient plus',
      "Il existe, mais je ne sais pas trop ce qu'il devient",
      "Aucune idée si j'en ai besoin ou pas"
    ],
    required: true,
  },
  {
    key: 'additionalInfo',
    question: '10. Un point important à nous signaler ?',
    placeholder: '✏ (Optionnel – objectif, contrainte, question...)',
    type: 'textarea',
    required: false,
  },
  {
    key: 'source',
    question: '11. Comment avez-vous entendu parler de nous ?',
    type: 'select',
    options: [
      'Recherche Google',
      'Réseaux sociaux',
      'Bouche à oreille',
      'Recommandation',
      'Autre'
    ],
    required: true,
  },
];

type FormData = { [key: string]: string };

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    activity: '',
    company: '',
    contactPreference: '',
    contactTiming: '',
    availability: '',
    websiteStatus: '',
    additionalInfo: '',
    provenance: 'France',
    source: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (step < questions.length - 1) {
        e.preventDefault();
        const currentQ = questions[step];
        const value = formData[currentQ.key];
        if (currentQ.required && !value) return;
        if (currentQ.validate && !currentQ.validate(value)) return;
        handleNext();
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const currentQ = questions[step];
    const value = formData[currentQ.key];
    if (currentQ.required && !value) return;
    if (currentQ.validate && !currentQ.validate(value)) return;
    if (step < questions.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier que tous les champs requis sont remplis
    const hasEmptyRequiredFields = questions.filter(q => q.required).some(q => !formData[q.key]);
    if (hasEmptyRequiredFields || step !== questions.length - 1) return;

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

  const currentQuestion = questions[step];

  const isButtonDisabled = 
    (currentQuestion.required && !formData[currentQuestion.key]) ||
    (currentQuestion.validate && !currentQuestion.validate(formData[currentQuestion.key]));

  const isSubmitDisabled = step === questions.length - 1 && (
    questions.some(q => q.required && !formData[q.key]) || isSubmitting
  );

  return (
    <>
      <Helmet>
        <title>Contact | Agence Orbit</title>
        <link rel="canonical" href="https://agence-orbit.fr/contact" />
        <meta
          name="description"
          content="Contactez l'Agence Orbit pour discuter de votre projet web sur mesure. Devis gratuit et sans engagement."
        />
      </Helmet>
      <div className="min-h-screen flex flex-col lg:flex-row bg-black">
        {/* Form Section */}
        <div className="flex-1 flex items-center justify-center p-4 pt-20 lg:pt-4">
          <form ref={formRef} onSubmit={handleSubmit} className="max-w-xl w-full space-y-4 sm:space-y-8">
            <div className="bg-white/5 p-4 sm:p-6 md:p-8 rounded-2xl backdrop-blur-sm">
              <div className="mb-8 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">🚀 On fait connaissance ?</h1>
                <p className="text-gray-400">
                  Vous avez un projet (ou juste une idée) ? On vous propose un rendez-vous de 30 minutes pour en discuter.
                </p>
                <p className="text-gray-400 mt-2">
                  Pas de jargon, pas d'engagement. Juste une première étape vers un site qui vous ressemble.
                </p>
              </div>
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
                <h2 className="text-xl sm:text-2xl font-bold mb-4">{currentQuestion.question}</h2>
    
                {currentQuestion.errorMessage &&
                  currentQuestion.validate &&
                  formData[currentQuestion.key] &&
                  !currentQuestion.validate(formData[currentQuestion.key]) && (
                    <div className="text-red-500 mb-4">{currentQuestion.errorMessage}</div>
                )}
    
                {currentQuestion.type === 'select' ? (
                  <div className="grid gap-3">
                    {currentQuestion.options!.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`text-left p-4 rounded-xl border transition-all text-sm sm:text-base ${
                          formData[currentQuestion.key] === option
                            ? 'border-[#B026FF] bg-[#B026FF]/10'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                        onClick={() => {
                          setFormData({ ...formData, [currentQuestion.key]: option });
                          setTimeout(handleNext, 300);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : currentQuestion.type === 'textarea' ? (
                  <textarea
                    name={currentQuestion.key}
                    value={formData[currentQuestion.key]}
                    onChange={handleInputChange}
                    onKeyDown={handleFieldKeyDown}
                    placeholder={currentQuestion.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 focus:outline-none focus:border-[#B026FF] transition-colors min-h-[120px] sm:min-h-[150px] text-sm sm:text-base"
                    required={currentQuestion.required}
                  />
                ) : (
                  <input
                    type={currentQuestion.type}
                    name={currentQuestion.key}
                    value={formData[currentQuestion.key]}
                    onChange={handleInputChange}
                    onKeyDown={handleFieldKeyDown}
                    placeholder={currentQuestion.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 focus:outline-none focus:border-[#B026FF] transition-colors text-sm sm:text-base"
                    required={currentQuestion.required}
                    pattern={currentQuestion.type === 'email' ? '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$' : undefined}
                  />
                )}
    
                {Object.entries(formData).map(([key, value]) => (
                  <input key={key} type="hidden" name={key} value={value} />
                ))}
    
                {step < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`w-full bg-[#B026FF] text-white p-4 rounded-xl hover:bg-[#B026FF]/80 transition flex items-center justify-center gap-2 mt-6 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isButtonDisabled}
                  >
                    Continuer
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`w-full bg-[#B026FF] text-white p-4 rounded-xl hover:bg-[#B026FF]/80 transition flex items-center justify-center gap-2 mt-6 ${
                      isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isSubmitDisabled}
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
    
        {/* Section d'information complémentaire */}
        <div className="w-full lg:w-96 bg-[#B026FF]/5 p-4 sm:p-6 lg:p-12">
          <div className="sticky top-20 lg:top-24">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Votre site web personnalisé</h2>
            <div className="space-y-6 text-gray-300">
              <p className="text-sm sm:text-base">
                Pour seulement 1'999 CHF, obtenez un site web professionnel qui reflète parfaitement votre activité et vos valeurs.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#B026FF] flex-shrink-0 mt-1" />
                  <span className="text-sm sm:text-base">Rendez-vous découverte gratuit</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#B026FF] flex-shrink-0 mt-1" />
                  <span className="text-sm sm:text-base">Première version en 7 jours</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#B026FF] flex-shrink-0 mt-1" />
                  <span className="text-sm sm:text-base">Paiement uniquement si satisfait</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#B026FF] flex-shrink-0 mt-1" />
                  <span className="text-sm sm:text-base">Modifications illimitées</span>
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
                    Genève
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;