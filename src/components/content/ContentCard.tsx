import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { addFavorite, removeFavorite } from '@/store/features/favorites/favoritesSlice';

interface ContentCardProps {
  id: string; // Unique ID for the item (URL for news, TMDB ID for movies)
  type: 'news' | 'movie'; // To distinguish item type
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  url?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  type,
  title,
  description,
  imageUrl,
  url,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorited = favorites.some(item => item.id === id);

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite({ id, type, title, description, imageUrl, url }));
    }
  };

  return (
    <div className="
      bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 mb-4
      transform hover:scale-102 hover:shadow-xl
      transition-all duration-300 ease-in-out
      flex flex-col relative /* Added relative for favorite button positioning */
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

      {/* Favorite Button */}
      <button
        onClick={handleFavoriteToggle}
        className={`
          absolute top-7 right-7 p-2 rounded-full shadow-md
          transition-all duration-200 ease-in-out
          ${isFavorited ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}
          hover:scale-110 focus:outline-none focus:ring-2 focus:ring-opacity-75
          ${isFavorited ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}
        `}
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg
          className="w-5 h-5"
          fill={isFavorited ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default ContentCard;