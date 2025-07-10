import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchNews } from '@/api/newsApi';
import { fetchTrendingMovies } from '@/api/tmdbApi';
import { NewsArticle, TmdbMovie } from '@/types/content';
import { RootState } from '@/store'; // To access preferences from other slices

interface ContentState {
  news: NewsArticle[];
  movies: TmdbMovie[];
  loading: boolean;
  error: string | null;
  newsPage: number;
  moviesPage: number;
  hasMoreNews: boolean;
  hasMoreMovies: boolean;
}

const initialState: ContentState = {
  news: [],
  movies: [],
  loading: false,
  error: null,
  newsPage: 1,
  moviesPage: 1,
  hasMoreNews: true,
  hasMoreMovies: true,
};

// Async Thunk for fetching news
export const getNews = createAsyncThunk(
  'content/getNews',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const categories = state.preferences.favoriteCategories;
    const currentPage = state.content.newsPage;
    try {
      const response = await fetchNews(categories, currentPage);
      return response.articles;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch news');
    }
  }
);

// Async Thunk for fetching trending movies (as recommendations)
export const getTrendingMovies = createAsyncThunk(
  'content/getTrendingMovies',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const currentPage = state.content.moviesPage;
    try {
      const response = await fetchTrendingMovies(currentPage);
      return response.results;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch movies');
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    // This will be useful for resetting content, e.g., on preference change
    resetContent: (state) => {
      state.news = [];
      state.movies = [];
      state.newsPage = 1;
      state.moviesPage = 1;
      state.hasMoreNews = true;
      state.hasMoreMovies = true;
    },
    // For infinite scrolling, manually increment pages if more data is available
    incrementNewsPage: (state) => {
      state.newsPage += 1;
    },
    incrementMoviesPage: (state) => {
      state.moviesPage += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // News API Handlers
      .addCase(getNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNews.fulfilled, (state, action: PayloadAction<NewsArticle[]>) => {
        state.loading = false;
        state.news = [...state.news, ...action.payload]; // Append new data
        state.hasMoreNews = action.payload.length > 0; // If no new data, no more pages
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Movies API Handlers
      .addCase(getTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrendingMovies.fulfilled, (state, action: PayloadAction<TmdbMovie[]>) => {
        state.loading = false;
        state.movies = [...state.movies, ...action.payload]; // Append new data
        state.hasMoreMovies = action.payload.length > 0; // If no new data, no more pages
      })
      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetContent, incrementNewsPage, incrementMoviesPage } = contentSlice.actions;
export default contentSlice.reducer;