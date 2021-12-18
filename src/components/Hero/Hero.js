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
       Being a React developer is all about using components to build
       each part of a web application. This makes each component perform a particular task.
     </SectionText>
     <Button onClick={() => window.location = "https://google.com"}>Learn More</Button>
   </LeftSection>
 </Section>
);

export default Hero;