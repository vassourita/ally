import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as UserActions from '../../store/modules/user/actions';
import * as AuthActions from '../../store/modules/auth/actions';
import api from '../../services/api';

import logo from '../../assets/logo/icon@3x.png';

import Button from '../../components/Button';
import InputBlock from '../../components/InputBlock';
import OpaqueLink from '../../components/OpaqueLink';

import { Container, Header, Form, Footer } from './styles';

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      if (response.status === 200) {
        dispatch(UserActions.setUser(response.data.user));
        dispatch(AuthActions.login(response.data.token, response.data.user.id));
        return history.push('/jobs');
      }
      if (response.status >= 300 && response.status < 500) setError(response.data.error.field);
      if (response.status >= 500) toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch (_) {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
    dispatch(AuthActions.logoff());
  }

  return (
    <Container>
      <Header>
        <img src={logo} alt="ally" />
        <h1>Login</h1>
        <p>
          Seja bem vindo!
          <br />
          Faça login para acessar sua conta
        </p>
      </Header>
      <Form>
        <InputBlock
          label="Email"
          id="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          errors={[{ cond: error === 'email', text: 'Esse usuário não existe' }]}
        />
        <InputBlock
          label="Senha"
          id="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          errors={[{ cond: error === 'password', text: 'Senha inválida' }]}
          isPass
        />
      </Form>
      <Footer>
        <Button disabled={!email || !password} onClick={handleSubmit}>
          Entrar
        </Button>
        <OpaqueLink to="/register" text="Cadastre-se">
          Ainda não tem uma conta?
        </OpaqueLink>
      </Footer>
    </Container>
  );
}

export default Login;
