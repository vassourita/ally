import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 330px calc(100vw - 370px - 190px - 320px) 40px;
  grid-template-areas: 'nav head .' 'nav list .';
  grid-gap: 40px;
  height: calc(100vh - 60px);
`;

export const Nav = styled.nav`
  background-color: #fff;
  height: calc(100vh - 60px);
  grid-area: nav;
`;

export const Header = styled.div`
  grid-area: head;
  padding: 40px 0 0 0;
`;

export const List = styled.ul`
  background-color: #fff;
  grid-area: list;
  max-height: calc(100vh - 60px - 80px - 40px);
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ListItem = styled.li`
  background-color: #fff;
`;
