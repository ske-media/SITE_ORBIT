import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, ArrowRight } from 'lucide-react';

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

  const apiUrl =
    import.meta.env.VITE_STRAPI_API_URL ||
    'https://siteorbit-cms-production.up.railway.app/api';

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
          console.warn('Réponse inattendue :', json);
        }
      } catch (err: any) {
        console.error('Error fetching portfolio projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B026FF]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 py-12">
        <p>Une erreur est survenue : {error}</p>
      </div>
    );
  }

  const validProjects = projects.filter(
    (project) => project.Titre && project.Titre.trim() !== ""
  );

  if (validProjects.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p>Aucun projet disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-[#B026FF]/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Nos Réalisations</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Découvrez quelques-uns des sites web que nous avons créés pour nos clients
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {validProjects.map((project) => {
            const imagePath = project.Main_image?.url || '/default-image.png';
            const baseUrl = apiUrl.replace('/api', '');
            const imageUrl = imagePath.startsWith('/')
              ? `${baseUrl}${imagePath}`
              : `${baseUrl}/${imagePath}`;

            const portfolioLink = `/portfolio/${project.Slug}`;

            let externalHostname: string | null = null;
            try {
              if (project.url) {
                externalHostname = new URL(project.url).hostname;
              }
            } catch (error) {
              console.warn('Lien externe invalide:', project.url);
            }

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group relative bg-white/5 rounded-2xl overflow-hidden border border-[#B026FF]/20 hover:border-[#B026FF] transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <motion.img
                    src={imageUrl}
                    alt={project.Titre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* External Link Badge */}
                  {externalHostname && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 hover:bg-black/70 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">{externalHostname}</span>
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold group-hover:text-[#B026FF] transition-colors">
                    {project.Titre}
                  </h3>

                  <p className="text-gray-400 line-clamp-2">
                    {project.Short_description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.Tech_stack?.split(',').map((tech, index) => (
                      <span
                        key={index}
                        className="bg-[#B026FF]/10 text-[#B026FF] px-2 py-1 rounded-md text-sm"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-end pt-4 border-t border-[#B026FF]/20">
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#B026FF] hover:text-white transition-colors group/link"
                      whileHover={{ x: 5 }}
                    >
                      Voir le site
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </motion.a>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#B026FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;