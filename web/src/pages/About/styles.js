import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  width: 100%;
  height: 500px;
  display: grid;
  grid-row: 50px auto;
  gap: 50px;
  align-content: center;
`;

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 48px;
  text-align: center;
  color: #fff;
  font-family: 'Quicksand', sans-serif;
`;

export const Card = styled.div``;

export const CardImage = styled.img`
  width: 100%;
  margin-bottom: -5px;
`;

export const CardTextContainer = styled.div`
  height: 215px;
  background-color: white;
  width: 260px;
  padding: 25px;
  text-align: center;
`;

export const CardText = styled.p`
  font-size: 16px;
  line-height: 1.32em;
  a {
    text-decoration: underline;
  }
`;

export const CardTitle = styled.h3`
  font-family: 'Quicksand', sans-serif;
  font-size: 20px;
  font-weight: 550;
  margin-bottom: 10px;
`;
