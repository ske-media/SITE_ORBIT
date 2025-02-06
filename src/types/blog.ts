export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_id: string;
  category_id: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
  is_published: boolean;
  reading_time: number;
  tags: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  avatar_url: string;
  bio: string;
  role: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogComment {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  is_approved: boolean;
}