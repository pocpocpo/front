/* eslint-disable import/no-duplicates */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { FiArrowLeft, FiClock, FiCalendar } from 'react-icons/fi';
import { format, isBefore, nextMonday } from 'date-fns';

import { useTranslation } from 'react-i18next';
import { isWeekend } from 'date-fns/esm';
import md5 from 'md5';
import { enUS, ptBR } from 'date-fns/locale';
import Header from '../../../components/Header';

import {
  Container,
  Breadcrumbs,
  ScheduleDoctor,
  DoctorsList,
  Section,
  Appointment,
  Doctor,
  DoctorAnchor,
  Calendar,
  StyledDatePicker,
  ReturnButton,
} from './styles';
import api from '../../../services/api';
import Button from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { useToast } from '../../../hooks/Toast';
import { ContainerCenter } from '../../../styles';

interface IDoctorDTO {
  id: string;
  name: string;
  CRM: string | undefined;
  gender: 'm' | 'f';
  email: string;
}

interface ISpecialtyDTO {
  id: string;
  name: string;
}

interface ILocationProps {
  doctor: IDoctorDTO;
  specialty: ISpecialtyDTO;
}

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface DayAvailabilityItem {
  hour: number;
  available: boolean;
  hourFormatted: string;
}

const CreateAppointment: React.FC = () => {
  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const state = location.state as ILocationProps;
  const { t, i18n } = useTranslation(['translations']);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [dayAvailability, setDayAvailability] =
    useState<DayAvailabilityItem[]>();

  const handleDateChange = useCallback((e, day: Date) => {
    setSelectedDate(isWeekend(day) ? nextMonday(day) : day);
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(isWeekend(month) ? nextMonday(month) : month);
  }, []);

  useEffect(() => {
    setSelectedDate(
      isWeekend(selectedDate) ? nextMonday(selectedDate) : selectedDate,
    );
    setCurrentMonth(
      isWeekend(selectedDate) ? nextMonday(selectedDate) : selectedDate,
    );
  }, []);

  useEffect(() => {
    (async () => {
      if (!state.doctor) return;
      try {
        await api
          .get<MonthAvailabilityItem[]>(
            `/doctors/${state.doctor.id}/month-availability?month=${
              currentMonth.getMonth() + 1
            }&year=${currentMonth.getFullYear()}`,
          )
          .then((resp) => {
            setMonthAvailability(resp.data);
          });
      } catch (err: Error | AxiosError | unknown) {
        if (axios.isAxiosError(err)) {
          console.error(`500 Internal Server Error: ${err.message}`);
        }
      }
    })();
  }, [currentMonth, selectedDate, state]);

  useEffect(() => {
    (async () => {
      try {
        if (!state.doctor) return;
        await api
          .get<DayAvailabilityItem[]>(
            `/doctors/${state.doctor.id}/day-availability?month=${
              selectedDate.getMonth() + 1
            }&year=${selectedDate.getFullYear()}&day=${selectedDate.getDate()}`,
          )
          .then((resp) => {
            const dayAvailabilityFormatted = resp.data.map((appointment) => {
              const tempDate = new Date(selectedDate).setHours(
                appointment.hour,
                0,
                0,
              );

              const available = appointment.available
                ? !isBefore(tempDate, new Date())
                : false;

              return {
                ...appointment,
                available,
                hourFormatted: format(tempDate, 'HH:mm'),
              };
            });

            setDayAvailability(dayAvailabilityFormatted);
          });
      } catch (err: Error | AxiosError | unknown) {
        if (axios.isAxiosError(err)) {
          console.error(`500 Internal Server Error: ${err.message}`);
        }
      }
    })();
  }, [selectedDate, state]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  const selectDateAsText = useMemo(
    () =>
      format(selectedDate, "'Dia' dd 'de' MMMM", {
        locale: ptBR,
      }),
    [selectedDate],
  );

  const selectWeekDay = useMemo(
    () =>
      format(selectedDate, 'cccc', {
        locale: ptBR,
      }),
    [selectedDate],
  );

  const handleAgendamento = useCallback(
    async (hour, _hourFormatted) => {
      setModalOpen(true);
      setSelectedDate(
        new Date(selectedDate.setHours(parseInt(hour, 10), 0, 0)),
      );
      setSelectedHour(hour);
    },
    [selectedDate],
  );

  const submitAppointment = useCallback(async () => {
    if (!state.doctor) return;
    setLoading(true);
    try {
      await api.post('/appointments', {
        date: `${format(selectedDate, 'yyyy-MM-dd')} ${format(
          selectedDate,
          'HH:mm:ss',
        )}`,
        doctor_id: state.doctor.id,
      });
      setModalOpen(false);

      setDayAvailability(
        dayAvailability?.map((day) =>
          day.hour === Number(selectedHour)
            ? { ...day, available: false }
            : day,
        ),
      );
      addToast({
        type: 'success',
        title: t('appointment.schedule_success_title'),
        description: t('appointment.schedule_success_description'),
      });
    } catch (err: Error | AxiosError | unknown) {
      if (axios.isAxiosError(err)) {
        console.error(`500 Internal Server Error: ${err.message}`);
      }
      addToast({
        type: 'error',
        title: t('appointment.schedule_error_title'),
        description: t('appointment.schedule_error_description'),
      });
    }
    setLoading(false);
  }, [selectedDate, state, selectedHour, dayAvailability]);

  return (
    <Container>
      <Header />

      <ContainerCenter>
        <DoctorsList>
          <Breadcrumbs>
            <ReturnButton
              to=""
              onClick={() => {
                const { specialty } = state;
                navigate('.');
              }}
            >
              <FiArrowLeft />
              {t('appointment.back_to_doctors')}
            </ReturnButton>
          </Breadcrumbs>
          <h1>{t('appointment.timetables_available')}</h1>

          <ScheduleDoctor>
            <Doctor key={state && state.doctor.id}>
              <DoctorAnchor selected>
                <img
                  src={`https://s.gravatar.com/avatar/${md5(
                    state && state.doctor.email.toLowerCase().trim(),
                    {
                      encoding: 'binary',
                    },
                  )}
                      ?s=200&d=https%3A%2F%2Fui-avatars.com%2Fapi%2F${
                        state && state.doctor.name.replace(' ', '%2B')
                      }/200`}
                  alt={`Imagem do profissional de saúde ${
                    state && state.doctor.name
                  }`}
                />

                <div>
                  <strong>{state && state.doctor.name}</strong>
                  <p>CRM: {state && state.doctor.CRM}</p>
                  <p>
                    {t('appointment.gender')}:{' '}
                    {state && state.doctor.gender === 'm'
                      ? t('Masculino')
                      : t('Feminino')}
                  </p>
                </div>
              </DoctorAnchor>
            </Doctor>
          </ScheduleDoctor>

          <Section>
            {dayAvailability?.length === 0 && (
              <p>{t('appointment.no_timetables_available')}</p>
            )}

            {dayAvailability &&
              dayAvailability.map(({ hour, available, hourFormatted }) => (
                <Appointment key={hour} available={available}>
                  <span>
                    <FiClock />
                    {hourFormatted}
                  </span>

                  <Button
                    disabled={!available}
                    onClick={() => handleAgendamento(hour, hourFormatted)}
                  >
                    <FiCalendar />
                    {available
                      ? t('appointment.schedule')
                      : t('appointment.unavailable')}
                  </Button>
                </Appointment>
              ))}
          </Section>
        </DoctorsList>

        <Calendar>
          <StyledDatePicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            month={currentMonth}
            onMonthChange={handleMonthChange}
            locale={i18n.resolvedLanguage === 'pt' ? ptBR : enUS}
            disabled={[
              {
                dayOfWeek: [0, 6],
              },
              ...disabledDays,
            ]}
            footer={t('appointment.select_day', {
              doctorName: state && state.doctor.name,
            })}
          />
        </Calendar>
      </ContainerCenter>

      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <div>
          <h2>{t('appointment.review_your_appointment')}</h2>
          <p>
            {t('appointment.doctor')}: {state && state.doctor.name}
          </p>
          <p>
            {t('appointment.specialty')}: {state && state.specialty.name}
          </p>
          <p>CRM: {state && state.doctor.CRM}</p>
          <p>
            {t('appointment.day')}: {selectedDate.toLocaleDateString()}
          </p>
          <p>
            {t('appointment.hour')}: {selectedDate.toLocaleTimeString()}
          </p>
          <Button type="button" onClick={submitAppointment} loading={loading}>
            {t('appointment.confirm')}
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

export default CreateAppointment;
