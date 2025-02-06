/*
  # Grant Permissions and Create Policies

  1. Changes
    - Grant schema usage to anon role
    - Grant SELECT permissions on blog tables
    - Create policies for public access
*/

-- Grant schema usage to anon role
GRANT USAGE ON SCHEMA public TO anon;

-- Grant SELECT permissions on specific tables
GRANT SELECT ON blog_posts TO anon;
GRANT SELECT ON blog_authors TO anon;
GRANT SELECT ON blog_categories TO anon;
GRANT SELECT ON blog_tags TO anon;

-- Ensure RLS is enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Public read published posts"
ON blog_posts
FOR SELECT
TO public
USING (is_published = true AND published_at <= now());

CREATE POLICY "Public read authors"
ON blog_authors
FOR SELECT
TO public
USING (true);

CREATE POLICY "Public read categories"
ON blog_categories
FOR SELECT
TO public
USING (true);

CREATE POLICY "Public read tags"
ON blog_tags
FOR SELECT
TO public
USING (true);