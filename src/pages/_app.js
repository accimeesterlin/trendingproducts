import React from "react";
import Head from "next/head";
import { SWRConfig } from "swr";
import { ToastProvider } from "react-toast-notifications";
import { AppProvider } from "@shopify/polaris";
import Amplify from "aws-amplify";
import enTranslations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/dist/styles.css";
import "../styles/reset.css";

import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider theme={{ colorScheme: "light" }} i18n={enTranslations}>
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
    </AppProvider>
  );
}

export default MyApp;
