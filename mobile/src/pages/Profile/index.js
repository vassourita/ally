import React, { useEffect, useState } from 'react';
import { FiFile, FiCheckSquare, FiXSquare, FiPlus, FiTrash } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

import Button from '../../components/Button';
import InputBlock from '../../components/InputBlock';
import SelectBlock from '../../components/SelectBlock';
import { toast } from 'react-toastify';

import { formatPhone } from '../../utils/formatters/formatPhone';

import * as UserActions from '../../store/modules/user/actions';
import api from '../../services/api';

import { Container, ModalContainer, Image, Info, Content, Title, Knowledges, DoubleInput } from './styles';

const options = [
  { label: 'Especialização', value: 1 },
  { label: 'Graduação', value: 2 },
  { label: 'Certificação', value: 3 },
  { label: 'Curso', value: 4 },
  { label: 'Experiência', value: 5 },
  { label: 'Conhecimento', value: 6 },
];

function Profile() {
  const { user, auth } = useSelector(state => ({ auth: state.auth, user: state.user }));
  const dispatch = useDispatch();

  const [excludeMode, setExcludeMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    typeId: 6,
    name: '',
  });

  useEffect(() => {
    api.get(`/users/${auth.id}`).then(response => {
      if (response.data.user) {
        dispatch(UserActions.setUser(response.data.user));
      }
    });
  }, [auth.id, dispatch]);

  const handleDeleteKnowledge = async id => {
    try {
      const { data } = await api.put('/users', {
        removeKnowledge: id,
      });

      if (data.updated.removeKnowledge) {
        return dispatch(UserActions.removeKnowledge(id));
      }

      toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
  };

  const handleAddKnowledge = async () => {
    try {
      const { data } = await api.put('/users', {
        addKnowledge: [
          {
            typeId: editData.typeId,
            name: editData.name,
          },
        ],
      });

      if (data.updated.addKnowledge.length) {
        setModalOpen(false);
        return dispatch(UserActions.setUser(data.user));
      }

      toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
    setModalOpen(false);
  };

  return (
    <Container>
      <Modal className="modal-refactor" overlayClassName="overlay-refactor" isOpen={modalOpen}>
        <ModalContainer>
          <Title>Adicionar conhecimento</Title>
          <SelectBlock
            onChange={({ label, value }) => setEditData({ ...editData, typeId: value })}
            label="Tipo"
            options={options}
          ></SelectBlock>
          <InputBlock
            label="Nome"
            id="knowledge-name"
            value={editData.name}
            onChange={e => setEditData({ ...editData, name: e.target.value })}
          ></InputBlock>
          <DoubleInput>
            <Button
              disabled={!editData.name || !editData.typeId}
              style={{ borderColor: 'var(--ally-blue)' }}
              outlined
              onClick={handleAddKnowledge}
            >
              <FiCheckSquare color="var(--ally-blue)" />
            </Button>
            <Button
              style={{ borderColor: 'var(--ally-red)' }}
              outlined
              onClick={() => {
                setEditData({ typeId: 0, name: '' });
                setModalOpen(false);
              }}
            >
              <FiXSquare color="var(--ally-red)" />
            </Button>
          </DoubleInput>
        </ModalContainer>
      </Modal>

      <Image src={`${process.env.REACT_APP_FILES_URL}${user.image_url}`} />

      <Info>
        <h3>{user.name}</h3>
        <Title>Sobre</Title>
        <Content>{user.about}</Content>
        <Title>Contato</Title>
        <Content>{user.email}</Content>
        <Content>{formatPhone(user.phone.toString())}</Content>
        <Title>Endereço</Title>
        <Content>
          {user.city} - {user.state}
        </Content>
        <Content>{user.neighborhood}</Content>
        <Content>{user.address}</Content>
        <Title>Currículo</Title>
        <Content>
          <FiFile /> curriculo.pdf
        </Content>
      </Info>
      <Knowledges>
        <div>
          <Title>Conhecimentos</Title>
          <div>
            <FiTrash
              color={excludeMode ? 'var(--ally-red)' : 'unset'}
              size={20}
              onClick={() => setExcludeMode(!excludeMode)}
            />
            <FiPlus color={modalOpen ? 'var(--ally-red)' : 'unset'} size={20} onClick={() => setModalOpen(true)} />
          </div>
        </div>
        {user.knowledges?.map(k => (
          <Content>
            {k.type.name} - {k.name}
            {excludeMode && <FiTrash onClick={() => handleDeleteKnowledge(k.id)} />}
          </Content>
        ))}
      </Knowledges>
    </Container>
  );
}

export default Profile;
