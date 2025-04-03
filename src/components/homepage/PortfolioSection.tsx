import React, { useState, useEffect } from 'react';
import WebCapsule from './WebCapsule';

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
      // Vérifier que json.data existe et est un tableau
      if (json.data && Array.isArray(json.data)) {
        setProjects(json.data);
      } else {
        console.warn("Réponse inattendue :", json);
      }
    } catch (err) {
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

  // On conserve tous les projets pour l'affichage (on utilise une image par défaut si Main_image est null)
  const validProjects = projects.filter((project) => project.Titre && project.Titre.trim() !== "");

  if (validProjects.length === 0) {
    return <div>Aucun projet valide trouvé.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {validProjects.map((project) => {
        const { Titre, Slug, Main_image, Client, Date: projectDate, url, Description } = project;
        // Utilise l'opérateur de chaînage pour gérer le cas où Main_image est null
        const imagePath = Main_image?.url || '/default-image.png';
        const baseUrl = apiUrl.replace('/api', '');
        const imageUrl = imagePath.startsWith('/') ? `${baseUrl}${imagePath}` : `${baseUrl}/${imagePath}`;

        // Lien vers la page détail du portfolio
        const portfolioLink = `/portfolio/${Slug}`;

        // Extraction de l'année depuis projectDate
        let year = '';
        try {
          year = new Date(projectDate).getFullYear().toString();
        } catch (e) {
          console.error("Error parsing date:", projectDate, e);
        }

        // Conversion du rich text en texte brut si nécessaire
        const descriptionText = Array.isArray(Description)
          ? Description.map((block: any) =>
              block.children.map((child: any) => child.text).join(" ")
            ).join(" ")
          : "";

        return (
          <WebCapsule
            key={project.id}
            title={Titre}
            images={[imageUrl]}
            tags={[]} // À adapter si vous avez des tags
            client={Client}
            year={year}
            linkExternal={url}
            linkPortfolio={portfolioLink}
            description={descriptionText}
          />
        );
      })}
    </div>
  );
};

export default PortfolioSection;