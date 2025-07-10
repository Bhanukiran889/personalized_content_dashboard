import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getTrendingMovies } from '@/store/features/content/contentSlice';
import ContentCard from '@/components/content/ContentCard'; // Updated import path

export default function TrendingPage() {
  const dispatch: AppDispatch = useDispatch();
  const { movies, loading, error } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    dispatch(getTrendingMovies());
  }, [dispatch]);

  const trendingMovies = movies.filter(movie => movie.poster_path);

  return (
    <>
      <Head>
        <title>Trending Content</title>
        <meta name="description" content="Discover what's trending now" />
      </Head>

      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-800 dark:text-indigo-300">
        🔥 Trending Movies
      </h2>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <p className="ml-4 text-lg text-gray-600 dark:text-gray-300">Loading trending content...</p>
        </div>
      )}
      {error && <p className="text-center text-red-500 text-lg font-medium">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {trendingMovies.length > 0 ? (
          trendingMovies.map((movie) => (
            <ContentCard
              key={movie.id}
              id={movie.id.toString()} // Use movie ID as unique ID
              type="movie"
              title={movie.title}
              description={movie.overview}
              imageUrl={movie.poster_path}
              url={`https://www.themoviedb.org/movie/${movie.id}`}
            />
          ))
        ) : (
          !loading && !error && (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg py-10">
              No trending movies found.
            </p>
          )
        )}
      </div>
    </>
  );
}