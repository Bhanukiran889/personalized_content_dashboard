// src/components/content/ContentCard.tsx
import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { addFavorite, removeFavorite } from '@/store/features/favorites/favoritesSlice';
import Link from 'next/link'; // Keep Link for movies

interface ContentCardProps {
  id: string; // Unique ID for the content (article URL or movie ID)
  type: 'news' | 'movie';
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  url: string; // Original external URL (for news, this is the direct link)
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  type,
  title,
  description,
  imageUrl,
  url, // The original external URL for the news article
}) => {
  const dispatch: AppDispatch = useDispatch();
  const favoriteItems = useSelector((state: RootState) => state.favorites.items);
  const isFavorited = favoriteItems.some(item => item.id === id);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card's click/link from triggering when clicking favorite button
    e.preventDefault(); // Prevent default link behavior for the button if it's inside a link
    
    if (isFavorited) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite({ id, type, title, description, imageUrl, url }));
    }
  };

  // Determine the image source based on type
  // This logic is still useful for movie posters which might be relative paths
  const imageSrc = imageUrl && imageUrl.startsWith('http')
    ? imageUrl
    : (imageUrl ? `https://image.tmdb.org/t/p/w500${imageUrl}` : null);


  // Common Tailwind classes for the card wrapper
  const cardClasses = `
    relative block rounded-xl overflow-hidden shadow-lg hover:shadow-xl
    bg-white dark:bg-gray-800
    transform hover:-translate-y-1 transition-all duration-300 ease-in-out
    cursor-pointer
  `;

  // The main content of the card (image, title, description, favorite button)
  const cardContentBody = (
    <>
      {imageSrc ? (
        <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.png'; // Fallback image
              e.currentTarget.srcset = '/placeholder-image.png';
            }}
          />
        </div>
      ) : (
        <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400 text-center px-4">No Image Available</span>
        </div>
      )}

      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base line-clamp-3 mb-4 flex-grow">
          {description || 'No description available.'}
        </p>

        <div className="flex justify-between items-center mt-auto pt-2">
          <span className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 font-medium capitalize">
            {type === 'news' ? 'News Article' : 'Movie'}
          </span>
          <button
            onClick={handleFavoriteToggle}
            className={`
              p-2 rounded-full transition-colors duration-200
              ${isFavorited
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }
            `}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill={isFavorited ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );

  // Conditional rendering based on content type
  if (type === 'news') {
    // For news articles, link directly to the external URL
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={cardClasses}>
        {cardContentBody}
      </a>
    );
  } else {
    // For movies, use Next.js Link for internal navigation to the detail page
    const movieDetailPagePath = `/movies/${id}`;
    return (
      <Link href={movieDetailPagePath} passHref legacyBehavior>
        <a className={cardClasses}>
          {cardContentBody}
        </a>
      </Link>
    );
  }
};

export default ContentCard;