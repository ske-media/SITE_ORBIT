/*
  # Ajout de la relation user_id à blog_authors

  1. Modifications
    - Ajout de la colonne user_id dans blog_authors
    - Création d'une clé étrangère vers auth.users
    - Mise à jour des politiques RLS

  2. Sécurité
    - Mise à jour des politiques pour utiliser user_id
*/

-- Ajout de la colonne user_id
ALTER TABLE blog_authors 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Mise à jour des politiques RLS
DROP POLICY IF EXISTS "Public can read authors" ON blog_authors;
CREATE POLICY "Public can read authors"
ON blog_authors
FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Authors can update their own profile" ON blog_authors;
CREATE POLICY "Authors can update their own profile"
ON blog_authors
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage authors" ON blog_authors;
CREATE POLICY "Admins can manage authors"
ON blog_authors
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = id
    AND (raw_app_meta_data->>'role' = 'admin' OR raw_user_meta_data->>'role' = 'admin')
  )
);