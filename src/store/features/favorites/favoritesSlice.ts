// src/store/features/favorites/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Assuming Article and Movie types are already defined in contentSlice
// import { Article, Movie } from '../content/contentSlice'; // uncomment if you need them directly here for types

interface FavoriteItem {
  id: string; // Unique identifier (e.g., URL for news, TMDB ID for movie)
  type: 'news' | 'movie';
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  url?: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

// Function to load state from localStorage
const loadFavoritesFromLocalStorage = (): FavoriteItem[] => {
  if (typeof window !== 'undefined') { // Check if window object is available (i.e., not during SSR)
    try {
      const serializedState = localStorage.getItem('favorites');
      if (serializedState === null) {
        return []; // No favorites found, return empty array
      }
      return JSON.parse(serializedState);
    } catch (e) {
      console.error("Could not load favorites from localStorage", e);
      return [];
    }
  }
  return []; // Return empty array if not in browser environment
};

const initialState: FavoritesState = {
  items: loadFavoritesFromLocalStorage(), // Initialize state by loading from localStorage
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      if (!state.items.some(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;