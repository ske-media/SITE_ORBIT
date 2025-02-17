import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ArrowLeft, ArrowRight, Send, Check, Loader } from 'lucide-react';
import { trackFormInteraction, trackConversion } from '../lib/analytics';

const countryTranslations = {
  fr: {
    'Afghanistan': 'Afghanistan',
    'Albania': 'Albanie',
    'Algeria': 'Algérie',
    'American Samoa': 'Samoa américaines',
    'Andorra': 'Andorre',
    'Angola': 'Angola',
    'Anguilla': 'Anguilla',
    'Antarctica': 'Antarctique',
    'Antigua and Barbuda': 'Antigua-et-Barbuda',
    'Argentina': 'Argentine',
    'Armenia': 'Arménie',
    'Aruba': 'Aruba',
    'Australia': 'Australie',
    'Austria': 'Autriche',
    'Azerbaijan': 'Azerbaïdjan',
    'Bahamas': 'Bahamas',
    'Bahrain': 'Bahreïn',
    'Bangladesh': 'Bangladesh',
    'Barbados': 'Barbade',
    'Belarus': 'Biélorussie',
    'Belgium': 'Belgique',
    'Belize': 'Belize',
    'Benin': 'Bénin',
    'Bermuda': 'Bermudes',
    'Bhutan': 'Bhoutan',
    'Bolivia': 'Bolivie',
    'Bosnia and Herzegovina': 'Bosnie-Herzégovine',
    'Botswana': 'Botswana',
    'Brazil': 'Brésil',
    'British Indian Ocean Territory': 'Territoire britannique de l\'océan Indien',
    'British Virgin Islands': 'Îles Vierges britanniques',
    'Brunei': 'Brunei',
    'Bulgaria': 'Bulgarie',
    'Burkina Faso': 'Burkina Faso',
    'Burundi': 'Burundi',
    'Cambodia': 'Cambodge',
    'Cameroon': 'Cameroun',
    'Canada': 'Canada',
    'Cape Verde': 'Cap-Vert',
    'Cayman Islands': 'Îles Caïmans',
    'Central African Republic': 'République centrafricaine',
    'Chad': 'Tchad',
    'Chile': 'Chili',
    'China': 'Chine',
    'Christmas Island': 'Île Christmas',
    'Cocos Islands': 'Îles Cocos',
    'Colombia': 'Colombie',
    'Comoros': 'Comores',
    'Cook Islands': 'Îles Cook',
    'Costa Rica': 'Costa Rica',
    'Croatia': 'Croatie',
    'Cuba': 'Cuba',
    'Curacao': 'Curaçao',
    'Cyprus': 'Chypre',
    'Czech Republic': 'République tchèque',
    'Democratic Republic of the Congo': 'République démocratique du Congo',
    'Denmark': 'Danemark',
    'Djibouti': 'Djibouti',
    'Dominica': 'Dominique',
    'Dominican Republic': 'République dominicaine',
    'East Timor': 'Timor oriental',
    'Ecuador': 'Équateur',
    'Egypt': 'Égypte',
    'El Salvador': 'Salvador',
    'Equatorial Guinea': 'Guinée équatoriale',
    'Eritrea': 'Érythrée',
    'Estonia': 'Estonie',
    'Ethiopia': 'Éthiopie',
    'Falkland Islands': 'Îles Malouines',
    'Faroe Islands': 'Îles Féroé',
    'Fiji': 'Fidji',
    'Finland': 'Finlande',
    'France': 'France',
    'French Polynesia': 'Polynésie française',
    'Gabon': 'Gabon',
    'Gambia': 'Gambie',
    'Georgia': 'Géorgie',
    'Germany': 'Allemagne',
    'Ghana': 'Ghana',
    'Gibraltar': 'Gibraltar',
    'Greece': 'Grèce',
    'Greenland': 'Groenland',
    'Grenada': 'Grenade',
    'Guam': 'Guam',
    'Guatemala': 'Guatemala',
    'Guernsey': 'Guernesey',
    'Guinea': 'Guinée',
    'Guinea-Bissau': 'Guinée-Bissau',
    'Guyana': 'Guyana',
    'Haiti': 'Haïti',
    'Honduras': 'Honduras',
    'Hong Kong': 'Hong Kong',
    'Hungary': 'Hongrie',
    'Iceland': 'Islande',
    'India': 'Inde',
    'Indonesia': 'Indonésie',
    'Iran': 'Iran',
    'Iraq': 'Irak',
    'Ireland': 'Irlande',
    'Isle of Man': 'Île de Man',
    'Israel': 'Israël',
    'Italy': 'Italie',
    'Ivory Coast': 'Côte d\'Ivoire',
    'Jamaica': 'Jamaïque',
    'Japan': 'Japon',
    'Jersey': 'Jersey',
    'Jordan': 'Jordanie',
    'Kazakhstan': 'Kazakhstan',
    'Kenya': 'Kenya',
    'Kiribati': 'Kiribati',
    'Kosovo': 'Kosovo',
    'Kuwait': 'Koweït',
    'Kyrgyzstan': 'Kirghizistan',
    'Laos': 'Laos',
    'Latvia': 'Lettonie',
    'Lebanon': 'Liban',
    'Lesotho': 'Lesotho',
    'Liberia': 'Libéria',
    'Libya': 'Libye',
    'Liechtenstein': 'Liechtenstein',
    'Lithuania': 'Lituanie',
    'Luxembourg': 'Luxembourg',
    'Macau': 'Macao',
    'Macedonia': 'Macédoine',
    'Madagascar': 'Madagascar',
    'Malawi': 'Malawi',
    'Malaysia': 'Malaisie',
    'Maldives': 'Maldives',
    'Mali': 'Mali',
    'Malta': 'Malte',
    'Marshall Islands': 'Îles Marshall',
    'Mauritania': 'Mauritanie',
    'Mauritius': 'Maurice',
    'Mayotte': 'Mayotte',
    'Mexico': 'Mexique',
    'Micronesia': 'Micronésie',
    'Moldova': 'Moldavie',
    'Monaco': 'Monaco',
    'Mongolia': 'Mongolie',
    'Montenegro': 'Monténégro',
    'Montserrat': 'Montserrat',
    'Morocco': 'Maroc',
    'Mozambique': 'Mozambique',
    'Myanmar': 'Myanmar',
    'Namibia': 'Namibie',
    'Nauru': 'Nauru',
    'Nepal': 'Népal',
    'Netherlands': 'Pays-Bas',
    'New Caledonia': 'Nouvelle-Calédonie',
    'New Zealand': 'Nouvelle-Zélande',
    'Nicaragua': 'Nicaragua',
    'Niger': 'Niger',
    'Nigeria': 'Nigeria',
    'Niue': 'Niue',
    'North Korea': 'Corée du Nord',
    'Northern Mariana Islands': 'Îles Mariannes du Nord',
    'Norway': 'Norvège',
    'Oman': 'Oman',
    'Pakistan': 'Pakistan',
    'Palau': 'Palaos',
    'Palestine': 'Palestine',
    'Panama': 'Panama',
    'Papua New Guinea': 'Papouasie-Nouvelle-Guinée',
    'Paraguay': 'Paraguay',
    'Peru': 'Pérou',
    'Philippines': 'Philippines',
    'Poland': 'Pologne',
    'Portugal': 'Portugal',
    'Puerto Rico': 'Porto Rico',
    'Qatar': 'Qatar',
    'Republic of the Congo': 'République du Congo',
    'Reunion': 'Réunion',
    'Romania': 'Roumanie',
    'Russia': 'Russie',
    'Rwanda': 'Rwanda',
    'Saint Barthelemy': 'Saint-Barthélemy',
    'Saint Helena': 'Sainte-Hélène',
    'Saint Kitts and Nevis': 'Saint-Kitts-et-Nevis',
    'Saint Lucia': 'Sainte-Lucie',
    'Saint Martin': 'Saint-Martin',
    'Saint Pierre and Miquelon': 'Saint-Pierre-et-Miquelon',
    'Saint Vincent and the Grenadines': 'Saint-Vincent-et-les-Grenadines',
    'Samoa': 'Samoa',
    'San Marino': 'Saint-Marin',
    'Sao Tome and Principe': 'Sao Tomé-et-Principe',
    'Saudi Arabia': 'Arabie saoudite',
    'Senegal': 'Sénégal',
    'Serbia': 'Serbie',
    'Seychelles': 'Seychelles',
    'Sierra Leone': 'Sierra Leone',
    'Singapore': 'Singapour',
    'Sint Maarten': 'Saint-Martin',
    'Slovakia': 'Slovaquie',
    'Slovenia': 'Slovénie',
    'Solomon Islands': 'Îles Salomon',
    'Somalia': 'Somalie',
    'South Africa': 'Afrique du Sud',
    'South Korea': 'Corée du Sud',
    'South Sudan': 'Soudan du Sud',
    'Spain': 'Espagne',
    'Sri Lanka': 'Sri Lanka',
    'Sudan': 'Soudan',
    'Suriname': 'Suriname',
    'Svalbard and Jan Mayen': 'Svalbard et Jan Mayen',
    'Swaziland': 'Eswatini',
    'Sweden': 'Suède',
    'Switzerland': 'Suisse',
    'Syria': 'Syrie',
    'Taiwan': 'Taïwan',
    'Tajikistan': 'Tadjikistan',
    'Tanzania': 'Tanzanie',
    'Thailand': 'Thaïlande',
    'Togo': 'Togo',
    'Tokelau': 'Tokelau',
    'Tonga': 'Tonga',
    'Trinidad and Tobago': 'Trinité-et-Tobago',
    'Tunisia': 'Tunisie',
    'Turkey': 'Turquie',
    'Turkmenistan': 'Turkménistan',
    'Turks and Caicos Islands': 'Îles Turques-et-Caïques',
    'Tuvalu': 'Tuvalu',
    'U.S. Virgin Islands': 'Îles Vierges américaines',
    'Uganda': 'Ouganda',
    'Ukraine': 'Ukraine',
    'United Arab Emirates': 'Émirats arabes unis',
    'United Kingdom': 'Royaume-Uni',
    'United States': 'États-Unis',
    'Uruguay': 'Uruguay',
    'Uzbekistan': 'Ouzbékistan',
    'Vanuatu': 'Vanuatu',
    'Vatican': 'Vatican',
    'Venezuela': 'Venezuela',
    'Vietnam': 'Viêt Nam',
    'Wallis and Futuna': 'Wallis-et-Futuna',
    'Western Sahara': 'Sahara occidental',
    'Yemen': 'Yémen',
    'Zambia': 'Zambie',
    'Zimbabwe': 'Zimbabwe'
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
  // Section 1 : Informations personnelles
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
  {
    id: 'multilingual',
    type: 'radio',
    question: 'Votre site doit-il être multilingue ?',
    section: 'Le site web',
    options: ['Oui', 'Non'],
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

function FirstContactForm() {
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
        subject: '[PARTIEL] Nouveau contact - Orbit',
        message: `Email: ${answers.email}`,
        email: answers.email,
        replyTo: answers.email,
        honeypot: ''
      };

      console.log('Submitting partial form:', {
        ...formData
      });

      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(result => {
        console.log('Partial form submission response:', result);
        if (result.success) {
          console.log('Partial form submitted successfully');
        } else {
          console.error('Partial form submission failed:', result);
        }
      }).catch(error => {
        console.error('Error submitting partial form:', error);
      });
      setLastSubmittedEmail(answers.email);
    }
  };
  
  useEffect(() => {
    // Tracker le début du formulaire
    trackFormInteraction('contact_form', 'start');

    setCurrentQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsTransitioning(true);
      // Submit partial form when email is entered and valid
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
      const submitData = {
        accessKey: '13c4808a-4972-42e9-ae15-c09f728d0933',
        subject: '[COMPLET] Nouveau contact - Orbit',
        message: Object.entries(answers)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n'),
        email: answers.email,
        replyTo: answers.email,
        honeypot: ''
      };

      console.log('Submitting complete form to staticforms:', submitData);

      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(result => {
        console.log('Complete form submission response:', result);
        if (result.success) {
          console.log('Complete form submitted successfully');
          navigate('/success/contact');
          trackFormInteraction('contact_form', 'complete');
          trackConversion('contact_form_submission');
        } else {
          console.error('Complete form submission failed:', result);
          throw new Error('Form submission failed');
        }
      }).catch(error => {
        console.error('Error submitting complete form:', error);
        throw error;
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
      trackFormInteraction('contact_form', 'error');
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
    console.log('Updating answer for:', currentQuestion.id, 'with value:', value);
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
        console.log('Valid email entered, submitting partial form');
        submitPartialForm();
      }
    }
  };

  const canProceed = () => {
    if (!currentQuestion.required) return true;
    if (!answers[currentQuestion.id]) return false;

    // Validation supplémentaire pour l'email
    if (currentQuestion.type === 'email') {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(answers[currentQuestion.id] as string);
      return isValidEmail;
    }

    return true;
  };


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
      </div>    
    </div>
  );
}

export default FirstContactForm