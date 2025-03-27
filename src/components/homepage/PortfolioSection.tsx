import React, { useState, useEffect } from 'react';
import WebCapsule from './WebCapsule';

// Définition d'un type pour correspondre à la réponse "plateforme site web" de ton API
export interface StrapiPortfolioSiteWebFlat {
  id: number;
  Titre: string;
  Slug: string;
  Short_description: string;
  Tech_stack: string | null;
  Date: string;
  url: string;
  Client: string;
  Description: any; // On attend un tableau de blocs (rich text)
  Featured: boolean;
  Site_type: string;
  Main_image: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  // D'autres champs éventuels peuvent être présents...
}

const PortfolioSection: React.FC = () => {
  const [projects, setProjects] = useState<StrapiPortfolioSiteWebFlat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Utilise la variable d'environnement VITE_STRAPI_API_URL définie dans ton .env
  // Par exemple, VITE_STRAPI_API_URL=https://siteorbit-cms-production.up.railway.app/api
  const apiUrl = import.meta.env.VITE_STRAPI_API_URL || 'https://siteorbit-cms-production.up.railway.app/api';
  console.log("apiUrl:", apiUrl);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Encode l'astérisque dans le populate
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

  // Filtrer uniquement les projets qui ont un titre non vide
  const validProjects = projects.filter((project) => project.Titre && project.Titre.trim() !== "");
  console.log("Valid projects:", validProjects);

  if (validProjects.length === 0) {
    return <div>Aucun projet valide trouvé.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {validProjects.map((project) => {
        // Construction de l'URL de l'image à partir du champ "Main_image"
        const imagePath = project.Main_image.url;
        const baseUrl = apiUrl.replace('/api', '');
        const imageUrl = imagePath.startsWith('/') ? `${baseUrl}${imagePath}` : `${baseUrl}/${imagePath}`;
        console.log(`Image URL for project "${project.Titre}":`, imageUrl);

        return (
          <WebCapsule
            key={project.id}
            title={project.Titre}
            images={[imageUrl]}
            // L'API ne renvoie pas de tags dans l'exemple, on passe un tableau vide
            tags={[]}
            client={project.Client}
            // On extrait l'année à partir du champ Date
            year={new Date(project.Date).getFullYear().toString()}
            link={project.url}
            // Pour la description, on convertit le rich text en texte brut (si c'est un tableau)
            description={
              Array.isArray(project.Description)
                ? project.Description.map((block: any) =>
                    block.children.map((child: any) => child.text).join(" ")
                  ).join(" ")
                : ""
            }
          />
        );
      })}
    </div>
  );
};

export default PortfolioSection;