import React from 'react';
import { Helmet } from 'react-helmet-async';

function SocialMedia() {
  return (
    <>
      <Helmet>
        <title>Réseaux Sociaux | Agence Orbit</title>
        <meta name="description" content="Services de gestion de réseaux sociaux par l'Agence Orbit" />
      </Helmet>
      
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-12 gradient-text">
            Gestion de Réseaux Sociaux
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Cette page présentera nos services de gestion et stratégie pour vos réseaux sociaux.
          </p>
        </div>
      </div>
    </>
  );
}

export default SocialMedia;