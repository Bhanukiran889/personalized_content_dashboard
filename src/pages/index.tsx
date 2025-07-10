import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getNews, getTrendingMovies } from '@/store/features/content/contentSlice';

// ContentCard component (no changes needed here, it's reused)
 export const ContentCard: React.FC<{ title: string; description?: string | null; imageUrl?: string | null; url?: string }> = ({
  title,
  description,
  imageUrl,
  url,
}) => {
  return (
    <div className="
      bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 mb-4
      transform hover:scale-102 hover:shadow-xl
      transition-all duration-300 ease-in-out
      flex flex-col
    ">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/E0E0E0/333333?text=Image+Not+Found'; }}
        />
      )}
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 leading-tight">
        {title}
      </h3>
      {description && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
          {description}
        </p>
      )}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block mt-auto
            bg-indigo-600 hover:bg-indigo-700
            text-white font-medium py-2 px-4 rounded-full
            transition-all duration-300 ease-in-out
            text-center text-sm
            shadow-md hover:shadow-lg
          "
        >
          Read More / View Details
        </a>
      )}
    </div>
  );
};

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { news, movies, loading, error } = useSelector((state: RootState) => state.content);
  const favoriteCategories = useSelector((state: RootState) => state.preferences.favoriteCategories);

  useEffect(() => {
    dispatch(getNews());
    dispatch(getTrendingMovies());
  }, [dispatch, favoriteCategories]);

  return (
    <> {/* Removed the outer div, Layout component now provides the overall structure and styling */}
      <Head>
        <title>Personalized Content Feed</title> {/* Updated title */}
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
        {news.map((article) => (
          <ContentCard
            key={article.url}
            title={article.title}
            description={article.description}
            imageUrl={article.urlToImage}
            url={article.url}
          />
        ))}
        {movies.map((movie) => (
          <ContentCard
            key={movie.id}
            title={movie.title}
            description={movie.overview}
            imageUrl={movie.poster_path}
            url={`https://www.themoviedb.org/movie/${movie.id}`}
          />
        ))}
        {!loading && news.length === 0 && movies.length === 0 && !error && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg py-10">
            No content available. Please ensure your API keys are correct and try again.
          </p>
        )}
      </div>
    </>
  );
}