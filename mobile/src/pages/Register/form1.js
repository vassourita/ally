import React from 'react';

import InputBlock from '../../components/InputBlock';
import isValidEmail from '../../utils/validators/isValidEmail';

function Form1({ state, setState }) {
  return (
    <>
      <InputBlock
        label="Nome completo"
        id="name"
        value={state.name}
        onChange={e => setState({ ...state, name: e.target.value })}
      />
      <InputBlock
        label="Email"
        id="email"
        value={state.email}
        onChange={e => setState({ ...state, email: e.target.value })}
        errors={[{ cond: state.email && !isValidEmail(state.email), text: 'Email inválido' }]}
      />
      <InputBlock
        label="Senha"
        id="password"
        isPass
        value={state.password}
        onChange={e => setState({ ...state, password: e.target.value })}
        errors={[{ cond: state.password && state.password.length < 7, text: 'Senha muito curta' }]}
      />
      <InputBlock
        label="Confirmar senha"
        id="confirm"
        isPass
        value={state.confirm}
        onChange={e => setState({ ...state, confirm: e.target.value })}
        errors={[{ cond: state.confirm && !(state.confirm === state.password), text: 'As senhas não batem' }]}
      />
    </>
  );
}

export default Form1;
