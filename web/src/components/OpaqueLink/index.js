import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function OpaqueLink({ to, children, text }) {
  return (
    <Container>
      {children}
      <Link to={to}>{text}</Link>
    </Container>
  );
}

const Container = styled.span`
  color: #666;
  font-size: 12px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;

  a {
    margin-left: 3px;
    color: #666;
    text-decoration: underline;
  }
`;

export default OpaqueLink;
