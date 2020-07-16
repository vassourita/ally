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
  color: ${(p: IProps) => (p.outlined ? '#A30B54' : '#fff')};
  height: 42px;
  background-color: ${(p: IProps) => (!p.outlined ? '#A30B54' : '#191929')};
  font-size: 14px;
  font-weight: 500;
  border: ${(p: IProps) => (!p.outlined ? 'none' : '1px solid #A30B54')};
  transition: 0.4s ease-out;
  &:hover {
    ${(p: IProps) =>
      !p.outlined
        ? !p.disabled &&
          css`
            background-color: #A30B54;
          `
        : !p.disabled &&
          css`
            border: 1px solid #8f0444;
            color: #8f0444;
          `};
  }
`;
