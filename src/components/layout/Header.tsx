import React from 'react';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

const Header: React.FC = () => {
  return (
    <header className="
      py-5 px-8 flex justify-between items-center
      bg-white dark:bg-gray-800 shadow-xl
      rounded-b-2xl
      sticky top-0 z-20 /* Increased z-index */
      transition-colors duration-300
    ">
      <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
        My Dashboard
      </h1>

      {/* Search Bar Placeholder (will be functional later) */}
      <div className="relative flex-grow mx-8 max-w-lg">
        <input
          type="text"
          placeholder="Search content..."
          className="
            w-full p-3 pl-10 rounded-full
            bg-gray-100 dark:bg-gray-700
            text-gray-800 dark:text-gray-200
            border border-transparent focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
            transition-all duration-200 ease-in-out
            placeholder-gray-500 dark:placeholder-gray-400
          "
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>

      <div className="flex items-center space-x-4">
        <DarkModeToggle />
        {/* User Account Info / Settings Placeholder */}
        <button
          className="
            p-2 rounded-full
            bg-gray-200 dark:bg-gray-700
            text-gray-800 dark:text-gray-200
            hover:bg-gray-300 dark:hover:bg-gray-600
            transition-colors duration-200
            flex items-center justify-center
            text-sm font-medium
          "
          aria-label="User Settings"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          <span className="ml-2 hidden md:inline">Profile</span>
        </button>
      </div>
    </header>
  );
};

export default Header;