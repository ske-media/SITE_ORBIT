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
// TYPES POUR LES AUTEURS (BLOG DESTIN D'ENTREPRENEUR)
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
// TYPE POUR LES ARTICLES DE BLOG (DESTIN D'ENTREPRENEUR)
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
// TYPE POUR LES ARTICLES SEO
// ------------------------------
export interface StrapiSeoArticle {
  Titre: string;         // Titre de l'article SEO
  slug: string;
  Contenu: string;       // Le contenu complet
  excerpt: string;       // Un résumé ou extrait
  image?: StrapiImage[]; // Vous pouvez gérer une ou plusieurs images
  Auteur: string;        // Auteur de l'article
  Date?: string;         // Date alternative si nécessaire
  publishedAt?: string;  // Date de publication (souvent "publishedAt" dans Strapi)
  createdAt: string;
  updatedAt: string;
  Categorie?: string;    // Pour trier ou catégoriser l'article

  // Champs SEO additionnels issus de votre single component (pour méta données)
  meta_title?: string;           // Titre SEO personnalisé
  meta_description?: string;     // Description SEO personnalisée
  meta_image?: StrapiImage[];    // Image SEO (pour Open Graph, etc.)
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