// src/pages/StrapiSeoBlog.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { StrapiSeoArticle } from '../types/strapi';
import { Calendar, User, Clock, Search } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Footer from '../components/Footer';

const STRAPI_API_URL =
  import.meta.env.VITE_STRAPI_API_URL ||
  'https://siteorbit-cms-production.up.railway.app/api';

const StrapiSeoBlog: React.FC = () => {
  const [articles, setArticles] = useState<StrapiSeoArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get<{
   data: any[];
   meta: any;
 }>(`${STRAPI_API_URL}/seos?populate=*&sort=publishedAt:desc`);
 const raw = response.data.data;

console.log('🔴 raw Strapi response.data.data:', raw);

        // Transforme chaque item en StrapiSeoArticle, en gérant attributes ou aplati
        const flattened: StrapiSeoArticle[] = raw
          .map(item => {
            // Si c'est la forme par défaut Strapi { id, attributes: {...} }
            if (item.attributes && typeof item.attributes === 'object') {
              const attrs = item.attributes;
              return {
                id: item.id,
                ...attrs,
                slug: attrs.slug,
              } as StrapiSeoArticle;
            }
            // Si c'est déjà aplati { slug, Titre, etc. }
            if (item.slug) {
              return item as StrapiSeoArticle;
            }
            // Autre forme non gérée
            return null;
          })
          .filter((x): x is StrapiSeoArticle => x !== null && !!x.slug);

        console.log('🟢 flattened SEO articles:', flattened);
        setArticles(flattened);
      } catch (err) {
        console.error('❌ Échec du chargement des articles SEO:', err);
        setError("Impossible de charger les articles SEO.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filtrage pour la recherche
  const filtered = articles.filter(
    art =>
      art.Titre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calcReadingTime = (text = '') => {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
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
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white placeholder-gray-400"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B026FF]" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-400">
              <p>{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Aucun article trouvé</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(art => (
                <article
                  key={art.slug}
                  className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition group"
                >
                  <Link to={`/seo-blog/${art.slug}`}>
                    <div className="relative aspect-video overflow-hidden">
                      {art.image && art.image.length > 0 ? (
                        <img
                          src={
                            art.image[0].url.startsWith('http')
                              ? art.image[0].url
                              : `${STRAPI_API_URL.replace(/\/api$/, '')}${art.image[0].url}`
                          }
                          alt={art.Titre}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-black/40" />
                      )}
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-3 group-hover:text-[#B026FF] transition">
                        {art.Titre}
                      </h2>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {art.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {calcReadingTime(art.Contenu)} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {art.publishedAt
                              ? format(new Date(art.publishedAt), 'dd MMM yyyy', {
                                  locale: fr,
                                })
                              : art.Date
                              ? format(new Date(art.Date), 'dd MMM yyyy', {
                                  locale: fr,
                                })
                              : 'N/A'}
                          </span>
                        </div>
                        {art.Auteur && (
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {art.Auteur}
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