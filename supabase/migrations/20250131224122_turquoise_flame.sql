/*
  # Add unique constraint to blog_authors.user_id

  1. Changes
    - Adds a unique constraint to the user_id column in blog_authors table
    - Ensures each user can only have one author profile

  2. Security
    - Maintains existing RLS policies
    - Ensures data integrity
*/

-- Add unique constraint to user_id
ALTER TABLE blog_authors
ADD CONSTRAINT blog_authors_user_id_key UNIQUE (user_id);

-- Ensure existing data is valid
DELETE FROM blog_authors a1
USING blog_authors a2
WHERE a1.user_id = a2.user_id
AND a1.created_at > a2.created_at;