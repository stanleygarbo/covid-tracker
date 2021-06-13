import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { ErrorMessage } from "../components/ErrorMessage";
import MediaCard from "../components/MediaCard";
import { SelectArea } from "../components/SelectArea";
import { TopBarProgress } from "../components/TopBarProgress";
import { useLocation } from "../contexts/LocationContextProvider";
import { useTheme } from "../contexts/ThemeContextProvider";
import { IHospitalsTemplate } from "../interfaces/IHospitalsTemplate";
import { truncate } from "../util/Truncate";

const Container = styled.div`
  padding: 50px;
  position: relative;

  .cards {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    max-width: 800px;

    & > * {
      margin-top: 20px;
    }
  }

  .loader {
    position: fixed;
    top: 65px;
    z-index: 1000;
    left: 0;
    height: 30px;
    width: 100%;
  }

  @media (max-width: 700px) {
    padding: 10px 10px 20px 10px;

    .select {
      padding: 5px 0px 0px 0px;
    }

    .cards {
      margin-top: 10px;
    }
  }
`;

export const HospitalsTemplate: React.FC<IHospitalsTemplate> = ({
  isLoading,
  error,
  data,
  refetch,
}) => {
  const router = useRouter();

  const { theme } = useTheme();
  const { regionPSGC } = useLocation();

  if (error) {
    return (
      <ErrorMessage
        onClick={() => refetch()}
        title={"Failed to load data :("}
        message={"Please try again or refresh the app to continue."}
      />
    );
  }

  return (
    <Container>
      <div className="loader">{isLoading && <TopBarProgress />}</div>
      <div className="select">
        <SelectArea />
      </div>
      <div className="cards">
        {data?.length < 1 && regionPSGC && regionPSGC !== "all" && (
          <p style={{ color: theme.textPrimaryLight }}>No results found :(</p>
        )}
        {!regionPSGC ||
          (regionPSGC === "all" && (
            <p style={{ color: theme.textPrimaryLight }}>
              Please select a region.
            </p>
          ))}
        {data?.map((i) => (
          <MediaCard
            key={i.Hfhudcode}
            withButton={false}
            title={truncate(i.Cfname, 35)}
            onClick={() => router.push(`/hospitals/${i.Hfhudcode}`)}
            subtitle={
              "Report Date: " + moment(i.Reportdate).format("MMMM D, YYYY")
            }
          />
        ))}
      </div>
    </Container>
  );
};
