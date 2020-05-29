import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import logo from '../../assets/logo/icon@3x.png';

import isValidEmail from '../../utils/validators/isValidEmail';
import isValidPhone from '../../utils/validators/isValidPhone';
import isValidCpf from '../../utils/validators/isValidCpf';

import Button from '../../components/Button';

import api from '../../services/api';

import {
  Container,
  Header,
  FormContainer,
  Footer,
  IndicatorContainer,
  Indicator,
  DoubleButtonContainer,
} from './styles';

import Form1 from './form1';
import Form2 from './form2';
import Form3 from './form3';
import { formatPhone } from '../../utils/formatters/formatPhone';

const Forms = [Form1, Form2, Form3];

function Register() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: '',
    name: '',
    password: '',
    confirm: '',
    cpf: '',
    phone: '',
    image: null,
    isValidCep: false,
    postalCode: '',
    city: '',
    state: '',
    neighborhood: '',
    address: '',
    ibgeCode: '',
  });

  const history = useHistory();

  const requirements = [
    state.name && state.email && state.password && state.password === state.confirm && isValidEmail(state.email),
    state.cpf && state.phone && state.image && isValidCpf(state.cpf) && isValidPhone(formatPhone(state.phone)),
    state.isValidCep,
  ];

  async function handleClick(e, returning = false) {
    e.preventDefault();

    if (returning) return setIndex(index - 1);

    if (!requirements[index]) {
      toast.error('Preencha corretamente todos os campos para prosseguir');
      return;
    }
    if (index < 2) return setIndex(index + 1);

    if (!requirements.every(r => r)) return;

    setLoading(true);
    const data = new FormData();

    Object.entries(state).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await api.post('/users', data);
      console.log(response.data.errors);

      switch (response.status) {
        case 201:
          toast.info('Sua conta foi criada com sucesso!');
          history.push('/login');
          break;
        default:
          toast.error('Ocorreu um erro inesperado em nosso servidor');
      }
    } catch (_) {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }

    setLoading(false);
  }

  const getCurrentForm = () =>
    Forms.map((Form, i) => index === i && <Form key={i} state={state} setState={setState} setLoading={setLoading} />);

  function getCurrentFormCommands() {
    //eslint-disable-next-line
    return Forms.map((_, i) => {
      if (index === i) {
        if (i === 0) {
          return (
            <DoubleButtonContainer key={i}>
              <Button onClick={() => history.push('/login')} outlined>
                Login
              </Button>
              <Button disabled={!requirements[index]} isLoading={loading} key={i} onClick={handleClick}>
                Próximo
              </Button>
            </DoubleButtonContainer>
          );
        }
        return (
          <DoubleButtonContainer key={i}>
            <Button onClick={e => handleClick(e, true)} outlined>
              Retornar
            </Button>
            <Button disabled={!requirements[index]} isLoading={loading} onClick={handleClick}>
              {i === 2 ? 'Finalizar' : 'Próximo'}
            </Button>
          </DoubleButtonContainer>
        );
      }
    });
  }

  return (
    <Container>
      <Header>
        <img src={logo} alt="ally" />
        <h1>Cadastro</h1>
        <p>
          Seja bem vindo!
          <br />
          Crie uma conta para ver as melhores vagas
        </p>
      </Header>
      <IndicatorContainer>
        {Forms.map((_, i) => (
          <Indicator key={i} active={i <= index} />
        ))}
      </IndicatorContainer>
      <FormContainer>{getCurrentForm()}</FormContainer>
      <Footer>{getCurrentFormCommands()}</Footer>
    </Container>
  );
}

export default Register;
