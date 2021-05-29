import React from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContextProvider";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import Link from "next/link";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LocalHospitalOutlinedIcon from "@material-ui/icons/LocalHospitalOutlined";
import HomeIcon from "@material-ui/icons/Home";
import MapIcon from "@material-ui/icons/Map";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.primaryLight};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;

  border-right: 1px solid ${({ theme }) => theme.textPrimaryLight}35;

  @media (max-width: 700px) {
    flex-direction: row;
    padding-top: 0px;
    border-right: none;
    border-top: 1px solid ${({ theme }) => theme.textPrimaryLight}35;
  }
`;

const useClasses = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      width: 64,
      height: 64,
      display: "grid",
      borderRadius: 0,
      [theme.breakpoints.down("sm")]: {
        width: "33.33%",
        height: "100%",
      },
    },
    txt: {
      fontSize: 8,
    },
  })
);

export const SideBar = () => {
  const { asPath } = useRouter();
  const classes = useClasses();
  const { theme } = useTheme();

  return (
    <Container theme={theme}>
      <Link href="/" passHref>
        <Button
          className={classes.btn}
          component="a"
          style={{
            color: theme.textPrimaryDark,
            opacity: asPath === "/" ? 1 : 0.75,
          }}
        >
          {asPath === "/" ? <HomeIcon /> : <HomeOutlinedIcon />}
          <div className={classes.txt}>Home</div>
        </Button>
      </Link>
      <Link href="/map" passHref>
        <Button
          className={classes.btn}
          component="a"
          style={{
            color: theme.textPrimaryDark,
            opacity: asPath === "/map" ? 1 : 0.75,
          }}
        >
          {asPath === "/map" ? <MapIcon /> : <MapOutlinedIcon />}
          <div className={classes.txt}>Map</div>
        </Button>
      </Link>
      <Link href="/hospitals" passHref>
        <Button
          className={classes.btn}
          component="a"
          style={{
            color: theme.textPrimaryDark,
            opacity: asPath === "/hospitals" ? 1 : 0.75,
          }}
        >
          {asPath === "/hospitals" ? (
            <LocalHospitalIcon />
          ) : (
            <LocalHospitalOutlinedIcon />
          )}
          <div className={classes.txt}>Hospitals</div>
        </Button>
      </Link>
    </Container>
  );
};
