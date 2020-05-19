import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';

import api from '../../services/api';

import { Grid, Header, UserAbout, UserImage, UserInfo, Info, Title, Content } from './styles';

function User() {
  const [user, setUser] = useState({});

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await api.get(`/users/${id}`);

        if (status === 200) return setUser(data.user);
      } catch {}
    })();
  }, [id]);

  const BoxTitle = () => (
    <>
      <FiArrowLeft onClick={() => history.go(-1)} />
      {'Perfil'}
    </>
  );

  return (
    <Grid>
      <Header>
        <CardBox>
          <CardHeader title={BoxTitle()} sub={`Visualize os dados e competências de ${user.name}`} />
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
            <Content>CPF {user.fiscal_code}</Content>
          </div>
          <div>
            <Title>Contato</Title>
            <Content>{user.email}</Content>
            <Content>{user.phone}</Content>
          </div>
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

export default User;
