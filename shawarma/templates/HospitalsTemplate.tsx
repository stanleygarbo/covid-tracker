import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { ErrorMessage } from "../components/ErrorMessage";
import MediaCard from "../components/MediaCard";
import { SelectArea } from "../components/SelectArea";
import { TopBarProgress } from "../components/TopBarProgress";
import { IHospitalsTemplate } from "../interfaces/IHospitalsTemplate";
import { truncate } from "../util/Truncate";

const Container = styled.div`
  padding: 50px;
  position: relative;

  .cards {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    max-width: 590px;

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
    padding: 10px 10px 0 10px;

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
        {data?.map((i) => (
          <MediaCard
            key={i.Hfhudcode}
            withButton={false}
            title={truncate(i.Cfname, 35)}
            onClick={() => router.push(`hospitals/${i.Hfhudcode}`)}
            subtitle={
              "Report Date: " + moment(i.Reportdate).format("MMMM D, YYYY")
            }
          />
        ))}
      </div>
    </Container>
  );
};
