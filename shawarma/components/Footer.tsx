import React from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContextProvider";
import Link from "next/link";

const StyledFooter = styled.footer`
  padding: 5px 0px;
  margin-top: 10px;

  background: ${({ theme }) => theme.primaryLight};
  color: ${({ theme }) => theme.textPrimaryLight};

  text-align: center;

  p {
    font-size: 13px;

    a {
      color: ${({ theme }) => theme.textPrimaryDark};
    }
  }
`;

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <StyledFooter theme={theme}>
      <p>
        &copy;2021 Stanley Garbo |{" "}
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </StyledFooter>
  );
};
