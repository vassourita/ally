import React, { useEffect } from 'react';
import axios from 'axios';

import InputBlock from '../../components/InputBlock';

import { DoubleInputContainer } from './styles';

function Form3({ state, setState, setLoading }) {
  useEffect(() => {
    handleCepChange();
    async function handleCepChange() {
      if (state.postalCode.length < 8 || state.postalCode.length > 8) {
        return setState({
          ...state,
          isValidCep: false,
          city: '',
          state: '',
          neighborhood: '',
          address: '',
          ibgeCode: '',
        });
      }

      setLoading(true);

      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${state.postalCode}/json/`);
        setState({
          ...state,
          isValidCep: !data.erro,
          city: data.localidade,
          state: data.uf,
          neighborhood: data.bairro,
          address: data.logradouro,
          ibgeCode: data.ibge,
        });
      } catch {
        setState({ ...state, isValidCep: false });
      }

      setLoading(false);
    }
  }, [state.postalCode]); // eslint-disable-line

  return (
    <>
      <InputBlock
        label="CEP"
        id="postal"
        maxLength="8"
        value={state.postalCode}
        onChange={e => setState({ ...state, postalCode: e.target.value })}
        errors={[{ cond: state.postalCode && !state.isValidCep, text: 'CEP inválido' }]}
      />
      <DoubleInputContainer>
        <InputBlock label="Cidade" id="city" readOnly value={state.city} />
        <InputBlock label="UF" id="state" readOnly value={state.state} />
      </DoubleInputContainer>
      <InputBlock label="Bairro/Distrito" id="neighborhood" readOnly value={state.neighborhood} />
      <InputBlock label="Endereço" id="address" readOnly value={state.address} />
    </>
  );
}

export default Form3;
