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

export const FileInputContainer = styled.label`
  cursor: pointer;
  margin-bottom: 35px;
  border: 1px dashed #aaa;
  background-size: cover;
  height: 119px;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    display: none;
  }

  &.has-thumbnail {
    border: 0;
  }

  &.has-thumbnail svg {
    display: none;
  }
`;

export const Title = styled.label`
  font-size: 16px;
  color: #000;
  opacity: 60%;
`;
export const Description = styled.p`
  font-size: 14px;
  color: #000;
  opacity: 60%;
  margin-top: 15px;
`;
