import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <Script
            strategy="beforeInteractive"
    			src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`}
    		></Script>
        <Component {...pageProps} />
      </>
        );
}

export default MyApp
