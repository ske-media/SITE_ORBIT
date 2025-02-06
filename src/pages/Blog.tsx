import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, User, Tag, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { trackContentView } from '../lib/analytics';
import type { BlogPost, BlogCategory } from '../types/blog';

function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [selectedCategory, searchQuery]);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          blog_authors (
            name,
            avatar_url
          ),
          blog_categories (
            name,
            slug
          )
        `)
        .eq('is_published', true)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false });

      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }

      if (searchQuery) {
        query = query.textSearch('search_vector', searchQuery);
      }

      const { data, error } = await query;

      if (error) throw error;
      const posts = data as unknown as BlogPost[];
      setPosts(posts);
      
      // Tracker la vue de la liste des articles
      trackContentView('blog_list', 'all', `Blog posts - ${posts.length} articles`);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Blog Orbit</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez nos articles sur le web design, le marketing digital et les dernières tendances du numérique.
          </p>
        </div>

        {/* Filtres et Recherche */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-12 pr-8 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white appearance-none cursor-pointer min-w-[200px]"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Liste des articles */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B026FF]"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition group"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                    />
                    {post.category_id && (
                      <div className="absolute top-4 left-4 bg-[#B026FF] text-white px-3 py-1 rounded-full text-sm">
                        {(post as any).blog_categories.name}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 group-hover:text-[#B026FF] transition">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.reading_time} min
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {(post as any).blog_authors.name}
                        </span>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          {post.tags[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {posts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400">Aucun article trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;