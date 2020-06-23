import styled from 'styled-components';

export const Container = styled.div`
  overflow: auto;
`;

export const NavItem = styled.li`
  padding: 12px 0;
  border-top: 1px solid #ccc;
  display: flex;
  :first-child {
    padding-top: 0;
    border-top: 0;
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
  margin-bottom: 3px;
`;

export const LastMessage = styled.span`
  color: #666;
  font-size: 14px;
`;

export const NoMessages = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: calc(100vh - 260px);
`;
