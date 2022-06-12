import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format, isBefore, parseISO } from 'date-fns';
import Header from '../../components/Header';
import api from '../../services/api';
import { AppointmentCard, Background, Container } from './styles';
import { useToast } from '../../hooks/Toast';
import { ContainerCenter } from '../../styles';

const DoctorHome: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const { t } = useTranslation(['translations']);

  const { addToast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        await api.get('/appointments').then((resp) => {
          setAppointments(
            resp.data.sort((a: any, b: any) =>
              isBefore(new Date(a.date), new Date(b.date)) ? -1 : 1,
            ),
          );
        });
      } catch (err: Error | AxiosError | unknown) {
        if (axios.isAxiosError(err)) {
          console.error(`500 Internal Server Error: ${err.message}`);
        }
      }
    })();
  }, []);

  const handleCancelAppointment = useCallback(
    async (id: string) => {
      const { status } = await api.delete(`/appointments/${id}`);

      if (status !== 200) return;

      setAppointments(
        appointments.filter((appointment) => appointment.id !== id),
      );
      addToast({
        type: 'success',
        title: t('appointment.cancel_success_title'),
        description: t('appointment.cancel_success_description'),
      });
    },
    [appointments],
  );

  return (
    <Container>
      <Header />
      <ContainerCenter>
        <div>
          <h1>{t('appointment.my_appointment')} </h1>
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id}>
              <p>
                {t('appointment.day')}:{' '}
                {parseISO(
                  `${appointment.date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0]} ${
                    appointment.date.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0]
                  }`,
                ).toLocaleDateString()}
              </p>
              <p>
                {t('appointment.hour')}:{' '}
                {appointment.date.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0]}
              </p>
              <p>
                {t('appointment.patient')}: {appointment.patient.name}
              </p>
            </AppointmentCard>
          ))}
        </div>
        <Background />
      </ContainerCenter>
    </Container>
  );
};

export default DoctorHome;
