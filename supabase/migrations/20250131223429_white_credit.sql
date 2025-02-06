/*
  # Correction des permissions de la base de données
  
  1. Ajustements
    - Accorde les permissions USAGE sur le schéma public
    - Accorde les permissions sur toutes les tables du schéma public
    - Vérifie et corrige les politiques RLS
    
  2. Sécurité
    - Maintient la sécurité RLS
    - Ajoute des permissions explicites pour les rôles anon et authenticated
*/

-- Accorder les permissions de base sur le schéma public
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Accorder les permissions sur les séquences existantes
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Accorder les permissions sur les tables existantes
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- S'assurer que RLS est activé sur toutes les tables
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', r.tablename);
    END LOOP;
END
$$;

-- Vérifier et corriger les politiques pour blog_posts
DROP POLICY IF EXISTS "Public can read published posts" ON blog_posts;
CREATE POLICY "Public can read published posts"
ON blog_posts
FOR SELECT
TO public
USING (is_published = true AND published_at <= now());

DROP POLICY IF EXISTS "Admins can manage all posts" ON blog_posts;
CREATE POLICY "Admins can manage all posts"
ON blog_posts
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = id
    AND (raw_app_meta_data->>'role' = 'admin' OR raw_user_meta_data->>'role' = 'admin')
  )
);

-- Vérifier et mettre à jour le rôle admin
UPDATE auth.users
SET raw_app_meta_data = 
  CASE 
    WHEN raw_app_meta_data IS NULL THEN 
      jsonb_build_object('role', 'admin')
    ELSE 
      jsonb_set(raw_app_meta_data, '{role}', '"admin"')
  END,
raw_user_meta_data = 
  CASE 
    WHEN raw_user_meta_data IS NULL THEN 
      jsonb_build_object('role', 'admin')
    ELSE 
      jsonb_set(raw_user_meta_data, '{role}', '"admin"')
  END
WHERE email = 'info@agence-orbit.ch';