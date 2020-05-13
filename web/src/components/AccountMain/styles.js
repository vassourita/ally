import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    width: 100%;
    max-width: 345px;
  }
  max-height: 100vh;
  overflow-y: hidden;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  img {
    height: 50px;
    margin-right: 15px;
  }
  h3 {
    font-family: 'Quicksand';
    font-size: 20px;
  }
`;

export const Outlet = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
