import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';

import { Container, Info, Aside, TextCall } from './styles';

function Home() {
  const history = useHistory();
  return (
    <Container>
      <Info>
        <Aside>
          <span>1156+</span>
          <p>vagas na sua região</p>
        </Aside>
        <TextCall>
          <h3 class="title">Procurando uma vaga de emprego?</h3>
          <p class="text">Ela está aqui! Não perca tempo, baixe agora o nosso aplicativo e veja as oportunidades.</p>
          <Button>BAIXAR</Button>
        </TextCall>
      </Info>

      <Info>
        <Aside>
          <span>2237+</span>
          <p>profissionais disponíveis</p>
        </Aside>
        <TextCall>
          <h3 class="title">Está contratando?</h3>
          <p class="text">Cadastre suas vagas e encontre os profissionais mais qualificados para elas.</p>
          <Button onClick={() => history.push('/register')}>CADASTRAR</Button>
        </TextCall>
      </Info>
    </Container>
  );
}

export default Home;
