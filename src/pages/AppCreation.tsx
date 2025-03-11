import React from 'react';
import { Helmet } from 'react-helmet-async';

function AppCreation() {
  return (
    <>
      <Helmet>
        <title>Création d'Application | Agence Orbit</title>
        <meta name="description" content="Services de développement d'applications par l'Agence Orbit" />
      </Helmet>
      
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-12 gradient-text">
            Création d'Applications
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Cette page présentera nos services de développement d'applications mobiles et web.
          </p>
        </div>
      </div>
    </>
  );
}

export default AppCreation;