import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import * as ChatActions from '../../store/modules/chats/actions';
import api from '../../services/api';

import { NavItem, LastMessage, Title, Container, NoMessages } from './styles';

function Chat() {
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chats);

  const lastMessageRef = useRef();

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

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView(true);
    }
  });

  function getLastMessage(messages) {
    const last = [...messages].pop()?.content;
    if (!last) {
      return null;
    }
    if (last.length > 30) {
      return `${last.substring(0, 35)}...`;
    }
    return last;
  }

  return (
    <Container>
      {!chats.length && <NoMessages>Nenhuma conversa iniciada</NoMessages>}
      <nav>
        <ul>
          {chats.map(chat => (
            <NavItem key={chat.id}>
              <NavLink activeClassName="nav-link-active" to={`/chat/${chat.id}`}>
                <img src={`${process.env.REACT_APP_FILES_URL}${chat.employer.image_url}`} alt={chat.employer.name} />
                <div>
                  <Title>
                    {chat.employer.name} - {chat.job.name}
                  </Title>
                  <LastMessage>{getLastMessage(chat.messages) || 'Nenhuma mensagem ainda'}</LastMessage>
                </div>
              </NavLink>
            </NavItem>
          ))}
        </ul>
      </nav>
    </Container>
  );
}

export default Chat;
