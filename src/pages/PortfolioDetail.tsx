import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPortfolioSiteBySlug, getStrapiMediaUrl } from '../lib/strapi';

interface PortfolioProjectFlat {
  id: number;
  Titre: string;
  Slug: string;
  Short_description: string;
  Tech_stack: string | null;
  Date: string; // Ex : "2025-02-05"
  url: string; // Lien externe du site
  Client: string;
  Description: any; // Rich text array
  Featured: boolean;
  Site_type: string;
  Main_image: {
    url: string;
  };
}

const PortfolioDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<PortfolioProjectFlat | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        // getPortfolioSiteBySlug est défini dans lib/strapi.ts et doit renvoyer un objet plat
        const data: PortfolioProjectFlat = await getPortfolioSiteBySlug(slug!);
        console.log("Portfolio detail project:", data);
        setProject(data);
      } catch (err: any) {
        console.error(`Error fetching portfolio site with slug ${slug}:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!project) return <div>Projet non trouvé.</div>;

  // Construction de l'URL complète de l'image via le helper
  const imageUrl = getStrapiMediaUrl(project.Main_image.url);
  let year = "";
  try {
    year = new Date(project.Date).getFullYear().toString();
  } catch (e) {
    console.error("Error parsing date:", project.Date, e);
  }

  // Conversion simple du rich text en texte brut (si Description est un tableau)
  const descriptionText = Array.isArray(project.Description)
    ? project.Description.map((block: any) =>
        block.children.map((child: any) => child.text).join(" ")
      ).join(" ")
    : "";

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Helmet>
        <title>{project.Titre} | Portfolio</title>
        <meta name="description" content={project.Short_description || descriptionText} />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">{project.Titre}</h1>
      {imageUrl && <img src={imageUrl} alt={project.Titre} className="w-full mb-4" />}
      <div className="text-gray-300">
        <p className="mb-2">{project.Short_description}</p>
        <p className="mb-2">
          <strong>Client:</strong> {project.Client} &bull; <strong>Année:</strong> {year}
        </p>
        {descriptionText && <p className="mt-4">{descriptionText}</p>}
      </div>
    </div>
  );
};

export default PortfolioDetail;