import Head from "next/head";
import { HospitalsTemplate } from "../../templates/HospitalsTemplate";
import { useLocation } from "../../contexts/LocationContextProvider";
import { useQuery } from "react-query";
import { useTheme } from "../../contexts/ThemeContextProvider";

export default function Hospitals() {
  const { regionPSGC, cityMunPSGC } = useLocation();
  const { theme } = useTheme();

  const getHospitals = async () => {
    let url = "https://ncovgo.stanleygarbo.com/hospitals";
    if (regionPSGC != "undefined" && regionPSGC) {
      url = `https://ncovgo.stanleygarbo.com/hospitals?RegionPSGC=${regionPSGC}`;
    }
    if (cityMunPSGC && cityMunPSGC !== "all") {
      url = `https://ncovgo.stanleygarbo.com/hospitals?CityMunPSGC=${cityMunPSGC}`;
    }

    const data = await fetch(url);

    return await data.json();
  };

  const { data, isFetching, error, refetch } = useQuery(
    ["cases", regionPSGC, cityMunPSGC],
    getHospitals,
    {
      staleTime: 120000,
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <Head>
        <title>NCoV Go | See all the hospitals in the Philippines</title>
        <meta
          name="description"
          content="Information about the hospitals in the Philippines. See all the hospitals in the Philippines and their information."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content={theme.primaryLight} />
      </Head>
      <HospitalsTemplate
        data={data}
        error={error}
        isLoading={isFetching}
        refetch={refetch}
      />
    </div>
  );
}
