import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../providers/UserProvider';
import api from '../../services/api';
import Auth from '../../services/auth';

import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import ErrorBox from '../../components/ErrorBox';
import InputBlock from '../../components/InputBlock';
import OpaqueLink from '../../components/OpaqueLink';
import CardHeader from '../../components/CardHeader';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLogged, setKeepLogged] = useState(false);
  const [error, setError] = useState('');

  const { setUser } = useContext(UserContext);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      if (response.status === 200) {
        Auth.login(response.data.token, response.data.user.id);
        setUser(response.data.user);
        return history.push('/profile');
      }
      if (response.status >= 300 && response.status < 500) setError(response.data.error.field);
      if (response.status >= 500) setError('server');
    } catch (_) {
      setError('server');
    }
    setTimeout(() => setError(''), 4000);
  }

  return (
    <>
      {error === 'server' && <ErrorBox message="Servidor offline. Tente novamente mais tarde" />}

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
