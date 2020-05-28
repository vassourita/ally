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
  height: 55px;
  background-color: ${p => (!p.outlined ? 'var(--ally-red)' : '#fff')};
  font-size: 18px;
  font-weight: 500;
  border: ${p => (!p.outlined ? 'none' : '1px solid #666')};
  transition: 0.4s ease-out;
  &:hover {
    ${p =>
      !p.outlined
        ? !p.disabled &&
          css`
            background-color: var(--ally-red-d);
          `
        : !p.disabled &&
          css`
            border: 1px solid var(--ally-red);
            color: var(--ally-red);
          `};
  }
`;
