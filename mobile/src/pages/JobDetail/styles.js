import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 60px 1fr 110px;
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
`;

export const Body = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding: 0 16px;
`;

export const Employer = styled.div`
  margin-top: 16px;
  padding: 8px;
  border: 1px solid #aaa;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  background-color: #efefef;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  padding: 0 16px;
  button {
    color: var(--ally-red);
    background: transparent;
    border: 1px solid var(--ally-red);
  }
`;
