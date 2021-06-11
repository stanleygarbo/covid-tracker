import Head from "next/head";
import React from "react";
import { useTheme } from "../../contexts/ThemeContextProvider";
import { HospitalTemplate } from "../../templates/HospitalTemplate";

const Hospital = ({ data }) => {
  const { theme } = useTheme();

  return (
    <div>
      <Head>
        <title>NCoV Go | {data.Cfname}</title>
        <meta
          name="description"
          content={`Information about ${data.Cfname}. See the availability of beds in ${data.Cfname}`}
        />
        <meta name="theme-color" content={theme.accent} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HospitalTemplate data={data} />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;

  const url = `https://ncovgo.stanleygarbo.com/hospitals?hfhudcode=${id}`;

  const res = await fetch(url);

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Hospital;
