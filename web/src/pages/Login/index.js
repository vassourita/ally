import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as UserActions from '../../store/modules/user/actions';
import * as AuthActions from '../../store/modules/auth/actions';
import api from '../../services/api';

import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import InputBlock from '../../components/InputBlock';
import OpaqueLink from '../../components/OpaqueLink';
import CardHeader from '../../components/CardHeader';

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLogged, setKeepLogged] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      setError('');

      if (response.status === 200) {
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

  return (
    <>
      <CardHeader title="Login" sub="Faça login para acessar sua conta" />
      <form onSubmit={handleSubmit}>
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
        <CheckBox onChange={e => setKeepLogged(Boolean(e.target.checked))} checked={keepLogged}>
          Manter-me conectado
        </CheckBox>
        <Button disabled={!email || !password}>Login</Button>
        <OpaqueLink to="/register" text="Cadastre-se">
          Não tem uma conta?
        </OpaqueLink>
      </form>
    </>
  );
}

export default Login;
