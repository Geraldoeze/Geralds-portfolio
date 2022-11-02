import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection, Picture } from './HeroStyles';

const Hero = () => (
 <Section row nopadding>
   <LeftSection>
    <Picture src='/images/see.jpg' alt='gerald'/>
     <SectionTitle main center>
        Hi there, <br />
        I'm Gerald, <br />
       A front-end developer.
     </SectionTitle>
     <SectionText>
      Creating awesome User Interface with React.js and JavaScript language.
     </SectionText>
     {/* <Button onClick={() => window.location = "https://reactjs.org"}>More on React</Button> */}
   </LeftSection>
 </Section>
);

export default Hero;