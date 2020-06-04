import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

export default function SelectBlock({ id, label, onChange, errors = [{}], isPass, options = [], ...rest }) {
  return (
    <Container className="select-block">
      <SelectContainer>
        <Select
          id={id}
          placeholder=""
          options={options}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: 'var(--ally-red)',
            },
          })}
          onChange={onChange}
          menuPlacement="auto"
          isSearchable={false}
          className="select-container"
          defaultValue={options[0]}
          {...rest}
        ></Select>
        <div className="label-container">
          <label htmlFor={id}>{label}</label>
        </div>
      </SelectContainer>
    </Container>
  );
}

const Container = styled.div`
  margin: 10px 0;
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
    border: 2px solid var(--ally-red);
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
