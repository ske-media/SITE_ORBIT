/*
  # Add admin user

  1. Changes
    - Add admin user for Océane with provided credentials
    - Set admin role for the user

  2. Security
    - Password is hashed using Supabase's built-in password hashing
*/

-- Create admin user with provided credentials
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role
) VALUES (
  gen_random_uuid(),
  'admin_oceane',
  crypt('RgtVM^buS@6NJAjFn1br5aT7t2w8jGJP', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Océane Pougea","role":"admin"}',
  now(),
  now(),
  'authenticated'
);

-- Set admin role for the user
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb
WHERE email = 'admin_oceane';