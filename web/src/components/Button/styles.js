import styled, { css } from 'styled-components';

export const Container = styled.button`
  ${p =>
    p.disabled
      ? css`
          opacity: 80%;
        `
      : css`
          cursor: pointer;
        `}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${p => (p.outlined ? '#666' : '#fff')};
  height: 42px;
  background-color: ${p => (!p.outlined ? 'var(--ally-blue)' : '#fff')};
  font-size: 14px;
  font-weight: 500;
  border: ${p => (!p.outlined ? 'none' : '1px solid #666')};
  transition: 0.4s ease-out;
  &:hover {
    ${p =>
      !p.outlined
        ? !p.disabled &&
          css`
            background-color: var(--ally-blue-d);
          `
        : !p.disabled &&
          css`
            border: 1px solid var(--ally-blue);
            color: var(--ally-blue);
          `};
  }
`;
