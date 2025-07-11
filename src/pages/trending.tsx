// src/pages/trending.tsx
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getTrendingMovies, resetNewsAndMovies } from '@/store/features/content/contentSlice'; // Import resetNewsAndMovies
import ContentCard from '@/components/content/ContentCard';

export default function TrendingPage() {
  const dispatch: AppDispatch = useDispatch();
  // Destructure currentPageMovies and hasMoreMovies
  const { movies, loading, error, currentPageMovies, hasMoreMovies } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    // Reset state and fetch first page when component mounts
    dispatch(resetNewsAndMovies()); // Clear existing movies and reset page number
    dispatch(getTrendingMovies(1)); // Fetch the first page of trending movies

    // Cleanup: Clear movies and reset state when leaving the page
    return () => {
      dispatch(resetNewsAndMovies());
    };
  }, [dispatch]);

  const handleLoadMore = () => {
    // Dispatch getTrendingMovies with the next page number
    dispatch(getTrendingMovies(currentPageMovies));
  };

  return (
    <>
      <Head>
        <title>Trending Movies</title>
        <meta name="description" content="Discover the latest trending movies" />
      </Head>

      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-800 dark:text-indigo-300">
        🍿 Trending Movies
      </h2>

      {loading && movies.length === 0 && ( // Only show full loader if no content yet
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <p className="ml-4 text-lg text-gray-600 dark:text-gray-300">Loading trending movies...</p>
        </div>
      )}
      {error && <p className="text-center text-red-500 text-lg font-medium">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <ContentCard
              key={movie.id}
              id={movie.id.toString()}
              type="movie"
              title={movie.title}
              description={movie.overview}
              imageUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null}
              url={`https://www.themoviedb.org/movie/${movie.id}`}
            />
          ))
        ) : (
          !loading && !error && (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg py-10">
              No trending movies available. Please ensure your API key is correct.
            </p>
          )
        )}
      </div>

      {/* Load More Button for Movies */}
      {hasMoreMovies && !loading && movies.length > 0 && (
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
            Load More Movies
          </button>
        </div>
      )}

      {loading && movies.length > 0 && ( // Small loader when loading more
        <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            <p className="ml-3 text-md text-gray-600 dark:text-gray-300">Loading more...</p>
        </div>
      )}
    </>
  );
}