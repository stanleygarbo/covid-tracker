import React from "react";
import { IErrorMessage } from "../interfaces/IErrorMessage";
import styled from "styled-components";
import { ThemedButton } from "./ThemedButton";
import { useTheme } from "../contexts/ThemeContextProvider";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const Container = styled.div`
  height: calc(100vh - 65px);
  width: 100%;
  display: grid;
  place-items: center;
  text-align: center;

  h3 {
    color: ${({ theme }) => theme.textPrimaryDark};
    margin-top: 10px;
  }
  p {
    color: ${({ theme }) => theme.textPrimaryLight};
    margin-top: 10px;
    width: 280px;
  }

  @media (max-width: 700px) {
    height: calc(100vh - 123px);
  }
`;

export const ErrorMessage: React.FC<IErrorMessage> = ({
  message,
  title,
  onClick,
}) => {
  const { theme, isDarkMode } = useTheme();

  return (
    <Container
      theme={theme}
      style={{ background: !isDarkMode && theme.primaryLight }}
    >
      <div className="wrapper">
        <ErrorOutlineIcon
          style={{
            fontSize: 100,
            color: theme.textPrimaryDark,
            fontWeight: "lighter",
          }}
        />
        <h3>{title}</h3>
        <p>{message}</p>
        <ThemedButton
          onClick={onClick}
          style={{ minWidth: 300, marginTop: 70 }}
        >
          RETRY
        </ThemedButton>
      </div>
    </Container>
  );
};
