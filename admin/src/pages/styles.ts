import styled, { css } from 'styled-components';

export const Container = styled.div`
  min-width: 100%;
  min-height: 100vh;
`;

export const Header = styled.header`
  min-width: 100%;
  min-height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 15px;
  img {
    height: 35px;
  }
`;

export const Main = styled.main`
  padding: 30px;
`;

export const Title = styled.p`
  font-family: 'Quicksand';
  font-size: 25px;
  color: #fff;
  padding-bottom: 15px;
  border-bottom: 1px solid #fff;
`

export const Reports = styled.ul`
  list-style: none;

`;

export const Report = styled.li`
  padding: 20px 0;

  display: grid;
  ${(p: any) => !p.active ? css`

  grid-template-rows: auto auto;
  grid-template-columns: 30px 1fr auto;
  justify-content: space-between;
  align-items: center;

  ` : css`

  grid-template-rows: auto auto;
  grid-template-columns: 30px auto 230px 230px 230px 1fr;
  justify-content: space-between;
  > div {
    margin-left: 25px;
    :nth-child(2) {
      margin-left: 0px;
    }
    :nth-child(8) {
      margin-left: 0px;
    }
    :nth-child(6) {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  button {
    width: 100%;
    margin-top: 20px;
  }

  `}
  color: #fff;
  border-bottom: 1px solid #fff;

  transition: 0.3s ease; 
  &:last-child {
    border-bottom: none;
  }

  svg {
    cursor: pointer;
    align-self: flex-start;
  }
  h3 {
    font-family: 'Quicksand';
    font-weight: 500;
    font-size: 17px;
  }
  p {
    margin-top: 5px;
    font-size: 15px;
    color: #ccc;
  }
` as any;