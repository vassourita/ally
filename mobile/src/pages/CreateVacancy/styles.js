import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 60px);
  ::-webkit-scrollbar-track {
    margin: 40px 0;
  }
`;

export const Grid = styled.div`
  padding: 40px;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 380px auto;
  grid-template-areas: 'head head' 'info know';
  gap: 40px;
`;

export const Header = styled.div`
  grid-area: head;
`;

export const Info = styled.div`
  background-color: #fff;
  padding: 20px;
  grid-area: info;
  align-self: flex-start;
  .select-block {
    margin-bottom: 35px;
  }
`;

export const Knowledges = styled.div`
  background-color: #fff;
  padding: 20px;
  grid-area: know;
  align-self: flex-start;
`;

export const QuadraInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto 40px;
  gap: 20px;
  margin: 0 0 8px 0;
  .input-block {
    margin: 0;
  }
  .checkbox-block {
    margin-top: 6px;
    .checkmark {
      width: 40px;
      height: 40px;
      :after {
        left: 15px;
        top: 10px;
      }
    }
    span:first-child {
      margin-left: 10px;
      margin-top: 6px;
    }
  }
`;

export const AddButton = styled.div`
  & > button {
    width: 40px;
    color: #888;
    border-color: #aaa;
    :hover {
      color: var(--ally-blue);
      border-color: var(--ally-blue);
    }
  }
`;
