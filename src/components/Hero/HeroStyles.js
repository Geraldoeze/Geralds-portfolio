import styled from 'styled-components';

export const LeftSection = styled.div`
  width: 100%;
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 80%;
    display: flex;
    flex-direction: column;

    margin: 0 auto;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
    display: flex;
    flex-direction: column;

    margin: 0 auto;
  }
`;

export const Picture = styled.img`
height: 400px;
width: 50%;
border: 3px solid rgb(183, 188, 190);
border-radius: 50%;
align-items:center;
@media ${(props) => props.theme.breakpoints.sm} {
height: 150px;
width: 60%
}

@media ${(props) => props.theme.breakpoints.md} {
  height: 180px;

}
`