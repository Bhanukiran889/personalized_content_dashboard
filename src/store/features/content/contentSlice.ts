// src/store/features/content/contentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@/store'; // Import RootState to access preferences

// ... (other types like Article, Movie, ContentState as before)
export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

interface ContentState {
  news: Article[];
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  news: [],
  movies: [],
  loading: false,
  error: null,
};

// Update getNews to accept categories
export const getNews = createAsyncThunk<Article[], void, { state: RootState }>(
  'content/getNews',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const categories = state.preferences.favoriteCategories;
    const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const NEWS_API_BASE_URL = 'https://newsapi.org/v2/top-headlines';

    if (!NEWS_API_KEY) {
      console.error("NEWS_API_KEY is not defined!");
      return rejectWithValue("News API Key is not configured.");
    }

    let url = `${NEWS_API_BASE_URL}?language=en&pageSize=20&apiKey=${NEWS_API_KEY}`;

    if (categories && categories.length > 0) {
      // If categories are selected, fetch news for each and combine
      const categoryQueries = categories.map(cat => `category=${cat}`).join('&');
      url = `${NEWS_API_BASE_URL}?language=en&pageSize=20&${categoryQueries}&apiKey=${NEWS_API_KEY}`;
      // Note: NewsAPI free tier might not allow multiple categories in one query.
      // For more robust filtering, you might need to make multiple requests or
      // filter on the client side if the API doesn't support combined queries well.
      // For simplicity, we'll try to add them as query params.
      // For true 'OR' logic across categories, you might need to fetch for each and merge/deduplicate.
    } else {
        // If no categories selected, fetch general top headlines or a default
        url = `${NEWS_API_BASE_URL}?language=en&pageSize=20&apiKey=${NEWS_API_KEY}`;
    }


    try {
      const response = await axios.get<{ articles: Article[] }>(url);
      return response.data.articles.filter(article => article.title !== "[Removed]");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch news");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// ... (getTrendingMovies remains the same)
export const getTrendingMovies = createAsyncThunk<Movie[], void, { state: RootState }>(
  'content/getTrendingMovies',
  async (_, { rejectWithValue }) => {
    const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const TMDB_TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/week';

    if (!TMDB_API_KEY) {
      console.error("TMDB_API_KEY is not defined!");
      return rejectWithValue("TMDB API Key is not configured.");
    }

    try {
      const response = await axios.get<{ results: Movie[] }>(`${TMDB_TRENDING_URL}?api_key=${TMDB_API_KEY}`);
      return response.data.results;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.status_message || "Failed to fetch trending movies");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // News
      .addCase(getNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNews.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.news = []; // Clear news on error
      })
      // Movies
      .addCase(getTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrendingMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.movies = []; // Clear movies on error
      });
  },
});

export default contentSlice.reducer;