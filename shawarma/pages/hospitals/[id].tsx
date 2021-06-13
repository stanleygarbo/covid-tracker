import React from "react";
import { useTheme } from "../../contexts/ThemeContextProvider";
import { HospitalTemplate } from "../../templates/HospitalTemplate";
import { SEO } from "../../templates/SEO";

const Hospital = ({ data }) => {
  const { theme } = useTheme();

  return (
    <div>
      <SEO
        title={`NCoV Go | ${data.Cfname}`}
        description={`Information about ${data.Cfname}. See the availability of beds in ${data.Cfname}`}
        themeColor={theme.accent}
      />
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
