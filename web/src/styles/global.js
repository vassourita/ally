import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --ally-red-l: #f1328e;
    --ally-red: #A30B54;
    --ally-red-d: #690736;
    --ally-blue-l: #7fa3d6;
    --ally-blue: #3D73BF;
    --ally-blue-d: #274a7c;
    --ally-dark: #191929;
  }
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing:border-box;
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  #root {
    height: 100vh;
  }
  a {
    color: #fff;
    text-decoration: none;
    &:visited {
      color: inherit
    }
    &:hover {
      color: inherit
    }
  }
  li {
    list-style: none;
  }
  .modal-shadow {
    box-shadow: 0px 0px 8px rgba(34, 34, 34, 0.4);
  }
`;
