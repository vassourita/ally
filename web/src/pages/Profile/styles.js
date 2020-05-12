import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-rows: auto 300px;
  grid-template-columns: 600px 1fr;
  grid-template-areas: 'head head' 'info about';
  grid-gap: 40px;

  padding: 40px;
`;

export const Header = styled.div`
  grid-area: head;
`;

export const UserInfo = styled.div`
  background-color: #fff;
  grid-area: info;
  display: flex;
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  padding: 20px;
  width: 100%;
  button {
    margin-top: 35px;
  }
`;

export const UserAbout = styled.div`
  background-color: #fff;
  padding: 20px;
  grid-area: about;
`;

export const Title = styled.h5`
  font-family: 'Quicksand';
  font-size: 19px;
  margin-bottom: 9px;
  p + & {
    margin-top: 21px;
  }
`;

export const Content = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
  text-overflow: '...';
`;
