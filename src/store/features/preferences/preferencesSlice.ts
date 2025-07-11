// src/store/features/preferences/preferencesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PreferencesState {
  darkMode: boolean;
  favoriteCategories: string[];
}

// Initial state now defaults, NOT loading from localStorage immediately
const initialState: PreferencesState = {
  darkMode: false, // Default to false on both server and client initially
  favoriteCategories: [], // Default to empty array initially
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setFavoriteCategories: (state, action: PayloadAction<string[]>) => {
      state.favoriteCategories = action.payload;
    },
    // NEW: Action to rehydrate state from persisted data (e.g., from localStorage)
    rehydratePreferences: (state, action: PayloadAction<PreferencesState>) => {
      state.darkMode = action.payload.darkMode;
      state.favoriteCategories = action.payload.favoriteCategories;
    },
  },
});

export const { toggleDarkMode, setFavoriteCategories, rehydratePreferences } = preferencesSlice.actions; // Export new action
export default preferencesSlice.reducer;