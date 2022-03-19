import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";
import { SWRConfig } from "swr";
import { ToastProvider } from "react-toast-notifications";
import Amplify from "aws-amplify";

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
          <Component {...pageProps} />
        </SWRConfig>
      </ToastProvider>
    </ChakraProvider>
  );
}

export default MyApp;
