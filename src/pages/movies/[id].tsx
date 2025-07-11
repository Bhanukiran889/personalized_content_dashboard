// src/pages/movies/[id].tsx
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getMovieById, clearCurrentMovie } from '@/store/features/content/contentSlice';
import Image from 'next/image';
import Link from 'next/link';

export default function MovieDetailPage() {
  const router = useRouter();
  const { id } = router.query; // 'id' will be the movie ID
  const movieId = Array.isArray(id) ? id[0] : id || '';

  const dispatch: AppDispatch = useDispatch();
  const { currentMovie, loading, error } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieById(movieId));
    }

    // Cleanup: Clear the current movie when leaving the page
    return () => {
      dispatch(clearCurrentMovie());
    };
  }, [movieId, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        <p className="ml-4 text-lg text-gray-600 dark:text-gray-300">Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg font-medium py-10">Error: {error}</p>;
  }

  if (!currentMovie) {
    return <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-10">Movie not found.</p>;
  }

  const posterPath = currentMovie.poster_path
    ? `https://image.tmdb.org/t/p/w780${currentMovie.poster_path}` // Larger image for detail page
    : null;

  const releaseYear = currentMovie.release_date ? new Date(currentMovie.release_date).getFullYear() : 'N/A';
  const voteAverage = currentMovie.vote_average ? currentMovie.vote_average.toFixed(1) : 'N/A';
  const runtimeMinutes = currentMovie.runtime ? `${currentMovie.runtime} min` : 'N/A';
  const genres = currentMovie.genres?.map(g => g.name).join(', ') || 'N/A';


  return (
    <>
      <Head>
        <title>{currentMovie.title || 'Movie Details'}</title>
        <meta name="description" content={currentMovie.overview || 'Detailed movie information'} />
      </Head>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 mb-8 flex flex-col lg:flex-row items-start lg:space-x-8">
        {posterPath && (
          <div className="relative w-full lg:w-1/3 flex-shrink-0 h-96 sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-xl mb-6 lg:mb-0 mx-auto lg:mx-0">
            <Image
              src={posterPath}
              alt={currentMovie.title || 'Movie Poster'}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}

        <div className="flex-grow">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100 leading-tight">
            {currentMovie.title} {releaseYear !== 'N/A' && `(${releaseYear})`}
          </h1>
          {currentMovie.tagline && (
            <p className="text-indigo-600 dark:text-indigo-300 text-lg italic mb-4">
              "{currentMovie.tagline}"
            </p>
          )}

          <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-300 text-md sm:text-lg mb-6 space-x-4">
            <span>⭐ {voteAverage}</span>
            <span>|</span>
            <span>{runtimeMinutes}</span>
            <span>|</span>
            <span>{genres}</span>
          </div>

          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Overview</h3>
          <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed mb-6">
            {currentMovie.overview || 'No overview available.'}
          </p>

          {currentMovie.url && ( // Link to TMDB page
            <div className="mt-8 text-center lg:text-left">
              <Link href={currentMovie.url} passHref legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm
                    text-white bg-indigo-600 hover:bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    dark:bg-indigo-500 dark:hover:bg-indigo-600
                    transition-colors duration-200
                  "
                >
                  View on TMDB
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l-6 6"></path></svg>
                </a>
              </Link>
            </div>
          )}

          <div className="mt-8 text-center lg:text-left">
            <button
              onClick={() => router.back()}
              className="
                inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-full shadow-sm
                text-gray-700 bg-white hover:bg-gray-50
                dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                transition-colors duration-200
              "
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}