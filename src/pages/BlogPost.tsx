import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Share2, Facebook, Linkedin, Twitter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { trackContentView, trackEvent } from '../lib/analytics';
import type { BlogPost } from '../types/blog';
import ReactMarkdown from 'react-markdown';

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          blog_authors (
            name,
            avatar_url,
            bio,
            role
          ),
          blog_categories (
            name,
            slug
          )
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .lte('published_at', new Date().toISOString())
        .single();

      if (error) throw error;
      setPost(data as unknown as BlogPost);
      
      // Tracker la vue de l'article
      if (data) {
        trackContentView('blog_post', data.id, data.title);
      }

      // Fetch related posts
      if (data) {
        const { data: related } = await supabase
          .from('blog_posts')
          .select(`
            *,
            blog_authors (
              name
            )
          `)
          .eq('category_id', data.category_id)
          .eq('is_published', true)
          .lte('published_at', new Date().toISOString())
          .neq('id', data.id)
          .limit(3);

        if (related) {
          setRelatedPosts(related as unknown as BlogPost[]);
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Tracker le partage social
  const trackShare = (platform: string) => {
    trackEvent({
      action: 'share',
      category: 'social',
      label: platform,
      content_id: post?.id,
      content_title: post?.title
    });
  };

  const shareUrl = window.location.href;
  const shareTitle = post?.title || 'Article Orbit';

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B026FF]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
          <Link to="/blog" className="text-[#B026FF] hover:text-white transition">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <article className="max-w-4xl mx-auto px-4">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <ArrowLeft className="h-5 w-5" />
          Retour au blog
        </Link>

        {/* En-tête de l'article */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-[#B026FF] mb-4">
            <Link
              to={`/blog?category=${(post as any).blog_categories?.slug}`}
              className="hover:text-white transition"
            >
              {(post as any).blog_categories?.name}
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold mb-6 gradient-text">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {(post as any).blog_authors?.name}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.published_at).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.reading_time} min de lecture
            </div>
          </div>

          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full aspect-video object-cover rounded-2xl mb-8"
            />
          )}
        </header>

        {/* Contenu de l'article */}
        <div className="prose prose-invert prose-purple max-w-none mb-12">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Partage */}
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
                className="p-2 bg-white/5 rounded-full hover:bg-[#B026FF]/20 transition"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-[#B026FF]/20 transition"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-[#B026FF]/20 transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Auteur */}
        <div className="bg-white/5 rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-6">
            {(post as any).blog_authors?.avatar_url && (
              <img
                src={(post as any).blog_authors.avatar_url}
                alt={(post as any).blog_authors.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="text-xl font-bold mb-1">{(post as any).blog_authors?.name}</h3>
              <p className="text-[#B026FF]">{(post as any).blog_authors?.role}</p>
            </div>
          </div>
          {(post as any).blog_authors?.bio && (
            <p className="text-gray-400 mt-4">{(post as any).blog_authors.bio}</p>
          )}
        </div>

        {/* Articles similaires */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition group"
                >
                  {relatedPost.featured_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.featured_image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold mb-2 group-hover:text-[#B026FF] transition">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <User className="h-4 w-4 mr-1" />
                      {(relatedPost as any).blog_authors.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

export default BlogPost;