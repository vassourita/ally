import styled from 'styled-components';

export const Container = styled.button`
  color: #fff;
  width: 100%;
  height: 42px;
  background-color: var(--ally-blue);
  font-size: 14px;
  font-weight: 500;
  border: none;
  transition: 0.3s ease-in;
  &:hover {
    background-color: var(--ally-blue-d);
  }
`;
