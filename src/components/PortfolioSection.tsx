import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface PortfolioProject {
  id: number;
  Titre: string;
  Slug: string;
  Short_description: string;
  Tech_stack: string | null;
  Date: string;
  url: string;
  Client: string;
  Description: any;
  Featured: boolean;
  Site_type: string;
  Main_image: {
    url: string;
  } | null;
}

const PortfolioSection: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_STRAPI_API_URL || 'https://siteorbit-cms-production.up.railway.app/api';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const endpoint = `${apiUrl}/portfolio-site-webs?populate=*`;
        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error(`Erreur lors du chargement des projets. Statut: ${res.status}`);
        }
        const json = await res.json();
        if (json.data && Array.isArray(json.data)) {
          setProjects(json.data);
        } else {
          console.warn("Réponse inattendue :", json);
        }
      } catch (err: any) {
        console.error("Error fetching portfolio projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [apiUrl]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  const validProjects = projects.filter((project) => project.Titre && project.Titre.trim() !== "");
  if (validProjects.length === 0) {
    return <div>Aucun projet valide trouvé.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {validProjects.map((project) => {
        const { Titre, Slug, Main_image, Client, Date: projectDate, url, Description } = project;
        // Si Main_image est null, on utilise un chemin par défaut
        const imagePath = Main_image?.url || '/default-image.png';
        const baseUrl = apiUrl.replace('/api', '');
        const imageUrl = imagePath.startsWith('/') ? `${baseUrl}${imagePath}` : `${baseUrl}/${imagePath}`;

        // Lien vers la page de détail du portfolio
        const portfolioLink = `/portfolio/${Slug}`;

        // Extraction de l'année à partir de projectDate
        let year = '';
        try {
          year = new Date(projectDate).getFullYear().toString();
        } catch (e) {
          console.error("Error parsing date:", projectDate, e);
        }

        // Conversion du rich text en texte brut (si Description est un tableau de blocs)
        const descriptionText = Array.isArray(Description)
          ? Description.map((block: any) =>
              block.children.map((child: any) => child.text).join(" ")
            ).join(" ")
          : "";

        // Extraction du hostname pour le lien externe
        let externalHostname: string | null = null;
        try {
          if (url) {
            externalHostname = new URL(url).hostname;
          }
        } catch (error) {
          console.warn('Lien externe invalide:', url);
        }

        return (
          <motion.div
            key={project.id}
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
                      href={url}
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
                  src={imageUrl}
                  alt={Titre}
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
                {Titre}
              </motion.h3>
              {/* Si vous avez des tags à afficher, vous pouvez intégrer un mapping ici */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-surface-300"
              >
                {Client} &bull; {year}
              </motion.div>
              {descriptionText && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-sm text-surface-300"
                >
                  {descriptionText}
                </motion.p>
              )}
            </div>

            {/* Bouton d'action */}
            <div className="mt-4 flex justify-center">
              <motion.a
                href={portfolioLink}
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
      })}
    </div>
  );
};

export default PortfolioSection;