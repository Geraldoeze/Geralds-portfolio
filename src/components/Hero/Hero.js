import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection, Picture } from './HeroStyles';

const Hero = () => (
 <Section row nopadding>
   <LeftSection>
    <Picture src='/images/see.jpg'/>
     <SectionTitle main center>
        Hello there, <br />
       Welcome To <br />
       My Personal Portfolio
     </SectionTitle>
     <SectionText>
      I'm Gerald, a React developer. React is all about components,
       using components to innoviate each part of an application. This makes our app efficient and reuseable.
     </SectionText>
     <Button onClick={() => window.location = "https://reactjs.org"}>More on React</Button>
   </LeftSection>
 </Section>
);

export default Hero;