import React from "react";
import MuiAppBar from "../components/MuiAppBar";
import styled, { css, createGlobalStyle } from "styled-components";
import { useTheme } from "../contexts/ThemeContextProvider";
import { Footer } from "../components/Footer";

import { ThemeProvider } from "@material-ui/styles";
import { materialLightTheme, materialDarkTheme } from "../theme/theme";
import { SideBar } from "../components/SideBar";
import { useRouter } from "next/router";

interface ILayout {
  children: React.ReactChild;
}

const Container = styled.div`
  width: 100%;
  padding-left: 64px;
  ${({ applyPaddingToTop }) =>
    applyPaddingToTop &&
    css`
      padding-top: 65px;
    `}

  padding-bottom: 25px;
  position: relative;
  min-height: 100vh;

  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  @media (max-width: 700px) {
    padding-left: 0;
    margin-bottom: 58px;
  }
`;

const GlobalStyles = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  body{
    background: ${({ theme }) => theme.primary};
  }

  #nprogress{
    z-index: 999999;
  }

  #nprogress .bar {
    background: ${({ theme }) => theme.accent} !important;
    z-index: 999999;
    margin-top: 64px;
  }

  #nprogress .peg {
    box-shadow: 0 0 10px ${({ theme }) => theme.accent}, 0 0 5px ${({
  theme,
}) => theme.accent};
    z-index: 999999;
  }

  #nprogress .spinner {
    border-top-color: ${({ theme }) => theme.accent};
    border-left-color: ${({ theme }) => theme.accent};
    z-index: 999999;
  }
`;

const Aside = styled.aside`
  ${({ applyPaddingToTop }) =>
    applyPaddingToTop
      ? css`
          height: calc(100vh - 64px);
        `
      : css`
          height: 100vh;
        `}
  width: 64px;
  position: fixed;
  z-index: 5;

  ${({ applyPaddingToTop }) =>
    applyPaddingToTop &&
    css`
      @media (min-width: 700px) {
        top: 64px;
      }
    `}

  @media (max-width: 700px) {
    width: 100%;
    height: 58px;
    top: none;
    bottom: 0px;
  }
`;

export const Layout: React.FC<ILayout> = ({ children }) => {
  const { theme, isDarkMode } = useTheme();

  const router = useRouter();

  const { pathname } = router;

  return (
    <ThemeProvider theme={isDarkMode ? materialDarkTheme : materialLightTheme}>
      <Aside applyPaddingToTop={pathname !== "/hospitals/[id]"}>
        <SideBar />
      </Aside>
      {pathname !== "/hospitals/[id]" && <MuiAppBar />}
      <Container applyPaddingToTop={pathname !== "/hospitals/[id]"}>
        {children}
        <GlobalStyles theme={theme} />
        <Footer />
      </Container>
    </ThemeProvider>
  );
};
