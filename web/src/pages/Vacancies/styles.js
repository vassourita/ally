import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 330px 1fr;
  grid-template-areas: 'nav head' 'nav list';
  gap: 40px;
  height: calc(100vh - 60px);
  padding: 0 40px 0 0;
  overflow: hidden;
`;

export const Nav = styled.nav`
  width: 100%;
  background-color: #fff;
  grid-area: nav;
  & > div {
    padding: 35px 35px 0 35px;
  }
`;

export const NavList = styled.ul``;

export const NavItem = styled.li`
  margin-left: 35px;
  display: flex;
  a {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    strong {
      margin-right: 35px;
    }
    &.nav-link-active {
      strong {
        margin-right: 28px;
      }
      opacity: 100%;
      border-right: 7px solid var(--ally-blue);
    }
    button {
      opacity: 100%;
      margin-right: 35px;
    }
  }
`;

export const Badge = styled.strong`
  background-color: var(--ally-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 15px;
  height: 20px;
  width: 20px;
`;

export const Title = styled.h5`
  color: #000;
  font-family: 'Quicksand';
  font-size: 15px;
`;

export const Available = styled.span`
  color: #666;
  font-size: 11px;
`;

export const Header = styled.div`
  padding: 40px 0 0 0;
  grid-area: head;
  header {
    display: grid;
    gap: 20px;
    grid-template-columns: auto 100px;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: -45px;
  }
  h6 {
    font-size: 15px;
    margin: 15px 0 0 0;
    font-weight: 400;
    color: #333;
  }
  span {
    font-size: 14px;
    color: #555;
  }
`;

export const List = styled.ul`
  grid-area: list;
  overflow-y: auto;
  padding-right: ${p => (p.hasScroll ? '40px' : '0px')};
`;

export const ListItem = styled.li`
  background-color: #fff;
  height: 300px;
  position: relative;
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: 300px;
  grid-template-areas: 'img info';
  margin: 0 0px 40px 0;
`;

export const UserImg = styled.img`
  grid-area: img;
  filter: brightness(55%);
  height: 300px;
  width: 300px;
  object-fit: cover;
  transition: 0.5s ease-in;
  cursor: pointer;
  &:hover {
    filter: brightness(100%);
  }
`;

export const UserName = styled.div`
  display: flex;
  position: absolute;
  width: 260px;
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
`;

export const UserInfo = styled.div`
  grid-area: info;
  padding: 20px;
  display: grid;
  grid-template-rows: auto 1fr;
`;

export const JobInfo = styled.div`
  padding-top: 25px;
  font-size: 14px;
  color: #555;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  section {
    display: flex;
    align-items: flex-end;
    svg {
      margin: 0 0 3px 7px;
      cursor: pointer;
    }
  }
`;

export const DoubleInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const ModalDivisor = styled.div`
  display: grid;
  grid-template-rows: 400px;
`;

export const Counter = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  grid-template-areas: 'stat1 data1' 'stat2 data2';
  gap: 20px;
  div.stat-top {
    grid-area: stat1;
  }
  div.stat-bottom {
    grid-area: stat2;
  }
  div.data-top {
    grid-area: data1;
  }
  div.data-bottom {
    grid-area: data2;
  }
  section span {
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    svg {
      margin-left: 5px;
    }
  }
  h4 {
    border-right: 1px solid #888;
    color: #333;
    font-size: 29px;
    font-weight: 600;
    font-family: 'Quicksand';
  }
  p {
    border-right: 1px solid #888;
    color: #333;
    font-size: 16px;
    font-weight: 400;
    padding-right: 15px;
  }
`;

export const Inputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 20px;
  align-self: flex-end;
  button {
    display: flex;
    align-items: center;
    svg {
      margin-left: 5px;
    }
  }
`;
