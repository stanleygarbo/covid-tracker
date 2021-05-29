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
        h1 {
          font-size: 30px;
          margin-top: 50px;
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

    .mobile {
      display: none;
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
        </div>
      )}
    </Container>
  );
};
