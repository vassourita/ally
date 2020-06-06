import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiThumbsUp } from 'react-icons/fi';

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
          <Title>{user.name}</Title>
          <Content>
            {user.city} - {user.state}
          </Content>

          <Title>Contato</Title>
          <Content>{user.email}</Content>
          <Content>{user.phone}</Content>
        </Info>
      </UserInfo>
      <UserAbout className="modal-shadow">
        <Title>Sobre</Title>
        <Content>{user.about || 'Não há descrição ainda'}</Content>
        <Title>Avaliação geral</Title>
        <Content>
          <FiThumbsUp /> {user.likes || 0}
        </Content>
      </UserAbout>
    </Grid>
  );
}

export default User;
