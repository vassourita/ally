import React from 'react';
import { Link } from 'react-router-dom';

import img1 from './imgAbout1.png';
import img2 from './imgAbout2.png';
import img3 from './imgAbout3.png';

import { Container, Title, CardContainer, Card, CardImage, CardTextContainer, CardText, CardTitle } from './styles';

function About() {
  return (
    <Container>
      <Title>Sobre Nós</Title>
      <CardContainer>
        <Card>
          <CardImage src={img1} />
          <CardTextContainer>
            <CardTitle>O que é ally?</CardTitle>
            <CardText>
              A ally é um projeto 99% brasileiro, desenvolvido por estudantes do curso de informática para internet da
              Etec Aristóteles Ferreira localizada em Santos - SP.
            </CardText>
          </CardTextContainer>
        </Card>
        <Card>
          <CardImage src={img2} />
          <CardTextContainer>
            <CardTitle>Como funciona?</CardTitle>
            <CardText>
              Aqui somos nós que procuramos por você, trazendo os resultados na palma da sua mão em tempo real. Basta se
              cadastrar e visualizar as oportunidades.
            </CardText>
          </CardTextContainer>
        </Card>
        <Card>
          <CardImage src={img3} />
          <CardTextContainer>
            <CardTitle>Como usar?</CardTitle>
            <CardText>
              Empresas podem criar uma conta clicando <Link to="/register">aqui</Link>, depois cadastrar suas vagas.
              Profissionais podem baixar nosso aplicativo aqui para criar uma conta.
            </CardText>
          </CardTextContainer>
        </Card>
      </CardContainer>
    </Container>
  );
}

export default About;
