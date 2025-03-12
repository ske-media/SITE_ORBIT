// Types for Strapi API responses

export interface StrapiResponse<T> {
  data: StrapiData<T>[];
  meta: StrapiMeta;
}

export interface StrapiSingleResponse<T> {
  data: StrapiData<T>;
  meta: StrapiMeta;
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      formats: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
      };
      alternativeText?: string;
      width: number;
      height: number;
    };
  } | null;
}

export interface StrapiAuthor {
  name: string;
  bio?: string;
  avatar?: StrapiImage;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiArticle {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: StrapiImage;
  author: {
    data: StrapiData<StrapiAuthor> | null;
  };
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}