import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  grid-template-areas: 'head head' 'left right';
  gap: 40px;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 40px 40px 10px 40px;
  .card-header {
    grid-area: head;
    margin-bottom: -25px;
  }
  button {
    width: 100%;
  }
`;

export const InputContainer = styled.div`
  min-width: 300px;
  input:last-child {
    margin-bottom: 0;
  }
  .textarea-block > div {
    height: 119px;
    > div {
      bottom: 110px;
    }
  }
`;
