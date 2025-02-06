/*
  # Set up anonymous role permissions

  1. Permissions
    - Grant USAGE on public schema
    - Grant SELECT on blog tables
    - Drop existing policies to avoid conflicts
    - Create new policies for public access
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS blog_posts_select_policy ON blog_posts;
DROP POLICY IF EXISTS blog_authors_select_policy ON blog_authors;
DROP POLICY IF EXISTS blog_categories_select_policy ON blog_categories;
DROP POLICY IF EXISTS blog_tags_select_policy ON blog_tags;

-- Grant schema usage to anon role
GRANT USAGE ON SCHEMA public TO anon;

-- Grant SELECT permissions on specific tables
GRANT SELECT ON blog_posts TO anon;
GRANT SELECT ON blog_authors TO anon;
GRANT SELECT ON blog_categories TO anon;
GRANT SELECT ON blog_tags TO anon;

-- Create policies for public access
CREATE POLICY anon_read_published_posts
ON blog_posts
FOR SELECT
TO public
USING (is_published = true AND published_at <= now());

CREATE POLICY anon_read_authors
ON blog_authors
FOR SELECT
TO public
USING (true);

CREATE POLICY anon_read_categories
ON blog_categories
FOR SELECT
TO public
USING (true);

CREATE POLICY anon_read_tags
ON blog_tags
FOR SELECT
TO public
USING (true);