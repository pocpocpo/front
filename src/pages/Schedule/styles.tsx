import styled from 'styled-components';

import ilustracoAgenda from '../../assets/ilustracaoagenda.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
/*
export const Header = styled.header`
  padding: 16px 32px 16px 32px;
  background: #d0d3da;
`;
*/
export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    strong {
      color: #2ab455;
    }
    span {
      /* color:  */
    }
  }
`;

export const Content = styled.main`
  display: flex;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  justify-content: space-around;
`;

export const ListSpecialties = styled.div`
  color: #ffffff;
  flex: 1;
  margin-right: 50px;
  /* margin-left: 50px; */

  @media (max-width: 768px) {
    margin-right: 0;
  }

  h1 {
    font-size: 36px;
  }

  span {
    margin-top: 8px;
    font-weight: 500;
  }
`;

export const Background = styled.div`
  flex: 1;
  width: 380px;
  background: url(${ilustracoAgenda}) no-repeat center;
  background-size: contain;
  height: calc(100vh - 122px);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const AlphabetList = styled.div`
  margin-top: 48px;
`;

export const Specialty = styled.div`
  > strong {
    color: #ffffff;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 2px solid #d0d3da;
    display: block;
    padding-bottom: 10px;
    margin: 16px 0;
  }

  > p {
    color: #2d323b;
  }
`;

export const AnchorButton = styled.button`
  display: flex;
  background: #d0d3da;
  border: none;
  border-radius: 10px;
  text-decoration: none;
  color: #337bbe;

  width: 200px;
  justify-content: left;

  font-size: 16px;
  font-weight: 500;
  padding: 0 12px;
  margin-left: 20px;

  svg {
    margin-right: 8px;
    color: #2a2a2a;
  }

  & + button {
    margin-top: 16px;
  }

  &:hover {
    background: #2ab455;
    color: #ffffff;
  }
`;
