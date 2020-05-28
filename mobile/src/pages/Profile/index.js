import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiEdit, FiThumbsUp, FiCheckSquare, FiXSquare } from 'react-icons/fi';
import { toast } from 'react-toastify';

import * as UserActions from '../../store/modules/user/actions';
import Button from '../../components/Button';
import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';

import api from '../../services/api';

import { Grid, Header, UserAbout, UserImage, UserInfo, Info, Title, Content, EditInput, DoubleInput } from './styles';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    about: '',
  });

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const { data } = await api.put('/employers', editData);
      if (!data.updated.about) {
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      }
      dispatch(UserActions.updateUser({ about: editData.about }));
    } catch (error) {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
    setEditMode(!editMode);
  }

  return (
    <Grid>
      <Header>
        <CardBox>
          <CardHeader title="Perfil" sub="Visualize e edite os dados da sua empresa" />
        </CardBox>
      </Header>
      <UserInfo className="modal-shadow">
        <UserImage
          style={{
            backgroundImage: `url(${user.image_url ? `${process.env.REACT_APP_FILES_URL}${user.image_url}` : null})`,
          }}
        />
        <Info>
          <div>
            <Title>{user.name}</Title>
            <Content>
              {user.city} - {user.state}
            </Content>
            <Content>CNPJ {user.fiscal_code}</Content>
          </div>
          <div>
            <Title>Contato</Title>
            <Content>{user.email}</Content>
            <Content>{user.phone}</Content>
          </div>
          {editMode ? (
            <DoubleInput>
              <Button style={{ borderColor: 'var(--ally-blue)' }} outlined onClick={handleUpdate}>
                <FiCheckSquare color="var(--ally-blue)" />
              </Button>
              <Button style={{ borderColor: 'var(--ally-red)' }} outlined onClick={() => setEditMode(!editMode)}>
                <FiXSquare color="var(--ally-red)" />
              </Button>
            </DoubleInput>
          ) : (
            <Button outlined text="Editar" onClick={() => setEditMode(!editMode)}>
              <FiEdit size="16" />
            </Button>
          )}
        </Info>
      </UserInfo>
      <UserAbout className="modal-shadow">
        <Title>Sobre</Title>
        {editMode ? (
          <EditInput
            placeholder="Adicione uma descrição"
            value={editData.about || user.about}
            onChange={e => setEditData({ ...editData, about: e.target.value })}
          />
        ) : (
          <Content>{user.about || 'Não há descrição ainda'}</Content>
        )}

        <Title>Endereço</Title>
        <Content>{user.address}</Content>
        <Content>
          {user.neighborhood}, {user.city} - {user.state}
        </Content>
        <Content>CEP {user.postal_code}</Content>
        <Title>Avaliação geral</Title>
        <Content>
          <FiThumbsUp /> {user.likes || 0}
        </Content>
      </UserAbout>
    </Grid>
  );
}

export default Profile;
