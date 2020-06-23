import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as UserActions from '../../store/modules/user/actions';
import * as AuthActions from '../../store/modules/auth/actions';
import api from '../../services/api';

import logo from '../../assets/logo/icon@3x.png';

import Button from '../../components/Button';
import InputBlock from '../../components/InputBlock';
import OpaqueLink from '../../components/OpaqueLink';

import { Container, Header, LoginButton, Form, Footer } from './styles';

function Login() {
  const { user, auth } = useSelector(state => ({ user: state.user, auth: state.auth }));
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validSession, setValidSession] = useState(false);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (!(user.id === auth.id && auth.token)) {
        return setValidSession(false);
      }

      const response = await api.get(`/users/${user.id}`);

      if (!response.data.user) {
        return setValidSession(false);
      }

      if (response.data.user.id !== auth.id) {
        return setValidSession(false);
      }

      setValidSession(true);
    })();
  }, [user, auth]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      if (response.status === 200) {
        if (response.data.user.employer) {
          return toast.error(
            'Você está tentando se conectar com uma conta empresarial. Utilize nosso site para acessar sua conta.'
          );
        }
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

  async function handleKeepLogged(e) {
    e.preventDefault();
    return history.push('/jobs');
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
        {validSession && (
          <LoginButton onClick={handleKeepLogged}>
            <img src={`${process.env.REACT_APP_FILES_URL}${user.image_url}`} alt="user" />
            Continuar como {user.name}
          </LoginButton>
        )}
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
