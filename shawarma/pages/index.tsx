import Head from "next/head";
import { useQuery } from "react-query";
import { useLocation } from "../contexts/LocationContextProvider";
import { useTheme } from "../contexts/ThemeContextProvider";
import { HomeTemplate } from "../templates/HomeTemplate";

export default function Home() {
  const { theme } = useTheme();
  const { regionRes, cityMunPSGC } = useLocation();

  const getCases = async () => {
    let url = "https://ncovgo.stanleygarbo.com/cases";
    if (regionRes != "undefined" && regionRes) {
      url = `https://ncovgo.stanleygarbo.com/cases?RegionRes=${regionRes}`;
    }
    if (cityMunPSGC && cityMunPSGC !== "all") {
      url = `https://ncovgo.stanleygarbo.com/cases?CityMunPSGC=${cityMunPSGC}`;
    }

    const data = await fetch(url);

    return await data.json();
  };

  const { data, isFetching, error, refetch } = useQuery(
    ["cases", regionRes, cityMunPSGC],
    getCases,
    {
      staleTime: 120000,
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <Head>
        <title>NCoV Go | COVID cases in the Philippines</title>
        <meta
          name="description"
          content="Latest number of COVID cases in the Philippines. Active COVID cases in the Philippines. Deaths of COVID cases in the Philippines. Recoveries of COVID cases in the Philippines"
        />
        <meta name="theme-color" content={theme.primaryLight} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeTemplate
        refetch={refetch}
        data={data}
        error={error}
        isLoading={isFetching}
      />
    </div>
  );
}
