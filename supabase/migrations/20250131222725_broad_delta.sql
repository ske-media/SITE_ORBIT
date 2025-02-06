/*
  # Fix Authentication Permissions

  1. Changes
    - Add policies for auth.users table
    - Enable RLS on auth.users
    - Add policy for users to read their own profile
    - Add policy for admins to manage users

  2. Security
    - Enable RLS on auth.users table
    - Add specific policies for user access
    - Ensure admin role has proper permissions
*/

-- Enable RLS on auth.users
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own profile
CREATE POLICY "Users can read own profile"
ON auth.users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Policy for admins to manage all users
CREATE POLICY "Admins can manage all users"
ON auth.users
FOR ALL
TO authenticated
USING (auth.jwt()->>'role' = 'admin')
WITH CHECK (auth.jwt()->>'role' = 'admin');

-- Ensure admin role has proper permissions
DO $$
BEGIN
  -- Update existing admin user's app_metadata
  UPDATE auth.users
  SET raw_app_meta_data = jsonb_set(
    COALESCE(raw_app_meta_data, '{}'::jsonb),
    '{role}',
    '"admin"'
  )
  WHERE email = 'info@agence-orbit.ch';
END $$;