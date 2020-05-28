import styled from 'styled-components';

export const Container = styled.header`
  padding: 15px;
  background-color: #efefef;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    height: 30px;
    width: 30px;
  }
  h1 {
    font-family: 'Quicksand';
    font-size: 32px;
  }
`;
