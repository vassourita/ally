import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import ErrorBox from '../../components/ErrorBox';
import CardHeader from '../../components/CardHeader';
import InputBlock from '../../components/InputBlock';
import CheckBox from '../../components/CheckBox';
import Button from '../../components/Button';
import OpaqueLink from '../../components/OpaqueLink';

function Login() {
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

      if (response.status !== 200) {
        setError(response.data.error.field);
      } else {
        sessionStorage.setItem('ally_authorization', response.data.token);
        history.push('/profile');
      }
    } catch (error) {
      setError('server');
      setTimeout(() => setError(''), 4000);
    }
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
        <Button>Login</Button>
        <OpaqueLink to="/register" text="Cadastre-se">
          Não tem uma conta?
        </OpaqueLink>
      </form>
    </>
  );
}

export default Login;
