import {
  Section,
  SectionDivider,
  SectionSubText,
  SectionTitle,
} from "../styles/GlobalComponents";

const About = () => {
  return (
    <Section>
      <SectionTitle>Summary</SectionTitle>
      <SectionSubText>
        As a full-stack developer with over 3 years of experience, I specialize
        in crafting exceptional user experiences across the entire web
        development stack. Proficient in both front-end and back-end
        technologies, I leverage HTML, CSS, JavaScript, React, Angular, Node.js,
        and Express to create pixel-perfect, cross-browser web applications. I
        am focused on performance optimization strategies such as code
        splitting, lazy loading, server-side rendering (SSR), and static site
        generation (SSG) to ensure lightning-fast load times. Committed to
        accessibility best practices, I approach projects with a problem-solving
        mindset, delivering scalable and performance-optimized solutions. I
        seamlessly integrate front-end interfaces with RESTful APIs and state
        management systems to create maintainable, high-quality code for
        exceptional digital experiences that meet the highest usability and
        functionality standards.
      </SectionSubText>
    </Section>
  );
};

export default About;
