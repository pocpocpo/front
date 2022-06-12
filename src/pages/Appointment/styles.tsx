import styled, { css } from 'styled-components';
import { lighten, shade } from 'polished';

import { DayPicker, DayModifiers } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { Link } from 'react-router-dom';
import selectDoctorsBackgroundImg from '../../assets/select-doctors.png';

interface DoctorProps {
  selected?: boolean;
}

interface AppointmentProps {
  available?: boolean;
}

export const Container = styled.div``;

export const Content = styled.main`
  padding: 22px;
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  min-height: calc(100vh - 144px - 64px * 2);
`;

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

export const ScheduleDoctor = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    color: #d0d3da;
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    display: flex;
    align-items: center;
    font-weight: 500;
  }
`;

export const DoctorsList = styled.div`
  flex: 1;
  margin-right: 120px;

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

export const Appointment = styled.div<AppointmentProps>`
  max-width: 420px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-radius: 10px;
  justify-content: space-between;
  background: #d0d3da;

  ${(props) =>
    !props.available &&
    css`
      opacity: 0.8;

      button,
      svg,
      strong {
        pointer-events: none;
        opacity: 0.4;
      }
    `}

  & + div {
    margin-top: 16px;
  }

  span {
    display: flex;
    align-items: center;
    color: #143563;

    svg {
      color: #143563;
      margin-right: 8px;
      font-size: 22px;
    }
  }

  button {
    height: 30px;
    align-items: center;
    width: 180px;
    background: #143563;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${shade(0.2, '#143563')};
    }

    svg {
      margin-right: 6px;
    }
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

export const DoctorAnchor = styled.div<DoctorProps>`
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

  ${({ selected }) =>
    selected &&
    css`
      margin-top: 20px;
      margin-left: 24px;
      border: 2px solid #143563;

      &:hover {
        cursor: auto;
      }
    `}

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

export const Calendar = styled.aside`
  width: 380px;
`;

export const StyledDatePicker = styled(DayPicker)`
  width: 380px;
  background: #d0d3da;
  border-radius: 10px;
  padding: 10px;

  .rdp-wrapper {
    padding-bottom: 0;
  }

  .rdp-month {
    width: 100%;
  }

  .rdp-table {
    margin-right: 0;
    width: 100%;
    max-width: inherit;
  }

  .rdp-month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .rdp-day {
    width: 40px;
    height: 40px;
    margin-top: 4px;
  }

  .rdp-day_today {
    font-weight: normal;
  }

  .rdp-day_selected:not([disabled]) {
    background: #5ec06f !important;
    border-radius: 10px;
    color: #232129 !important;
  }

  .rdp-day:hover:not([disabled]) {
    background: ${shade(0.3, '#80a4c5')};
  }

  .rdp-day:not([disabled]) {
    background: #80a4c5;
    border-radius: 10px;
    color: #232129;
    font-weight: 500;
  }

  .rdp-day_disabled {
    opacity: 0.25;
    background: transparent !important;
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
