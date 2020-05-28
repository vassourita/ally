import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

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
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -webkit-overflow-scrolling: auto;
  }
  html, body, #root {
    overscroll-behavior-y: contain;
  }

  #root {
    min-height:100%;
    height:100%;
    width:100%;
    position: absolute;
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

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
    box-shadow: 0 0 0 60px white inset !important;
    color: #4f4f4f;
  }
  
  ::-webkit-scrollbar {
    width: 0px;
  }

  .overlay-refactor {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.45);
  }

  .modal-refactor {
    border-radius: none;
    background: #fff;
    max-width: 400px;
    padding: 20px;
    width: 90%;
  }

  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  .ReactModal__Overlay--after-open{
      opacity: 1;
  }

  .ReactModal__Overlay--before-close{
      opacity: 0;
  }

  .Toastify__toast {
    opacity: 95%;
    border-radius: none;
  }
  .Toastify__toast--info {
    background-color: var(--ally-blue);
  }
  .Toastify__toast--error {
    background-color: var(--ally-red);
  }
`;
