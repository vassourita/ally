import styled from 'styled-components';

export const Container = styled.main``;

export const List = styled.ul`
  h6 {
    font-size: 15px;
    font-weight: 400;
    color: #333;
  }
`;

export const ListItem = styled.li`
  padding: 8px 0;
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  :first-child {
    padding-top: 0;
    border-top: none;
  }
`;

export const Name = styled.div`
  h4 {
    font-family: 'Quicksand';
    margin-bottom: 10px;
  }
  p {
    font-size: 12px;
    margin-bottom: 8px;
  }
`;
export const Side = styled.div`
  font-size: 12px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a:hover {
    text-decoration: underline;
    color: var(--ally-blue);
  }
`;
export const Date = styled.div``;

export const LinkButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
    color: var(--ally-blue);
  }
`;
