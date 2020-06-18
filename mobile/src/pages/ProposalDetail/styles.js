import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 60px 1fr 110px;
`;

export const Header = styled.header`
  padding: 0 12px;
  background-color: #efefef;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-family: 'Quicksand';
    text-align: center;
  }
`;

export const Body = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding: 0 16px;
`;

export const Title = styled.h6`
  color: #333;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const Text = styled.p`
  color: #333;
  font-size: 16px;
  font-weight: 400;
  span {
    display: flex;
    align-items: center;
    svg {
      margin-left: 5px;
    }
  }
`;

export const Employer = styled.div`
  margin: 17px auto 27px;
  padding: 14px;
  border: 1px solid #aaa;
`;

export const EmployerImage = styled.div`
  display: flex;
  align-items: center;
  margin: 27px 0;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const EmployerName = styled.p`
  color: #333;
  font-size: 17px;
  font-weight: 500;
  font-family: 'Quicksand';
`;

export const EmployerAddress = styled(Text)`
  margin-top: 15px;
  strong {
    font-weight: 500;
  }
`;
