import React from 'react';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

const Header: React.FC = () => {
  return (
    <header className="
      py-4 px-4 sm:px-6 md:px-8 flex justify-between items-center /* Adjusted for better spacing */
      bg-white dark:bg-gray-800 shadow-xl
      rounded-b-2xl
      sticky top-0 z-20 /* Z-20 is below sidebar and toggle for mobile, but above main content */
      transition-colors duration-300
    ">
      {/* Empty div for spacing on mobile, pushes content to the right of the fixed burger icon */}
      <div className="w-12 md:hidden"></div> {/* Approx width of burger + margin */}

      {/* Search Bar - Flex-grow to fill available space */}
      <div className="flex-grow flex justify-center mx-2 sm:mx-4 md:mx-8">
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg">
          <input
            type="text"
            placeholder="Search content..."
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
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400"
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
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 ml-2 md:ml-0"> {/* Small margin-left for spacing */}
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
            hidden sm:flex /* Hide user icon/text on extra-small, show on small and up */
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
          <span className="ml-2 hidden md:inline">Profile</span> {/* Show text only on medium and up */}
        </button>
      </div>
    </header>
  );
};

export default Header;