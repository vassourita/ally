import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 60px 1fr;
`;

export const Header = styled.header`
  padding: 0 12px;
  background-color: #efefef;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-family: 'Quicksand';
    text-align: center;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 12px;
  }
`;

export const MessageList = styled.ul`
  overflow-y: auto;
  display: grid;
  grid-template-rows: 1fr 55px;
`;

export const Messages = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

export const MessageData = styled.div`
  align-self: center;
  padding: 7px;
  font-size: 13px;
  background: #e9e9e9;
  color: #333;
  margin-top: 12px;
  :first-child {
  }
`;

export const Message = styled.div`
  width: fit-content;
  max-width: 60%;
  margin-top: 12px;
  padding: 10px;
  font-size: 17px;
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  word-break: break-word;
  :last-child {
    margin-bottom: 12px;
  }
  span {
    color: #666;
    font-size: 13px;
    margin-top: 5px;
  }
  &.left {
    background: #e9e9e9;
    color: #333;
    align-self: flex-start;
    text-align: left;
    span {
      align-self: flex-end;
      color: #666;
    }
  }
  &.right {
    background: var(--ally-red);
    color: #fff;
    align-self: flex-end;
    text-align: right;
    span {
      align-self: flex-start;
      color: #ddd;
    }
  }
`;

export const MessageInput = styled.div`
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr 50px;
  input {
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 0 15px;
    font-size: 17px;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.25);
  }
  button {
    background-color: var(--ally-red);
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
  }
`;
