/*
  # Update admin credentials

  1. Changes
    - Update admin email to info@agence-orbit.ch
    - Reset password to ensure it works properly
*/

-- Update the admin user's email and password
UPDATE auth.users
SET 
  email = 'info@agence-orbit.ch',
  encrypted_password = crypt('RgtVM^buS@6NJAjFn1br5aT7t2w8jGJP', gen_salt('bf')),
  updated_at = now()
WHERE email = 'admin_oceane';

-- Update any references to the email in app_metadata if needed
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"email":"info@agence-orbit.ch"}'::jsonb
WHERE email = 'info@agence-orbit.ch';