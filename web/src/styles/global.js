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
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
    box-shadow: 0 0 0 60px white inset !important;
    color: #4f4f4f;
  }
  
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ffffff;
    border: 0px none #ffffff;
    border-radius: 0px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #e0e0e0;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #e0e0e0;
  }
  ::-webkit-scrollbar-track {
    background: #ffffff00;
    border: 0px none #ffffff00;
    border-radius: 0px;
    margin-bottom: 40px;
  }
  ::-webkit-scrollbar-track:hover {
    background: #ffffff00;
  }
  ::-webkit-scrollbar-track:active {
    background: #ffffff00;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
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
