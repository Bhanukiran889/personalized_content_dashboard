// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from './features/preferences/preferencesSlice';
import contentReducer from './features/content/contentSlice';
import favoritesReducer from './features/favorites/favoritesSlice';
import { listenerMiddleware } from './listeners'; // Import your listener middleware

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    content: contentReducer,
    favorites: favoritesReducer,
  },
  // Add the listener middleware to your store's middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;