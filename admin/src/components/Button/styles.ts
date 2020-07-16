import styled, { css } from 'styled-components';
import { IProps } from '.';

export const Container = styled.button`
  ${(p: IProps) =>
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
  color: ${(p: IProps) => (p.outlined ? '#666' : '#fff')};
  height: 42px;
  background-color: ${(p: IProps) => (!p.outlined ? '#A30B54' : '#fff')};
  font-size: 14px;
  font-weight: 500;
  border: ${(p: IProps) => (!p.outlined ? 'none' : '1px solid #666')};
  transition: 0.4s ease-out;
  &:hover {
    ${(p: IProps) =>
      !p.outlined
        ? !p.disabled &&
          css`
            background-color: var(--ally-blue-d);
          `
        : !p.disabled &&
          css`
            border: 1px solid #A30B54;
            color: #A30B54;
          `};
  }
`;
