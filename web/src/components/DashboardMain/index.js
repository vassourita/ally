import React from 'react';

import img from '../../assets/background/dash-1.png';

import DashboardHeader from '../DashboardHeader';
import DashboardNav from '../DashboardNav';

import { Container, Page } from './styles';

function DashboardMain({ children }) {
  return (
    <Container>
      <DashboardHeader />
      <DashboardNav />
      <Page imgUrl={img}>{children}</Page>
    </Container>
  );
}

export default DashboardMain;
