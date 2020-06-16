import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 260px 1fr auto;
  align-content: space-between;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  img {
    height: 50px;
    width: 50px;
    margin: 55px 0 25px;
  }
  h1 {
    font-family: 'Quicksand';
    font-size: 34px;
    margin-bottom: 21px;
  }
  p {
    font-size: 18px;
    color: #999;
  }
`;

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 55px;
  background-color: var(--ally-red);
  border: none;
  margin-bottom: 35px;
  color: #fff;
  font-size: 15px;
  img {
    border-radius: 50%;
    height: 35px;
    width: 35px;
    margin-right: 15px;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 25px;
`;
