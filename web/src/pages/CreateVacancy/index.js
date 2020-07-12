import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiArrowLeft, FiPlus, FiTrash } from 'react-icons/fi';
import { toast } from 'react-toastify';

import Button from '../../components/Button';
import CardBox from '../../components/CardBox';
import CheckBox from '../../components/CheckBox';
import CardHeader from '../../components/CardHeader';
import InputBlock from '../../components/InputBlock';
import SelectBlock from '../../components/SelectBlock';
import TextAreaBlock from '../../components/TextAreaBlock';

import * as JobActions from '../../store/modules/jobs/actions';
import api from '../../services/api';

import { Container, Grid, Header, Info, Knowledges, QuadraInput, AddButton } from './styles';

const options = [
  { label: 'Especialização', value: 1 },
  { label: 'Graduação', value: 2 },
  { label: 'Certificação', value: 3 },
  { label: 'Curso', value: 4 },
  { label: 'Experiência', value: 5 },
  { label: 'Conhecimento', value: 6 },
];

const localOptions = [
  { label: 'Qualquer um', value: 'any' },
  { label: 'Meu estado', value: 'state' },
  { label: 'Minha cidade', value: 'city' },
  { label: 'Minha região', value: 'region' },
];

function CreateVacancy() {
  const [name, setName] = useState('');
  const [local, setLocal] = useState('');
  const [amount, setAmount] = useState(0);
  const [knowledges, setKnowledges] = useState([]);
  const [description, setDescription] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const BoxTitle = () => (
    <>
      <FiArrowLeft onClick={() => history.go(-1)} />
      {'Criar nova vaga'}
    </>
  );

  const handleCreateJob = async () => {
    try {
      const response = await api.post('/jobs', {
        name,
        description,
        amount,
        knowledges,
        local,
      });
      if (response.status !== 201) {
        return toast.error('Ocorreu um erro inesperado em nosso servidor');
      }
      dispatch(JobActions.addJob(response.data.job));
      setName('');
      setLocal(null);
      setAmount(0);
      setKnowledges([]);
      setDescription('');
      toast.info('Vaga criada com sucesso!');
      history.push(`/vacancies/${response.data.job.id}`);
    } catch (_) {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
  };

  const handleSetKnowledge = (value, index, field) => {
    const clone = [...knowledges];
    clone[index][field] = value;
    setKnowledges(clone);
  };

  return (
    <Container>
      <Grid>
        <Header>
          <CardBox>
            <CardHeader title={BoxTitle()} sub="Cadastre uma nova vaga e seus requisitos" />
          </CardBox>
        </Header>
        <Info>
          <CardHeader title="Detalhes" sub="Defina os detalhes de sua vaga" />
          <InputBlock value={name} onChange={e => setName(e.target.value)} label="Nome da vaga" />
          <InputBlock
            value={amount}
            onChange={e => setAmount(e.target.value)}
            label="Quantidade de vagas"
            type="number"
            min="1"
          />
          <TextAreaBlock value={description} onChange={e => setDescription(e.target.value)} label="Descrição" />
          <SelectBlock onChange={({ label, value }) => setLocal(value)} label="Local" options={localOptions} />
          <Button disabled={!name || !description || !amount || !local} onClick={handleCreateJob}>
            Criar
          </Button>
        </Info>
        <Knowledges>
          <CardHeader title="Requisitos" sub="Adicione requisitos e diferenciais" />
          {knowledges.map((knowledge, i) => (
            <QuadraInput>
              <SelectBlock
                onChange={({ label, value }) => handleSetKnowledge(value, i, 'typeId')}
                label="Tipo"
                options={options}
              />
              <InputBlock
                value={knowledge.name}
                onChange={e => handleSetKnowledge(e.target.value, i, 'name')}
                label="Nome"
              />
              <CheckBox
                checked={knowledge.differential}
                onChange={e => handleSetKnowledge(e.target.checked, i, 'differential')}
              >
                Diferencial
              </CheckBox>
              <Button
                style={{ borderColor: 'var(--ally-red' }}
                outlined
                onClick={() => setKnowledges(knowledges.filter((_, index) => index !== i))}
              >
                <FiTrash color="var(--ally-red)" />
              </Button>
            </QuadraInput>
          ))}
          <AddButton>
            <Button
              outlined
              disabled={
                knowledges.length &&
                (!knowledges[knowledges.length - 1].name || !knowledges[knowledges.length - 1].typeId)
              }
              onClick={() => setKnowledges([...knowledges, { differential: false }])}
            >
              <FiPlus />
            </Button>
          </AddButton>
        </Knowledges>
      </Grid>
    </Container>
  );
}

export default CreateVacancy;
