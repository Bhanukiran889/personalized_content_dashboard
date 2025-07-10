// src/store/features/content/contentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@/store';

// ... (existing Article and Movie interfaces)
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
  searchResultsNews: Article[]; // New: for search results
  searchResultsMovies: Movie[]; // New: for search results
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  news: [],
  movies: [],
  searchResultsNews: [], // Initialize
  searchResultsMovies: [], // Initialize
  loading: false,
  error: null,
};

// ... (getNews and getTrendingMovies remain the same as in previous step)
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
            const categoryQueries = categories.map(cat => `category=${cat}`).join('&');
            url = `${NEWS_API_BASE_URL}?language=en&pageSize=20&${categoryQueries}&apiKey=${NEWS_API_KEY}`;
        } else {
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


// New: Async Thunk for searching news
export const searchNews = createAsyncThunk<Article[], string, { state: RootState }>(
  'content/searchNews',
  async (query, { rejectWithValue }) => {
    const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const NEWS_API_SEARCH_URL = 'https://newsapi.org/v2/everything'; // Use 'everything' for search

    if (!NEWS_API_KEY) {
      console.error("NEWS_API_KEY is not defined!");
      return rejectWithValue("News API Key is not configured.");
    }
    if (!query) {
      return rejectWithValue("Search query cannot be empty.");
    }

    try {
      const response = await axios.get<{ articles: Article[] }>(
        `${NEWS_API_SEARCH_URL}?q=${encodeURIComponent(query)}&language=en&pageSize=20&apiKey=${NEWS_API_KEY}`
      );
      return response.data.articles.filter(article => article.title !== "[Removed]");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Failed to search news");
      }
      return rejectWithValue("An unknown error occurred during news search");
    }
  }
);

// New: Async Thunk for searching movies
export const searchMovies = createAsyncThunk<Movie[], string, { state: RootState }>(
  'content/searchMovies',
  async (query, { rejectWithValue }) => {
    const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';

    if (!TMDB_API_KEY) {
      console.error("TMDB_API_KEY is not defined!");
      return rejectWithValue("TMDB API Key is not configured.");
    }
    if (!query) {
      return rejectWithValue("Search query cannot be empty.");
    }

    try {
      const response = await axios.get<{ results: Movie[] }>(
        `${TMDB_SEARCH_URL}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      return response.data.results;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.status_message || "Failed to search movies");
      }
      return rejectWithValue("An unknown error occurred during movie search");
    }
  }
);


const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearSearchResults: (state) => { // New reducer to clear results
      state.searchResultsNews = [];
      state.searchResultsMovies = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // ... (existing getNews and getTrendingMovies cases)
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
        state.news = [];
      })
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
        state.movies = [];
      })

      // NEW: Search News
      .addCase(searchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searchResultsNews = []; // Clear previous results
      })
      .addCase(searchNews.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.searchResultsNews = action.payload;
      })
      .addCase(searchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchResultsNews = [];
      })

      // NEW: Search Movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searchResultsMovies = []; // Clear previous results
      })
      .addCase(searchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.searchResultsMovies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchResultsMovies = [];
      });
  },
});

export const { clearSearchResults } = contentSlice.actions; // Export the new action
export default contentSlice.reducer;