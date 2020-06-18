import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px;
`;

export const ListContainer = styled.div`
  background-color: #fff;
  margin-top: 40px;
  padding: 20px;
`;

export const List = styled.ul`
  h6 {
    font-size: 15px;
    font-weight: 400;
    color: #333;
  }
`;

export const ListItem = styled.li`
  padding: 17px 0;
  border-top: 1px solid #ccc;
  cursor: pointer;

  :first-child {
    border-top: none;
    padding-top: 0;
  }
  :last-child {
    padding-bottom: 0;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Name = styled.div`
  h4 {
    font-family: 'Quicksand';
    margin-bottom: 10px;
  }
  p {
    font-size: 12px;
  }
`;
export const Side = styled.div`
  font-size: 12px;
  text-align: right;
  a:hover {
    text-decoration: underline;
    color: var(--ally-blue);
  }
`;
export const Date = styled.div`
  margin-top: 10px;
`;

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
