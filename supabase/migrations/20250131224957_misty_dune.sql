/*
  # Link Admin User to Author Profile

  1. Changes
    - Safely creates or updates author profile for admin user
    - Ensures unique user_id constraint is respected
    - Links existing author profile if found

  2. Security
    - Maintains RLS policies
    - Only affects admin user
*/

DO $$
DECLARE
    admin_user_id uuid;
    existing_author_id uuid;
BEGIN
    -- Get the admin user ID
    SELECT id INTO admin_user_id
    FROM auth.users
    WHERE email = 'info@agence-orbit.ch'
    LIMIT 1;

    -- If admin user exists
    IF admin_user_id IS NOT NULL THEN
        -- Check for existing author profile by name
        SELECT id INTO existing_author_id
        FROM blog_authors
        WHERE name = 'Océane Pougea'
        LIMIT 1;

        IF existing_author_id IS NOT NULL THEN
            -- Update existing author profile
            UPDATE blog_authors
            SET 
                name = 'Océane Pougea',
                role = 'Experte en Organisation & Processus - Co-fondatrice',
                user_id = admin_user_id,
                updated_at = now()
            WHERE id = existing_author_id;
        ELSE
            -- Create new author profile
            INSERT INTO blog_authors (
                id,
                name,
                role,
                user_id,
                created_at,
                updated_at
            ) VALUES (
                gen_random_uuid(),
                'Océane Pougea',
                'Experte en Organisation & Processus - Co-fondatrice',
                admin_user_id,
                now(),
                now()
            );
        END IF;
    END IF;
END $$;