import styled from 'styled-components';

export const Container = styled.div`
  grid-row: 2/2;
  grid-column: 1/2;
  background-color: var(--ally-blue);
  color: #fff;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export const Title = styled.h3`
  font-family: 'Quicksand';
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 35px;
  padding: 34px 34px 0;
`;

export const List = styled.ul``;

export const ListItem = styled.li`
  margin-top: 15px;
  width: 100%;
  transition: 0.3s ease-out;
  a {
    padding: 8px 0 8px 34px;
    display: flex;
    opacity: 60%;
    align-items: center;
    transition: 0.3s ease-out;
    &.nav-link-active {
      opacity: 100%;
      border-right: 7px solid #fff;
    }
  }
  &:hover {
    background-color: var(--ally-blue-d);
  }
`;

export const PageName = styled.span`
  font-size: 15px;
  margin-left: 15px;
  font-weight: 500;
`;

export const Logoff = styled.div`
  font-size: 16px;
  margin-bottom: 35px;
  padding: 34px 34px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    margin-right: 7px;
  }
`;
