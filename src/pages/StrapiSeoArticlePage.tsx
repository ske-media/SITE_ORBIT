// src/pages/StrapiSeoArticlePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import Footer from '../components/Footer';
import { getSeoArticleBySlug } from '../lib/strapi';

function StrapiSeoArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
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
      } catch (error) {
        console.error('❌ Failed to fetch SEO article:', error);
        setError("Impossible de charger cet article SEO. Il a peut-être été déplacé ou supprimé.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  const calculateReadingTime = (contenu: string) => {
    const wordCount = contenu?.split(/\s+/).length || 0;
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
          <p className="text-gray-400 mb-6">{error || "Cet article n'existe pas ou a été supprimé."}</p>
          <Link to="/seo-blog" className="text-[#B026FF] hover:text-white transition">
            Retour au blog SEO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.Titre} | Agence Orbit SEO</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4">
          <Link to="/seo-blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
            <ArrowLeft className="h-5 w-5" />
            Retour au blog SEO
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-6 gradient-text">
              {article.Titre}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
              {article.Auteur && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {article.Auteur}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {article.publishedAt
                  ? format(new Date(article.publishedAt), 'dd MMMM yyyy', { locale: fr })
                  : article.Date
                  ? format(new Date(article.Date), 'dd MMMM yyyy', { locale: fr })
                  : 'N/A'}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {calculateReadingTime(article.Contenu)} min de lecture
              </div>
            </div>

            {article.image && article.image.length > 0 && (
              <img
                src={`https://siteorbit-cms-production.up.railway.app${article.image[0].url}`}
                alt={article.Titre}
                className="w-full aspect-video object-cover rounded-2xl mb-8"
              />
            )}
          </header>

          {/* Contenu */}
          <div className="prose prose-invert prose-purple max-w-none mb-12">
            <ReactMarkdown>{article.Contenu}</ReactMarkdown>
          </div>
        </article>
      </div>

      <Footer />
    </>
  );
}

export default StrapiSeoArticlePage;