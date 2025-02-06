/*
  # Link admin user with author profile

  1. Changes
    - Creates or updates the author profile for the admin user
    - Links existing author profile with admin user if needed

  2. Security
    - Maintains data integrity
    - Safe handling of author-user relationships
*/

DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Get the admin user ID
    SELECT id INTO admin_user_id
    FROM auth.users
    WHERE email = 'info@agence-orbit.ch'
    LIMIT 1;

    -- If admin user exists
    IF admin_user_id IS NOT NULL THEN
        -- Check if author already exists for this user
        IF NOT EXISTS (
            SELECT 1 FROM blog_authors 
            WHERE user_id = admin_user_id
        ) THEN
            -- Create new author profile
            INSERT INTO blog_authors (id, name, role, user_id)
            VALUES (
                gen_random_uuid(),
                'Océane Pougea',
                'Experte en Organisation & Processus - Co-fondatrice',
                admin_user_id
            );
        ELSE
            -- Update existing author profile
            UPDATE blog_authors
            SET 
                name = 'Océane Pougea',
                role = 'Experte en Organisation & Processus - Co-fondatrice'
            WHERE user_id = admin_user_id;
        END IF;

        -- Update any existing unlinked author profile
        UPDATE blog_authors
        SET user_id = admin_user_id
        WHERE name = 'Océane Pougea'
        AND user_id IS NULL;
    END IF;
END $$;