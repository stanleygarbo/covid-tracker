import React from "react";
import { LineChart } from "../components/LineChart";
import styled, { css } from "styled-components";
import { useTheme } from "../contexts/ThemeContextProvider";
import { IHomeTemplate } from "../interfaces/IHomeTemplate";
import moment from "moment";
import { TopBarProgress } from "../components/TopBarProgress";
import { ErrorMessage } from "../components/ErrorMessage";
import { SelectArea } from "../components/SelectArea";
import { numberWithCommas } from "../util/NumberWithCommas";

const Container = styled.div`
  padding: 0px 50px 50px 50px;
  position: relative;

  .loader {
    position: fixed;
    top: 15px;
    z-index: 5;
    left: 0;
    height: 30px;
    width: 100%;
  }

  & > * {
    margin-top: 50px;
  }

  @media (max-width: 700px) {
    padding: 10px 0 20px 0;
    & > * {
      margin-top: 0px;
    }
    .select {
      padding: 5px 10px 0px 10px;
    }
    .loader {
      top: 65px;
    }
  }
`;

const Typography = css`
  h3,
  h4 {
    color: ${({ theme }) => theme.textPrimary};
  }

  p {
    color: ${({ theme }) => theme.textPrimaryDark};
    font-size: 13px;
    justify-self: flex-end;
  }

  h3 {
    font-size: 13px;
    font-weight: 600;
  }

  h4 {
    font-size: 27px;
  }
`;

const Template1 = styled.div`
  ${Typography}

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-template-rows: 220px;
  gap: 50px;

  width: 100%;

  .template__item {
    background: ${({ theme }) => theme.primaryLight};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: space-between;

    padding: 20px;

    &__chart {
      height: 70px;
    }
  }

  .template__chart {
    height: 220px;
  }

  .template__banner {
    grid-column: span 2;
    background-image: url("/ncov-go-1.png");
    background-color: #2c3038;
    background-size: contain;
    background-repeat: no-repeat;
  }

  @media (max-width: 700px) {
    gap: 0;
    grid-template-columns: repeat(3, minmax(100px, 1fr));
    grid-template-rows: 188px 220px;

    .template__item {
      border-radius: 0px;
    }

    .template__banner {
      margin: 10px;
      border-radius: 10px;
      grid-column: span 6;
    }

    .template__chart {
      grid-column: span 1;
      text-align: center;
    }
  }

  @media (max-width: 550px) {
    .template__item {
      padding: 10px;

      p {
        font-size: 11px;
      }
    }
  }

  @media (max-width: 435px) {
    .template__item {
      &__txt-group {
        h4 {
          font-size: 20px;
        }
      }
    }
  }
`;

const Template2 = styled.div`
  ${Typography}

  display: grid;
  grid-template-columns: 380px 1fr 350px;
  grid-template-rows: 240px 240px;
  gap: 50px;

  width: 100%;

  .template__item {
    background: ${({ theme }) => theme.primaryLight};
    padding: 20px;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;

    &__warning {
      position: absolute;
      top: 65px;
      left: 20px;
      width: 130px;
      font-size: 11px;
      color: ${({ theme }) => theme.textPrimaryLight};
      text-align: justify;
    }

    &__chart {
      height: calc(100% - 70px);
    }
  }

  .template__chart1 {
    grid-column: span 2;
    grid-row: span 2;
  }

  @media (max-width: 986px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 700px));
    grid-template-rows: repeat(3, 320px);

    gap: 0px;

    margin-top: 10px;

    .template__chart1 {
      grid-row: span 1;
      grid-column: span 1;
    }
    .template__item {
      border-radius: 0;
    }
  }
`;

export const HomeTemplate: React.FC<IHomeTemplate> = ({
  data,
  isLoading,
  refetch,
  error,
}) => {
  const activeCases = (() => {
    let sum = 0;

    data?.CasesReport?.filter(
      (obj) =>
        obj.HealthStatus === "MILD" ||
        obj.HealthStatus === "ASYMPTOMATIC" ||
        obj.HealthStatus === "MODERATE" ||
        obj.HealthStatus === "CRITICAL" ||
        obj.HealthStatus === "SEVERE"
    ).map((i) => {
      sum += i.Count;
    });
    return { HealthStatus: "ACTIVE", Count: sum };
  })();

  const deaths = data?.CasesReport?.filter(
    (obj) => obj.HealthStatus === "DIED"
  )[0];

  const recoveries = data?.CasesReport?.filter(
    (obj) => obj.HealthStatus === "RECOVERED"
  )[0];

  const casesChartData = {
    arrOfData: data?.CasesChartData?.map(
      (obj) => obj.Date.toString() && obj.Count
    ),
    labels: data?.CasesChartData?.map((obj) => obj.Date.toString()).filter(
      (i) => i !== ""
    ),
  };

  const recoveriesChartData = {
    arrOfData: data?.RecoveriesChartData?.map(
      (obj) => obj.Date.toString() && obj.Count
    ),
    labels: data?.RecoveriesChartData?.map((obj) => obj.Date.toString()).filter(
      (i) => i !== ""
    ),
  };

  const deathsChartData = {
    arrOfData: data?.DeathsChartData?.map(
      (obj) => obj.Date.toString() && obj.Count
    ),
    labels: data?.DeathsChartData?.map((obj) => obj.Date.toString()).filter(
      (i) => i !== ""
    ),
  };

  const { theme } = useTheme();

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
      <Template1 theme={theme}>
        <div className="template__item template__banner"></div>
        <div className="template__item template__chart">
          <div className="template__item__txt-group">
            <h3>Active</h3>
            <h4>
              {activeCases && !isLoading
                ? numberWithCommas(activeCases.Count)
                : "---"}
            </h4>
          </div>
          <div className="template__item__chart">
            <LineChart
              color={theme.accent}
              data={casesChartData.arrOfData}
              labels={casesChartData.labels}
              title="Active"
              label="Active"
              isMiniature={true}
              showLabels={false}
              showPoints={false}
            />
          </div>
          <p>
            --
            {casesChartData.labels &&
              moment(
                casesChartData.labels[casesChartData.labels.length - 1]
              ).format(" MMMM D, YYYY")}
          </p>
        </div>
        <div className="template__item template__chart">
          <div className="template__item__txt-group">
            <h3>Recoveries</h3>
            <h4>
              {recoveries && !isLoading
                ? numberWithCommas(recoveries.Count)
                : isLoading
                ? "---"
                : 0}
            </h4>
          </div>
          <div className="template__item__chart">
            <LineChart
              color={theme.success}
              data={recoveriesChartData.arrOfData}
              labels={recoveriesChartData.labels}
              title="Recoveries"
              label="Recoveries"
              isMiniature={true}
              showLabels={false}
              showPoints={false}
            />
          </div>
          <p>
            --
            {recoveriesChartData.labels &&
              moment(
                recoveriesChartData.labels[
                  recoveriesChartData.labels.length - 1
                ]
              ).format(" MMMM D, YYYY")}
          </p>
        </div>
        <div className="template__item template__chart">
          <div className="template__item__txt-group">
            <h3>Deaths</h3>
            <h4>
              {deaths && !isLoading
                ? numberWithCommas(deaths.Count)
                : isLoading
                ? "---"
                : 0}
            </h4>
          </div>
          <div className="template__item__chart">
            <LineChart
              color={theme.error}
              data={deathsChartData.arrOfData}
              labels={deathsChartData.labels}
              title="Deaths"
              label="Deaths"
              isMiniature={true}
              showLabels={false}
              showPoints={false}
            />
          </div>
          <p>
            --
            {deathsChartData.labels &&
              moment(
                deathsChartData.labels[deathsChartData?.labels?.length - 1]
              ).format(" MMMM D, YYYY")}
          </p>
        </div>
      </Template1>
      <Template2 theme={theme}>
        <div className="template__item template__chart1">
          <h3 style={{ paddingBottom: 20, fontSize: 16 }}>COVID Cases</h3>
          <div className="template__item__chart">
            <LineChart
              color={theme.accent}
              data={casesChartData.arrOfData}
              labels={casesChartData.labels}
              title="Cases"
              label="Cases"
              isMiniature={false}
              showLabels={false}
              showPoints={true}
            />
          </div>
          <p style={{ marginTop: 15 }}>
            From
            {casesChartData.labels &&
              moment(casesChartData.labels[0]).format(" MMMM D, YYYY")}{" "}
            to
            {deathsChartData.labels &&
              moment(
                deathsChartData.labels[casesChartData?.labels?.length - 1]
              ).format(" MMMM D, YYYY")}
          </p>
          <p className="template__item__warning">
            We urge caution when interpreting the data shown below which may be
            incomplete due to delayed reports.
          </p>
        </div>
        <div className="template__item ">
          <h3 style={{ paddingBottom: 20, fontSize: 16 }}>Recoveries</h3>
          <div className="template__item__chart">
            <LineChart
              color={theme.success}
              data={recoveriesChartData.arrOfData}
              labels={recoveriesChartData.labels}
              title="Recoveries"
              label="Recoveries"
              isMiniature={false}
              showLabels={false}
              showPoints={true}
            />
          </div>
          <p style={{ marginTop: 10 }}>
            From
            {recoveriesChartData.labels &&
              moment(recoveriesChartData.labels[0]).format(
                " MMMM D, YYYY"
              )}{" "}
            to
            {deathsChartData.labels &&
              moment(
                deathsChartData.labels[recoveriesChartData?.labels?.length - 1]
              ).format(" MMMM D, YYYY")}
          </p>
        </div>
        <div className="template__item ">
          <h3 style={{ paddingBottom: 20, fontSize: 16 }}>Deaths</h3>
          <div className="template__item__chart">
            <LineChart
              color={theme.error}
              data={deathsChartData.arrOfData}
              labels={deathsChartData.labels}
              title="Deaths"
              label="Deaths"
              isMiniature={false}
              showLabels={false}
              showPoints={true}
            />
          </div>
          <p style={{ marginTop: 10 }}>
            From
            {deathsChartData.labels &&
              moment(deathsChartData.labels[0]).format(" MMMM D, YYYY")}{" "}
            to
            {deathsChartData.labels &&
              moment(
                deathsChartData.labels[deathsChartData?.labels?.length - 1]
              ).format(" MMMM D, YYYY")}
          </p>
        </div>
      </Template2>
    </Container>
  );
};
