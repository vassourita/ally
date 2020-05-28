import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  width: 100%;
  height: calc(100vh - 120px);
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  grid-template-rows: auto auto 80px;
  gap: 60px;
`;

export const Info = styled.div`
  max-width: 800px;
  display: grid;
  align-items: center;
  grid-template-columns: 220px 1fr;
`;

export const Aside = styled.aside`
  text-align: end;
  color: white;
  border-right: 1px solid white;
  padding-right: 25px;
  grid-column: 1/2;
  span {
    font-size: 64px;
    font-weight: bold;
    font-family: 'Quicksand', sans-serif;
  }
  p {
    font-family: 'Quicksand', sans-serif;
    font-size: 32px;
  }
`;

export const TextCall = styled.div`
  text-align: start;
  color: white;
  padding-left: 25px;
  grid-column: 2/3;
  h3 {
    font-size: 32px;
    font-family: 'Quicksand', sans-serif;
    margin-bottom: 5px;
  }
  p {
    font-size: 22px;
  }
  button {
    background-color: #5b55a0;
    width: 140px;
    height: 38px;
    border: none;
    font-size: 16px;
    font-weight: 450;
    color: white;
    align-self: center;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 8px 0px rgba(140, 135, 197, 0.4);
    -moz-box-shadow: 0px 0px 8px 0px rgba(140, 135, 197, 0.4);
    box-shadow: 0px 0px 8px 0px rgba(140, 135, 197, 0.4);
    margin-top: 18px;
  }
`;
