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

export const getStrapiMediaUrl = (url: string | null): string | null => {
  if (!url || typeof url !== 'string') {
    console.warn('getStrapiMediaUrl: URL is null or not a string:', url);
    return null;
  }
  
  // Si l'URL est absolue, la retourner directement
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  
  // Déterminer la base URL en supprimant le suffixe /api si présent et en supprimant le slash final
  let baseUrl = STRAPI_API_URL;
  if (baseUrl.endsWith('/api')) {
    baseUrl = baseUrl.slice(0, -4);
  }
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }
  
  // S'assurer que l'URL relative commence par un slash
  const relativeUrl = url.startsWith('/') ? url : '/' + url;
  
  const fullUrl = baseUrl + relativeUrl;
  console.log('Image URL constructed:', fullUrl);
  return fullUrl;
};

export const testStrapiConnection = async (): Promise<{ success: boolean; message: string; data?: any; error?: any }> => {
  try {
    const response = await strapiClient.get('/articles?pagination[pageSize]=1');
    console.log('testStrapiConnection: Connection successful');
    return {
      success: true,
      message: 'Connection successful',
      data: response.data,
    };
  } catch (error: any) {
    console.error('Strapi connection test failed:', error);
    return {
      success: false,
      message: error?.message || 'Unknown error',
      error: error,
    };
  }
};