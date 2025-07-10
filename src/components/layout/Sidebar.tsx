import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Define navigation links with names, hrefs, and SVG icons
const navLinks = [
  {
    name: 'Personalized Feed',
    href: '/',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7m0-7v10a1 1 0 01-1 1h-3m-6 0a9 9 0 11-18 0M12 2v20"></path>
      </svg>
    ),
  },
  {
    name: 'Trending',
    href: '/trending',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    ),
  },
  {
    name: 'Favorites',
    href: '/favorites',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
    ),
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.33.83 2.22 2.347a1.724 1.724 0 00.093 2.59c1.543.942 3.33-.83 2.22-2.347a1.724 1.724 0 00-.093-2.59l-1.034-1.034c-.736-.736-1.879-1.32-2.713-1.802A1.724 1.724 0 0010.325 4.317z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.33.83 2.22 2.347a1.724 1.724 0 00.093 2.59c1.543.942 3.33-.83 2.22-2.347a1.724 1.724 0 00-.093-2.59l-1.034-1.034c-.736-.736-1.879-1.32-2.713-1.802A1.724 1.724 0 0010.325 4.317zM10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.33.83 2.22 2.347a1.724 1.724 0 00.093 2.59c1.543.942 3.33-.83 2.22-2.347a1.724 1.724 0 00-.093-2.59l-1.034-1.034c-.736-.736-1.879-1.32-2.713-1.802A1.724 1.724 0 0010.325 4.317z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.33.83 2.22 2.347a1.724 1.724 0 00.093 2.59c1.543.942 3.33-.83 2.22-2.347a1.724 1.724 0 00-.093-2.59l-1.034-1.034c-.736-.736-1.879-1.32-2.713-1.802A1.724 1.724 0 0010.325 4.317z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.33.83 2.22 2.347a1.724 1.724 0 00.093 2.59c1.543.942 3.33-.83 2.22-2.347a1.724 1.724 0 00-.093-2.59l-1.034-1.034c-.736-.736-1.879-1.32-2.713-1.802A1.724 1.724 0 0010.325 4.317zM10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.33.83 2.22 2.347a1.724 1.724 0 00.093 2.59c1.543.942 3.33-.83 2.22-2.347a1.724 1.724 0 00-.093-2.59l-1.034-1.034c-.736-.736-1.879-1.32-2.713-1.802A1.724 1.724 0 0010.325 4.317zM10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.33.83 2.22 2.347a1.724 1.724 0 00.093 2.59c1.543.942 3.33-.83 2.22-2.347a1.724 1.724 0 00-.093-2.59l-1.034-1.034c-.736-.736-1.879-1.32-2.713-1.802A1.724 1.724 0 0010.325 4.317z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
  },
];

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <aside className="
      w-64 bg-white dark:bg-gray-800 shadow-lg
      p-6 flex flex-col
      h-screen sticky top-0
      rounded-r-2xl
      overflow-y-auto
      text-gray-900 dark:text-gray-100
      transform transition-transform duration-300 ease-in-out /* Smooth slide in/out for mobile */
    ">
      {/* Dashboard App Name */}
      <div className="mb-8 text-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
          My Dashboard
        </h1>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center mb-8 px-2">
        <img
          src="https://api.dicebear.com/8.x/initials/svg?seed=JD&backgroundColor=6366F1&radius=50" // Placeholder avatar
          alt="User Avatar"
          className="w-12 h-12 rounded-full mr-4 border-2 border-indigo-400 dark:border-indigo-600 shadow-md"
        />
        <div>
          <p className="font-semibold text-lg">John Doe</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">User Status</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="space-y-3"> {/* Reduced spacing slightly for more links */}
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className={`
                flex items-center p-3 rounded-lg
                text-lg font-medium
                hover:bg-indigo-100 hover:text-indigo-700
                dark:hover:bg-gray-700 dark:hover:text-indigo-400
                transition-all duration-200 ease-in-out
                transform hover:translate-x-1 /* Subtle hover effect */
                ${router.pathname === link.href
                  ? 'bg-indigo-500 text-white shadow-md' // Active state
                  : 'text-gray-700 dark:text-gray-200'}
              `}>
                <span className="mr-3 text-indigo-500 dark:text-indigo-300">
                  {/* Icon for the link */}
                  {link.icon}
                </span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} My Dashboard</p>
        <p>Version 1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;