import React, { useState } from 'react';

import Button from '../../components/Button';
import TextAreaBlock from '../../components/TextAreaBlock';
import InputBlock from '../../components/InputBlock';
import CardHeader from '../../components/CardHeader';

import { Container, Form, InputContainer } from './styles';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Container>
      <Form>
        <CardHeader title="Contato" sub="Envie-nos uma mensagem! Queremos saber sua opinião e responderemos assim que possível" />
        <InputContainer>
          <InputBlock value={name} onChange={e => setName(e.target.value)} label="Seu nome" />
          <InputBlock value={email} onChange={e => setEmail(e.target.value)} label="Email" />
          <InputBlock value={subject} onChange={e => setSubject(e.target.value)} label="Assunto" />
        </InputContainer>
        <InputContainer>
          <TextAreaBlock value={message} onChange={e => setMessage(e.target.value)} label="Mensagem" />
          <Button>Enviar</Button>
        </InputContainer>
      </Form>
    </Container>
  );
}

export default Contact;
