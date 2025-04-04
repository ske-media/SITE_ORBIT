import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface WebCapsuleProps {
  title: string;
  images: string[];
  tags: string[];
  client: string;
  year: string | number;
  linkExternal: string;
  linkPortfolio: string;
  description?: string;
}

const WebCapsule: React.FC<WebCapsuleProps> = ({
  title,
  images,
  tags,
  client,
  year,
  linkExternal,
  linkPortfolio,
  description,
}) => {
  const previewImage = images && images.length > 0 ? images[0] : '/default-preview.jpg';

  // Extraction du hostname pour le lien externe
  let externalHostname: string | null = null;
  try {
    if (linkExternal) {
      externalHostname = new URL(linkExternal).hostname;
    }
  } catch (error) {
    console.warn('Lien externe invalide:', linkExternal);
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="mx-4 my-6 bg-dark-800 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-neon p-4"
    >
      {/* Bandeau simulant la barre d'un navigateur */}
      <div className="relative">
        <div className="flex items-center space-x-2 px-3 py-2 bg-dark-700 rounded-t-xl">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          {externalHostname && (
            <div className="ml-auto text-xs text-gray-300 truncate max-w-[50%]">
              <a
                href={linkExternal}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                {externalHostname}
              </a>
            </div>
          )}
        </div>
        {/* Image de prévisualisation */}
        <div className="overflow-hidden">
          <motion.img
            src={previewImage}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="mt-4 space-y-3 px-2">
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-gradient-purple"
        >
          {title}
        </motion.h3>
        {/* Affichage des tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-2"
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-neon-purple/20 text-neon-purple text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </motion.div>
        {/* Informations sur le client et l'année */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-surface-300"
        >
          {client} &bull; {year}
        </motion.div>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sm text-surface-300"
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Bouton d'action */}
      <div className="mt-4 flex justify-center">
        <motion.a
          href={linkPortfolio}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(176,38,255,0.7)' }}
          transition={{ duration: 0.3 }}
          className="futuristic-button inline-flex items-center px-4 py-2 rounded-full bg-neon-purple text-white font-semibold shadow-md hover:bg-neon-purple/90 transition-all duration-300"
        >
          Voir le projet <ExternalLink className="ml-2 h-4 w-4" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default WebCapsule;