import React from 'react';
import styled from 'styled-components';

export default function CheckBox({ children = 'Marque-me!', checked = false, ...rest }) {
  return (
    <CheckBoxContainer checked={checked}>
      <span>{children}</span>
      <input type="checkbox" checked={checked} {...rest} />
      <span className="checkmark"></span>
    </CheckBoxContainer>
  );
}

const CheckBoxContainer = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 40px;
  margin: 40px 0;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  span {
    font-size: 15px;
    color: #777;
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    position: absolute;
    top: -5px;
    left: 0;
    height: 27px;
    width: 27px;
    background-color: #fff;
    border: 1px solid ${p => (p.checked ? 'var(--ally-blue)' : '#aaa')};
  }
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
    left: 8px;
    top: 4px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
  input ~ .checkmark {
    background-color: ${props => (props.checked ? 'var(--ally-blue)' : '#fff')};
  }
  input:checked ~ .checkmark:after {
    display: block;
  }
`;
