// src/store/features/preferences/preferencesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PreferencesState {
  darkMode: boolean;
  favoriteCategories: string[]; // Add this to store chosen news categories
}

// Key for localStorage
const LOCAL_STORAGE_PREFERENCES_KEY = 'userPreferences';

// Function to load preferences from localStorage
const loadPreferencesFromLocalStorage = (): PreferencesState => {
  if (typeof window !== 'undefined') {
    try {
      const serializedState = localStorage.getItem(LOCAL_STORAGE_PREFERENCES_KEY);
      if (serializedState === null) {
        return { darkMode: false, favoriteCategories: [] }; // Default state if nothing found
      }
      // Parse, and provide default if a property is missing (e.g., if favoriteCategories was just added)
      const parsedState = JSON.parse(serializedState);
      return {
        darkMode: parsedState.darkMode ?? false,
        favoriteCategories: parsedState.favoriteCategories ?? [],
      };
    } catch (e) {
      console.error("Could not load preferences from localStorage", e);
      return { darkMode: false, favoriteCategories: [] }; // Fallback to default on error
    }
  }
  return { darkMode: false, favoriteCategories: [] }; // Default for SSR
};

const initialState: PreferencesState = loadPreferencesFromLocalStorage();

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    // Action to set favorite categories
    setFavoriteCategories: (state, action: PayloadAction<string[]>) => {
      state.favoriteCategories = action.payload;
    },
  },
});

export const { toggleDarkMode, setFavoriteCategories } = preferencesSlice.actions;
export default preferencesSlice.reducer;