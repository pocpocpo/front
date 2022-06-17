import styled from 'styled-components';
import { shade } from 'polished';

import { Link } from 'react-router-dom';
import selectDoctorsBackgroundImg from '../../../assets/select-doctors.png';

export const Container = styled.div``;

export const Breadcrumbs = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;

export const ReturnButton = styled(Link)`
  display: flex;
  width: 300px;
  justify-content: center;
  align-items: center;
  background-color: #5345fc;
  height: 56px;
  border-radius: 10px;
  text-decoration: none;
  color: #fff;
  margin: 10px 0;
`;

export const Wrap = styled.div`
  display: flex;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
  }
`; // refactor

export const DoctorsList = styled.div`
  flex: 1;
  margin-right: 120px;

  @media (max-width: 767px) {
    width: auto;
  }

  @media (max-width: 768px) {
    margin-right: 0;
  }

  h1 {
    color: #d0d3da;
    font-size: 36px;
  }

  & > strong {
    color: #143563;
  }

  p {
    margin-top: 8px;
    display: flex;
    align-items: center;
    font-weight: 500;
  }
`;

export const Section = styled.div`
  max-width: 720px;
  margin-top: 48px;

  > p {
    color: #2a2a2a;
  }
`;

export const Doctor = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;

  & + div {
    margin-top: 16px;
  }
`;

export const DoctorAnchor = styled.div`
  background: #d0d3da;
  display: flex;
  align-items: center;
  padding: 8px 24px;
  border-radius: 10px;
  border: 2px solid transparent;
  width: 100%;
  height: 100%;
  transition: margin-left 0.3s;

  &:hover {
    margin-left: 24px;
    border: 2px solid #143563;
    cursor: pointer;
    color: ${shade(0.2, '#d0d3da')};
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50px;
  }

  div {
    flex-direction: column;
    display: block;
    color: #2a2a2a;
    margin-left: 26px;

    strong {
      font-size: 20px;
    }
  }
`;

export const Background = styled.div`
  width: 380px;
  background: url(${selectDoctorsBackgroundImg}) no-repeat center;
  background-size: contain;
  height: calc(100vh - 156px);

  @media (max-width: 768px) {
    display: none;
  }
`;
