import React from 'react';

import DashboardNav from '../DashboardNav';
import DashboardHeader from '../DashboardHeader';

import { Container, Page } from './styles';

function DashboardMain({ children }) {
  return (
    <Container>
      <DashboardHeader />
      <Page>{children}</Page>
      <DashboardNav />
    </Container>
  );
}

export default DashboardMain;
