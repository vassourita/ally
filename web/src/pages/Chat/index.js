import React, { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';

import * as ChatActions from '../../store/modules/chats/actions';
import api from '../../services/api';

import {
  Nav,
  NavList,
  NavItem,
  LastMessage,
  Title,
  Badge,
  Header,
  MessageList,
  Messages,
  MessageInput,
  Container,
  Message,
} from './styles';

function Chat() {
  const { id: chatId } = useParams();

  const dispatch = useDispatch();
  const chats = useSelector(state => state.chats);
  const userId = useSelector(state => state.auth.id);

  const actualChat = chats.find(j => j.id === Number(chatId));
  const [message, setMessage] = useState();

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

  function getLastMessage(messages) {
    const last = [...messages].pop()?.content;
    if (!last) {
      return null;
    }
    if (last.length > 30) {
      return `${last.substring(0, 30)}...`;
    }
    return last;
  }

  async function handleSendMessage(chatId) {
    if (!message) {
      return;
    }
    try {
      const response = await api.post('/messages', {
        chatId,
        content: message,
      });

      if (response.data.message) {
        dispatch(ChatActions.addMessage(chatId, response.data.message));
        setMessage('');
      } else {
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      }
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
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
                  <LastMessage>{getLastMessage(chat.messages) || 'Nenhuma mensagem ainda'}</LastMessage>
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
      {actualChat?.id && (
        <>
          <MessageList>
            <Messages>
              {actualChat.messages.map(message => (
                <Message className={message.author_id === userId ? 'right' : 'left'}>
                  {message.content}
                  <span>{format(new Date(message.created_at), 'hh:mm')}</span>
                </Message>
              ))}
            </Messages>
            <MessageInput>
              <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Digite aqui" />
              <button onClick={() => handleSendMessage(actualChat.id)}>
                <FiSend />
              </button>
            </MessageInput>
          </MessageList>
        </>
      )}
    </Container>
  );
}

export default Chat;
