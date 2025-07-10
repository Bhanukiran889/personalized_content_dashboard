import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchNews } from '@/api/newsApi';
import { fetchTrendingMovies } from '@/api/tmdbApi';
import { NewsArticle, TmdbMovie } from '@/types/content';
import { RootState } from '@/store'; // To access preferences from other slices
import axios from 'axios'; // Import axios to get its type for error handling

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
    } catch (error) { // No 'any' here
      if (axios.isAxiosError(error)) { // Check if it's an Axios error
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch news');
      }
      return rejectWithValue('An unexpected error occurred while fetching news.');
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
    } catch (error) { // No 'any' here
      if (axios.isAxiosError(error)) { // Check if it's an Axios error
        return rejectWithValue(error.response?.data?.status_message || error.message || 'Failed to fetch movies');
      }
      return rejectWithValue('An unexpected error occurred while fetching movies.');
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    resetContent: (state) => {
      state.news = [];
      state.movies = [];
      state.newsPage = 1;
      state.moviesPage = 1;
      state.hasMoreNews = true;
      state.hasMoreMovies = true;
    },
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
        state.news = [...state.news, ...action.payload];
        state.hasMoreNews = action.payload.length > 0;
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
        state.movies = [...state.movies, ...action.payload];
        state.hasMoreMovies = action.payload.length > 0;
      })
      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetContent, incrementNewsPage, incrementMoviesPage } = contentSlice.actions;
export default contentSlice.reducer;