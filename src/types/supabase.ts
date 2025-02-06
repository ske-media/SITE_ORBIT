export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image: string | null
          author_id: string | null
          category_id: string | null
          published_at: string | null
          created_at: string
          updated_at: string | null
          meta_title: string | null
          meta_description: string | null
          is_published: boolean
          reading_time: number
          tags: string[] | null
          search_vector: unknown | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          author_id?: string | null
          category_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          is_published?: boolean
          reading_time?: number
          tags?: string[] | null
          search_vector?: unknown | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          author_id?: string | null
          category_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          is_published?: boolean
          reading_time?: number
          tags?: string[] | null
          search_vector?: unknown | null
        }
      }
      blog_authors: {
        Row: {
          id: string
          name: string
          avatar_url: string | null
          bio: string | null
          role: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          avatar_url?: string | null
          bio?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          avatar_url?: string | null
          bio?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      blog_comments: {
        Row: {
          id: string
          post_id: string
          author_name: string
          author_email: string
          content: string
          created_at: string
          is_approved: boolean
        }
        Insert: {
          id?: string
          post_id: string
          author_name: string
          author_email: string
          content: string
          created_at?: string
          is_approved?: boolean
        }
        Update: {
          id?: string
          post_id?: string
          author_name?: string
          author_email?: string
          content?: string
          created_at?: string
          is_approved?: boolean
        }
      }
      blog_tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}