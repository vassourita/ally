import styled from 'styled-components';

export const Container = styled.main`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 115px 1fr 65px;
`;

export const Page = styled.div`
  max-height: calc(100vh - 115px - 65px);
  overflow-y: scroll;
  padding: 15px;
`;
