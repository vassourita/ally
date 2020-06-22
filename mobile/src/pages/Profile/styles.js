import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const Image = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  position: absolute;
`;

export const Info = styled.div`
  border: 1px solid #999;
  width: 100%;
  height: 100%;
  margin-top: 50px;
  padding: 20px;
  h3 {
    margin-top: 35px;
    font-weight: 600;
    font-family: 'Quicksand';
    font-size: 20px;
    text-align: center;
  }
`;

export const Title = styled.h6`
  font-weight: 500;
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 19px;
  margin: 20px 0 7px;
`;

export const Content = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;
