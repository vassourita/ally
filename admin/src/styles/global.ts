import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    outline: 0;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  #root {
    min-height: 100vh;
    min-width: 100vw;
    background-color: #191929;
  }
`;