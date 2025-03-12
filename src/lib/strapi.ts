import axios from 'axios';
import type { StrapiResponse, StrapiSingleResponse, StrapiArticle } from '../types/strapi';

// Replace with your Strapi API URL when you have it
const STRAPI_API_URL = 'https://your-strapi-app.railway.app/api';

// Create an axios instance for Strapi
const strapiClient = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all articles
export const getArticles = async () => {
  try {
    const response = await strapiClient.get<StrapiResponse<StrapiArticle>>(
      '/articles?populate=*&sort=publishedAt:desc'
    );
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
    
    if (response.data.data.length === 0) {
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
    
  return `${baseUrl}${url}`;
};