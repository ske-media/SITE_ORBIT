import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getArticleBySlug, getStrapiMediaUrl } from '../lib/strapi';
import { StrapiData, StrapiArticle as StrapiArticleType } from '../types/strapi';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import Footer from '../components/Footer';

function StrapiArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<StrapiData<StrapiArticleType> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        const data = await getArticleBySlug(slug);
        setArticle(data);
      } catch (error) {
        console.error('Failed to fetch article:', error);
        setError('Impossible de charger cet article. Il a peut-être été déplacé ou supprimé.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  // Calculate reading time (roughly 200 words per minute)
  const calculateReadingTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return readingTime > 0 ? readingTime : 1; // Minimum 1 minute
  };

  // For social sharing
  const shareUrl = window.location.href;
  const shareTitle = article?.attributes.title || 'Article Orbit';

  const handleShare = (platform: string) => {
    // Share tracking logic could go here
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
          <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
          <p className="text-gray-400 mb-6">{error || "Cet article n'existe pas ou a été supprimé."}</p>
          <Link to="/strapi-blog" className="text-[#B026FF] hover:text-white transition">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.attributes.title} | Agence Orbit</title>
        <meta name="description" content={article.attributes.excerpt} />
      </Helmet>
      
      <div className="min-h-screen pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4">
          <Link to="/strapi-blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
            <ArrowLeft className="h-5 w-5" />
            Retour au blog
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-6 gradient-text">
              {article.attributes.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
              {article.attributes.author?.data && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {article.attributes.author.data.attributes.name}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {format(new Date(article.attributes.publishedAt), 'dd MMMM yyyy', { locale: fr })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {calculateReadingTime(article.attributes.content)} min de lecture
              </div>
            </div>

            {article.attributes.image?.data && (
              <img
                src={getStrapiMediaUrl(article.attributes.image.data.attributes.url)}
                alt={article.attributes.title}
                className="w-full aspect-video object-cover rounded-2xl mb-8"
              />
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-invert prose-purple max-w-none mb-12">
            <ReactMarkdown>{article.attributes.content}</ReactMarkdown>
          </div>

          {/* Social Sharing */}
          <div className="border-t border-[#B026FF]/20 pt-8 mb-12">
            <div className="flex items-center gap-4">
              <span className="text-gray-400 flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Partager
              </span>
              <div className="flex gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-white/5 rounded-full hover:bg-[#B026FF]/20 transition"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-white/5 rounded-full hover:bg-[#B026FF]/20 transition"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleShare('linkedin')}
                  className="p-2 bg-white/5 rounded-full hover:bg-[#B026FF]/20 transition"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Author Information (if available) */}
          {article.attributes.author?.data && (
            <div className="bg-white/5 rounded-2xl p-8 mb-12">
              <div className="flex items-center gap-6">
                {article.attributes.author.data.attributes.avatar?.data && (
                  <img
                    src={getStrapiMediaUrl(article.attributes.author.data.attributes.avatar.data.attributes.url)}
                    alt={article.attributes.author.data.attributes.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold mb-1">{article.attributes.author.data.attributes.name}</h3>
                  {article.attributes.author.data.attributes.role && (
                    <p className="text-[#B026FF]">{article.attributes.author.data.attributes.role}</p>
                  )}
                </div>
              </div>
              {article.attributes.author.data.attributes.bio && (
                <p className="text-gray-400 mt-4">{article.attributes.author.data.attributes.bio}</p>
              )}
            </div>
          )}
        </article>
      </div>
      <Footer />
    </>
  );
}

export default StrapiArticlePage;