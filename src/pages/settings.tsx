// src/pages/settings.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { setFavoriteCategories, toggleDarkMode } from '@/store/features/preferences/preferencesSlice';
import { getNews } from '@/store/features/content/contentSlice'; // To refetch news after preferences change

// Define available news categories
const newsCategories = [
  'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
];

export default function SettingsPage() {
  const dispatch: AppDispatch = useDispatch();
  const { darkMode, favoriteCategories } = useSelector((state: RootState) => state.preferences);

  // Local state to manage checkbox selections
  const [selectedCategories, setSelectedCategories] = useState<string[]>(favoriteCategories);

  // Update local state when Redux state changes (e.g., on initial load or if changed elsewhere)
  useEffect(() => {
    setSelectedCategories(favoriteCategories);
  }, [favoriteCategories]);

  const handleCategoryChange = (category: string) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(cat => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newSelectedCategories);
    dispatch(setFavoriteCategories(newSelectedCategories)); // Dispatch action to update Redux
    dispatch(getNews()); // Refetch news immediately after categories change
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode()); // Dispatch action to toggle dark mode
  };

  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Manage your dashboard preferences" />
      </Head>

      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-800 dark:text-indigo-300">
        ⚙️ Settings
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          General Preferences
        </h3>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <label htmlFor="darkModeToggle" className="text-lg text-gray-700 dark:text-gray-200 cursor-pointer">
            Enable Dark Mode
          </label>
          <input
            type="checkbox"
            id="darkModeToggle"
            checked={darkMode}
            onChange={handleToggleDarkMode}
            className="toggle toggle-primary" /* Assuming you have daisyUI or similar toggle styling */
            // Fallback for basic Tailwind checkbox
            // className="form-checkbox h-5 w-5 text-indigo-600 rounded-md focus:ring-indigo-500 border-gray-300"
          />
        </div>

        <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Personalized Feed Categories
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Select the news categories you are most interested in. Your personalized feed will show content from these selections.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsCategories.map((category) => (
            <div key={category} className="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <input
                type="checkbox"
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="
                  form-checkbox h-5 w-5 text-indigo-600 rounded-md cursor-pointer
                  border-gray-300 dark:border-gray-500
                  focus:ring-indigo-500 focus:ring-offset-0
                  dark:bg-gray-800 dark:checked:bg-indigo-600
                "
              />
              <label
                htmlFor={`category-${category}`}
                className="ml-3 text-lg font-medium text-gray-700 dark:text-gray-200 capitalize cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}