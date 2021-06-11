import Head from "next/head";
import { useQuery } from "react-query";
import { useTheme } from "../contexts/ThemeContextProvider";
import Map from "../components/Map";
import styled from "styled-components";

const Container = styled.div`
  .map-wrapper {
    width: 100%;
    height: 90vh;
  }
`;

export default function MapPage() {
  const { theme } = useTheme();

  const getCases = async () => {
    let url = "https://ncovgo.stanleygarbo.com/coords";

    const data = await fetch(url);

    return await data.json();
  };

  const { data, isFetching } = useQuery("coords", getCases, {
    staleTime: 120000,
    keepPreviousData: true,
  });

  return (
    <Container>
      <Head>
        <title>NCoV Go | Philippine COVID cases map</title>
        <style>{"body{overflow:hidden;}"}</style>
        <meta
          name="description"
          content="Map for the areas in the Philippines that are much riskier to COVID-19. See the areas of Active COVID patients in the Philippines."
        />
        <meta name="theme-color" content={theme.primaryLight} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="map-wrapper">
        <Map coords={data} isLoading={isFetching} />
      </div>
    </Container>
  );
}
