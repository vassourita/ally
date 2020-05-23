import React from 'react';

import DashboardHeader from '../DashboardHeader';
import DashboardNav from '../DashboardNav';

import { Container, Page } from './styles';

function DashboardMain({ children }) {
  return (
    <Container>
      <DashboardHeader />
      <DashboardNav />
      <Page>{children}</Page>
    </Container>
  );
}

export default DashboardMain;
