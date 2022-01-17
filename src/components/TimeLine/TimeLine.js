import React, { useState, useRef, useEffect } from 'react';

import { CarouselButton, CarouselButtonDot, CarouselButtons, CarouselContainer, CarouselItem, CarouselItemImg, CarouselItemText, CarouselItemTitle, CarouselMobileScrollNode } from './TimeLineStyles';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { TimeLineData } from '../../constants/constants';

const TOTAL_CAROUSEL_COUNT = TimeLineData.length;

const Timeline = () => {
  const [activeItem, setActiveItem] = useState(0);
  const carouselRef = useRef();

  const scroll = (node, left) => {
    return node.scrollTo({ left, behavior: 'smooth' });
  }

  const handleClick = (e, i) => {
    e.preventDefault();

    if (carouselRef.current) {
      const scrollLeft = Math.floor(carouselRef.current.scrollWidth * 0.7 * (i / TimeLineData.length));
      
      scroll(carouselRef.current, scrollLeft);
    }
  }

  const handleScroll = () => {
    if (carouselRef.current) {
      const index = Math.round((carouselRef.current.scrollLeft / (carouselRef.current.scrollWidth * 0.7)) * TimeLineData.length);

      setActiveItem(index);
    }
  }

  // snap back to beginning of scroll when window is resized
  // avoids a bug where content is covered up if coming from smaller screen
  useEffect(() => {
    const handleResize = () => {
      scroll(carouselRef.current, 0);
    }

    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Section id="about">
      <SectionTitle>About Me</SectionTitle>
      <SectionText>
        I'm Gerald Ezenagu, an enthuastic React developer that's passionate about becoming a Software Engineer.
        I write JavaScript codes for building applications and fixing errors. I'm a self-taught React developer with a year's worth of experience 
        in building React projects.
        My interest are mobile applications and MERN stack.
      </SectionText>
      <CarouselContainer ref={carouselRef} onScroll={handleScroll}>
        <>
          {TimeLineData.map((item, index) => (
            <CarouselMobileScrollNode key={index} final={index === TOTAL_CAROUSEL_COUNT - 1}>
              <CarouselItem
                 index={index}
                 id={`carousel__item-${index}`}
                 active={activeItem}
                 onClick={(e) => handleClick(e, index)}>
                 <CarouselItemTitle>
                   {item.year}
                   <CarouselItemImg
                      width="208"
                      height="6"
                      viewBox="0 0 208 6"
                      fill="none"
                      xmins="http://www.w3.org/2000/svg">
                       <path 
                       fill-rule="evenodd"
                       clip-rule="evenodd"
                       d="M2.5 5.5C3.88071 5.5 5 4.38071"
                       fill="url(#paint0_linear)"
                       fill-opacity="0.33"
                       />
                       <defs>
                         <linearGradient>
                           <stop stop-color="white" />
                           <stop
                              offset="0.79478"
                              stop-color="white"
                              stop-opacity="0"
                            />  
                         </linearGradient>
                       </defs> 
                    </CarouselItemImg>
                 </CarouselItemTitle>
                 <CarouselItemText>{item.text}</CarouselItemText>
              </CarouselItem>

            </CarouselMobileScrollNode>         
          ))}
        </>
      </CarouselContainer>
      <CarouselButtons>
        {TimeLineData.map((item, index) => (
          <CarouselButton
            key={index}
            index={index}
            active={activeItem}
            onClick={(e) => handleClick(e, index)}
            type="button"
          >
            <CarouselButtonDot  active={activeItem}/>
          </CarouselButton>  
        ))}
      </CarouselButtons>
      <SectionDivider /> 
    </Section>

  );
};

export default Timeline;
 