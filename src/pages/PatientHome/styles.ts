import styled from 'styled-components';
import { Link } from 'react-router-dom';
import selectDoctorsBackgroundImg from '../../assets/select-doctors.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonNew = styled(Link)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #5345fc;
  height: 56px;
  border-radius: 10px;
  text-decoration: none;
  color: #fff;
  margin: 10px 0;
`;

export const Content = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  h1 {
    font-size: 36px;
    color: #ffffff;
  }
`;

export const AppointmentCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  max-width: 400px;
  padding: 16px 24px;
  margin-bottom: 16px;
`;

export const Background = styled.div`
  width: 380px;
  background: url(${selectDoctorsBackgroundImg}) no-repeat center;
  background-size: contain;
  height: calc(100vh - 122px);

  @media (max-width: 768px) {
    display: none;
  }
`;
