import React, { useMemo } from 'react';
import { FiCamera } from 'react-icons/fi';

import InputBlock from '../../components/InputBlock';

import { formatCpf, unformatCpf } from '../../utils/formatters/formatCpf';
import { formatPhone, unformatPhone } from '../../utils/formatters/formatPhone';
import isValidCpf from '../../utils/validators/isValidCpf';
import isValidPhone from '../../utils/validators/isValidPhone';

import { FileInputContainer, FileContainer, Title, Description } from './styles';

function Form2({ state, setState }) {
  const preview = useMemo(() => {
    return state.image ? URL.createObjectURL(state.image) : null;
  }, [state.image]);

  return (
    <>
      <InputBlock
        label="CPF"
        id="cpf"
        maxLength="14"
        value={formatCpf(state.cpf) || state.cpf}
        onChange={e => setState({ ...state, cpf: unformatCpf(e.target.value) })}
        errors={[{ cond: state.cpf && !isValidCpf(state.cpf), text: 'Cpf inválido' }]}
      />
      <InputBlock
        label="Telefone"
        id="phone"
        maxLength="14"
        value={formatPhone(state.phone) || state.phone}
        onChange={e => setState({ ...state, phone: unformatPhone(e.target.value) })}
        errors={[{ cond: state.phone && !isValidPhone(formatPhone(state.phone)), text: 'Telefone inválido' }]}
      />
      <FileContainer>
        <FileInputContainer id="image" style={{ backgroundImage: `url(${preview})` }} className={state.image ? 'has-image' : ''}>
          <input
            accept="image/x-png,image/jpeg,image/gif"
            type="file"
            onChange={e => {
              setState({ ...state, image: e.target.files[0] });
            }}
          />
          <FiCamera color="#aaa" />
        </FileInputContainer>
        <div>
          <Title>Imagem</Title>
          <Description>Insira uma foto sua. Você poderá mudá-la mais tarde.</Description>
        </div>
      </FileContainer>
    </>
  );
}

export default Form2;
