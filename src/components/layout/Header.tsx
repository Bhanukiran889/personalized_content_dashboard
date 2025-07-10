// src/components/layout/Header.tsx
import React, { useState } from 'react';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import { useRouter } from 'next/router'; // Import useRouter

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the search page with the query as a URL parameter
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="
      py-4 px-4 sm:px-6 md:px-8 flex justify-between items-center /* Changed to justify-between */
      bg-white dark:bg-gray-800 shadow-xl
      rounded-b-2xl
      sticky top-0 z-20
      transition-colors duration-300
    ">
      {/* Empty div to balance space on mobile for burger icon - now flex-grow for search */}
      {/* On mobile, this will push DarkModeToggle/Profile to the right. */}
      {/* On MD+, the search bar will take this space. */}
      <div className="md:hidden w-12"></div> {/* Keep placeholder for mobile burger toggle */}

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex-grow flex justify-center mx-2 sm:mx-4 md:mx-8">
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg">
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full p-2.5 pl-9 sm:p-3 sm:pl-10 rounded-full
              bg-gray-100 dark:bg-gray-700
              text-gray-800 dark:text-gray-200
              border border-transparent focus:border-indigo-500
              focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
              transition-all duration-200 ease-in-out
              placeholder-gray-500 dark:placeholder-gray-400
              text-sm sm:text-base
            "
          />
          <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
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
          </button>
        </div>
      </form>

      {/* User actions: Dark Mode Toggle and Profile */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <DarkModeToggle />
        <button
          className="
            p-2 rounded-full
            bg-gray-200 dark:bg-gray-700
            text-gray-800 dark:text-gray-200
            hover:bg-gray-300 dark:hover:bg-gray-600
            transition-colors duration-200
            flex items-center justify-center
            text-sm font-medium
            hidden sm:flex
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