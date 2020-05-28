import styled from 'styled-components';

export const Container = styled.header`
  grid-column: 1/3;
  grid-row: 1/2;
  background-color: var(--ally-dark);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  img {
    height: 32px;
    border-radius: 50%;
  }
  div {
    display: flex;
  }
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
`;

export const List = styled.ul`
  display: flex;
  align-items: center;
`;

export const ListItem = styled.li`
  margin-left: 20px;
  font-weight: 500;
`;

export const Greeting = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
  font-size: 14px;
  strong {
    font-size: 15px;
  }
  img {
    margin-left: 20px;
    height: 32px;
    width: 32px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
