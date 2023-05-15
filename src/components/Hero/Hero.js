import React from 'react';

import { Section, SectionText, SectionTitle, SectionSubText } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection, Picture } from './HeroStyles';

const Hero = () => (
 <Section row nopadding>
   <LeftSection>
    <Picture src='/images/see.jpg' alt='gerald'/>
    <SectionSubText>
    Hi there, my name is
     </SectionSubText>
     <SectionTitle main center>
        GERALD EZENAGU
     </SectionTitle>
     <SectionText>
      FULL - STACK DEVELOPER <br />
     </SectionText>
     
   </LeftSection>
 </Section>
);

export default Hero;