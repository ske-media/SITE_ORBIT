import axios from 'axios';
import type { StrapiResponse, StrapiSingleResponse, StrapiArticle } from '../types/strapi';

const STRAPI_API_URL = 'https://siteorbit-cms-production.up.railway.app/api';

// Create an axios instance for Strapi
const strapiClient = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Get all articles
export const getArticles = async () => {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiArticle>>(
      '/articles?populate=*&sort=publishedAt:desc'
    );
    console.log('Strapi response:', response.data); // Debug log to check structure
    
    if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
      throw new Error("La réponse de l'API n'est pas au format attendu");
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching articles from Strapi:', error);
    throw error;
  }
};

// Get a single article by slug
export const getArticleBySlug = async (slug: string) => {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiArticle>>(
      `/articles?filters[slug][$eq]=${slug}&populate=*`
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

// Helper function to get the full image URL
export const getStrapiMediaUrl = (url: string | null) => {
  if (!url) return null;
  
  // If the URL is absolute, return it as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it's a relative URL, prepend the Strapi URL
  // Remove /api from the end if present
  const baseUrl = STRAPI_API_URL.endsWith('/api') 
    ? STRAPI_API_URL.slice(0, -4) 
    : STRAPI_API_URL;
  
  console.log('Image URL constructed:', `${baseUrl}${url}`);
  return `${baseUrl}${url}`;
};

// Test function to verify API connection
export const testStrapiConnection = async () => {
  try {
    const response = await strapiClient.get('/articles?pagination[pageSize]=1');
    return {
      success: true,
      message: 'Connection successful',
      data: response.data
    };
  } catch (error) {
    console.error('Strapi connection test failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      error
    };
  }
};