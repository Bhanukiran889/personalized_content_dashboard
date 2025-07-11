// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
      ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
  reactStrictMode: true,
  images: {
    // REMOVE THE 'domains' ARRAY COMPLETELY!
    // It's no longer needed when you use a custom loader.
    // domains: [ /* ...all your previous domains here... */ ],

    // Configure to use your custom loader
    loader: 'custom',
    loaderFile: './myImageLoader.ts', // Adjust path if it's in a subfolder, e.g., './utils/myImageLoader.js'
  },
};

module.exports = nextConfig;