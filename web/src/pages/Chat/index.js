import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';

import * as ChatActions from '../../store/modules/chats/actions';
import api from '../../services/api';

import { Nav, NavList, NavItem, Available, Title, Badge, Header, MessageList, Container } from './styles';

function Chat() {
  const { id: chatId } = useParams();

  const dispatch = useDispatch();
  const chats = useSelector(state => state.chats);

  const actualChat = chats.find(j => j.id === Number(chatId));

  useEffect(() => {
    api
      .get('/messages')
      .then(response => {
        if (response.data.chats) {
          dispatch(ChatActions.setChats(response.data.chats));
        } else {
          dispatch(ChatActions.setChats([]));
          toast.error('Ocorreu um erro inesperado em nosso servidor');
        }
      })
      .catch(() => toast.error('Ocorreu um erro inesperado em nosso servidor'));
  }, [dispatch]);

  function getBadge(messages) {
    return 0;
  }

  return (
    <Container>
      <Nav className="modal-shadow">
        <CardHeader title="Suas conversas" sub="Envie e visualize mensagens sobre suas vagas" />
        <NavList>
          {chats.map(chat => (
            <NavItem key={chat.id}>
              <NavLink activeClassName="nav-link-active" to={`/chat/${chat.id}`}>
                <div>
                  <Title>{chat.user.name}</Title>
                  <Available>{[...chat.messages].pop()?.content || 'Nenhuma mensagem ainda'}</Available>
                </div>
                <Badge>{getBadge(chat.messages)}</Badge>
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </Nav>
      <Header>
        <CardBox>
          {!actualChat?.id ? (
            <CardHeader title="Mensagens" sub="Selecione uma conversa para visualizar suas mensagens" />
          ) : (
            <header>
              <img
                src={`${process.env.REACT_APP_FILES_URL}${actualChat?.user.image_url}`}
                alt={actualChat?.user.name}
              />
              <h2>{actualChat?.user.name}</h2>
            </header>
          )}
        </CardBox>
      </Header>
      <MessageList></MessageList>
    </Container>
  );
}

export default Chat;
