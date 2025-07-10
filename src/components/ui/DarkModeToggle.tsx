import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { toggleDarkMode } from '@/store/features/preferences/preferencesSlice';

const DarkModeToggle: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.preferences.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <button
      onClick={handleToggle}
      className="
        p-2 rounded-full
        bg-indigo-500 text-white
        dark:bg-indigo-700 dark:text-gray-200
        hover:bg-indigo-600 dark:hover:bg-indigo-800
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
        transition-all duration-300 ease-in-out
        flex items-center justify-center gap-2
        text-sm font-medium
      "
      aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Using simple emojis for icons for now, can replace with SVG/Lucide later */}
      {darkMode ? (
        <>
          ☀️ Light Mode
        </>
      ) : (
        <>
          🌙 Dark Mode
        </>
      )}
    </button>
  );
};

export default DarkModeToggle;