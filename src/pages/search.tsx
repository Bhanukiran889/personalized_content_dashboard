// src/pages/search.tsx
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { searchNews, searchMovies, clearSearchResults } from '@/store/features/content/contentSlice';
import ContentCard from '@/components/content/ContentCard'; // Reusing ContentCard

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query; // Get the search query from the URL
  const searchQuery = Array.isArray(q) ? q[0] : q || ''; // Ensure it's a string

  const dispatch: AppDispatch = useDispatch();
  const { searchResultsNews, searchResultsMovies, loading, error } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchNews(searchQuery));
      dispatch(searchMovies(searchQuery));
    } else {
      // Clear results if query is empty (e.g., direct navigation to /search)
      dispatch(clearSearchResults());
    }

    // Cleanup function: Clear results when component unmounts or query changes to avoid stale data
    return () => {
      dispatch(clearSearchResults());
    };
  }, [searchQuery, dispatch]); // Re-run effect when searchQuery changes

  const hasResults = searchResultsNews.length > 0 || searchResultsMovies.length > 0;

  return (
    <>
      <Head>
        <title>Search Results for "{searchQuery}"</title>
        <meta name="description" content={`Search results for: ${searchQuery}`} />
      </Head>

      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-800 dark:text-indigo-300">
        🔎 Search Results for "{searchQuery}"
      </h2>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <p className="ml-4 text-lg text-gray-600 dark:text-gray-300">Searching...</p>
        </div>
      )}
      {error && <p className="text-center text-red-500 text-lg font-medium">Error: {error}</p>}

      {!loading && !error && !hasResults && searchQuery && (
        <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg py-10">
          No results found for "{searchQuery}".
        </p>
      )}
      {!loading && !error && !searchQuery && (
         <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg py-10">
           Enter a search query in the bar above to find content.
         </p>
      )}


      {hasResults && (
        <div className="space-y-12">
          {searchResultsNews.length > 0 && (
            <div>
              <h3 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100 border-b pb-2 border-indigo-300 dark:border-indigo-700">
                News Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {searchResultsNews.map((article) => (
                  <ContentCard
                    key={article.url}
                    id={article.url}
                    type="news"
                    title={article.title}
                    description={article.description}
                    imageUrl={article.urlToImage}
                    url={article.url}
                  />
                ))}
              </div>
            </div>
          )}

          {searchResultsMovies.length > 0 && (
            <div>
              <h3 className="text-3xl font-semibold mt-10 mb-6 text-gray-900 dark:text-gray-100 border-b pb-2 border-indigo-300 dark:border-indigo-700">
                Movies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {searchResultsMovies.map((movie) => (
                  <ContentCard
                    key={movie.id}
                    id={movie.id.toString()}
                    type="movie"
                    title={movie.title}
                    description={movie.overview}
                    imageUrl={movie.poster_path}
                    url={`https://www.themoviedb.org/movie/${movie.id}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}