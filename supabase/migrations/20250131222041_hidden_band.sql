/*
  # Fix authentication setup

  1. Changes
    - Reset and properly set up admin user credentials
    - Add required provider_id for identities
    - Ensure proper role and permissions

  2. Security
    - Set up proper password hashing
    - Configure correct role policies
*/

-- First, clean up any existing entries to avoid duplicates
DELETE FROM auth.identities WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'info@agence-orbit.ch'
);
DELETE FROM auth.users WHERE email = 'info@agence-orbit.ch';

-- Create fresh admin user with correct credentials
WITH new_user AS (
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    aud,
    confirmation_token
  ) VALUES (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000',
    'info@agence-orbit.ch',
    crypt('RgtVM^buS@6NJAjFn1br5aT7t2w8jGJP', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"],"role":"admin"}'::jsonb,
    '{"name":"Océane Pougea","role":"admin"}'::jsonb,
    now(),
    now(),
    'authenticated',
    'authenticated',
    encode(sha256(random()::text::bytea), 'hex')
  )
  RETURNING id, email
)
-- Add identity with proper provider_id
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT
  gen_random_uuid(),
  id,
  jsonb_build_object('sub', id::text, 'email', email),
  'email',
  email,
  now(),
  now(),
  now()
FROM new_user;