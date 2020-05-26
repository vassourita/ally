import styled from 'styled-components';

import img1 from '../../assets/background/img1.jpg';

export const Background = styled.div`
  background-image: url(${img1});
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  width: 100vw;
  backface-visibility: hidden;

  animation-name: HomeBackground;
  animation-duration: 70s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: normal;
`;

export const Filter = styled.div`
  background-color: rgb(19, 19, 29, 0.85);
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

export const Container = styled.main`
  max-width: 960px;
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-rows: 120px 1fr;
  justify-content: center;
  align-items: center;

  button {
    width: 130px;
    background-color: #5b55a0;
    box-shadow: 0px 0px 8px 0px rgba(140, 135, 197, 0.4);
    :hover {
      background-color: #4b4380;
    }
  }
`;
