import styled from 'styled-components';

import background from '../../assets/background/account-aside-bg.png';

export const Container = styled.div`
  height: 100%;
  padding: 40px;

  display: grid;
  grid-template-rows: 60px auto 24px;

  background-image: url('${background}');
  background-size: cover;
  background-position-x: 45%;
  background-repeat: no-repeat;

  color: #fff;
`;

export const ReturnButton = styled.div`
  & > a {
    font-family: 'Quicksand';
    font-size: 20px;
    display: flex;
    align-items: center;
    svg {
      margin-right: 5px;
    }
  }
`;

export const Title = styled.h2`
  margin-bottom: 10px;
  font-family: 'Quicksand';
  font-size: 32px;
`;

export const Paragraph = styled.p`
  font-family: 'Quicksand';
  font-size: 22px;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  & a + a {
    margin-left: 20px;
  }
`;
