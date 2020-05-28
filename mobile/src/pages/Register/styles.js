import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 260px 35px 1fr auto;
  align-content: space-between;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & > span {
    display: flex;
    align-items: center;
    font-size: 20px;
    position: absolute;
    left: 15px;
    top: 15px;
    svg {
      margin-right: 5px;
    }
  }
  img {
    height: 50px;
    width: 50px;
    margin: 55px 0 25px;
  }
  h1 {
    display: flex;
    align-items: center;
    font-family: 'Quicksand';
    font-size: 34px;
    margin-bottom: 21px;
  }
  p {
    font-size: 18px;
    color: #999;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 25px;
`;

export const IndicatorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
`;

export const Indicator = styled.div`
  background-color: ${p => (p.active ? 'var(--ally-red)' : '#cccccc')};
  height: 3px;
`;

export const DoubleButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  width: 100%;
`;

export const FileContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 30px;
  width: 100%;
`;

export const DoubleInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin: -35px 0;
  width: 100%;
`;

export const FileInputContainer = styled.label`
  cursor: pointer;
  margin-bottom: 35px;
  border: 1px dashed #aaa;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 119px;
  width: 119px;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    display: none;
  }

  &.has-thumbnail {
    border: 0;
  }

  &.has-thumbnail svg {
    display: none;
  }
`;

export const Title = styled.label`
  font-size: 19px;
  color: #000;
  opacity: 60%;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #000;
  opacity: 60%;
  margin-top: 15px;
`;
