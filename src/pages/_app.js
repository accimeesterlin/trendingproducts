import React, { useEffect, useState } from "react";
import { ChakraProvider, extendTheme, Progress } from "@chakra-ui/react";
import Head from "next/head";
import { SWRConfig } from "swr";
import { ToastProvider } from "react-toast-notifications";
import Amplify from "aws-amplify";
import { useRouter } from "next/router";

import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const start = () => setLoading(true);
  const stop = () => setLoading(false);

  // Handle Progress Bar
  useEffect(() => {
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", stop);
    router.events.on("routeChangeError", stop);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", stop);
      router.events.off("routeChangeError", stop);
    };
  }, [router]);
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Trending Products</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ToastProvider autoDismiss>
        <SWRConfig value={{ revalidateOnFocus: false }}>
          <Progress size="xs" isIndeterminate={loading} />
          <Component {...pageProps} />
        </SWRConfig>
      </ToastProvider>
    </ChakraProvider>
  );
}

export default MyApp;
