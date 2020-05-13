import React from 'react';

import InputBlock from '../../components/InputBlock';

function Form2({ state, setState }) {
  return (
    <>
      <InputBlock
        label="CNPJ"
        id="cnpj"
        value={state.cnpj}
        onChange={e => setState({ ...state, cnpj: e.target.value })}
      />
      <InputBlock
        label="Telefone"
        id="phone"
        value={state.phone}
        onChange={e => setState({ ...state, phone: e.target.value })}
      />
      <InputBlock
        label="Senha"
        id="password"
        value={state.password}
        onChange={e => setState({ ...state, password: e.target.value })}
      />
      <InputBlock
        label="Senha"
        id="password"
        value={state.password}
        onChange={e => setState({ ...state, password: e.target.value })}
      />
    </>
  );
}

export default Form2;
