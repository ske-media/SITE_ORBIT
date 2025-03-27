import React, { useState, useEffect } from 'react';
import WebCapsule from './WebCapsule';

interface PortfolioProject {
  id: number;
  Titre: string;
  Slug: string;
  Short_description: string;
  Tech_stack: string | null;
  Date: string; // par exemple "2025-02-05"
  url: string; // lien externe du site
  Client: string;
  Description: any; // rich text array
  Featured: boolean;
  Site_type: string;
  Main_image: {
    url: string;
  };
}

const PortfolioSection: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Utilise VITE_STRAPI_API_URL depuis ton .env
  const apiUrl = import.meta.env.VITE_STRAPI_API_URL || 'https://siteorbit-cms-production.up.railway.app/api';
  console.log("apiUrl:", apiUrl);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const endpoint = `${apiUrl}/portfolio-site-webs?populate=%2A`;
        console.log("Fetching portfolio projects from:", endpoint);
        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error(`Erreur lors du chargement des projets. Statut: ${res.status}`);
        }
        const json = await res.json();
        console.log("Portfolio response:", json);
        setProjects(json.data);
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

  // Filtrer uniquement les projets avec un titre non vide
  const validProjects = projects.filter((project) => project.Titre && project.Titre.trim() !== "");
  console.log("Valid projects:", validProjects);

  if (validProjects.length === 0) {
    return <div>Aucun projet valide trouvé.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {validProjects.map((project) => {
        // Renommage du champ "Date" en "projectDate" pour éviter de masquer le constructeur global Date
        const { Titre, Slug, Main_image, Client, Date: projectDate, url, Description } = project;
        const imagePath = Main_image.url;
        const baseUrl = apiUrl.replace('/api', '');
        const imageUrl = imagePath.startsWith('/') ? `${baseUrl}${imagePath}` : `${baseUrl}/${imagePath}`;
        console.log(`Image URL for project "${Titre}":`, imageUrl);

        // Construction du lien vers la page détail du portfolio
        const portfolioLink = `/portfolio/${Slug}`;

        // Extraction de l'année à partir de projectDate
        let year = '';
        try {
          year = new Date(projectDate).getFullYear().toString();
        } catch (e) {
          console.error("Error parsing date:", projectDate, e);
        }

        // Conversion de Description (rich text) en texte brut (si c'est un tableau)
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
            tags={[]} // Si tu as des tags, adapte ici
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