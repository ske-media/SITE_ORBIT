import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

function LegalNotice() {
  return (
    <>
      <Helmet>
        <title>Mentions Légales | Agence Orbit</title>
        <link rel="canonical" href="https://agence-orbit.com/mentions-legales" />
        <meta 
          name="description" 
          content="Découvrez les mentions légales d'Agence Orbit, édité par la société Orbit. Informations légales, hébergement, propriété intellectuelle, et protection de vos données personnelles." 
        />
      </Helmet>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
            <ArrowLeft className="h-5 w-5" />
            Retour à l'accueil
          </Link>

          <h1 className="text-4xl font-bold mb-8 gradient-text">Mentions Légales</h1>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">1. Informations légales</h2>
              <p className="mb-4">
                Le site agence-orbit.ch est édité par la société Orbit, société immatriculée au registre du commerce sous le numéro SIREN 907 588 834.
              </p>
              <p>
                Siège social : 420 Route de Saint-Julien, 74520 Valleiry, France<br />
                Téléphone : 022 886 00 69<br />
                Email : info@agence-orbit.ch
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">2. Hébergement</h2>
              <p>
                Le site orbit.ch est hébergé par la société Infomaniak Network SA, société immatriculée sous le numéro IDE CHE-103.167.648.
              </p>
              <p className="mt-4">
                Siège social : Rue Eugène-Marziano 25, 1227 Les Acacias, Genève, Suisse<br />
                Téléphone : +41 22 820 35 41<br />
                Email : support@infomaniak.com<br />
                Site web : www.infomaniak.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">3. Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu présent sur le site orbit.ch (textes, images, vidéos, logos, etc.) est protégé par le droit d'auteur et la législation en vigueur sur la propriété intellectuelle. Toute reproduction, distribution, modification ou diffusion, même partielle, est strictement interdite sans autorisation préalable écrite de la société Orbit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">4. Données personnelles</h2>
              <p>
                Les informations recueillies sur ce site sont destinées à la société Orbit et font l'objet d'un traitement informatique dans le cadre de la gestion de la relation client et des services proposés.
              </p>
              <p className="mt-4">
                Conformément à la loi fédérale sur la protection des données (LPD), vous disposez des droits suivants sur vos données personnelles :
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Droit d'accès</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la limitation du traitement</li>
              </ul>
              <p className="mt-4">
                Pour exercer vos droits, veuillez nous contacter par email à : eldring@ske-group.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">5. Cookies</h2>
              <p>
                Le site orbit.ch n'affiche pas de bannière de consentement aux cookies. En naviguant sur le site, vous acceptez l'utilisation de cookies nécessaires au bon fonctionnement du site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">6. Responsabilité</h2>
              <p>
                Orbit met tout en œuvre pour assurer l'exactitude et la mise à jour des informations diffusées sur le site. Toutefois, ces informations sont données à titre indicatif et ne sauraient engager la responsabilité de la société Orbit en cas d'erreurs ou d'omissions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">7. Contact</h2>
              <p>
                Pour toute question relative aux mentions légales, vous pouvez nous contacter à l'adresse suivante :<br />
                info@agence-orbit.ch
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default LegalNotice;