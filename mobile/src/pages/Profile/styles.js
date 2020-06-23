import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const ModalContainer = styled.div`
  .input-block .input-container {
    height: 42px;
    margin-top: 20px;

    &:focus-within {
      padding: 0 14px;
      border: 2px solid var(--ally-red);
      label {
        color: var(--ally-red);
        opacity: 100%;
      }
      & > div {
        bottom: 32px;
        left: 14px;
      }
    }

    & > div {
      position: absolute;
      display: flex;
      align-items: center;
      bottom: 33px;
      left: 15px;

      background-color: #fff;
      transition: all 0.4s ease;

      label {
        margin: 0 4px;
        color: #000;
        opacity: 60%;
        font-size: 16px;
        transition: all 0.4s ease;
        cursor: text;
      }
    }
  }
  button {
    margin-top: -15px;
    height: 42px;
  }
`;

export const Image = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  position: absolute;
`;

export const EditButton = styled.div`
  height: 30px;
  border-radius: 50%;
  position: absolute;
  top: 70px;
  right: 25px;
`;

export const LogoffButton = styled.div`
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 25px;
  display: flex;
  svg {
    margin-left: 7px;
  }
`;

export const EditInput = styled.textarea`
  font-size: 16px;
  width: 100%;
  padding: 4px;
  border-radius: 0px;
  border: 1px solid #ccc;
  color: #888;
  resize: none;
`;

export const Info = styled.div`
  border: 1px solid #999;
  width: 100%;
  height: 100%;
  margin-top: 50px;
  padding: 20px;
  input {
  }
  h3 {
    margin-top: 35px;
    font-weight: 600;
    font-family: 'Quicksand';
    font-size: 20px;
    text-align: center;
  }
`;

export const Title = styled.h6`
  font-weight: 500;
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 19px;
  margin: 20px 0 7px;
`;

export const Content = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;

export const Knowledges = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0 0;
  h6 {
    margin: 0 0 5px;
  }
  p {
    margin-top: 7px;
    display: flex;
    align-items: center;
    :only-child {
      margin: 0 0 4px;
    }
    svg {
      margin-left: 7px;
    }
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
      margin-left: 15px;
    }
  }
`;

export const Edit = styled.div`
  margin-top: 20px;
  > div {
    display: flex;
    align-items: center;
  }
`;

export const DoubleInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;
