import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiFile } from 'react-icons/fi';
import { toast } from 'react-toastify';

import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';

import { formatPhone } from '../../utils/formatters/formatPhone';

import api from '../../services/api';

import { Grid, Header, UserAbout, UserImage, UserInfo, Info, Title, Content } from './styles';

function User() {
  const [user, setUser] = useState({});

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/users/${id}`);

        if (response.data.user) {
          return setUser(response.data.user);
        }

        toast.error('Ocorreu um erro inesperado em nosso servidor');
      } catch {
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      }
    }
    fetchUser();
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
          <Content>{user.phone && formatPhone(user.phone?.toString())}</Content>
        </Info>
      </UserInfo>
      <UserAbout className="modal-shadow">
        <Title>Sobre</Title>
        <Content>{user.about || 'Não há descrição ainda'}</Content>
        <Title>Currículo</Title>
        <Content>
          <FiFile />
          {user.curriculum ? (
            <a
              style={{ color: '#888' }}
              href={`${process.env.REACT_APP_FILES_URL}${user.curriculum}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver currículo
            </a>
          ) : (
            'Nenhum currículo disponível'
          )}
        </Content>
      </UserAbout>
    </Grid>
  );
}

export default User;
