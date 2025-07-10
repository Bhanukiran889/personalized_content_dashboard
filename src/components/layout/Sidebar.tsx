import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  { name: 'Personalized Feed', href: '/' },
  { name: 'Trending', href: '/trending' },
  { name: 'Favorites', href: '/favorites' },
  { name: 'Settings', href: '/settings' },
];

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <aside className="
      w-64 bg-white dark:bg-gray-800 shadow-lg
      p-6 flex flex-col
      h-screen sticky top-0
      transition-all duration-300 ease-in-out
      transform -translate-x-full md:translate-x-0
      absolute md:relative z-30 /* Ensures it's above content but can be hidden */
      rounded-r-2xl
    ">
      <nav className="flex-grow">
        <ul className="space-y-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className={`
                flex items-center p-3 rounded-lg
                text-lg font-medium
                hover:bg-indigo-100 hover:text-indigo-700
                dark:hover:bg-gray-700 dark:hover:text-indigo-400
                transition-all duration-200 ease-in-out
                ${router.pathname === link.href
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-200'}
              `}>
                {/* Placeholder Icons (can replace with actual SVG icons later) */}
                {link.name === 'Personalized Feed' && <span className="mr-3">🏠</span>}
                {link.name === 'Trending' && <span className="mr-3">🔥</span>}
                {link.name === 'Favorites' && <span className="mr-3">❤️</span>}
                {link.name === 'Settings' && <span className="mr-3">⚙️</span>}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer or branding in sidebar */}
      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Dashboard</p>
      </div>
    </aside>
  );
};

export default Sidebar;