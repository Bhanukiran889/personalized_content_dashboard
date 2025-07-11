// src/pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, RootState, AppDispatch } from '@/store'; // Import AppDispatch
import Layout from '@/components/layout/Layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { rehydratePreferences, PreferencesState } from '@/store/features/preferences/preferencesSlice'; // Import rehydratePreferences
import { rehydrateFavorites } from '@/store/features/favorites/favoritesSlice'; // Import rehydrateFavorites

// Component that manages client-side Redux rehydration and dark mode application
function AppContent({ Component, pageProps }: { Component: AppProps['Component'], pageProps: AppProps['pageProps'] }) {
  const dispatch: AppDispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.preferences.darkMode);

  // Effect for rehydrating Redux store from localStorage
  useEffect(() => {
    // Rehydrate Preferences
    try {
      const persistedPreferences = localStorage.getItem('userPreferences');
      if (persistedPreferences) {
        const parsedPreferences: PreferencesState = JSON.parse(persistedPreferences);
        dispatch(rehydratePreferences(parsedPreferences));
      }
    } catch (e) {
      console.error("Failed to rehydrate preferences from localStorage", e);
    }

    // Rehydrate Favorites
    try {
      const persistedFavorites = localStorage.getItem('favorites');
      if (persistedFavorites) {
        const parsedFavorites = JSON.parse(persistedFavorites);
        dispatch(rehydrateFavorites(parsedFavorites));
      }
    } catch (e) {
      console.error("Failed to rehydrate favorites from localStorage", e);
    }

  }, [dispatch]); // Run once on client mount

  // Effect for applying dark mode class based on Redux state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]); // Re-run when darkMode state changes

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// The main App component that provides the Redux store
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppContent Component={Component} pageProps={pageProps} />
    </Provider>
  );
}