import React, { useMemo } from 'react';
import { FiCamera } from 'react-icons/fi';

import InputBlock from '../../components/InputBlock';
import isValidCnpj from '../../validators/isValidCnpj';
import isValidPhone from '../../validators/isValidPhone';

import { FileInputContainer, DoubleButtonContainer, Title, Description } from './styles';

function Form2({ state, setState }) {
  const preview = useMemo(() => {
    return state.image ? URL.createObjectURL(state.image) : null;
  }, [state.image]);

  return (
    <>
      <InputBlock
        label="CNPJ"
        id="cnpj"
        value={state.cnpj}
        onChange={e => setState({ ...state, cnpj: e.target.value })}
        errors={[{ cond: state.cnpj && !isValidCnpj(state.cnpj), text: 'CNPJ inválido' }]}
      />
      <InputBlock
        label="Telefone"
        id="phone"
        value={state.phone}
        onChange={e => setState({ ...state, phone: e.target.value })}
        errors={[{ cond: state.phone && !isValidPhone(state.phone), text: 'Telefone inválido' }]}
      />
      <DoubleButtonContainer>
        <FileInputContainer
          id="image"
          style={{ backgroundImage: `url(${preview})` }}
          className={state.image ? 'has-image' : ''}
        >
          <input
            type="file"
            onChange={e => {
              setState({ ...state, image: e.target.files[0] });
            }}
          />
          <FiCamera color="#aaa" />
        </FileInputContainer>
        <div>
          <Title>Imagem</Title>
          <Description>Insira uma imagem da sua empresa. Pode ser uma foto ou um logotipo.</Description>
        </div>
      </DoubleButtonContainer>
    </>
  );
}

export default Form2;
