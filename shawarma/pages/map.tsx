import { useQuery } from "react-query";
import Map from "../components/Map";
import styled from "styled-components";
import { SEO } from "../templates/SEO";
import Head from "next/head";

const Container = styled.div`
  .map-wrapper {
    width: 100%;
    height: 90vh;
  }
`;

export default function MapPage() {
  const getCases = async () => {
    let url = "https://ncovgo.stanleygarbo.com/coords";

    const data = await fetch(url);

    return await data.json();
  };

  const { data, isFetching } = useQuery("coords", getCases, {
    staleTime: 120000,
    keepPreviousData: true,
  });

  console.log(data);

  return (
    <Container>
      <SEO
        title="NCoV Go | Philippine COVID cases map"
        description="Map for the areas in the Philippines that are much riskier to COVID-19. See the areas of Active COVID patients in the Philippines."
      />
      <Head>
        <style>{"body{overflow:hidden;}"}</style>
      </Head>
      <div className="map-wrapper">
        <Map coords={data} isLoading={isFetching} />
      </div>
    </Container>
  );
}
