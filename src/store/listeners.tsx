// src/store/listeners.ts
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addFavorite, removeFavorite } from './features/favorites/favoritesSlice';
import { toggleDarkMode, setFavoriteCategories } from './features/preferences/preferencesSlice'; // Import new actions
import { RootState } from './index';

export const listenerMiddleware = createListenerMiddleware();

// Listener for saving favorites to localStorage
listenerMiddleware.startListening({
  matcher: isAnyOf(addFavorite, removeFavorite),
  effect: (action, api) => {
    const favorites = (api.getState() as RootState).favorites.items;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Favorites saved to localStorage');
      } catch (e) {
        console.error("Could not save favorites to localStorage", e);
      }
    }
  },
});

// NEW Listener for saving preferences to localStorage
listenerMiddleware.startListening({
  matcher: isAnyOf(toggleDarkMode, setFavoriteCategories), // Listen for changes to dark mode or categories
  effect: (action, api) => {
    const preferences = (api.getState() as RootState).preferences;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        console.log('Preferences saved to localStorage');
      } catch (e) {
        console.error("Could not save preferences to localStorage", e);
      }
    }
  },
});