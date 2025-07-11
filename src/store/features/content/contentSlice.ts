// src/store/features/content/contentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@/store';

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
  // Add more movie details if TMDB API provides them and you want to display them
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
}

interface ContentState {
  news: Article[];
  movies: Movie[];
  searchResultsNews: Article[];
  searchResultsMovies: Movie[];
  loading: boolean;
  error: string | null;
  currentPageNews: number;
  currentPageMovies: number;
  hasMoreNews: boolean;
  hasMoreMovies: boolean;
  currentArticle: Article | null; // New: For single article detail
  currentMovie: Movie | null;     // New: For single movie detail
}

const initialState: ContentState = {
  news: [],
  movies: [],
  searchResultsNews: [],
  searchResultsMovies: [],
  loading: false,
  error: null,
  currentPageNews: 1,
  currentPageMovies: 1,
  hasMoreNews: true,
  hasMoreMovies: true,
  currentArticle: null, // Initialize
  currentMovie: null,   // Initialize
};

// ... (existing getNews, getTrendingMovies, searchNews, searchMovies thunks remain the same)
export const getNews = createAsyncThunk<Article[], number | void, { state: RootState }>(
  'content/getNews',
  async (page = 1, { rejectWithValue, getState }) => {
    const state = getState();
    const categories = state.preferences.favoriteCategories;
    const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const NEWS_API_BASE_URL = 'https://newsapi.org/v2/top-headlines';
    const pageSize = 20;

    if (!NEWS_API_KEY) {
      console.error("NEWS_API_KEY is not defined!");
      return rejectWithValue("News API Key is not configured.");
    }

    let url = `${NEWS_API_BASE_URL}?language=en&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`;

    if (categories && categories.length > 0) {
      const categoryQueries = categories.map(cat => `category=${cat}`).join('&');
      url = `${NEWS_API_BASE_URL}?language=en&pageSize=${pageSize}&page=${page}&${categoryQueries}&apiKey=${NEWS_API_KEY}`;
    }

    try {
      const response = await axios.get<{ articles: Article[], totalResults: number }>(url);
      return response.data.articles.filter(article => article.title !== "[Removed]");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch news");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const getTrendingMovies = createAsyncThunk<Movie[], number | void, { state: RootState }>(
  'content/getTrendingMovies',
  async (page = 1, { rejectWithValue }) => {
    const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const TMDB_TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/week';

    if (!TMDB_API_KEY) {
      console.error("TMDB_API_KEY is not defined!");
      return rejectWithValue("TMDB API Key is not configured.");
    }

    try {
      const response = await axios.get<{ results: Movie[], total_pages: number }>(
        `${TMDB_TRENDING_URL}?api_key=${TMDB_API_KEY}&page=${page}`
      );
      return response.data.results;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.status_message || "Failed to fetch trending movies");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const searchNews = createAsyncThunk<Article[], string, { state: RootState }>(
  'content/searchNews',
  async (query, { rejectWithValue }) => {
    const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const NEWS_API_SEARCH_URL = 'https://newsapi.org/v2/everything';

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
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Failed to search news");
      }
      return rejectWithValue("An unknown error occurred during news search");
    }
  }
);

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
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.status_message || "Failed to search movies");
      }
      return rejectWithValue("An unknown error occurred during movie search");
    }
  }
);


// NEW: Async Thunk for getting a single news article by its URL
// Note: NewsAPI 'everything' endpoint is best for this, but it requires a full URL match
// which might be tricky if URLs change or are not perfectly unique.
// A more robust solution might involve storing the full article content in Redux
// when initially fetching, or using a backend to proxy/cache.
// For simplicity, we'll try to fetch by URL, but be aware of its limitations.
export const getArticleByUrl = createAsyncThunk<Article, string, { state: RootState }>(
  'content/getArticleByUrl',
  async (articleUrl, { rejectWithValue }) => {
    const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const NEWS_API_EVERYTHING_URL = 'https://newsapi.org/v2/everything';

    if (!NEWS_API_KEY) {
      console.error("NEWS_API_KEY is not defined!");
      return rejectWithValue("News API Key is not configured.");
    }

    try {
      // Searching by URL directly. NewsAPI 'everything' endpoint supports this.
      const response = await axios.get<{ articles: Article[] }>(
        `${NEWS_API_EVERYTHING_URL}?qInTitle=${encodeURIComponent(articleUrl)}&language=en&pageSize=1&apiKey=${NEWS_API_KEY}`
        // Using qInTitle as a workaround as direct URL search isn't explicitly documented for 'everything'
        // A better approach would be to store the full article in the Redux state when it's initially fetched
        // and retrieve it from there for the detail page, avoiding a new API call.
        // For demonstration, we'll attempt a search.
      );
      const article = response.data.articles.find(a => a.url === articleUrl);
      if (article) {
        return article;
      } else {
        // Fallback: if not found by qInTitle, try a broader search or reject
        // For a real app, you'd likely store the article data in Redux when first displayed
        // and retrieve it from the store for the detail page instead of re-fetching.
        return rejectWithValue("Article not found or could not be fetched by URL.");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch article details");
      }
      return rejectWithValue("An unknown error occurred during article detail fetch");
    }
  }
);

// NEW: Async Thunk for getting a single movie by its ID
export const getMovieById = createAsyncThunk<Movie, string, { state: RootState }>(
  'content/getMovieById',
  async (movieId, { rejectWithValue }) => {
    const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const TMDB_MOVIE_DETAIL_URL = `https://api.themoviedb.org/3/movie/${movieId}`;

    if (!TMDB_API_KEY) {
      console.error("TMDB_API_KEY is not defined!");
      return rejectWithValue("TMDB API Key is not configured.");
    }

    try {
      const response = await axios.get<Movie>(
        `${TMDB_MOVIE_DETAIL_URL}?api_key=${TMDB_API_KEY}`
      );
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.status_message || "Failed to fetch movie details");
      }
      return rejectWithValue("An unknown error occurred during movie detail fetch");
    }
  }
);


const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResultsNews = [];
      state.searchResultsMovies = [];
      state.error = null;
    },
    resetNewsAndMovies: (state) => {
      state.news = [];
      state.movies = [];
      state.currentPageNews = 1;
      state.currentPageMovies = 1;
      state.hasMoreNews = true;
      state.hasMoreMovies = true;
      state.error = null;
    },
    clearCurrentArticle: (state) => { // New: Clear current article
      state.currentArticle = null;
    },
    clearCurrentMovie: (state) => {   // New: Clear current movie
      state.currentMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // News
      .addCase(getNews.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        if (action.meta.arg === 1 || action.meta.arg === undefined) {
            state.news = [];
        }
      })
      .addCase(getNews.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.news = [...state.news, ...action.payload];
        state.currentPageNews += 1;
        state.hasMoreNews = action.payload.length > 0;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasMoreNews = false;
      })
      // Movies
      .addCase(getTrendingMovies.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        if (action.meta.arg === 1 || action.meta.arg === undefined) {
            state.movies = [];
        }
      })
      .addCase(getTrendingMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.movies = [...state.movies, ...action.payload];
        state.currentPageMovies += 1;
        state.hasMoreMovies = action.payload.length > 0;
      })
      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasMoreMovies = false;
      })
      // Search News
      .addCase(searchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searchResultsNews = [];
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
      // Search Movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searchResultsMovies = [];
      })
      .addCase(searchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.searchResultsMovies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchResultsMovies = [];
      })
      // NEW: Get Article By URL
      .addCase(getArticleByUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentArticle = null; // Clear previous article
      })
      .addCase(getArticleByUrl.fulfilled, (state, action: PayloadAction<Article>) => {
        state.loading = false;
        state.currentArticle = action.payload;
      })
      .addCase(getArticleByUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentArticle = null;
      })
      // NEW: Get Movie By ID
      .addCase(getMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentMovie = null; // Clear previous movie
      })
      .addCase(getMovieById.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentMovie = null;
      });
  },
});

export const { clearSearchResults, resetNewsAndMovies, clearCurrentArticle, clearCurrentMovie } = contentSlice.actions;
export default contentSlice.reducer;