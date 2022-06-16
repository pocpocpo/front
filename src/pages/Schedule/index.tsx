import React, { useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Header from '../../components/Header';

import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import {
  Container,
  Content,
  ListSpecialties,
  AlphabetList,
  Specialty,
  AnchorButton,
  Background,
} from './styles';
import { ContainerCenter } from '../../styles';

interface ISpecialtyDTO {
  id: string;
  name: string;
}

interface IAlphabeticalListDTO {
  [key: string]: { letter: string; record: ISpecialtyDTO[] };
}

const Schedule: React.FC = () => {
  const { t } = useTranslation(['translations']);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [specialties, setSpecialties] = useState<ISpecialtyDTO[]>([]);

  useEffect(() => {
    (async () => {
      try {
        await api.get<ISpecialtyDTO[]>('/specialties').then((resp) => {
          setSpecialties(resp.data);
        });
      } catch (err: Error | AxiosError | unknown) {
        if (axios.isAxiosError(err)) {
          console.error(`500 Internal Server Error: ${err.message}`);
        }
      }
    })();
  }, []);

  // https://stackoverflow.com/questions/50749152/render-a-list-of-names-alphabetically-and-grouped-by-their-first-char
  // https://www.cluemediator.com/sort-and-group-objects-alphabetically-by-the-first-letter-from-an-array-in-javascript
  const parsedSpecialties = useMemo(() => {
    const list = specialties.reduce((r, { id, name }) => {
      const firstLetter = name[0].toUpperCase();
      if (!r[firstLetter]) {
        // eslint-disable-next-line no-param-reassign
        r[firstLetter] = {
          letter: firstLetter,
          record: [{ id, name }],
        };
      } else r[firstLetter].record.push({ id, name });

      return r;
    }, {} as IAlphabeticalListDTO);

    const sortedList = Object.entries(list).sort(([a], [b]) =>
      a.localeCompare(b),
    );

    return sortedList;
  }, [specialties]);

  return (
    <Container>
      <Header />

      <ContainerCenter>
        <ListSpecialties>
          <h1>{t('dashboard_patient.specialties')}</h1>
          <span>{t('dashboard_patient.select_one_specialties')}</span>

          <AlphabetList>
            {specialties.length === 0 && (
              <p>{t('dashboard_patient.no_specialties_found')}</p>
            )}

            {parsedSpecialties.map(([key, value]) => (
              <Specialty key={key}>
                <strong>{key}</strong>

                {value.record.map((specialty) => (
                  <AnchorButton
                    key={specialty.id}
                    onClick={() =>
                      navigate('/schedule/specialty', {
                        state: { specialty },
                      })
                    }
                  >
                    {t(specialty.name)}
                  </AnchorButton>
                ))}
              </Specialty>
            ))}
          </AlphabetList>
        </ListSpecialties>
        <Background />
      </ContainerCenter>
    </Container>
  );
};

export default Schedule;
