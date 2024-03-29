import React from 'react';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';

import { SocialIcons } from '../Header/HeaderStyles';
import { CompanyContainer, FooterWrapper, LinkColumn, LinkItem, LinkList, LinkTitle, Slogan, SocialContainer, SocialIconsContainer } from './FooterStyles';

const Footer = () => {
  return (
   <FooterWrapper>
     <LinkList>
       <LinkColumn>
         <LinkTitle>Call</LinkTitle>
         <LinkItem href="tel:+2348070511659">+234-807-051-1659</LinkItem>
       </LinkColumn>
       <LinkColumn>
         <LinkTitle>Email</LinkTitle>
         <LinkItem href="mailto:egerald344@gmail.com">ezenagugerald@gmail.com</LinkItem>
       </LinkColumn>
     </LinkList>
     <SocialIconsContainer>
       <CompanyContainer>
         <Slogan>Innovating one project at a time</Slogan>
       </CompanyContainer>
      <SocialContainer>
        <SocialIcons href="https://github.com/Geraldoeze">
          <AiFillGithub size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://linkedin.com/in/gerald-ezenagu-a19a0921b">
          <AiFillLinkedin size="3rem" />
        </SocialIcons>
      </SocialContainer>
     </SocialIconsContainer>
   </FooterWrapper>
  );
};

export default Footer;
 