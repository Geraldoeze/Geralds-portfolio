import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = () => (
 <Section row nopadding>
   <LeftSection>
     <SectionTitle main center>
        Hello there, <br />
       Welcome To <br />
       My Personal Portfolio
     </SectionTitle>
     <SectionText>
      I'm Gerald, a React developer. React is all about components,
       using components to innoviate each part of an application.
     </SectionText>
     <Button onClick={() => window.location = "https://reactjs.org"}>Learn More</Button>
   </LeftSection>
 </Section>
);

export default Hero;