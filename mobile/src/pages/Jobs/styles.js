import styled from 'styled-components';

export const Container = styled.div``;

export const Filters = styled.div`
  & > span {
    display: flex;
    align-items: center;
    color: #666;
    margin-bottom: 10px;
    svg {
      margin-right: 5px;
    }
  }
  & > div {
    display: grid;
    overflow-x: scroll;
    grid-template-columns: 150px 150px;
    gap: 20px;
  }
`;

export const List = styled.ul``;

export const Card = styled.li``;
