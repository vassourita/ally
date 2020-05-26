import styled from 'styled-components';

export const Container = styled.div`
  width: 960px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  ul {
    display: flex;
    align-items: center;
  }
  a {
    font-weight: 500;
    margin-right: 30px;
    transition: color 0.2s ease;
    color: #eee;
    .active-link {
      color: #fff;
    }
    :visited {
      color: #eee;
    }
    :hover {
      color: #fff;
    }
  }
`;
