import React from "react";
import { useTheme } from "../contexts/ThemeContextProvider";
import Head from "next/head";
import { ISEO } from "../interfaces/ISEO";
import { useRouter } from "next/router";

export const SEO: React.FC<ISEO> = ({ title, description, themeColor }) => {
  const { theme } = useTheme();

  const { pathname } = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="theme-color"
        content={themeColor ? themeColor : theme.primaryLight}
      />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta
        property="og:url"
        content={`https://ncovgo.vercel.app${pathname}`}
        key="ogurl"
      />
      <meta property="og:image" content={"/ncov-go-1.png"} key="ogimage" />
      <meta property="og:site_name" content={"NCoV Go"} key="ogsitename" />
    </Head>
  );
};
