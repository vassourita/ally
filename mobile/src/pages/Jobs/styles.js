import styled from 'styled-components';

export const Container = styled.div``;

export const Filters = styled.div`
  margin-bottom: 20px;
  & > span {
    display: flex;
    align-items: center;
    color: #666;
    margin-bottom: 10px;
    svg {
      margin-right: 5px;
    }
  }
  & > div {
    display: grid;
    grid-template-columns: 150px 150px;
    gap: 20px;
  }
`;

export const List = styled.ul``;

export const Card = styled.li`
  border: 1px solid #999;
  display: grid;
  grid-template-rows: 260px 0 40px;
  position: relative;
  margin-bottom: 25px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  object-position: center center;
  filter: brightness(30%);
`;

export const Info = styled.div`
  color: #fff;
  padding: 15px;
  position: absolute;
  h3 {
    font-family: 'Quicksand';
    font-size: 21px;
    margin-bottom: 15px;
  }
  p {
    margin-top: 5px;
    strong {
      font-weight: 500;
    }
  }
`;

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #555;
  padding: 10px;
  height: 40px;
  svg {
    margin-left: 4px;
  }
`;

export const NoVacancies = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 400px);
`;
