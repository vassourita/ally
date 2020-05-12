import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 60px 1fr;
  grid-template-columns: 190px 1fr;
`;

export const Page = styled.div`
  grid-row: 2/2;
  grid-column: 2/2;
`;
