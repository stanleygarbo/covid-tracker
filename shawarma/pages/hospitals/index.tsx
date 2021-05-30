import Head from "next/head";
import { HospitalsTemplate } from "../../templates/HospitalsTemplate";
import { useLocation } from "../../contexts/LocationContextProvider";
import { useQuery } from "react-query";
import { useTheme } from "../../contexts/ThemeContextProvider";

export default function Hospitals() {
  const { regionPSGC, cityMunPSGC } = useLocation();
  const { theme } = useTheme();

  const getHospitals = async () => {
    let url = "http://192.168.3.51:8000/hospitals";
    if (regionPSGC != "undefined" && regionPSGC) {
      url = `http://192.168.3.51:8000/hospitals?RegionPSGC=${regionPSGC}`;
    }
    if (cityMunPSGC && cityMunPSGC !== "all") {
      url = `http://192.168.3.51:8000/hospitals?CityMunPSGC=${cityMunPSGC}`;
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
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
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
