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

  // Validation du lien externe
  let externalHostname: string | null = null;
  try {
    if (linkExternal) {
      externalHostname = new URL(linkExternal).hostname;
    }
  } catch (error) {
    console.warn('Lien externe invalide:', linkExternal);
    externalHostname = null;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-dark-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-neon p-4"
    >
      {/* Mockup navigateur */}
      <div className="relative">
        <div className="flex items-center space-x-2 p-2 bg-dark-700">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          {externalHostname && (
            <div className="ml-auto text-xs text-gray-300 truncate max-w-[50%]">
              <a
                href={linkExternal}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                {externalHostname}
              </a>
            </div>
          )}
        </div>
        <img
          src={previewImage}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gradient-purple">{title}</h3>
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
        <div className="mt-2 text-sm text-surface-300">
          {client} &bull; {year}
        </div>
        {description && (
          <p className="mt-2 text-surface-300 text-sm">{description}</p>
        )}
        <div className="mt-4">
          <a
            href={linkPortfolio}
            className="futuristic-button inline-flex items-center"
          >
            Voir le projet <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default WebCapsule;
