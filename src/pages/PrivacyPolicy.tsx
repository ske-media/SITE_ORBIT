import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité | Agence Orbit</title>
        <link rel="canonical" href="https://agence-orbit.fr/politique-de-confidentialite" />
        <meta 
          name="description" 
          content="Découvrez la politique de confidentialité d'Agence Orbit, qui explique comment nous collectons, utilisons et protégeons vos données personnelles." 
        />
      </Helmet>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Retour à l'accueil
          </Link>

          <h1 className="text-4xl font-bold mb-8 gradient-text">
            Politique de Confidentialité
          </h1>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                1. Collecte des données
              </h2>
              <p>
                Nous collectons uniquement les informations nécessaires pour vous fournir nos services, notamment :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Nom, prénom, email, téléphone</li>
                <li>Informations relatives à votre projet</li>
              </ul>
              <p className="mt-4">
                Ces données sont collectées via nos formulaires de contact.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                2. Utilisation des données
              </h2>
              <p>
                Les informations collectées nous permettent de :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Vous contacter pour répondre à vos demandes</li>
                <li>Personnaliser nos services</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                3. Protection des données
              </h2>
              <p>
                Nous mettons en œuvre toutes les mesures de sécurité nécessaires pour protéger vos données contre tout accès non autorisé, perte ou altération.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                4. Partage des données
              </h2>
              <p>
                Nous ne partageons vos informations qu'avec :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Nos collaborateurs pour le bon déroulement de votre projet</li>
                <li>Nos prestataires techniques (hébergement, maintenance)</li>
                <li>Les autorités, si la loi l'exige</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                5. Cookies
              </h2>
              <p>
                Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer votre navigateur pour refuser les cookies si vous le souhaitez.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                6. Vos droits
              </h2>
              <p>
                Conformément à la législation en vigueur, vous disposez des droits suivants sur vos données personnelles :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Accès et rectification</li>
                <li>Suppression des données</li>
                <li>Opposition et limitation du traitement</li>
              </ul>
              <p className="mt-4">
                Vous pouvez exercer ces droits en nous contactant à l'adresse suivante : info@agence-orbit.ch
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                7. Contact
              </h2>
              <p>
                Pour toute question concernant cette politique, vous pouvez nous contacter à :
              </p>
              <p className="mt-4">
                Email : info@agence-orbit.fr<br />
                Adresse : 420 RTE DE SAINT-JULIEN, 74520 VALLEIRY, France
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;