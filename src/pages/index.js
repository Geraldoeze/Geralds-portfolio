// import Acomplishments from '../components/Acomplishments/Acomplishments';
import Head from 'next/head';
import BgAnimation from '../components/BackgrooundAnimation/BackgroundAnimation';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Technologies from '../components/Technologies/Technologies';
import Timeline from '../components/TimeLine/TimeLine';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';

const Home = () => {
  return (
    <>
    <Head>
      <title>Gerald's Portfolio</title>
      <link rel='icon' href='/images/see.jpg'/>
    </Head>
    <Layout>
      <Section grid>
        <Hero />
        <BgAnimation />
      </Section>
      <Projects />
      <Technologies />
      <Timeline />
      {/* <Acomplishments /> */}
    </Layout>
    </>
  );
};

export default Home;
