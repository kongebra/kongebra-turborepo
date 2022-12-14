import { useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import config from "src/common/lib/react-query";

import { Analytics } from "@vercel/analytics/react";

import Layout from "src/frontend/layout/Layout";

import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
import Script from "next/script";

type AuthAppProps = AppProps<{
  session: Session;
}>;

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AuthAppProps) {
  const [queryClient] = useState(new QueryClient(config));

  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <DefaultSeo
            openGraph={{
              type: "website",
              locale: "nb_NO",
              url: "https://www.discjakt.no/",
              siteName: "Discjakt",
              description: "", // TODO: Default description
            }}
          />

          <Head>
            <title>Discjakt</title>
          </Head>

          <Layout>
            <Component {...pageProps} />
          </Layout>

          <ReactQueryDevtools position={"top-left"} />

          <Analytics />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default App;
