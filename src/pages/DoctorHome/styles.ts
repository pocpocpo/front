import styled from 'styled-components';
import selectDoctorsBackgroundImg from '../../assets/select-doctors.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
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
