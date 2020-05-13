import React, { useEffect } from 'react';
import axios from 'axios';

import InputBlock from '../../components/InputBlock';

import { DoubleInputContainer } from './styles';

function Form3({ state, setState, setLoading }) {
  useEffect(() => {
    handleCepChange();
    async function handleCepChange() {
      if (state.location.postalCode.length < 8 || state.location.postalCode.length > 8) {
        return setState({
          ...state,
          location: {
            ...state.location,
            isValidCep: false,
            city: '',
            state: '',
            neighborhood: '',
            address: '',
            ibgeCode: '',
          },
        });
      }

      setLoading(true);

      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${state.location.postalCode}/json/`);
        setState({
          ...state,
          location: {
            ...state.location,
            isValidCep: !data.erro,
            city: data.localidade,
            state: data.uf,
            neighborhood: data.bairro,
            address: data.logradouro,
            ibgeCode: data.ibge,
          },
        });
      } catch {
        setState({ ...state, location: { ...state.location, isValidCep: false } });
      }

      setLoading(false);
    }
  }, [state.location.postalCode]); // eslint-disable-line

  return (
    <>
      <InputBlock
        label="CEP"
        id="postal"
        maxLength="8"
        value={state.location.postalCode}
        onChange={e => setState({ ...state, location: { ...state.location, postalCode: e.target.value } })}
        errors={[{ cond: state.location.postalCode && !state.location.isValidCep, text: 'CEP inválido' }]}
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
