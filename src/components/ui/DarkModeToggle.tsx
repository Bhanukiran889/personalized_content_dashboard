import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { toggleDarkMode } from '@/store/features/preferences/preferencesSlice';

const DarkModeToggle: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.preferences.darkMode);

  // Effect to apply/remove 'dark' class on the root HTML element
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
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;