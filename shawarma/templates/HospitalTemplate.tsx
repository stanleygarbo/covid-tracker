import React from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useTheme } from "../contexts/ThemeContextProvider";
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { IHospitalTemplate } from "../interfaces/IHospitalTemplate";
import moment from "moment";
import ControlledAccordion from "../components/ControlledAccordion";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      minWidth: 40,
      minHeight: 40,

      borderRadius: 5,
      padding: "0px 0px 0px 9px",

      position: "fixed",
      top: 10,
      left: 75,

      zIndex: 10,

      "@media(max-width:700px)": {
        left: 10,
      },
    },
  })
);

const Container = styled.div`
  width: 100%;
  .img-cont {
    width: 100%;
    background: ${({ theme }) => theme.accent};
    display: block;

    &__wrapper {
      max-width: 1200px;
      height: 345px;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;

      color: #fff;

      section {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h1 {
          font-size: 30px;
        }
        p {
          margin-top: 20px;
        }
        margin-right: 20px;
      }

      &__i {
        margin-right: 50px;
        background-image: url("/medicalservices.svg");
        background-position: center;
        background-size: cover;
        width: 500px;
        height: 100%;
      }
    }
  }
  .mobile {
    text-align: center;
    h1 {
      color: ${({ theme }) => theme.textPrimary};
      padding: 0 10px;
      margin-top: 20px;
      font-size: 30px;
    }
    p {
      color: ${({ theme }) => theme.textPrimaryLight};
      margin-top: 20px;
    }
  }
  .accordions {
    max-width: 700px;
    margin: 40px auto;
    padding: 0 10px;

    h3 {
      color: ${({ theme }) => theme.textPrimary};
    }

    .subtitle {
      color: ${({ theme }) => theme.textPrimaryDark};
      font-size: 14px;
      padding-top: 10px;
    }

    & > * {
      margin-bottom: 10px;
    }
  }
`;

export const HospitalTemplate: React.FC<IHospitalTemplate> = ({ data }) => {
  const { theme } = useTheme();

  const classes = useStyles();

  const router = useRouter();

  const isIpadMode = useMediaQuery("(max-width:667px)");

  return (
    <Container theme={theme}>
      <Button
        onClick={() => router.back()}
        className={classes.btn}
        style={{
          background: theme.primaryLighter,
          color: theme.textPrimary,
        }}
      >
        <ArrowBackIosIcon />
      </Button>
      {!isIpadMode ? (
        <div className="img-cont">
          <div className="img-cont__wrapper">
            <div className="img-cont__wrapper__i"></div>
            <section>
              <h1>{data.Cfname}</h1>
              <p>
                Date updated:{moment(data.Updateddate).format(" MMMM D, YYYY")}
              </p>
              <p>Data Source: DOH 💖</p>
              <p>⚠️ Take note of the date of which the data is updated⚠️</p>
            </section>
          </div>
        </div>
      ) : (
        <div className="mobile">
          <img src="/medicalservices.svg" alt="medical services" />
          <h1>{data.Cfname}</h1>
          <p>Date updated:{moment(data.Updateddate).format(" MMMM D, YYYY")}</p>
          <p>Data Source: DOH 💖</p>
          <p style={{ fontSize: 10 }}>
            ⚠️ Take note of the date of which the data is updated⚠️
          </p>
        </div>
      )}
      {console.log(data)}
      <div className="accordions">
        <h3>ICU beds</h3>

        <p className="subtitle">For COVID-19-related patients</p>
        <ControlledAccordion
          title="Vacant"
          description="Total number of ICU beds with or without negative pressure in your facility that are currently vacant and available for use by suspect, probable, or confirmed COVID-19 patients"
          value={Math.floor(data.Icu_v).toString()}
        />
        <ControlledAccordion
          title="Occupied"
          description="Total number of ICU beds with or without negative pressure in your facility that are currently occupied by suspect, probable, or confirmed COVID-19 patients"
          value={Math.floor(data.Icu_o).toString()}
        />

        <p className="subtitle">For non-COVID-19 patients</p>
        <ControlledAccordion
          title="Vacant"
          description="Total number of ICU beds with or without negative pressure in your facility that are currently vacant and available for use by Non-COVID-19 patients"
          value={Math.floor(data.Icu_v_nc).toString()}
        />
        <ControlledAccordion
          title="Occupied"
          description="Total number of ICU beds with or without negative pressure in your facility that are currently occupied by Non-COVID-19 patients"
          value={Math.floor(data.Icu_o_nc).toString()}
        />

        <h3 style={{ marginTop: 40 }}>non-ICU beds</h3>
        <p className="subtitle">For non-COVID-19 patients</p>
        <ControlledAccordion
          title="Vacant"
          description="Total number of non-ICU beds (including wards and isolation beds and all other non-ICU beds) dedicated for Non-COVID-19 cases in your facility that are currently vacant and available for use"
          value={Math.floor(data.Nonicu_v_nc).toString()}
        />
        <ControlledAccordion
          title="Occupied"
          description="Total number of non-ICU beds (including wards and isolation beds and all other non-ICU beds) dedicated for Non-COVID-19 cases in your facility that are currently occupied"
          value={Math.floor(data.Nonicu_o_nc).toString()}
        />

        <h3 style={{ marginTop: 40 }}>Isolation beds</h3>

        <p className="subtitle">For COVID-19-related patients</p>
        <ControlledAccordion
          title="Vacant"
          description="Total number of isolation beds and converted/makeshift isolation beds based on DOH standards in your facility that are currently vacant and available for use."
          value={Math.floor(data.Isolbed_v).toString()}
        />
        <ControlledAccordion
          title="Occupied"
          description="Total number of isolation beds and converted/makeshift isolation beds based on DOH standardsin your facility that are currently occupied by suspect, probable, or confirmed COVID-19 patients"
          value={Math.floor(data.Isolbed_o).toString()}
        />

        <h3 style={{ marginTop: 40 }}>Beds</h3>

        <p className="subtitle">Dedicated for confirmed COVID-19 cases</p>
        <ControlledAccordion
          title="Vacant"
          description="Total number of beds in converted wards/units dedicated for confirmed COVID-19 cases in your facility that are currently vacant and available for use. Wards are not allowed for Suspect or Probable cases (PUIs) and should not included."
          value={Math.floor(data.Beds_ward_v).toString()}
        />
        <ControlledAccordion
          title="Occupied"
          description="Total number of beds in converted wards/units dedicated for confirmed COVID-19 cases in your facility that are currently occupied. Wards are not allowed for Suspect or Probable cases (PUIs) and should not included."
          value={Math.floor(data.Beds_ward_o).toString()}
        />
      </div>
    </Container>
  );
};
