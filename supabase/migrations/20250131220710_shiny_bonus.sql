/*
  # Update admin credentials

  1. Changes
    - Update admin email from 'admin_oceane' to 'info@agence-orbit.ch'
*/

-- Update the admin user's email
UPDATE auth.users
SET email = 'info@agence-orbit.ch'
WHERE email = 'admin_oceane';

-- Update any references to the email in app_metadata if needed
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"email":"info@agence-orbit.ch"}'::jsonb
WHERE email = 'info@agence-orbit.ch';