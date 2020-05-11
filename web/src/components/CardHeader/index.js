import React from 'react';

import { Container } from './styles';

function CardHeader({ title = 'Título', sub = 'Subtítulo do título ;D' }) {
  return (
    <Container>
      <h2>{title}</h2>
      <p>{sub}</p>
    </Container>
  );
}

export default CardHeader;
