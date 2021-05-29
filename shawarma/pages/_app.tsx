import { useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocationContextProvider } from "../contexts/LocationContextProvider";
import ThemeContextProvider from "../contexts/ThemeContextProvider";
import { Layout } from "../templates/Layout";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import Router from "next/router";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const queryClientRef = useRef(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ThemeContextProvider>
        <LocationContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LocationContextProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
