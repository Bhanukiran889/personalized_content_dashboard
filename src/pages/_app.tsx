// src/pages/_app.tsx
import '@/styles/globals.css'; // Your global styles
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux'; // Import Provider
import { store } from '@/store'; // Import your Redux store
import Layout from '@/components/layout/Layout'; // Import your Layout component

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}> {/* Essential: Wrap your app with the Redux Provider */}
      <Layout> {/* Also wrap your page components with your common Layout */}
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}