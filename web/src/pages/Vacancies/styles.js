import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 330px 1fr;
  grid-template-areas: 'nav head' 'nav list';
  height: calc(100vh - 60px);
  padding: 0 40px 0 0;
`;

export const Nav = styled.nav`
  width: 100%;
  background-color: #fff;
  grid-area: nav;
  padding: 35px;
`;

export const Header = styled.div`
  padding: 40px 0 0 40px;
  grid-area: head;
`;

export const List = styled.ul`
  grid-area: list;
  overflow-y: auto;
`;

export const ListItem = styled.li`
  background-color: #fff;
  margin: 40px 0 0 40px;
`;

export const UserInfo = styled.div`
  background-color: #fff;
  grid-area: info;
  display: flex;
  position: relative;
  color: #fff;
  h3 {
    margin: 20px 0 0 20px;
    position: absolute;
    font-family: 'Quicksand';
  }
  a {
    margin: 50px 0 0 20px;
    position: absolute;
    font-size: 12px;
  }
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    filter: brightness(55%);
    transition: 0.5s ease-in;
    &:hover {
      filter: brightness(100%);
    }
  }
`;
