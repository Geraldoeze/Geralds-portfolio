import React from "react";
import { DiDatabase, DiReact, DiNodejsSmall } from "react-icons/di";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import {
  List,
  ListContainer,
  ListItem,
  ListParagraph,
  ListTitle,
} from "./TechnologiesStyles";

const Technologies = () => (
  <Section id="tech">
    <SectionDivider />
    <br />
    <SectionTitle>Technologies</SectionTitle>

    <SectionText>
      HTML, JavaScript, Cascading Style Sheets, React.js, Next.js, Angular.js,
      Vite.js, Node.js, Express, MongoDB, TailwindCSS, Material-Ui, PrimeReact,
      GitHub, REST API.
    </SectionText>

    <DiReact size="3rem" />
    <ListContainer>
      <ListTitle>Front-End</ListTitle>
      <ListParagraph>
        I have extensive experience building modern and interactive front-end
        applications using React.js, Next.js, and Angular, along with libraries
        such as Material-UI and Tailwind CSS, leveraging their component-based
        architecture, server-side rendering capabilities, and comprehensive
        toolsets to create scalable, performant, and visually appealing user
        interfaces.
      </ListParagraph>
    </ListContainer>
    <br />
    <DiDatabase size="3rem" />
    <ListContainer>
      <ListTitle>Database</ListTitle>
      <ListParagraph>
        I have experience with MongoDB for storing and retrieving user data,
        alongside Firebase, as part of my database management skills. I've
        utilized MongoDB's document-based storage model to efficiently manage
        user data in various projects, ensuring seamless data retrieval and
        storage operations
      </ListParagraph>
    </ListContainer>
    <br />
    <DiNodejsSmall size="3rem" />
    <ListContainer>
      <ListTitle>Back-End</ListTitle>
      <ListParagraph>
        I have junior-level proficiency in using Node.js and Express for
        back-end development, particularly in creating RESTful APIs. I've built
        basic back-end applications, focusing on fundamental concepts such as
        routing, middleware, and database integration, to handle server-side
        logic and data management effectively.
      </ListParagraph>
    </ListContainer>
    <br />
  </Section>
);

export default Technologies;
