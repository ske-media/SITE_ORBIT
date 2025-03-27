import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface WebCapsuleProps {
  title: string;
  images: string[];       // La première image sera utilisée pour l'aperçu
  tags: string[];         // Liste des tags, ex : ["React", "Tailwind", "SEO"]
  client: string;
  year: string | number;
  link: string;
  description?: string;
}

const WebCapsule: React.FC<WebCapsuleProps> = ({
  title,
  images,
  tags,
  client,
  year,
  link,
  description,
}) => {
  // Fallback en cas d'absence d'image
  const previewImage = images && images.length > 0 ? images[0] : '/default-preview.jpg';

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-dark-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-neon p-4"
    >
      {/* Mockup du navigateur */}
      <div className="relative">
        {/* Barre de navigation fictive */}
        <div className="flex items-center space-x-2 p-2 bg-dark-700">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="ml-auto text-xs text-gray-300">www.example.com</div>
        </div>
        {/* Aperçu du site (image du projet) */}
        <img
          src={previewImage}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gradient-purple">{title}</h3>
        {/* Affichage des tags */}
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-neon-purple/20 text-neon-purple text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Client et année */}
        <div className="mt-2 text-sm text-surface-300">
          {client} &bull; {year}
        </div>
        {/* Description optionnelle */}
        {description && (
          <p className="mt-2 text-surface-300 text-sm">{description}</p>
        )}
        {/* Bouton "Voir en ligne" */}
        <div className="mt-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="futuristic-button inline-flex items-center"
          >
            Voir en ligne <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default WebCapsule;