import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import styled from 'styled-components';

export default function InputBlock({ id, label, errors = [{}], isPass, type = 'text', ...rest }) {
  const [passwordShown, setPasswordShown] = React.useState(false);

  const togglePasswordVisiblity = e => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  function getType() {
    if (!isPass) return type;
    if (passwordShown) return 'text';
    return 'password';
  }

  function getErrors() {
    for (const error of errors) {
      if (error.cond) return error.text;
    }
  }

  return (
    <Container>
      <InputContainer>
        <input id={id} type={getType()} {...rest} />
        {isPass && (
          <button onClick={togglePasswordVisiblity}>
            {passwordShown ? <FiEyeOff size="20" color="#777" /> : <FiEye size="20" color="#777" />}
          </button>
        )}
        <div>
          <label htmlFor={id}>{label}</label>
        </div>
      </InputContainer>
      <span>{getErrors()}</span>
    </Container>
  );
}

const Container = styled.div`
  margin: 35px 0;
  position: relative;
  span {
    font-size: 12px;
    color: #df5080;
    position: absolute;
    bottom: -16px;
    right: 0;
    text-align: right;
  }
`;

const InputContainer = styled.div`
  padding: 0 15px;
  height: 42px;

  display: flex;
  align-items: center;
  position: relative;

  border: 1px solid #aaa;
  transition: all 0.4s ease-out;

  button {
    border: none;
    background: none;
    position: relative;
    top: 1px;
  }

  &:focus-within {
    padding: 0 14px;
    border: 2px solid var(--ally-blue);
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
    transition: all 0.4s ease-out;

    label {
      margin: 0 4px;
      color: #000;
      opacity: 60%;
      font-size: 16px;
      transition: all 0.4s ease-out;
      cursor: text;
    }
  }

  input {
    width: 100%;
    font-size: 14px;
    border: none;
    color: #4f4f4f;

    transition: all 0.4s ease-out;

    &:focus + div {
      label {
        color: var(--ally-blue);
        opacity: 100%;
      }
    }
    &:focus + button + div {
      label {
        color: var(--ally-blue);
        opacity: 100%;
      }
    }
  }
`;
