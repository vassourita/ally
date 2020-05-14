import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import isValidEmail from '../../utils/validators/isValidEmail';
import isValidPhone from '../../utils/validators/isValidPhone';
import isValidCnpj from '../../utils/validators/isValidCnpj';

import CardHeader from '../../components/CardHeader';
import Button from '../../components/Button';
import OpaqueLink from '../../components/OpaqueLink';
import ErrorBox from '../../components/ErrorBox';

import api from '../../services/api';

import { IndicatorContainer, Indicator, DoubleButtonContainer } from './styles';

import Form1 from './form1';
import Form2 from './form2';
import Form3 from './form3';
import { formatPhone } from '../../utils/formatters/formatPhone';

const Forms = [Form1, Form2, Form3];

function Register() {
  const [index, setIndex] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: '',
    name: '',
    password: '',
    confirm: '',
    cnpj: '',
    phone: '',
    image: null,
    location: {
      isValidCep: false,
      postalCode: '',
      city: '',
      state: '',
      neighborhood: '',
      address: '',
      ibgeCode: '',
    },
  });

  const history = useHistory();

  const requirements = [
    state.name && state.email && state.password && state.password === state.confirm && isValidEmail(state.email),
    state.cnpj && state.phone && state.image && isValidCnpj(state.cnpj) && isValidPhone(formatPhone(state.phone)),
    state.location.isValidCep,
  ];

  async function handleClick(e, returning = false) {
    e.preventDefault();

    if (returning) return setIndex(index - 1);

    if (!requirements[index]) {
      setError('inputs');
      return setTimeout(() => setError(''), 4000);
    }
    if (index < 2) return setIndex(index + 1);

    if (!requirements.every(r => r)) return;

    setLoading(true);
    const data = new FormData();

    Object.entries(state).forEach(([key, value]) => {
      data.append(key, key === 'location' ? JSON.stringify(value) : value);
    });

    try {
      const response = await api.post('/employers', data);
      console.log(response.data.errors);

      switch (response.status) {
        case 201:
          history.push('/login');
          break;
        default:
          setError('server');
          setTimeout(() => setError(''), 4000);
      }
    } catch (_) {
      setError('server');
      setTimeout(() => setError(''), 4000);
    }

    setLoading(false);
  }

  const getCurrentForm = () =>
    Forms.map((Form, i) => index === i && <Form key={i} state={state} setState={setState} setLoading={setLoading} />);

  function getCurrentFormCommands() {
    //eslint-disable-next-line
    return Forms.map((_, i) => {
      if (index === i) {
        if (i === 0 && i === index) {
          return (
            <Button isLoading={loading} key={i} onClick={handleClick}>
              Próximo
            </Button>
          );
        }
        return (
          <DoubleButtonContainer key={i}>
            <Button onClick={e => handleClick(e, true)} outlined>
              Retornar
            </Button>
            <Button isLoading={loading} onClick={handleClick}>
              {i === 2 ? 'Finalizar' : 'Próximo'}
            </Button>
          </DoubleButtonContainer>
        );
      }
    });
  }

  return (
    <>
      {error === 'server' && <ErrorBox message="Servidor offline. Tente novamente mais tarde" />}
      {error === 'inputs' && <ErrorBox message="Preencha corretamente todos os campos para prosseguir" />}

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
