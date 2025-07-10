import axios from 'axios';
import { NewsArticle } from '@/types/content';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export const fetchNews = async (categories: string[], page: number = 1, pageSize: number = 10): Promise<NewsApiResponse> => {
  if (!NEWS_API_KEY) {
    console.error("News API Key is not defined!");
    // Return a mock response or throw an error
    return { status: 'error', totalResults: 0, articles: [] };
  }

  // NewsAPI often uses 'category' or 'q' for topics.
  // For simplicity, we'll use 'q' and join categories with OR.
  const query = categories.join(' OR ');

  try {
    const response = await axios.get<NewsApiResponse>(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        q: query || 'technology', // Fallback query if no categories are selected
        pageSize: pageSize,
        page: page,
        apiKey: NEWS_API_KEY,
        language: 'en', // Or based on user preference
        sortBy: 'publishedAt',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
