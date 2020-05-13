import React, { useState } from 'react';

import InputBlock from '../../components/InputBlock';

import { DoubleInputContainer } from './styles';

function Form3({ state, setState }) {
  return (
    <>
      <InputBlock
        label="CEP"
        id="postal"
        value={state.location.postalCode}
        onChange={e => setState({ ...state, location: { ...state.location, postalCode: e.target.value } })}
        errors={[{ cond: state.location.cep && !state.location.isValid, text: 'CEP inválido' }]}
      />
      <DoubleInputContainer>
        <InputBlock label="Cidade" id="city" readOnly value={state.location.city} />
        <InputBlock label="UF" id="state" readOnly value={state.location.state} />
      </DoubleInputContainer>
      <InputBlock label="Bairro/Distrito" id="neighborhood" readOnly value={state.location.neighborhood} />
      <InputBlock label="Endereço" id="address" readOnly value={state.location.address} />
    </>
  );
}

export default Form3;
