import React from 'react';
import { DiDatabase, DiReact, DiNodejsSmall } from 'react-icons/di';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { List, ListContainer, ListItem, ListParagraph, ListTitle } from './TechnologiesStyles';

const Technologies = () =>  (
  <Section id="tech">
    <SectionDivider />
    <br />
    <SectionTitle>Technologies</SectionTitle>
    <SectionText>
      React for Front-end. 
      Node and Express for Back-end.<br />
      MongoDb for Database Storage.
      The complexity of the project determines the framework to be used, be it React, Next.js or a Full-stack application. 
     </SectionText>  
      <br />
    <SectionText >
       HTML, JavaScript, Cascading Style Sheets, React.js, Next.js, Vite.js, Node.js, Express, MongoDB, TailwindCSS, Material-Ui, PrimeReact, GitHub, Postman, REST API.
    </SectionText>
    <List>
      <ListItem>
        <DiReact size="3rem" />
        <ListContainer>
          <ListTitle>Front-End</ListTitle>
          <ListParagraph>
            Experience with React.js, Next.js for front-end applications.
          </ListParagraph>
        </ListContainer>
      </ListItem> 
      <ListItem>
        <DiDatabase size="3rem" />
        <ListContainer>
          <ListTitle>Database</ListTitle>
          <ListParagraph>
            Experience with MongoDB for storing and retrieving users data.
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiNodejsSmall size="3rem" />
        <ListContainer>
          <ListTitle>Back-End</ListTitle>
          <ListParagraph>
            Experience with Node.js and Express for Back-end applications.
          </ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
  </Section>
);

export default Technologies;
