import React from 'react';

import { Container } from './styles';

export default function Button({ text = 'Clique', ...rest }) {
  return <Container {...rest}>{text}</Container>;
}
