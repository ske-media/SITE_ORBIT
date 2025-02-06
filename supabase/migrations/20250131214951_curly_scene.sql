/*
  # Création des tables pour le blog Orbit

  1. Nouvelles Tables
    - `blog_posts` : Articles du blog
      - `id` (uuid, clé primaire)
      - `title` (text, titre de l'article)
      - `slug` (text, URL unique)
      - `excerpt` (text, résumé)
      - `content` (text, contenu en markdown)
      - `featured_image` (text, image principale)
      - `author_id` (uuid, référence à blog_authors)
      - `category_id` (uuid, référence à blog_categories)
      - `published_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `meta_title` (text, titre SEO)
      - `meta_description` (text, description SEO)
      - `is_published` (boolean)
      - `reading_time` (integer)
      - `tags` (array de texte)

    - `blog_categories` : Catégories des articles
      - `id` (uuid, clé primaire)
      - `name` (text)
      - `slug` (text)
      - `description` (text)

    - `blog_authors` : Auteurs des articles
      - `id` (uuid, clé primaire)
      - `name` (text)
      - `avatar_url` (text)
      - `bio` (text)
      - `role` (text)

    - `blog_tags` : Tags pour les articles
      - `id` (uuid, clé primaire)
      - `name` (text)
      - `slug` (text)

    - `blog_comments` : Commentaires sur les articles
      - `id` (uuid, clé primaire)
      - `post_id` (uuid, référence à blog_posts)
      - `author_name` (text)
      - `author_email` (text)
      - `content` (text)
      - `created_at` (timestamp)
      - `is_approved` (boolean)

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques de lecture publique pour les contenus publiés
    - Politiques d'écriture restreintes aux administrateurs

  3. Indexes
    - Index sur les slugs pour une recherche rapide
    - Index sur les dates de publication
    - Index sur les tags pour la recherche
*/

-- Création de la table des auteurs
CREATE TABLE blog_authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar_url text,
  bio text,
  role text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Création de la table des catégories
CREATE TABLE blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Création de la table des tags
CREATE TABLE blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Création de la table principale des articles
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  author_id uuid REFERENCES blog_authors(id),
  category_id uuid REFERENCES blog_categories(id),
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  meta_title text,
  meta_description text,
  is_published boolean DEFAULT false,
  reading_time integer DEFAULT 0,
  tags text[] DEFAULT '{}',
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('french', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('french', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('french', coalesce(content, '')), 'C')
  ) STORED
);

-- Création de la table des commentaires
CREATE TABLE blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  author_email text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_approved boolean DEFAULT false
);

-- Index pour la recherche et les performances
CREATE INDEX blog_posts_search_idx ON blog_posts USING gin(search_vector);
CREATE INDEX blog_posts_published_at_idx ON blog_posts(published_at);
CREATE INDEX blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX blog_posts_tags_idx ON blog_posts USING gin(tags);

-- Activation de la Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité pour les articles
CREATE POLICY "Les articles publiés sont visibles par tous"
  ON blog_posts
  FOR SELECT
  USING (is_published = true AND published_at <= now());

CREATE POLICY "Seuls les administrateurs peuvent modifier les articles"
  ON blog_posts
  FOR ALL
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Politiques pour les catégories
CREATE POLICY "Les catégories sont visibles par tous"
  ON blog_categories
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Seuls les administrateurs peuvent modifier les catégories"
  ON blog_categories
  FOR ALL
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Politiques pour les auteurs
CREATE POLICY "Les profils d'auteurs sont visibles par tous"
  ON blog_authors
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Seuls les administrateurs peuvent modifier les auteurs"
  ON blog_authors
  FOR ALL
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Politiques pour les tags
CREATE POLICY "Les tags sont visibles par tous"
  ON blog_tags
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Seuls les administrateurs peuvent modifier les tags"
  ON blog_tags
  FOR ALL
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Politiques pour les commentaires
CREATE POLICY "Les commentaires approuvés sont visibles par tous"
  ON blog_comments
  FOR SELECT
  TO PUBLIC
  USING (is_approved = true);

CREATE POLICY "Tout le monde peut soumettre un commentaire"
  ON blog_comments
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

CREATE POLICY "Seuls les administrateurs peuvent modérer les commentaires"
  ON blog_comments
  FOR UPDATE
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');