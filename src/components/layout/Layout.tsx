import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // We'll add a state for mobile sidebar toggle later if needed
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar Toggle Button (Hidden on larger screens) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="
          md:hidden fixed top-5 left-5 z-40 p-2 rounded-full
          bg-indigo-500 text-white shadow-lg
          transition-all duration-300 ease-in-out
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

      {/* Sidebar - Use absolute positioning and transform for responsive show/hide */}
      <div className={`
        fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
        transition-transform duration-300 ease-in-out
        z-30 /* Higher than main content but lower than mobile toggle */
      `}>
        <Sidebar />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
        ></div>
      )}

      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-8"> {/* Main content area */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;