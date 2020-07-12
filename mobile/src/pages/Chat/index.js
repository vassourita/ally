import React, { useEffect, useState, useRef, Fragment } from 'react';
import { FiSend, FiChevronLeft } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import * as ChatActions from '../../store/modules/chats/actions';
import api from '../../services/api';

import { Header, MessageList, Messages, MessageInput, Container, Message, MessageData } from './styles';

function Chat() {
  const { id: chatId } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();
  const chat = useSelector(state => state.chats.find(c => c.id === Number(chatId)));
  const userId = useSelector(state => state.auth.id);

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
      <Header>
        <FiChevronLeft onClick={() => history.goBack(-1)} size={30} />
        <h3>
          {chat.employer.name} - {chat.job.name}
        </h3>
        <img src={`${process.env.REACT_APP_FILES_URL}${chat.employer.image_url}`} alt={chat.employer.name} />
      </Header>
      <MessageList>
        <Messages>
          {!chat.messages.length && <MessageData>Nenhuma mensagem ainda</MessageData>}
          {chat.messages.map((message, i, all) => (
            <Fragment key={message.id}>
              {getMessageDate(message, i, all)}
              <Message
                ref={i === all.length - 1 ? lastMessageRef : null}
                key={message.id}
                className={message.author_id === userId ? 'right' : 'left'}
              >
                {message.content}
                <span>{format(new Date(message.created_at), 'hh:mm')}</span>
              </Message>
            </Fragment>
          ))}
        </Messages>
        <MessageInput>
          <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Digite aqui" />
          <button onClick={() => handleSendMessage(chat.id)}>
            <FiSend />
          </button>
        </MessageInput>
      </MessageList>
    </Container>
  );
}

export default Chat;
