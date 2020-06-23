import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as UserActions from '../../store/modules/user/actions';
import * as AuthActions from '../../store/modules/auth/actions';
import api from '../../services/api';

import Button from '../../components/Button';
import InputBlock from '../../components/InputBlock';
import OpaqueLink from '../../components/OpaqueLink';
import CardHeader from '../../components/CardHeader';

import { LoginButton } from './styles';

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

      const response = await api.get(`/employers/${user.id}`);

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

      setError('');

      if (response.status === 200) {
        if (!response.data.user.employer) {
          return toast.error(
            'Você está tentando se conectar com uma conta não-empresarial. Utilize nosso aplicativo para acessar usa conta.'
          );
        }
        dispatch(UserActions.setUser(response.data.user));
        dispatch(AuthActions.login(response.data.token, response.data.user.id));
        return history.push('/profile');
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
    return history.push('/profile');
  }

  return (
    <>
      <CardHeader title="Login" sub="Faça login para acessar sua conta" />
      <form onSubmit={handleSubmit}>
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
        <Button disabled={!email || !password}>Login</Button>
        <OpaqueLink to="/register" text="Cadastre-se">
          Não tem uma conta?
        </OpaqueLink>
      </form>
    </>
  );
}

export default Login;
