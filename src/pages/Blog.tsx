import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, User, Tag, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { trackContentView } from '../lib/analytics';
import type { BlogPost, BlogCategory } from '../types/blog';

// Constante pour contrôler l'affichage de la section
const SHOW_RECENT_POSTS = false;

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

  return !SHOW_RECENT_POSTS ? (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Blog Orbit</h1>
          <p className="text-gray-400">La section articles sera bientôt disponible</p>
        </div>
      </div>
    </div>
  ) : null;
}

export default Blog;