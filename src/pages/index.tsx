// src/pages/index.tsx
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getNews, resetNewsAndMovies } from '@/store/features/content/contentSlice'; // Import resetNewsAndMovies
import ContentCard from '@/components/content/ContentCard';

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  // Destructure currentPageNews and hasMoreNews
  const { news, loading, error, currentPageNews, hasMoreNews } = useSelector((state: RootState) => state.content);
  const favoriteCategories = useSelector((state: RootState) => state.preferences.favoriteCategories);

  // Use a ref for the initial load to prevent double fetch on strict mode
  const initialLoadRef = React.useRef(true);

  useEffect(() => {
    // Reset state and fetch first page when component mounts or categories change
    // This effect runs on initial mount and when favoriteCategories change
    dispatch(resetNewsAndMovies()); // Clear existing news and reset page number
    dispatch(getNews(1)); // Fetch the first page of news

    // Cleanup: Clear news and reset state when leaving the page
    return () => {
      dispatch(resetNewsAndMovies());
    };
  }, [dispatch, favoriteCategories]);


  const handleLoadMore = () => {
    // Dispatch getNews with the next page number (currentPageNews is already incremented by 1)
    dispatch(getNews(currentPageNews));
  };

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

      {loading && news.length === 0 && ( // Only show full loader if no content yet
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
              id={article.url}
              type="news"
              title={article.title}
              description={article.description}
              imageUrl={article.urlToImage}
              url={article.url}
            />
          ))
        ) : (
          !loading && !error && (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg py-10">
              No news content available. Please ensure your API keys are correct and try again, or select different categories in settings.
            </p>
          )
        )}
      </div>

      {/* Load More Button for News */}
      {hasMoreNews && !loading && news.length > 0 && (
        <div className="flex justify-center mt-10 mb-8">
          <button
            onClick={handleLoadMore}
            className="
              bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full
              transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
              text-lg
            "
          >
            Load More News
          </button>
        </div>
      )}

      {loading && news.length > 0 && ( // Small loader when loading more
        <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            <p className="ml-3 text-md text-gray-600 dark:text-gray-300">Loading more...</p>
        </div>
      )}
    </>
  );
}