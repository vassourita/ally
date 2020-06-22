import React, { useState } from 'react';
import Select from 'react-select';
import styled, { css } from 'styled-components';

export default function HighSelectBlock({
  id,
  defaultOption = 0,
  label,
  onChange,
  errors = [{}],
  isPass,
  options = [],
  ...rest
}) {
  const [open, setOpen] = useState(false);
  return (
    <Container className="select-block">
      <SelectContainer isOpen={open}>
        <Select
          id={id}
          placeholder=""
          options={options}
          menuShouldBlockScroll={true}
          theme={theme => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary: 'var(--ally-red)',
            },
          })}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onChange={onChange}
          menuPlacement="auto"
          isSearchable={false}
          className="select-container"
          defaultValue={options[defaultOption]}
          menuPortalTarget={document.querySelector('body')}
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
  margin: 0 0 35px;
`;

const SelectContainer = styled.div`
  padding: 0 1px;
  height: 52px;

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
      bottom: 41px;
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
    bottom: 42px;
    left: 15px;

    background-color: #fff;
    transition: all 0.4s ease-out;

    label {
      margin: 0 4px;
      color: #000;
      opacity: 60%;
      font-size: 19px;
      transition: all 0.4s ease-out;
      cursor: text;
      ${p =>
        p.isOpen &&
        css`
          color: var(--ally-red);
          opacity: 100%;
        `}
    }
  }
`;
