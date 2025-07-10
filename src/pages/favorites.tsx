// src/pages/favorites.tsx
import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux'; // Import useSelector
import { RootState } from '@/store'; // Import RootState from your store setup
import ContentCard from '@/components/content/ContentCard'; // Correct path to ContentCard

export default function FavoritesPage() {
  // Select the items array from the favorites slice of your Redux store
  const favoriteItems = useSelector((state: RootState) => state.favorites.items);

  return (
    <>
      <Head>
        <title>Your Favorites</title>
        <meta name="description" content="Your saved favorite content" />
      </Head>

      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-800 dark:text-indigo-300">
        ❤️ Your Favorite Content
      </h2>

      {/* Conditional rendering based on whether there are favorite items */}
      {favoriteItems.length === 0 ? (
        // Display a message if no favorites are found
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-10">
          You haven't added any favorites yet!
        </p>
      ) : (
        // Render ContentCards if favorites exist
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteItems.map((item) => (
            <ContentCard
              key={item.id} // Ensure each item has a unique 'id'
              id={item.id}
              type={item.type} // 'news' or 'movie'
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              url={item.url}
            />
          ))}
        </div>
      )}
    </>
  );
}