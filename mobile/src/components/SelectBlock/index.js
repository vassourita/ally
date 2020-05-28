import React from 'react';
import Select from 'react-select';
import { FiAlertCircle } from 'react-icons/fi';
import styled from 'styled-components';

export default function SelectBlock({ id, label, value, onChange, errors = [{}], isPass, options, ...rest }) {
  function getErrors() {
    for (const error of errors) {
      if (error.cond)
        return (
          <>
            {error.text} <FiAlertCircle size={13} />
          </>
        );
    }
  }

  return (
    <Container className="select-block">
      <SelectContainer>
        <Select
          menuPlacement="auto"
          placeholder=""
          value={value}
          onChange={onChange}
          className="select-container"
          id={id}
          options={options}
          {...rest}
        ></Select>
        <div className="label-container">
          <label htmlFor={id}>{label}</label>
        </div>
      </SelectContainer>
      <span>{getErrors()}</span>
    </Container>
  );
}

const Container = styled.div`
  margin: 10px 0;
  position: relative;
  span {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #df5080;
    position: absolute;
    bottom: -16px;
    right: 0;
    text-align: right;
    svg {
      margin-left: 3px;
    }
  }
`;

const SelectContainer = styled.div`
  padding: 0 1px;
  height: 42px;

  display: flex;
  align-items: center;
  position: relative;

  border: 1px solid #aaa;
  transition: all 0.4s ease-out;

  svg {
    border: none;
    background: none;
  }

  &:focus-within {
    padding: 0 0;
    border: 2px solid var(--ally-blue);
    & > .label-container {
      bottom: 32px;
      left: 14px;
    }
  }

  & > .select-container {
    width: 100%;
    color: #4f4f4f;
    &,
    * {
      font-size: 14px;
      border: none;
      border-radius: 0px;
    }
  }

  & > .label-container {
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
`;
