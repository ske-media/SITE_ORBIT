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
// TYPES POUR LES IMAGES
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
// TYPES POUR LES AUTEURS (DANS LE BLOG DESTIN)
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
// TYPES POUR LES ARTICLES DE BLOG (Destin d'entrepreneur)
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
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

// ------------------------------
// TYPES POUR LES ARTICLES SEO
// (Structure basée sur votre table "seos" dans Supabase)
// ------------------------------
export interface StrapiSeoArticle {
  Titre: string;         // Titre de l'article SEO
  slug: string;
  Contenu: string;       // Le contenu complet
  excerpt: string;       // Un résumé ou extrait
  image?: StrapiImage[]; // Si vous gérez une ou plusieurs images (optionnel)
  Auteur: string;        // Auteur (format texte)
  Date?: string;         // Date, si vous l'utilisez pour une date alternative
  publishedAt?: string;  // Date de publication (remarque : Strapi renvoie souvent "publishedAt")
  createdAt: string;
  updatedAt: string;
  Categorie?: string;    // Champ permettant de trier (catégorie)
}

// ------------------------------
// TYPES POUR LE PORTFOLIO – SITE WEB
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

// ------------------------------
// TYPES POUR LE PORTFOLIO – APPLICATION
// ------------------------------
export interface StrapiPortfolioApp {
  titre: string;
  slug: string;
  image_vedette: StrapiImage;
  client: string;
  annee: string;
  lien_projet: string;
  description?: string;
}

// ------------------------------
// TYPES POUR LE PORTFOLIO – RÉSEAUX SOCIAUX
// ------------------------------
export interface StrapiPortfolioSocial {
  titre: string;
  slug: string;
  image_vedette: StrapiImage;
  client: string;
  annee: string;
  lien_projet: string;
  description?: string;
}