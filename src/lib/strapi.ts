import axios from 'axios';
import type { 
  StrapiResponse, 
  StrapiArticle, 
  StrapiPortfolioSiteWeb 
} from '../types/strapi';

// URL de base de l'API Strapi (définie via l'environnement ou valeur par défaut)
const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || 'https://siteorbit-cms-production.up.railway.app/api';

console.log('VITE_STRAPI_API_URL:', import.meta.env.VITE_STRAPI_API_URL);

const strapiClient = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout de 10 secondes
});

/* ========== BLOG (Articles destin d'entrepreneur) ========== */

// Récupère tous les articles destin d'entrepreneur
export const getArticles = async () => {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiArticle>>(
      '/articles?populate=*&sort=publishedAt:desc'
    );
    console.log('Strapi response (articles):', response.data);
    if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
      throw new Error("La réponse de l'API n'est pas au format attendu pour les articles");
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching articles from Strapi:', error);
    throw error;
  }
};

// Récupère un article unique par slug
export const getArticleBySlug = async (slug: string) => {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiArticle>>(
      `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );
    if (!response.data.data || response.data.data.length === 0) {
      throw new Error('Article not found');
    }
    return response.data.data[0];
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    throw error;
  }
};

/* ========== PORTFOLIO WEBSITE ========== */

// Récupère tous les projets de portfolio website
export const getPortfolioSites = async () => {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiPortfolioSiteWeb>>(
      '/portfolio-site-webs?populate=*&sort=titre:asc'
    );
    console.log('Strapi response (portfolio sites):', response.data);
    if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
      throw new Error("La réponse de l'API n'est pas au format attendu pour le portfolio");
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio sites from Strapi:', error);
    throw error;
  }
};

// Récupère un projet de portfolio website par slug
export const getPortfolioSiteBySlug = async (slug: string) => {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiPortfolioSiteWeb>>(
      `/portfolio-site-webs?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&sort=titre:asc`
    );
    if (!response.data.data || response.data.data.length === 0) {
      throw new Error('Portfolio site not found');
    }
    return response.data.data[0];
  } catch (error) {
    console.error(`Error fetching portfolio site with slug ${slug}:`, error);
    throw error;
  }
};

/* ========== HELPERS ========== */

// Construit l'URL complète d'un média
export const getStrapiMediaUrl = (url: string | null) => {
  if (!url) return null;
  
  // Si l'URL est absolue, la renvoyer telle quelle
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Pour une URL relative, on la préfixe avec l'URL de base (sans le suffixe /api)
  const baseUrl = STRAPI_API_URL.endsWith('/api')
    ? STRAPI_API_URL.slice(0, -4)
    : STRAPI_API_URL;
  
  console.log('Image URL constructed:', `${baseUrl}${url}`);
  return `${baseUrl}${url}`;
};

// Fonction de test pour vérifier la connexion à Strapi
export const testStrapiConnection = async () => {
  try {
    const response = await strapiClient.get('/articles?pagination[pageSize]=1');
    return {
      success: true,
      message: 'Connection successful',
      data: response.data,
    };
  } catch (error) {
    console.error('Strapi connection test failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      error,
    };
  }
};