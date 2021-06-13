import { HospitalsTemplate } from "../../templates/HospitalsTemplate";
import { useLocation } from "../../contexts/LocationContextProvider";
import { useQuery } from "react-query";
import { SEO } from "../../templates/SEO";

export default function Hospitals() {
  const { regionPSGC, cityMunPSGC } = useLocation();

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
      <SEO
        title="NCoV Go | See all the hospitals in the Philippines"
        description="Information about the hospitals in the Philippines. See all the hospitals in the Philippines and their information."
      />
      <HospitalsTemplate
        data={data}
        error={error}
        isLoading={isFetching}
        refetch={refetch}
      />
    </div>
  );
}
