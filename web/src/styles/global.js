import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --ally-red: #A30B54;
    --ally-blue: #3D73BF;
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
`;
