// For News API articles
export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// For TMDB Movie/TV recommendations
export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  // Add other fields you might need
}

// General Content Card type for unified display
export type ContentItem = NewsArticle | TmdbMovie;

// We'll need a way to distinguish between types if rendering different fields
// For simplicity, we might just use the common fields for display initially.
// For example, if it's a movie, its 'title' is 'title', for news, 'title' is 'title'.
// 'description' maps directly. 'url' for news, we'll need to derive a 'read more' link for movies too.
// For now, let's keep them separate as 'NewsArticle' and 'TmdbMovie' and combine later if needed.
