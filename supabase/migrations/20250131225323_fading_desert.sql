/*
  # Fix Anon Role Permissions
  
  1. Grant Permissions
    - Grant necessary schema and table access to anon role
    - Enable proper access for public blog viewing
  
  2. Create Policies
    - Add policies for public access to blog content
*/

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON blog_posts, blog_authors, blog_categories, blog_tags TO anon;

-- Create policies for public access
CREATE POLICY blog_posts_select_policy
ON blog_posts
FOR SELECT
TO public
USING (is_published = true AND published_at <= now());

CREATE POLICY blog_authors_select_policy
ON blog_authors
FOR SELECT
TO public
USING (true);

CREATE POLICY blog_categories_select_policy
ON blog_categories
FOR SELECT
TO public
USING (true);

CREATE POLICY blog_tags_select_policy
ON blog_tags
FOR SELECT
TO public
USING (true);