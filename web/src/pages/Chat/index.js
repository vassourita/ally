import React, { useEffect, useState, useRef } from 'react';
import { FiSend } from 'react-icons/fi';
import { NavLink, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
  Header,
  MessageList,
  Messages,
  MessageInput,
  Container,
  Message,
  MessageData,
} from './styles';

function Chat() {
  const { id: chatId } = useParams();

  const dispatch = useDispatch();
  const chats = useSelector(state => state.chats);
  const userId = useSelector(state => state.auth.id);

  const actualChat = chats.find(j => j.id === Number(chatId));
  const [message, setMessage] = useState();

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

  const onEnterPress = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      handleSendMessage(actualChat.id);
    }
  };

  function getMessageDate(message, index, messages) {
    const date = format(new Date(message.created_at), "dd' de 'MMMM", { locale: ptBR });
    if (index === 0) {
      return <MessageData>{date}</MessageData>;
    }
    const anteriorDate = format(new Date(messages[index - 1].created_at), "dd' de 'MMMM", { locale: ptBR });
    if (date !== anteriorDate) {
      return <MessageData>{date}</MessageData>;
    }
    return null;
  }

  return (
    <Container>
      <Nav className="modal-shadow">
        <CardHeader title="Suas conversas" sub="Envie e visualize mensagens sobre suas vagas" />
        <NavList>
          {chats.map(chat => (
            <NavItem key={chat.id}>
              <NavLink activeClassName="nav-link-active" to={`/chat/${chat.id}`}>
                <img src={`${process.env.REACT_APP_FILES_URL}${chat.user.image_url}`} alt={chat.user.name} />
                <div>
                  <Title>{chat.user.name}</Title>
                  <LastMessage>{getLastMessage(chat.messages) || 'Nenhuma mensagem ainda'}</LastMessage>
                </div>
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
            <Link to={`../users/${actualChat?.user.id}`}>
              <header>
                <img
                  src={`${process.env.REACT_APP_FILES_URL}${actualChat?.user.image_url}`}
                  alt={actualChat?.user.name}
                />
                <h2>{actualChat?.user.name}</h2>
              </header>
            </Link>
          )}
        </CardBox>
      </Header>
      {actualChat?.id && (
        <MessageList>
          <Messages>
            {!actualChat.messages.length && <MessageData>Nenhuma mensagem ainda</MessageData>}
            {actualChat.messages.map((message, i, all) => (
              <>
                {getMessageDate(message, i, all)}
                <Message
                  ref={i === all.length - 1 ? lastMessageRef : null}
                  key={message.id}
                  className={message.author_id === userId ? 'right' : 'left'}
                >
                  {message.content}
                  <span>{format(new Date(message.created_at), 'hh:mm')}</span>
                </Message>
              </>
            ))}
          </Messages>
          <MessageInput className="modal-shadow">
            <input
              onKeyDown={onEnterPress}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Digite aqui"
            />
            <button onClick={() => handleSendMessage(actualChat.id)}>
              <FiSend />
            </button>
          </MessageInput>
        </MessageList>
      )}
    </Container>
  );
}

export default Chat;
