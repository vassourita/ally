import React, { useState } from 'react';

import CardHeader from '../../components/CardHeader';
import InputBlock from '../../components/InputBlock';
import CheckBox from '../../components/CheckBox';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

import { OpaqueLink } from './styles';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLogged, setKeepLogged] = useState(false);
  const [error, setError] = useState('');

  return (
    <>
      <CardHeader title="Login" sub="Faça login para acessar sua conta" />
      <form>
        <InputBlock label="Email" id="email" />
        <InputBlock label="Senha" id="password" type="password" isPass />
        <CheckBox onChange={e => setKeepLogged(Boolean(e.target.checked))} checked={keepLogged}>
          Manter-me conectado
        </CheckBox>
        <Button text={'Login'} />
        <OpaqueLink>
          Não tem uma conta?
          <Link to="/register/1">Cadastre-se</Link>
        </OpaqueLink>
      </form>
    </>
  );
}

export default Login;
