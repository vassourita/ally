import React from 'react';
import styled from 'styled-components';

export default function ErrorBox({ message }) {
  return (
    <Container>
      <span>{message}</span>
    </Container>
  );
}

const Container = styled.div`
  padding: 12px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);

  text-align: center;
  font-size: 14px;

  background-color: var(--ally-red);
  color: #fff;
  border-radius: none;
`;
