import styled, { keyframes, css } from 'styled-components';
import { shade } from 'polished';

import signInPatientBackgroundImg from '../../assets/sign-in-patient-background.png';
import signInDoctorBackgroundImg from '../../assets/sign-in-doctor-background.png';

interface BackgroundProps {
  role: 'Doctor' | 'Patient';
}

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  } to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;
  border-radius: 16px;
  margin: 10px;
  width: 100%;
  max-width: 600px;

  animation: ${appearFromRight} 1s;

  form {
    margin: 20px 0;
    text-align: center;
    max-width: 100%;

    strong {
      display: inline-block;
      margin-bottom: 10px;
    }

    @media (max-width: 600px) {
     padding: 0 10px;
    }

    h1 {
      margin-bottom: 24px;
      color: #4238b0;
    }

    a {
      color: #5345fc;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#5345fc')};
      }

      svg {
        margin-right: 8px;
      }
    }
  }
`;

export const Background = styled.div<BackgroundProps>`
  flex: 1;
  ${(props) =>
    props.role === 'Patient'
      ? css`
          background: url(${signInPatientBackgroundImg}) no-repeat center;
        `
      : css`
          background: url(${signInDoctorBackgroundImg}) no-repeat center;
        `};
  /* background-size: ; */
`;

export const Form = styled.form`
  h1 + div {
    display: flex;
    align-items: center;
    flex-direction: row;

    p {
      margin-right: 16px;
    }
  }
`;

export const Scroll = styled.div`
  overflow-y: scroll;
  max-width: 700px;
  height: 320px;
  padding: 35px 50px;
`;

export const Gender = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  & + input {
    margin-right: 10px;
  }
`;

export const Otherwise = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
