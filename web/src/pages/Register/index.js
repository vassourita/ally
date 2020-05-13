import React, { useState } from 'react';

import isValidEmail from '../../validators/isValidEmail';
import isValidPhone from '../../validators/isValidPhone';
import isValidCnpj from '../../validators/isValidCnpj';

import CardHeader from '../../components/CardHeader';
import Button from '../../components/Button';
import OpaqueLink from '../../components/OpaqueLink';

import { IndicatorContainer, Indicator, DoubleButtonContainer } from './styles';

import Form1 from './form1';
import Form2 from './form2';
import Form3 from './form3';

const Forms = [Form1, Form2, Form3];

function Register() {
  const [index, setIndex] = useState(0);

  const [state, setState] = useState({
    email: '',
    name: '',
    password: '',
    confirm: '',
    cnpj: '',
    phone: '',
    image: '',
    location: {
      isValid: false,
      postalCode: '',
      city: '',
      state: '',
      neighborhood: '',
      address: '',
    },
  });

  const requirements = [
    state.name && state.email && state.password && state.password === state.confirm && isValidEmail(state.email),
    state.cnpj && state.phone && state.image && isValidCnpj(state.cnpj) && isValidPhone(state.phone),
    state.location.isValid,
  ];

  function handleClick(e, returning = false) {
    e.preventDefault();

    if (returning) return setIndex(index - 1);

    if (index < 3 && requirements[index]) return setIndex(index + 1);
    if (index === 3) {
    }
  }

  const getCurrentForm = () => Forms.map((Form, i) => index === i && <Form state={state} setState={setState} />);

  function getCurrentFormCommands() {
    return Forms.map(function (_, i) {
      if (index === i) {
        if (i === 0 && i === index) {
          return <Button text="Próximo" onClick={e => handleClick(e)} />;
        }
        return (
          <DoubleButtonContainer>
            <Button text="Retornar" onClick={e => handleClick(e, true)} outlined />
            <Button text={i === 2 ? 'Finalizar' : 'Próximo'} onClick={e => handleClick(e)} />
          </DoubleButtonContainer>
        );
      }
    });
  }

  return (
    <>
      <CardHeader title="Cadastro" sub="Crie uma conta e encontre os melhores profissionais" />
      <IndicatorContainer>
        {Forms.map((_, i) => (
          <Indicator key={i} active={i <= index} />
        ))}
      </IndicatorContainer>
      <form>
        {getCurrentForm()}
        {getCurrentFormCommands()}
        <OpaqueLink to="/login" text="Faça login">
          Já tem uma conta?
        </OpaqueLink>
      </form>
    </>
  );
}

export default Register;
