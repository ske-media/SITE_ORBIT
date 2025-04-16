// src/pages/StrapiSeoArticlePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getSeoArticleBySlug } from '../lib/strapi';
import { StrapiSeoArticle } from '../types/strapi';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Footer from '../components/Footer';

function StrapiSeoArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<StrapiSeoArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      try {
        setIsLoading(true);
        const data = await getSeoArticleBySlug(slug);
        console.log('✅ SEO Article fetched:', data);
        setArticle(data);
      } catch (err) {
        console.error('❌ Failed to fetch SEO article:', err);
        setError("Impossible de charger cet article SEO. Il a peut-être été déplacé ou supprimé.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  const calculateReadingTime = (content: string) => {
    const wordCount = content?.split(/\s+/).length || 0;
    const readingTime = Math.ceil(wordCount / 200);
    return readingTime > 0 ? readingTime : 1;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B026FF]"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Article SEO non trouvé</h1>
          <p className="text-gray-400 mb-6">{error || "Cet article SEO n'existe pas ou a été supprimé."}</p>
          <Link to="/seo-blog" className="text-[#B026FF] hover:text-white transition">
            Retour au blog SEO
          </Link>
        </div>
      </div>
    );
  }

  // Données principales de l'article
  const articleTitle = article.Titre || "Article SEO";
  const articleContent = article.Contenu || "";
  const publishedDate = article.publishedAt ? article.publishedAt : article.Date;

  // Champs SEO depuis Strapi (meta_title, meta_description, meta_image)
  const metaTitle = article.meta_title || articleTitle;
  const metaDescription = article.meta_description || article.excerpt || "";
  // Si meta_image existe, on construit l'URL absolue
  let metaImageUrl: string | null = null;
  if (article.meta_image && article.meta_image.url) {
    metaImageUrl = `https://siteorbit-cms-production.up.railway.app${article.meta_image.url}`;
  }

  return (
    <>
      <Helmet>
        {/* Titre et description pour le SEO */}
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />

        {/* Balise canonical */}
        <link rel="canonical" href={`https://agence-orbit.com/seo-blog/${article.slug}`} />

        {/* Balises OG (optionnel) */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        {metaImageUrl && <meta property="og:image" content={metaImageUrl} />}
      </Helmet>

      <div className="min-h-screen pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 relative">
          {/* Effet gradient d'arrière-plan */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#B026FF]/5 to-black pointer-events-none" />

          {/* Lien de retour */}
          <Link to="/seo-blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
            <ArrowLeft className="h-5 w-5" />
            Retour au blog SEO
          </Link>

          {/* Header de l'article */}
          <header className="mb-12 relative">
            <h1 className="text-4xl font-bold mb-6 gradient-text">{articleTitle}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
              {article.Auteur && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {article.Auteur}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {publishedDate
                  ? format(new Date(publishedDate), 'dd MMMM yyyy', { locale: fr })
                  : 'N/A'}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {calculateReadingTime(articleContent)} min de lecture
              </div>
            </div>
            {/* Image principale si présente */}
            {article.image && article.image.length > 0 && (
              <img
                src={`https://siteorbit-cms-production.up.railway.app${article.image[0].url}`}
                alt={articleTitle}
                className="w-full aspect-video object-cover rounded-2xl mb-8"
              />
            )}
          </header>

          {/* Contenu */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/95 dark:bg-white/98 rounded-2xl shadow-[0_0_50px_rgba(176,38,255,0.1)] backdrop-blur-sm" />
            <div
              className="relative p-8 md:p-12 rounded-2xl prose max-w-none mb-12 text-gray-800"
              dangerouslySetInnerHTML={{ __html: articleContent }}
            />
          </div>
        </article>
      </div>

    </>
  );
}

export default StrapiSeoArticlePage;