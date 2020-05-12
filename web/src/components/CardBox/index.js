import React from 'react';
import styled from 'styled-components';

function CardBox({ children }) {
  return <Container className="modal-shadow">{children}</Container>;
}

const Container = styled.div`
  padding: 20px;
  width: calc(100vw - 190px - 80px);
  background-color: #fff;
  & > div {
    margin: 0;
  }
`;

export default CardBox;
