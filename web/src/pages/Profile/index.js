import React, { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';

import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';
import Button from '../../components/Button';

import api from '../../services/api';

import { Grid, Header, UserAbout, UserInfo, Info, Title, Content } from './styles';
import { useHistory } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState({
    image: 'https://images.unsplash.com/photo-1587994344997-f78753c899d5?w=600',
    name: 'Veio Company',
    area: 'Agência de moda',
    address: {
      city: 'Santos',
      state: 'SP',
      street: 'Av. Epitácio Pessoa, 466',
      neighborhood: 'Aparecida',
      postal_code: '11432-320',
    },
    cnpj: '00.000.000/0000-00',
    email: 'example@host.com',
    phone: '(13) 99726-1001',
    site: 'www.example.com.br',
    about: 'Lorem ipsum dolor sit amet consectetur adispicing elit',
  });

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/profiles');
        if (response.status === 200) setUser(response.data.user);
        if (response.status > 200) history.push('/login');
      } catch {
        // history.push('/login');
      }
    })();
  });

  return (
    <Grid>
      <Header>
        <CardBox>
          <CardHeader title="Perfil" sub="Visualize e edite os dados da sua empresa" />
        </CardBox>
      </Header>
      <UserInfo className="modal-shadow">
        <img src={user?.image} alt="User" />
        <Info>
          <Title>{user?.name}</Title>
          <Content>
            {user?.area
              ? `${user?.area} em ${user?.address.city} - ${user?.address.state}`
              : `${user?.address.city} - ${user?.address.state}`}
          </Content>
          <Content>CNPJ {user?.cnpj}</Content>
          <Title>Contato</Title>
          <Content>{user?.email}</Content>
          <Content>{user?.phone}</Content>
          <Content>{user?.site}</Content>
          <Button outlined text="Editar">
            <FiEdit size="16" />
          </Button>
        </Info>
      </UserInfo>
      <UserAbout className="modal-shadow">
        <Title>Sobre</Title>
        <Content>{user.about}</Content>
        <Title>Endereço</Title>
        <Content>{user.address.street}</Content>
        <Content>
          {user.address.neighborhood}, {user.address.city} - {user.address.state}
        </Content>
        <Content>{user.address.postal_code}</Content>
      </UserAbout>
    </Grid>
  );
}

export default Profile;
