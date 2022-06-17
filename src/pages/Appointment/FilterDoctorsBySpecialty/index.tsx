/* eslint-disable import/no-duplicates */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { useTranslation } from 'react-i18next';
import md5 from 'md5';
import Header from '../../../components/Header';

import {
  Container,
  Breadcrumbs,
  DoctorsList,
  Section,
  Doctor,
  DoctorAnchor,
  Background,
  ReturnButton,
} from './styles';
import api from '../../../services/api';
import { ContainerCenter } from '../../../styles';

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
  email: string;
}

const FilterDoctorsBySpecialty: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as ILocationProps;
  console.log(location);
  const { t } = useTranslation(['translations']);

  const [specialty, setSpecialty] = useState<ISpecialtyDTO>(
    {} as ISpecialtyDTO,
  );
  console.log(specialty);
  const [doctors, setDoctors] = useState<IDoctorDTO[]>([]);

  useEffect(() => {
    console.log(location);
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
    } catch (err: Error | unknown) {
      console.error('500 Internal Server Error');
    }
  };

  useEffect(() => {
    getSpecialty();
  }, [specialty]);

  return (
    <Container>
      <Header />

      <ContainerCenter>
        <DoctorsList>
          <Breadcrumbs>
            <ReturnButton
              to={{
                pathname: '/schedule',
              }}
            >
              <FiArrowLeft />
              {t('appointment.back_to_specialties')}
            </ReturnButton>
          </Breadcrumbs>
          <h1>{t('appointment.healthcare_professionals')}</h1>

          <strong>
            {t('appointment.specialty')}: {specialty?.name}
          </strong>

          <Section>
            {!doctors && <p>{t('appointment.no_doctors_found')}</p>}

            {doctors.map((doctor) => (
              <Doctor key={doctor.id}>
                <DoctorAnchor
                  onClick={() => {
                    navigate('/schedule/specialty/appointment', {
                      state: { doctor, specialty },
                    });
                  }}
                >
                  <img
                    src={`https://s.gravatar.com/avatar/${md5(
                      doctor.email.toLowerCase().trim(),
                      {
                        encoding: 'binary',
                      },
                    )}
                        ?s=200&d=https%3A%2F%2Fui-avatars.com%2Fapi%2F${doctor.name.replace(
                          ' ',
                          '%2B',
                        )}/200`}
                    alt={`Imagem do profissional de saúde ${doctor.name}`}
                  />

                  <div>
                    <strong>{doctor.name}</strong>
                    <p>CRM: {doctor.CRM}</p>
                    <p>
                      {t('appointment.gender')}:{' '}
                      {doctor.gender === 'm' ? t('Masculino') : t('Feminino')}
                    </p>
                  </div>
                </DoctorAnchor>
              </Doctor>
            ))}
          </Section>
        </DoctorsList>

        <Background />
      </ContainerCenter>
    </Container>
  );
};

export default FilterDoctorsBySpecialty;
