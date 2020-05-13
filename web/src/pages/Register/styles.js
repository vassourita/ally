import styled from 'styled-components';

export const IndicatorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-top: -17px;
`;

export const Indicator = styled.div`
  background-color: ${p => (p.active ? 'var(--ally-blue)' : '#cccccc')};
  height: 3px;
`;

export const DoubleButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;

export const DoubleInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin: -35px 0;
`;
