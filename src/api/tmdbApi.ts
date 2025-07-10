import axios from 'axios';
import { TmdbMovie } from '@/types/content';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // For movie posters

interface TmdbApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export const fetchTrendingMovies = async (page: number = 1): Promise<TmdbApiResponse<TmdbMovie>> => {
  if (!TMDB_API_KEY) {
    console.error("TMDB API Key is not defined!");
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }

  try {
    const response = await axios.get<TmdbApiResponse<TmdbMovie>>(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: {
        api_key: TMDB_API_KEY,
        page: page,
      },
    });
    // Add image base URL to poster_path
    const moviesWithFullPosterPath = response.data.results.map(movie => ({
      ...movie,
      poster_path: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null,
    }));
    return { ...response.data, results: moviesWithFullPosterPath };
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// You can add more TMDB specific fetches here, e.g., by genre for recommendations
// For simplicity, we'll use trending for now as a 'recommendation'.
