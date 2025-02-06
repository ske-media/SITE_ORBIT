/*
  # Fix Database Permissions

  1. Changes
    - Add missing RLS policies for auth.users
    - Fix admin role permissions
    - Ensure proper access to blog tables
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add admin-specific policies
*/

-- First, ensure RLS is enabled on all tables
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Clear existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can read own profile" ON auth.users;
DROP POLICY IF EXISTS "Admins can manage all users" ON auth.users;

-- Add basic read access for authenticated users
CREATE POLICY "Users can read own profile"
ON auth.users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Add admin policies for full access
CREATE POLICY "Admins can manage all users"
ON auth.users
FOR ALL
TO authenticated
USING (
  auth.jwt()->>'role' = 'admin'
  OR 
  auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE raw_app_meta_data->>'role' = 'admin'
  )
)
WITH CHECK (
  auth.jwt()->>'role' = 'admin'
  OR 
  auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE raw_app_meta_data->>'role' = 'admin'
  )
);

-- Ensure the admin user has the correct role
UPDATE auth.users
SET raw_app_meta_data = 
  CASE 
    WHEN raw_app_meta_data IS NULL THEN 
      jsonb_build_object('role', 'admin')
    ELSE 
      jsonb_set(raw_app_meta_data, '{role}', '"admin"')
  END
WHERE email = 'info@agence-orbit.ch';

-- Add policies for blog tables
CREATE POLICY "Public can read published posts"
ON blog_posts
FOR SELECT
TO public
USING (is_published = true AND published_at <= now());

CREATE POLICY "Admins can manage all posts"
ON blog_posts
FOR ALL
TO authenticated
USING (
  auth.jwt()->>'role' = 'admin'
  OR 
  auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE raw_app_meta_data->>'role' = 'admin'
  )
);

-- Similar policies for other blog-related tables
CREATE POLICY "Public can read authors"
ON blog_authors
FOR SELECT
TO public
USING (true);

CREATE POLICY "Admins can manage authors"
ON blog_authors
FOR ALL
TO authenticated
USING (
  auth.jwt()->>'role' = 'admin'
  OR 
  auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE raw_app_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Public can read categories"
ON blog_categories
FOR SELECT
TO public
USING (true);

CREATE POLICY "Admins can manage categories"
ON blog_categories
FOR ALL
TO authenticated
USING (
  auth.jwt()->>'role' = 'admin'
  OR 
  auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE raw_app_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Public can read tags"
ON blog_tags
FOR SELECT
TO public
USING (true);

CREATE POLICY "Admins can manage tags"
ON blog_tags
FOR ALL
TO authenticated
USING (
  auth.jwt()->>'role' = 'admin'
  OR 
  auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE raw_app_meta_data->>'role' = 'admin'
  )
);

-- Comments policies
CREATE POLICY "Public can read approved comments"
ON blog_comments
FOR SELECT
TO public
USING (is_approved = true);

CREATE POLICY "Public can create comments"
ON blog_comments
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Admins can manage comments"
ON blog_comments
FOR ALL
TO authenticated
USING (
  auth.jwt()->>'role' = 'admin'
  OR 
  auth.uid() IN (
    SELECT id FROM auth.users 
    WHERE raw_app_meta_data->>'role' = 'admin'
  )
);