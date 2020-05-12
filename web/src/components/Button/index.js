import React from 'react';

import { Container } from './styles';

export default function Button({ text = 'Clique', outlined, children, ...rest }) {
  return (
    <Container outlined={outlined} {...rest}>
      {children}
      {text}
    </Container>
  );
}
