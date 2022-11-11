import { ApolloProvider } from "@apollo/client";
import { CacheProvider, EmotionCache } from "@emotion/react";
import type { AppProps } from "next/app";
import client from "../apollo";
import Layout from "../components/_App/Layout";
import "../i18n/config";
import "../styles/globals.css";
import { createEmotionCache, initAxe } from "../utils/common.utils";

initAxe();

const clientSideEmotionCache = createEmotionCache();

interface Props extends AppProps {
  emotionCache?: EmotionCache;
}

const App = ({
  emotionCache = clientSideEmotionCache,
  pageProps,
  Component,
}: Props) => (
  <ApolloProvider client={client}>
    <CacheProvider value={emotionCache}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </CacheProvider>
  </ApolloProvider>
);

export default App;
