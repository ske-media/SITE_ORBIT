// src/pages/StrapiSeoBlog.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getSeoArticles } from '../lib/strapi';
import { StrapiSeoArticle } from '../types/strapi';
import { Calendar, User, Clock, Search } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Footer from '../components/Footer';

const StrapiSeoBlog = () => {
  const [articles, setArticles] = useState<StrapiSeoArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await getSeoArticles();
        console.log('✅ SEO Articles response:', response);

        // On s'assure que response.data est bien un tableau
        const articlesData = response.data;
        if (!articlesData || !Array.isArray(articlesData)) {
          throw new Error("Le format de la réponse API n'est pas celui attendu.");
        }

        // On filtre les items qui possèdent la propriété attributes pour éviter l'erreur
        const flattenedArticles: StrapiSeoArticle[] = articlesData
          .filter((item: any) => item && item.attributes)
          .map((item: any) => ({
            // On extrait directement les attributs
            ...item.attributes,
            // On force l'existence d'un slug ainsi que l'id
            slug: item.attributes.slug,
            id: item.id,
          }));
          
        setArticles(flattenedArticles);
      } catch (err) {
        console.error("❌ Échec du chargement des articles SEO:", err);
        setError("Impossible de charger les articles SEO. Veuillez réessayer plus tard.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filtrage des articles en fonction de la recherche
  const filteredArticles = articles.filter((article) =>
    article.Titre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calcul du temps de lecture basé sur 200 mots/min
  const calculateReadingTime = (contenu: string) => {
    const wordCount = contenu ? contenu.split(/\s+/).length : 0;
    const readingTime = Math.ceil(wordCount / 200);
    return readingTime > 0 ? readingTime : 1;
  };

  return (
    <>
      <Helmet>
        <title>Notre Blog | Agence Orbit</title>
        <meta
          name="description"
          content="Découvrez nos articles de blog pour booster votre présence digitale."
        />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Articles</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Découvrez nos articles pour booster votre présence digitale.
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="relative flex-1 mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white placeholder-gray-400"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B026FF]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-400">
              <p>{error}</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Aucun article trouvé</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition group"
                >
                  <Link to={`/seo-blog/${article.slug}`}>
                    <div className="relative aspect-video overflow-hidden">
                      {article.image && article.image.length > 0 ? (
                        <img
                          // On s'appuie ici sur la même structure que dans StrapiSeoArticlePage.tsx
                          src={`https://siteorbit-cms-production.up.railway.app${article.image[0].url}`}
                          alt={article.Titre || "Image de l’article"}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-black/40"></div>
                      )}
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-3 group-hover:text-[#B026FF] transition">
                        {article.Titre}
                      </h2>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {article.excerpt || ''}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {calculateReadingTime(article.Contenu)} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {article.publishedAt
                              ? format(new Date(article.publishedAt), 'dd MMM yyyy', { locale: fr })
                              : article.Date
                              ? format(new Date(article.Date), 'dd MMM yyyy', { locale: fr })
                              : 'N/A'}
                          </span>
                        </div>
                        {article.Auteur && (
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {article.Auteur}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StrapiSeoBlog;