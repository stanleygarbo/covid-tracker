import React from "react";
import { useTheme } from "../contexts/ThemeContextProvider";
import styled from "styled-components";
import { SEO } from "../templates/SEO";

const Container = styled.div`
  color: ${({ theme }) => theme.textPrimaryDark};
  max-width: 700px;
  padding: 20px;

  p {
    margin-top: 20px;
  }

  ul {
    margin-top: 10px;
    li {
      margin-left: 10px;
    }
    .classifier {
      margin-top: 20px;
    }
  }
`;

const About = () => {
  const { theme } = useTheme();

  return (
    <Container theme={theme}>
      <SEO
        title="NCoV Go | About"
        description="NCoV Go was developed by Stanley Garbo. A Comp Sci student from the Philippines."
      />
      <h1 style={{ fontSize: 20 }}>
        This app was developed by Stanley Garbo and is still under development.
      </h1>
      <p>
        This was made as an improvement to some COVID-tracking sites. THe goal
        was to provide users with a better UI/UX, accessibility, aesthetics and
        better accuracy with data. This app is takes data from the DOH and
        automatically updates.
      </p>
      <p>
        <h2 style={{ fontSize: 18 }}>Technologies</h2>
        <ul>
          <li className="classifier">
            Front-End:
            <ul>
              <li>TypeScript</li>
              <li>React</li>
              <li>NextJS</li>
            </ul>
          </li>

          <li className="classifier">
            Back-End:
            <ul>
              <li>Golang (Go / Go language)</li>
              <li>MySQL</li>
              <li>Redis</li>
              <li>Caddy</li>
            </ul>
          </li>
          <li className="classifier">
            DevOps:
            <ul>
              <li>Docker</li>
            </ul>
          </li>
        </ul>
      </p>
      <p>Need a website? Email me: stanleygarbo@gmail.com</p>
    </Container>
  );
};

export default About;
