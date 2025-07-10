import DarkModeToggle from '@/components/ui/DarkModeToggle';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Head>
        <title>Personalized Content Dashboard</title>
        <meta name="description" content="Your personalized content feed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="py-4 px-6 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <DarkModeToggle />
      </header>

      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6">Welcome!</h2>
        <p className="text-lg">
          This is your personalized content feed. Try toggling dark mode!
        </p>
        {/* Content will go here */}
      </main>
    </div>
  );
}