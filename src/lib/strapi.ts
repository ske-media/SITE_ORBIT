import axios from 'axios';
import type {
  StrapiResponse,
  StrapiSingleResponse,
  StrapiArticle,
  StrapiPortfolioSiteWeb,
  StrapiSeoArticle
} from '../types/strapi';

// Base URL for Strapi API (env override or default)
const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL ||
  'https://siteorbit-cms-production.up.railway.app/api';
// Optional API token for protected collections (if needed)
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

console.log('Strapi API URL:', STRAPI_API_URL);

// Build default headers; inject Authorization only if token is provided
const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
};
if (STRAPI_API_TOKEN) {
  defaultHeaders.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
}

export const strapiClient = axios.create({
  baseURL: STRAPI_API_URL,
  headers: defaultHeaders,
  timeout: 10000, // 10 seconds
});

/* ========== BLOG ARTICLES ========== */

/**
 * Fetch all entrepreneur articles sorted by publishedAt desc
 */
export const getArticles = async (): Promise<StrapiResponse<StrapiArticle>> => {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiArticle>>( 
      '/articles?populate=*&sort=publishedAt:desc'
    );
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error('Unexpected API response format for articles');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

/**
 * Fetch a single entrepreneur article by slug
 */
export const getArticleBySlug = async (
  slug: string
): Promise<StrapiArticle> => {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiArticle>>(
      `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );
    const items = response.data.data;
    if (!items || items.length === 0) {
      throw new Error('Article not found');
    }
    return items[0];
  } catch (error) {
    console.error(`Error fetching article by slug (${slug}):`, error);
    throw error;
  }
};

/* ========== SEO BLOG ARTICLES ========== */

/**
 * Fetch all SEO articles and flatten attributes
 */
export const getSeoArticles = async (): Promise<{ data: StrapiSeoArticle[]; meta: any }> => {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiSeoArticle>>( 
      '/seos?populate=*&sort=publishedAt:desc'
    );
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error('Unexpected API response format for SEO articles');
    }

    const flattened = response.data.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }));

    return { data: flattened, meta: response.data.meta };
  } catch (error) {
    console.error('Error fetching SEO articles:', error);
    throw error;
  }
};

/**
 * Fetch a single SEO article by slug and flatten attributes
 */
export const getSeoArticleBySlug = async (
  slug: string
): Promise<StrapiSeoArticle> => {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiSeoArticle>>( 
      `/seos?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );
    const items = response.data.data;
    if (!items || items.length === 0) {
      throw new Error('SEO Article not found');
    }
    return {
      id: items[0].id,
      ...items[0].attributes,
    };
  } catch (error) {
    console.error(`Error fetching SEO article by slug (${slug}):`, error);
    throw error;
  }
};

/* ========== PORTFOLIO SITES ========== */

/**
 * Fetch all portfolio website projects
 */
export const getPortfolioSites = async (): Promise<StrapiResponse<StrapiPortfolioSiteWeb>> => {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiPortfolioSiteWeb>>( 
      '/portfolio-site-webs?populate=*&sort=titre:asc'
    );
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error('Unexpected API response format for portfolio sites');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio sites:', error);
    throw error;
  }
};

/**
 * Fetch a single portfolio site by slug
 */
export const getPortfolioSiteBySlug = async (
  slug: string
): Promise<StrapiPortfolioSiteWeb> => {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiPortfolioSiteWeb>>( 
      `/portfolio-site-webs?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&sort=titre:asc`
    );
    const items = response.data.data;
    if (!items || items.length === 0) {
      throw new Error('Portfolio site not found');
    }
    return items[0];
  } catch (error) {
    console.error(`Error fetching portfolio site by slug (${slug}):`, error);
    throw error;
  }
};

/* ========== HELPERS ========== */

/**
 * Build full URL for a media asset
 */
export const getStrapiMediaUrl = (url: string | null): string | null => {
  if (!url || typeof url !== 'string') {
    console.warn('getStrapiMediaUrl: invalid URL', url);
    return null;
  }
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  let base = STRAPI_API_URL;
  if (base.endsWith('/api')) base = base.slice(0, -4);
  if (base.endsWith('/')) base = base.slice(0, -1);
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${base}${path}`;
};

/**
 * Test Strapi connection
 */
export const testStrapiConnection = async (): Promise<{ success: boolean; message: string; data?: any; error?: any }> => {
  try {
    const response = await strapiClient.get('/articles?pagination[pageSize]=1');
    return { success: true, message: 'Connection successful', data: response.data };
  } catch (error: any) {
    console.error('Strapi connection test failed:', error);
    return { success: false, message: error.message || 'Unknown error', error };
  }
};
