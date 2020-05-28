import styled from 'styled-components';

export const Container = styled.nav`
  background-color: #efefef;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
`;

export const List = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    display: flex;
    flex-direction: column;
    &.nav-link-active {
      color: var(--ally-red);
      span {
        font-size: 13px;
      }
    }
  }
`;

export const PageName = styled.span`
  transition: 0.2s ease;
  font-size: 0px;
`;
