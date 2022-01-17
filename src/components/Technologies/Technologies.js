import React from 'react';
import { DiFirebase, DiReact, DiZend } from 'react-icons/di';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { List, ListContainer, ListItem, ListParagraph, ListTitle } from './TechnologiesStyles';

const Technologies = () =>  (
  <Section id="tech">
    <SectionDivider />
    <br />
    <SectionTitle>Technologies</SectionTitle>
    <SectionText>
      I've worked on different React projects, used Next.js for my server-side rendering and Firebase database to
       store and retrieve data from the backend.
     </SectionText>  
      <br />
    <SectionText >
      React.js, HTML, JavaScript, Next.js, Firebase, Cascading Style Sheets.
    </SectionText>
    <List>
      <ListItem>
        <DiReact size="3rem" />
        <ListContainer>
          <ListTitle>Front-End</ListTitle>
          <ListParagraph>
            Experience with React for front-end apps.
          </ListParagraph>
        </ListContainer>
      </ListItem> 
      <ListItem>
        <DiFirebase size="3rem" />
        <ListContainer>
          <ListTitle>Database</ListTitle>
          <ListParagraph>
            Experience with Firebase for storing and retrieving users data
          </ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
  </Section>
);

export default Technologies;
