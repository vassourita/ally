import styled from 'styled-components';

export const Container = styled.main``;

export const List = styled.ul``;

export const Card = styled.li`
  border: 1px solid #999;
  margin-bottom: 25px;
  padding: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  h3 {
    font-family: 'Quicksand';
    font-size: 21px;
    margin-bottom: 15px;
  }
  p {
    margin-top: 5px;
    strong {
      font-weight: 500;
    }
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #999;
    span {
      display: flex;
      align-items: center;
    }
    svg {
      margin-left: 5px;
    }
  }
`;

export const NoProposals = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: calc(100vh - 280px);
`;
