import React from 'react';

import HomeHeader from '../HomeHeader';
import { Background, Filter, Container } from './styles';

function HomeMain({ children }) {
  return (
    <Background>
      <Filter>
        <Container>
          <HomeHeader></HomeHeader>
          {children}
        </Container>
      </Filter>
    </Background>
  );
}

export default HomeMain;
