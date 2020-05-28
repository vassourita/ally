import React, { useMemo } from 'react';
import { FiCamera } from 'react-icons/fi';

import InputBlock from '../../components/InputBlock';

import { formatCpf, unformatCpf } from '../../utils/formatters/formatCpf';
import { formatPhone, unformatPhone } from '../../utils/formatters/formatPhone';
import isValidCnpj from '../../utils/validators/isValidCpf';
import isValidPhone from '../../utils/validators/isValidPhone';

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
        maxLength="18"
        value={formatCpf(state.cnpj) || state.cnpj}
        onChange={e => setState({ ...state, cnpj: unformatCpf(e.target.value) })}
        errors={[{ cond: state.cnpj && !isValidCnpj(state.cnpj), text: 'CNPJ inválido' }]}
      />
      <InputBlock
        label="Telefone"
        id="phone"
        maxLength="14"
        value={formatPhone(state.phone) || state.phone}
        onChange={e => setState({ ...state, phone: unformatPhone(e.target.value) })}
        errors={[{ cond: state.phone && !isValidPhone(formatPhone(state.phone)), text: 'Telefone inválido' }]}
      />
      <DoubleButtonContainer>
        <FileInputContainer id="image" style={{ backgroundImage: `url(${preview})` }} className={state.image ? 'has-image' : ''}>
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
