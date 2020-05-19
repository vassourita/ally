import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';
import Button from '../../components/Button';

import api from '../../services/api';

import { Grid, Header, UserAbout, UserImage, UserInfo, Info, Title, Content } from './styles';

function Profile() {
  const [user, setUser] = useState({});

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await api.get('/employers');

        if (status === 200) return setUser(data.user);
        history.push('/login');
      } catch {
        history.push('/login');
      }
    })();
    // eslint-disable-next-line
  }, []);

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
          <Button outlined text="Editar">
            <FiEdit size="16" />
          </Button>
        </Info>
      </UserInfo>
      <UserAbout className="modal-shadow">
        <Title>Sobre</Title>
        <Content>{user.about || 'Não há descrição ainda'}</Content>
        <Title>Endereço</Title>
        <Content>{user.street}</Content>
        <Content>
          {user.neighborhood}, {user.city} - {user.state}
        </Content>
        <Content>{user.postal_code}</Content>
      </UserAbout>
    </Grid>
  );
}

export default Profile;
