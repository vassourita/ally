import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';

import { Container } from './styles';

function CreateVacancy() {
  const history = useHistory();

  const BoxTitle = () => (
    <>
      <FiArrowLeft onClick={() => history.go(-1)} />
      {'Criar nova vaga'}
    </>
  );

  return (
    <Container>
      <CardBox>
        <CardHeader title={BoxTitle()} sub="Cadastre uma nova vaga e seus requisitos" />
      </CardBox>
    </Container>
  );
}

export default CreateVacancy;
