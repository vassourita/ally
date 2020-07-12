import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 360px 1fr;
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
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
  }
  a {
    width: 100%;
    display: flex;
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

export const LastMessage = styled.span`
  color: #666;
  font-size: 11px;
`;

export const Header = styled.div`
  padding: 40px 0 0 0;
  grid-area: head;
  header {
    display: flex;
    gap: 20px;
    grid-template-columns: auto 1fr;
    justify-content: flex-start;
    align-items: center;
    h2 {
      font-family: 'Quicksand';
      font-size: 20px;
      display: flex;
      flex-direction: column;
      color: #333;
      span {
        font-family: 'Quicksand';
        font-size: 15px;
        color: #777;
      }
    }
    img {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      margin-right: 17px;
    }
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

export const MessageList = styled.ul`
  grid-area: list;
  overflow-y: auto;
  display: grid;
  grid-template-rows: 1fr 40px 40px;
`;

export const Messages = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  ::-webkit-scrollbar-track {
    margin-bottom: 0px;
  }
  ::-webkit-scrollbar {
    width: 32px;
  }
  ::-webkit-scrollbar-thumb {
    border-left: 20px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }
`;

export const MessageData = styled.div`
  align-self: center;
  padding: 7px;
  font-size: 13px;
  background-color: #fff;
  color: #333;
  margin-top: 12px;
  :first-child {
    margin-top: 0;
  }
`;

export const Message = styled.div`
  width: fit-content;
  max-width: 60%;
  margin-top: 12px;
  padding: 10px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  word-break: break-word;
  :first-child {
    margin-top: 0;
  }
  span {
    color: #666;
    font-size: 10px;
    margin-top: 5px;
  }
  &.left {
    background: #fff;
    color: #333;
    align-self: flex-start;
    text-align: left;
    span {
      align-self: flex-end;
      color: #666;
      font-size: 10px;
      margin-top: 5px;
    }
  }
  &.right {
    background: var(--ally-blue);
    color: #fff;
    align-self: flex-end;
    text-align: right;
    span {
      align-self: flex-start;
      color: #cfcfcf;
      font-size: 10px;
      margin-top: 5px;
    }
  }
`;

export const MessageInput = styled.div`
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr 40px;
  input {
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 0 15px;
    font-size: 15px;
    border: 0;
  }
  button {
    background-color: var(--ally-blue);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 16px;
    border: 0;
    cursor: pointer;
    transition: 0.2s ease;
    :hover {
      background-color: var(--ally-blue-d);
    }
  }
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
