import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { useTheme } from "../contexts/ThemeContextProvider";
import { Select } from "@material-ui/core";
import { getAllCityMun, getAllRegion, getRegion } from "../data/psgc";
import { useLocation } from "../contexts/LocationContextProvider";

const Container = styled.div`
  @media (max-width: 400px) {
    display: grid;
    grid-template-columns: minmax(100px, 200px) 1fr;
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      zIndex: 100,
    },
    select: {
      background: theme.palette.type === "dark" ? "#ffffff30" : "#ffffff",
      color: theme.palette.type === "dark" ? "#fff" : "#000",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export const SelectArea = () => {
  const { theme } = useTheme();
  const {
    regionPSGC,
    cityMunPSGC,
    setRegionPSGC,
    setRegionRes,
    setCityMunPSGC,
  } = useLocation();
  const [regions, setRegions] = useState([]);
  const [cityMun, setCityMun] = useState([]);

  useEffect(() => {
    setRegions(getAllRegion());
  }, [regions]);

  useEffect(() => {
    const data = getAllCityMun(regionPSGC);
    setCityMun(data);
  }, [regionPSGC]);

  const classes = useStyles();

  const regionChangeHandler = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCityMunPSGC("all");
    setRegionPSGC(event.target.value as string);
    setRegionRes(getRegion(event.target.value as string)[0]?.Name);
  };

  const cityMunChangeHandler = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCityMunPSGC(event.target.value as string);
  };

  return (
    <Container>
      <FormControl
        style={{ maxWidth: 200 }}
        size="small"
        variant="outlined"
        className={classes.formControl}
      >
        <InputLabel
          id="demo-simple-select-outlined-label"
          style={{ color: theme.textPrimary }}
        >
          Region
        </InputLabel>
        <Select
          native
          labelId="region-label"
          id="region"
          value={regionPSGC}
          label="City/Mun"
          onChange={regionChangeHandler}
          className={classes.select}
          inputProps={{ style: { padding: "10.5px 32px 10.5px 14px" } }}
        >
          <option value="all">All</option>
          {regions.map((i) => (
            <option key={i.id} value={i.Code}>
              {i.Name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl
        variant="outlined"
        size="small"
        style={{ marginLeft: 10, maxWidth: 140 }}
        className={classes.formControl}
        disabled={regionPSGC === "all" || regionPSGC === ""}
      >
        <InputLabel
          id="demo-simple-select-outlined-label"
          style={{ color: theme.textPrimary }}
        >
          City/Mun
        </InputLabel>
        <Select
          native
          labelId="city-mun-label"
          id="city-mun"
          value={cityMunPSGC}
          onChange={cityMunChangeHandler}
          label="City/Mun"
          className={classes.select}
          inputProps={{ style: { padding: "10.5px 32px 10.5px 14px" } }}
        >
          <option value="all">All</option>
          {cityMun?.map((i) => (
            <option key={i.id} value={i.Code}>
              {i.Name}
            </option>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};
