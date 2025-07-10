/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'image.tmdb.org', // For TMDB movie posters
      'source.unsplash.com', // If you use Unsplash placeholders or similar
      'via.placeholder.com', // If you use placeholders
      'picsum.photos', // Another common placeholder
      'images.unsplash.com', // Common for news sites
      'cdn.vox-cdn.com', // Example for news site images
      'techcrunch.com', // Example for news site images
      'media.wired.com', // Example for news site images
      // ... Add other domains from where your NewsAPI images might come
    ],
    // For local dev, you might set unoptimized: true on the Image component itself,
    // but it's better to configure domains. For production, always configure domains.
    // If you add a lot of dynamic domains, you might need a custom image loader.
  },
};

module.exports = nextConfig;