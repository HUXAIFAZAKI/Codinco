// pages/_app.tsx

import '../styles/globals.css'; // Import your global CSS here
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
