import React from "react";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import styled from "styled-components";

const Centralize = styled.div`
  width: 100%;
  position: relative;
`;

export const TopBarProgress = () => {
  return (
    <Centralize>
      <LinearProgress style={{ width: "100%", height: 1.8 }} />
      <CircularProgress
        size={20}
        style={{ position: "absolute", right: 10, top: 10 }}
      />
    </Centralize>
  );
};
