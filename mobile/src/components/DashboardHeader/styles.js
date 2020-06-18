import styled from 'styled-components';

export const Container = styled.header`
  padding: 16px;
  background-color: #efefef;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    height: 30px;
    width: 30px;
  }
  h1 {
    font-family: 'Quicksand';
    font-size: 32px;
  }
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
  svg {
    margin-bottom: 5px;
  }
`;

export const Point = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: var(--ally-red);
  position: absolute;
  bottom: 23px;
`;
