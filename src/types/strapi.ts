// src/types/strapi.ts

// ------------------------------
// TYPES GÉNÉRAUX POUR L'API STRAPI
// ------------------------------
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

// ------------------------------
// TYPE POUR LES IMAGES
// ------------------------------
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

// ------------------------------
// TYPES POUR LES AUTEURS (Blog Destin d'entrepreneur)
// ------------------------------
export interface StrapiAuthor {
  name: string;
  bio?: string;
  avatar?: StrapiImage;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

// ------------------------------
// TYPE POUR LES ARTICLES DE BLOG (Destin d'entrepreneur)
// ------------------------------
export interface StrapiArticle {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: StrapiImage;
  author: {
    data: StrapiData<StrapiAuthor> | null;
  };
  petitedate: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

// ------------------------------
// TYPE POUR LE PORTFOLIO – SITE WEB
// ------------------------------
export interface StrapiPortfolioSiteWeb {
  titre: string;
  slug: string;
  image_vedette: StrapiImage;
  tags: {
    data: Array<{
      id: number;
      attributes: {
        nom: string;
      };
    }>;
  };
  client: string;
  annee: string;
  lien_projet: string;
  description?: string;
}