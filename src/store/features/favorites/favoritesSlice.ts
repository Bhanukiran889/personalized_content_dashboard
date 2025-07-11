// src/store/features/favorites/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteItem {
  id: string;
  type: 'news' | 'movie';
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  url?: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

// Initial state now defaults, NOT loading from localStorage immediately
const initialState: FavoritesState = {
  items: [], // Default to empty array on both server and client initially
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
    // NEW: Action to rehydrate state from persisted data
    rehydrateFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, rehydrateFavorites } = favoritesSlice.actions; // Export new action
export default favoritesSlice.reducer;