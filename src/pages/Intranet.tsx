import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types/blog';

function Intranet() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setIsEmailConfirmed(true);

    try {
      await supabase.auth.signOut();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Auth error:', error.message);
        throw error;
      }

      // Check if email is confirmed
      if (data.user && !data.user.email_confirmed_at) {
        setIsEmailConfirmed(false);
        setError('Veuillez confirmer votre email avant de vous connecter');
        return;
      }

      // Récupérer le profil auteur
      const { data: author, error: authorError } = await supabase
        .from('blog_authors')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (authorError || !author) {
        setError('Accès non autorisé');
        return;
      }

      setIsAuthenticated(true);
      fetchPosts();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Invalid')) {
          setError('Identifiants invalides');
        } else if (error.message.includes('Email not confirmed')) {
          setError('Veuillez confirmer votre email');
          setIsEmailConfirmed(false);
        } else {
          setError(`Erreur de connexion: ${error.message}`);
        }
      } else {
        setError('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-md mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
            <ArrowLeft className="h-5 w-5" />
            Retour à l'accueil
          </Link>

          <h1 className="text-3xl font-bold mb-8 gradient-text">Connexion Intranet</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl">
                <p>{error}</p>
                {!isEmailConfirmed && (
                  <p className="mt-2 text-sm">
                    Si vous n'avez pas reçu l'email de confirmation, veuillez vérifier vos spams 
                    ou contacter le support.
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#B026FF] py-4 rounded-xl font-medium hover:bg-[#B026FF]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="h-5 w-5" />
            Retour à l'accueil
          </Link>
          <button
            onClick={() => navigate('/blog/new')}
            className="inline-flex items-center gap-2 bg-[#B026FF] px-4 py-2 rounded-xl hover:bg-[#B026FF]/80 transition"
          >
            <Plus className="h-5 w-5" />
            Nouvel article
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-8 gradient-text">Gestion du Blog</h1>

        {/* Filtres et Recherche */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select className="pl-12 pr-8 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white appearance-none">
              <option value="">Tous les statuts</option>
              <option value="published">Publié</option>
              <option value="draft">Brouillon</option>
              <option value="scheduled">Programmé</option>
            </select>
          </div>
        </div>

        {/* Liste des articles */}
        <div className="bg-white/5 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#B026FF]/20">
                <th className="text-left p-4">Titre</th>
                <th className="text-left p-4 hidden md:table-cell">Statut</th>
                <th className="text-left p-4 hidden md:table-cell">Date</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-[#B026FF]/20 hover:bg-white/5">
                  <td className="p-4">
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-gray-400 md:hidden">
                      {post.is_published ? 'Publié' : 'Brouillon'} • {
                        new Date(post.created_at).toLocaleDateString('fr-FR')
                      }
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      post.is_published ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {post.is_published ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="p-4 hidden md:table-cell text-gray-400">
                    {new Date(post.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/blog/edit/${post.id}`)}
                        className="p-2 hover:bg-[#B026FF]/20 rounded-lg transition"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                            // Handle delete
                          }
                        }}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Intranet;