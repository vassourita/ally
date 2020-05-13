import React from 'react';

import loadingGif from '../../assets/loading.gif';

import { Container } from './styles';

export default function Button({ outlined, isLoading, children, ...rest }) {
  return (
    <Container outlined={outlined} {...rest}>
      {isLoading ? <img src={loadingGif} height="20" alt="loading" /> : children}
    </Container>
  );
}
