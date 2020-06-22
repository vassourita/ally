import styled from 'styled-components';

export const Container = styled.div`
  overflow: auto;
`;

export const Nav = styled.nav``;

export const NavList = styled.ul``;

export const NavItem = styled.li`
  padding: 10px 0;
  border-top: 1px solid #ccc;
  display: flex;
  :first-child {
    padding-top: 0;
    border-top: none;
  }
  a {
    display: flex;
    align-items: center;
  }
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 12px;
  }
`;

export const Title = styled.h5`
  color: #000;
  font-family: 'Quicksand';
  font-size: 17px;
`;

export const LastMessage = styled.span`
  color: #666;
  font-size: 14px;
`;
