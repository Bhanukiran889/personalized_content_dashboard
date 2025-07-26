# Personalized Content Dashboard

This is a **Personalized Content Dashboard** application, designed to provide users with a dynamic and engaging interface to track and interact with various forms of content, including news, movie recommendations, and social media posts. The application is built using Next.js, React, TypeScript, and Redux Toolkit, demonstrating modern frontend architecture, state management, and API handling.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Cloning the Repository](#cloning-the-repository)
   - [Environment Variables (.env.local)](#environment-variables-envlocal)
   - [Installing Dependencies](#installing-dependencies)
   - [Running the Development Server](#running-the-development-server)
4. [API Keys and How to Get Them](#api-keys-and-how-to-get-them)
   - [NewsAPI](#newsapi)
   - [TMDB API](#tmdb-api)
   - [Mock Social Media API](#mock-social-media-api)
5. [Project Structure](#project-structure)
6. [Deployment and Hosting](#deployment-and-hosting)
   - [Vercel (Recommended)](#vercel-recommended)
   - [Troubleshooting Deployment](#troubleshooting-deployment)
7. [Testing](#testing)
   - [Unit Tests](#unit-tests)
   - [End-to-End (E2E) Tests](#end-to-end-e2e-tests)
8. [Further Enhancements](#further-enhancements)

---

## 1. Features

- **Personalized Content Feed:** Displays a unified feed of news, movie recommendations, and social posts.
- **User Preferences:** Users can configure favorite news categories, impacting their personalized feed.
- **Interactive Content Cards:** Rich display of content with images, titles, descriptions, and a "Favorite" toggle.
- **Infinite Scrolling:** Efficiently loads more content as the user scrolls down.
- **Trending Section:** Showcases popular news articles and movies.
- **Favorites Section:** Allows users to mark and revisit their preferred content.
- **Settings Panel:** Configure user preferences and other dashboard settings (e.g., Dark Mode).
- **Search Functionality:** Debounced search across news and movie content.
- **Dark Mode:** Toggle between light and dark themes.
- **Responsive Layout:** Adapts to various screen sizes with a sidebar for navigation and a top header.

## 2. Technologies Used

- **Next.js:** React framework for production.
- **React:** Frontend JavaScript library for building user interfaces.
- **TypeScript:** Superset of JavaScript for type safety.
- **Redux Toolkit:** Official, opinionated, batteries-included toolset for efficient Redux development.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **APIs:**
  - NewsAPI: For fetching news articles.
  - TMDB API: For fetching movie recommendations.
  - Mock Social Media API: Simulated API for social posts.
- **Testing:**
  - Jest: JavaScript testing framework.
  - React Testing Library: For testing React components.
  - Cypress: For End-to-End testing.

## 3. Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18.x or higher recommended)
- npm (v8.x or higher) or Yarn (v1.x or higher)

### Cloning the Repository

First, clone the project repository from GitHub:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd personalized-content-dashboard # Navigate into your project directory
```

### Environment Variables (.env.local)

This project requires API keys to fetch data. You need to create a `.env.local` file in the root of your project directory and add your API keys there.

Create a file named `.env.local` in the root of your project:

```env
# NewsAPI Key
NEXT_PUBLIC_NEWS_API_KEY=YOUR_NEWS_API_KEY

# TMDB API Key
NEXT_PUBLIC_TMDB_API_KEY=YOUR_TMDB_API_KEY

# Base URL for TMDB images (usually default)
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/
```

> **Important Note for NewsAPI:**
> NewsAPI's free tier only allows data fetching from localhost and typically blocks requests from deployed https domains due to API key restrictions.

### Installing Dependencies

Install the project dependencies using npm or Yarn:

```bash
npm install
# OR
yarn install
```

### Running the Development Server

Once dependencies are installed and your `.env.local` file is set up, you can run the application in development mode:

```bash
npm run dev
# OR
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## 4. API Keys and How to Get Them

You'll need to obtain API keys from the respective services.

### NewsAPI

1. Go to the [NewsAPI website](https://newsapi.org/).
2. Sign up for a free developer account.
3. Once registered, your API key will be displayed on your dashboard.
4. Copy this key and paste it as `YOUR_NEWS_API_KEY` in your `.env.local` file.

### TMDB API (The Movie Database)

1. Go to [The Movie Database (TMDB) website](https://www.themoviedb.org/).
2. Sign up for an account.
3. After logging in, go to your profile settings, then select "API" from the left sidebar.
4. Register for a new developer API key (v3 API).
5. Copy your API Key (v3 auth) and paste it as `YOUR_TMDB_API_KEY` in your `.env.local` file.

### Mock Social Media API

For social media posts, this project uses a mock API (dummy data directly in the code). You do not need to obtain an external API key for this section. The data is available directly within `src/data/mockSocialPosts.ts`.

## 5. Project Structure

```
├── public/                 # Static assets (images, favicon)
├── src/
│   ├── api/                # API utility functions (axios instances, types)
│   ├── assets/             # Images, icons specific to components
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Generic components (Button, Modal)
│   │   └── content/        # Content-specific components (ContentCard)
│   ├── data/               # Mock data for social posts
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Dashboard layout components (Header, Sidebar)
│   ├── store/              # Redux Toolkit setup
│   │   ├── features/       # Slices for different features (news, movies, favorites, social)
│   │   └── index.ts        # Redux store configuration
│   ├── styles/             # Global CSS, Tailwind CSS setup
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions (image loader, constants, helpers)
├── pages/                  # Next.js pages (routes)
│   ├── _app.tsx            # Custom App component for global styles/providers
│   ├── _document.tsx       # Custom Document for server-side rendering
│   ├── api/                # Next.js API routes (if any proxying)
│   ├── index.tsx           # Homepage (Personalized Feed)
│   ├── favorites.tsx       # Favorites page
│   ├── trending.tsx        # Trending page
│   ├── settings.tsx        # Settings page
│   └── search.tsx          # Search results page
├── cypress/                # Cypress E2E tests
├── .env.local              # Environment variables (private)
├── next.config.js          # Next.js configuration
├── myImageLoader.ts        # Custom image loader for Next/Image
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest test configuration
├── jest.setup.js           # Jest setup file
└── package.json            # Project dependencies and scripts
```

## 6. Deployment and Hosting

This project is built with Next.js, making it ideal for deployment on platforms like Vercel (recommended) or Netlify.

### Vercel (Recommended)

Vercel, the creators of Next.js, provides an excellent platform for deploying Next.js applications.

1. **Create a Vercel Account:** If you don't have one, sign up at [vercel.com](https://vercel.com). You can connect it directly to your GitHub account.

2. **Import Your Project:**
   - From your Vercel dashboard, click "Add New..." then "Project."
   - Select your Git repository (e.g., from GitHub, GitLab, Bitbucket).
   - Vercel will automatically detect that it's a Next.js project.

3. **Configure Environment Variables on Vercel:**
   - This is crucial. Your `.env.local` file is not deployed. You need to add your API keys directly in the Vercel dashboard.
   - Go to your project settings in Vercel.
   - Navigate to "Environment Variables."
   - Add `NEXT_PUBLIC_NEWS_API_KEY`, `NEXT_PUBLIC_TMDB_API_KEY`, and `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` with their respective values. Ensure the names match exactly.

4. **Deploy:** Click "Deploy" (or Vercel will auto-deploy on pushes to your connected branch, typically `main` or `master`).

> **Note on NewsAPI for Deployment:** As mentioned earlier, NewsAPI's free tier often restricts usage to localhost. If you see news fetching failures on your deployed Vercel app, this is likely the cause. You might need to upgrade your NewsAPI plan or implement a backend proxy (e.g., a Next.js API route) to work around this.

### Troubleshooting Deployment

- **Check Build Logs:** If your deployment fails, always check the Vercel build logs. They will provide precise error messages indicating what went wrong (e.g., missing environment variables, build-time errors, etc.).

- **Environment Variables:** Double-check that all necessary `NEXT_PUBLIC_` environment variables are correctly set in your Vercel project settings.

- **Build Errors:** Ensure your local build (`npm run build`) runs without critical errors. While `ignoreBuildErrors` is set, runtime errors during the build process can still cause failures.

## 7. Testing

This project includes unit and end-to-end (E2E) tests to ensure reliability and functionality.

### Unit Tests

Unit tests focus on individual components and Redux logic in isolation.

- **Frameworks:** Jest and React Testing Library.
- **How to Run:**
  ```bash
  npm test
  # Or to run tests in watch mode
  npm run test:watch
  ```
- **Location:** Test files are typically co-located with the code they test (e.g., `src/store/features/news/newsSlice.test.ts`) or in `__tests__` directories.

### End-to-End (E2E) Tests

E2E tests simulate user interactions across the entire application in a real browser.

- **Framework:** Cypress.
- **How to Run:**
  1. Ensure your development server is running: `npm run dev`
  2. In a separate terminal, open the Cypress Test Runner: `npm run cypress:open` (This allows you to select and run tests visually.)
  3. Alternatively, to run tests headlessly: `npm run e2e` (This script uses `start-server-and-test` to manage the dev server and Cypress automatically.)
- **Location:** `cypress/e2e/` directory.

## 8. Further Enhancements

- **Authentication:** Implement user login/signup using NextAuth.js or a similar solution.
- **Real-time Data:** Integrate WebSockets or Server-Sent Events for live updates (e.g., social media feed).
- **Multi-language Support:** Add i18n for internationalization.
- **Drag-and-Drop Content Organization:** Implement drag-and-drop functionality for content cards.
- **More User Preferences:** Expand settings for finer content control.
- **Performance Optimizations:** Further fine-tune loading, image optimization, and data caching strategies.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/your-username/personalized-content-dashboard/issues) on GitHub.
