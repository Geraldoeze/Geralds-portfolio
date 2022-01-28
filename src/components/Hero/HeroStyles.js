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
height: 380px;
width: 50%;
border-box: 4px;
align-items:center;
@media ${(props) => props.theme.breakpoints.sm} {
height: 180px;
width: 80%
}

@media ${(props) => props.theme.breakpoints.md} {
  height: 300px;
}
`