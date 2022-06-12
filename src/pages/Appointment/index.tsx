/* eslint-disable import/no-duplicates */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { FiArrowLeft, FiClock, FiCalendar } from 'react-icons/fi';
import { format, isBefore, nextMonday } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useTranslation } from 'react-i18next';
import { isWeekend } from 'date-fns/esm';
import Header from '../../components/Header';

import {
  Container,
  Content,
  Breadcrumbs,
  ScheduleDoctor,
  DoctorsList,
  Section,
  Appointment,
  Doctor,
  DoctorAnchor,
  Calendar,
  StyledDatePicker,
  Background,
  ReturnButton,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';
import Button from '../../components/Button';
import { Modal } from '../../components/Modal';
import { useToast } from '../../hooks/Toast';
import { ContainerCenter } from '../../styles';

interface ISpecialtyDTO {
  id: string;
  name: string;
}

interface ILocationProps {
  specialty: ISpecialtyDTO;
}

interface IDoctorDTO {
  id: string;
  name: string;
  CRM: string | undefined;
  gender: 'm' | 'f';
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

const AppointmentPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { addToast } = useToast();
  const state = location.state as ILocationProps;
  const { t } = useTranslation(['translations']);

  const [specialty, setSpecialty] = useState<ISpecialtyDTO>(
    {} as ISpecialtyDTO,
  );
  const [doctors, setDoctors] = useState<IDoctorDTO[]>([]);
  const [doctor, setDoctor] = useState<IDoctorDTO | null>();

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

  const handleDoctorClick = useCallback(async (doctorData: IDoctorDTO) => {
    setDoctor(doctorData);
  }, []);

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
      setSpecialty(state.specialty as ISpecialtyDTO);
    })();
  }, [location]);

  const getSpecialty = async () => {
    try {
      await api
        .get<IDoctorDTO[]>('/doctors/specialty', {
          params: { specialty_id: specialty.id },
        })
        .then((resp) => {
          setDoctors(resp.data);
        });
    } catch (err: Error | AxiosError | unknown) {
      if (axios.isAxiosError(err)) {
        console.error(`500 Internal Server Error: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    getSpecialty();
  }, [specialty]);

  useEffect(() => {
    (async () => {
      if (!doctor) return;
      try {
        await api
          .get<MonthAvailabilityItem[]>(
            `/doctors/${doctor.id}/month-availability?month=${
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
  }, [currentMonth, selectedDate, doctor]);

  useEffect(() => {
    (async () => {
      try {
        if (!doctor) return;
        await api
          .get<DayAvailabilityItem[]>(
            `/doctors/${doctor?.id}/day-availability?month=${
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
  }, [selectedDate, doctor]);

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
    if (!doctor) return;
    setLoading(true);
    try {
      await api.post('/appointments', {
        date: `${format(selectedDate, 'yyyy-MM-dd')} ${format(
          selectedDate,
          'HH:mm:ss',
        )}`,
        doctor_id: doctor.id,
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
  }, [selectedDate, doctor, selectedHour, dayAvailability]);

  return (
    <Container>
      <Header />

      <ContainerCenter>
        {doctor && (
          <>
            <DoctorsList>
              <Breadcrumbs>
                <ReturnButton
                  to=""
                  onClick={() => {
                    setDoctor(null);
                  }}
                >
                  <FiArrowLeft />
                  Voltar aos profissionais de saúde
                </ReturnButton>
              </Breadcrumbs>
              <h1>Horários Disponíveis</h1>

              <ScheduleDoctor>
                <Doctor key={doctor.id}>
                  <DoctorAnchor selected>
                    <img
                      src={`https://robohash.org/${doctor.id}?200x200`}
                      alt={`Imagem do profissional de saúde ${doctor.name}`}
                    />

                    <div>
                      <strong>{doctor.name}</strong>
                      <p>CRM: {doctor.CRM}</p>
                      <p>
                        Sexo: {doctor.gender === 'm' ? 'Masculino' : 'Feminino'}
                      </p>
                    </div>
                  </DoctorAnchor>
                </Doctor>
              </ScheduleDoctor>

              <Section>
                {dayAvailability?.length === 0 && (
                  <p>Não existe um horário disponível para este dia</p>
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
                locale={ptBR}
                disabled={[
                  // {
                  //   before: new Date(),
                  // },
                  {
                    dayOfWeek: [0, 6],
                  },
                  ...disabledDays,
                ]}
                footer={`📘 Selecione um dia disponível na agenda de ${doctor.name}.`}
              />
            </Calendar>
          </>
        )}

        {!doctor && (
          <>
            <DoctorsList>
              <Breadcrumbs>
                <ReturnButton
                  to={{
                    pathname: '/schedule',
                  }}
                >
                  <FiArrowLeft />
                  Voltar as especialidades
                </ReturnButton>
              </Breadcrumbs>
              <h1>{t('appointment.healthcare_professionals')}</h1>

              <strong>
                {t('appointment.specialty')}: {specialty?.name}
              </strong>

              <Section>
                {!doctors && <p>{t('appointment.no_doctors_found')}</p>}

                {doctors.map((doctorData) => (
                  <Doctor key={doctorData.id}>
                    <DoctorAnchor
                      onClick={() => {
                        handleDoctorClick(doctorData);
                      }}
                    >
                      <img
                        src={`https://robohash.org/${doctorData.id}?200x200`}
                        alt={`Imagem do profissional de saúde ${doctorData.name}`}
                      />

                      <div>
                        <strong>{doctorData.name}</strong>
                        <p>CRM: {doctorData.CRM}</p>
                        <p>
                          Sexo:{' '}
                          {doctorData.gender === 'm' ? 'Masculino' : 'Feminino'}
                        </p>
                      </div>
                    </DoctorAnchor>
                  </Doctor>
                ))}
              </Section>
            </DoctorsList>

            <Background />
          </>
        )}
      </ContainerCenter>
      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <div>
          <h2>{t('appointment.review_your_appointment')}</h2>
          <p>
            {t('appointment.doctor')}: {doctor?.name}
          </p>
          <p>
            {t('appointment.specialty')}: {specialty.name}
          </p>
          <p>CRM: {doctor?.CRM}</p>
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

export default AppointmentPage;
