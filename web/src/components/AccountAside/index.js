import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiTwitter, FiGithub, FiInstagram } from 'react-icons/fi';

import { Container, ReturnButton, Title, Paragraph, SocialIcons } from './styles';

function AccountAside() {
  return (
    <Container className="modal-shadow">
      <ReturnButton>
        <Link to="/">
          <FiArrowLeft />
          Retornar ao menu
        </Link>
      </ReturnButton>
      <div>
        <Title>Deixe-nos procurar por você</Title>
        <Paragraph>
          Cadastre suas vagas e nós te conectaremos aos profissionais mais qualificados para elas em tempo real
        </Paragraph>
      </div>
      <SocialIcons>
        <a href="twitter.com" target="_blank" rel="noopener noreferrer">
          <FiTwitter size="24" />
        </a>
        <a href="https://github.com/vassourita/ally" target="_blank" rel="noopener noreferrer">
          <FiGithub size="24" />
        </a>
        <a href="instagram.com" target="_blank" rel="noopener noreferrer">
          <FiInstagram size="24" />
        </a>
      </SocialIcons>
    </Container>
  );
}

export default AccountAside;
