import React, { useEffect } from 'react';
import { FiFile } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';

import * as UserActions from '../../store/modules/user/actions';
import api from '../../services/api';

import { Container, Image, Info, Content, Title } from './styles';

function Profile() {
  const { user, auth } = useSelector(state => ({ auth: state.auth, user: state.user }));
  const dispatch = useDispatch();

  useEffect(() => {
    api.get(`/users/${auth.id}`).then(response => {
      if (response.data.user) {
        dispatch(UserActions.setUser(response.data.user));
      }
    });
  });

  return (
    <Container>
      <Image src={`${process.env.REACT_APP_FILES_URL}${user.image_url}`} />
      <Info>
        <h3>{user.name}</h3>
        <Title>Sobre</Title>
        <Content>{user.about}</Content>
        <Title>Contato</Title>
        <Content>{user.email}</Content>
        <Content>{user.phone}</Content>
        <Title>Endereço</Title>
        <Content>
          {user.city} - {user.state}
        </Content>
        <Content>{user.neighborhood}</Content>
        <Content>{user.address}</Content>
        <Title>Currículo</Title>
        <Content>
          <FiFile />
          curriculo.pdf
        </Content>
      </Info>
    </Container>
  );
}

export default Profile;
