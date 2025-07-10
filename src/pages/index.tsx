import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getNews } from '@/store/features/content/contentSlice'; // Ensure getTrendingMovies is NOT imported here
import ContentCard from '@/components/content/ContentCard'; // <-- UPDATED IMPORT PATH

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { news, loading, error } = useSelector((state: RootState) => state.content);
  const favoriteCategories = useSelector((state: RootState) => state.preferences.favoriteCategories);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch, favoriteCategories]);

  return (
    <>
      <Head>
        <title>Personalized Content Feed</title>
        <meta name="description" content="Your personalized content feed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-800 dark:text-indigo-300">
        Your Personalized Feed
      </h2>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <p className="ml-4 text-lg text-gray-600 dark:text-gray-300">Loading amazing content...</p>
        </div>
      )}
      {error && <p className="text-center text-red-500 text-lg font-medium">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {news.length > 0 ? (
          news.map((article) => (
            <ContentCard
              key={article.url}
              id={article.url} // Assign a unique ID for favoriting
              type="news" // Specify the type
              title={article.title}
              description={article.description}
              imageUrl={article.urlToImage}
              url={article.url}
            />
          ))
        ) : (
          !loading && !error && (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg py-10">
              No news content available. Please ensure your API keys are correct and try again.
            </p>
          )
        )}
        {/* Trending movies are now displayed on the dedicated /trending page */}
      </div>
    </>
  );
}