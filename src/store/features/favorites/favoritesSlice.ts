import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../content/contentSlice'; // Assuming Article type is needed
import { Movie } from '../content/contentSlice'; // Assuming Movie type is needed

// Define a type for a favorited item
// It should contain enough info to display it consistently
interface FavoriteItem {
  id: string; // Unique identifier (e.g., URL for news, TMDB ID for movie)
  type: 'news' | 'movie';
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  url?: string;
  // Add other properties if needed for display or re-fetching
}

interface FavoritesState {
  items: FavoriteItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      // Prevent adding duplicates
      if (!state.items.some(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Optional: Load favorites from local storage (will implement later if needed)
    // setFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
    //   state.items = action.payload;
    // },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;