import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  darkMode: boolean;
  favoriteCategories: string[]; // Placeholder for future use
}

const initialState: PreferencesState = {
  darkMode: false, // Default to light mode
  favoriteCategories: ['technology', 'sports', 'finance'], // Default categories
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
    // Add more preference setters as needed
  },
});

export const { toggleDarkMode, setFavoriteCategories } = preferencesSlice.actions;
export default preferencesSlice.reducer;