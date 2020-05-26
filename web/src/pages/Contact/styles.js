import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  width: 100%;
  height: 500px;
  display: grid;
  grid-row: 50px auto;
  gap: 50px;
  align-content: center;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 48px;
  text-align: center;
  color: #fff;
  font-family: 'Quicksand', sans-serif;
`;
