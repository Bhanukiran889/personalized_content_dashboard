import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-950 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="
          md:hidden fixed top-4 left-4 z-50 p-2 rounded-full
          bg-indigo-600 text-white shadow-lg
          transition-all duration-300 ease-in-out
          hover:scale-105
        "
        aria-label="Toggle Sidebar"
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
            d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          ></path>
        </svg>
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0
        transform transition-transform duration-300 ease-in-out
        z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isSidebarOpen ? 'block' : 'hidden'} md:block /* Crucial: Hide on mobile when closed, show when open/on MD+ */
        md:relative md:translate-x-0 /* On medium and up, sidebar is relative and visible */
        md:z-auto
      `}>
        <Sidebar />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}

      {/* Main Content Area (Header + Page Content) */}
      <div className="flex flex-col flex-1">
        <Header />
        <div className="
          flex-1 mx-auto w-full
          px-4 sm:px-6 md:px-8 py-8
          max-w-full
          lg:max-w-screen-xl
          xl:max-w-screen-2xl
          2xl:max-w-screen-2xl
          ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;