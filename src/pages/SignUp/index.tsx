import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FiMail,
  FiLock,
  FiArrowLeft,
  FiUser,
  FiMapPin,
  FiSmartphone,
  FiActivity,
  FiShield,
} from 'react-icons/fi';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import Button from '../../components/Button';
import Input from '../../components/Input';
import SwitchButton from '../../components/SwitchButton';
import LanguageSelector from '../../components/LanguageSelector';
import {
  Container,
  Content,
  AnimationContainer,
  Background,
  Form,
  Scroll,
  Otherwise,
  Gender,
} from './styles';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/Toast';
import ImageUploader from '../../components/ImageUploader';
import CustomSelect from '../../components/CustomSelect';
import { useAuth } from '../../hooks/Auth';

export interface SignUpFormData {
  role: 'Doctor' | 'Patient';
  name: string;
  email: string;
  password: string;
  address: string;
  gender: 'm' | 'f';
  phone: string;
  RG: string;
  CPF: string;
  CRM: string;
  specialty_id: string;
  birthday: Date;
}

interface ISpecialtyDTO {
  id: string;
  name: string;
}

const SignUp: React.FC = () => {
  const { t } = useTranslation(['translations']);

  const [userRole, setUserRole] = useState<'Patient' | 'Doctor'>('Patient');
  const [specialties, setSpecialties] = useState<
    { label: string; value: string }[]
  >([]);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    handleSubmit,
    register,
    unregister,
    setError,
    control,
    formState: { errors },
  } = useForm<SignUpFormData>();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    (async () => {
      await api.get<ISpecialtyDTO[]>('/specialties').then((resp) => {
        const options = resp.data.map((specialty) => ({
          label: specialty.name,
          value: specialty.id,
        }));
        setSpecialties(options);
      });
    })();
  }, []);

  const onSubmit: SubmitHandler<SignUpFormData> = useCallback(
    async (data: SignUpFormData) => {
      const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

      const eighteenYearsAgo = new Date();
      const eightevarenYearsAgo = new Date(
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18),
      );

      try {
        const schema = yup.object().shape({
          role: yup.boolean().required(t('signup.user_role_required')),
          name: yup.string().required(t('signup.name_required')),
          email: yup
            .string()
            .required(t('signup.email_required'))
            .email(t('signup.enter_a_valid_email')),
          password: yup.string().min(6, t('signup.minimum_6_digits')),
          address: yup.string().required(t('signup.address_required')),
          phone: yup
            .string()
            .matches(phoneRegExp, t('signup.invalid_phone_number')),
          RG: yup.string().when('role', {
            is: (value: boolean) => value === false,
            then: yup
              .string()
              .matches(
                /^\d{2}\.?\d{3}\.?\d{3}-?\d{1}$/,
                t('signup.rg_invalid_format'),
              )
              .required(t('signup.rg_required')),
          }),
          CPF: yup.string().when('role', {
            is: (value: boolean) => value === false,
            then: yup
              .string()
              .matches(
                /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
                t('signup.cpf_invalid_format'),
              )
              .required(t('signup.cpf_required')),
          }),
          CRM: yup.string().when('role', {
            is: (value: boolean) => value === true,
            then: yup
              .string()
              .matches(/[0-9]{6}-?[A-z]{2}/, t('signup.crm_invalid_format'))
              .required(t('signup.crm_required')),
          }),
          birthday: yup
            .date()
            .nullable()
            .transform((curr, orig) => (orig === '' ? null : curr))
            .max(eightevarenYearsAgo, t('signup.you_must_be_over_18'))
            .required(t('signup.birthdate_required')),
          gender: yup.mixed().oneOf(['m', 'f']).defined(),
          specialty_id: yup.string().when('role', {
            is: (value: boolean) => value === true,
            then: yup.string().required(t('signup.specialty_required')),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // eslint-disable-next-line no-param-reassign
        data.role = userRole;

        await api.post('/users', data);

        navigate('/login');

        addToast({
          type: 'success',
          title: t('signup.your_registration_was_completed_with_success'),
          description: t('signup.you_can_now_login_to'),
        });
      } catch (error: any) {
        const errorsList = getValidationErrors(error, setError);

        addToast({
          type: 'error',
          title: t('signup.something_went_wrong_with_your_registration'),
          description: t('signup.try_again'),
        });
      }
    },
    [addToast, navigate, userRole],
  );

  const handleSwitchRole = useCallback((event) => {
    const role = event.target.checked ? 'Doctor' : 'Patient';

    if (role === 'Patient') {
      unregister('CRM');
    }
    if (role === 'Doctor') {
      unregister('RG');
      unregister('CPF');
    }
    setUserRole(role);
  }, []);

  return (
    <Container>
      <LanguageSelector />
      <Background role={userRole} />
      <Content>
        <AnimationContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>{t('signup.sign_up')}</h1>
            <div>
              <p>{t('signup.select_your_profile')}</p>
              <SwitchButton onChange={handleSwitchRole} register={register} />
            </div>

            <strong>
              {t('signup.i_am')}{' '}
              {userRole === 'Doctor'
                ? t('signup.doctors_portal')
                : t('signup.patient_portal')}
            </strong>

            <Scroll>
              <ImageUploader />

              <Input
                name="name"
                icon={FiUser}
                placeholder={t('signup.name')}
                register={register}
                error={errors.name?.message}
              />
              <Input
                name="email"
                icon={FiMail}
                placeholder={t('signup.email')}
                register={register}
                error={errors.email?.message}
              />
              <Input
                type="password"
                name="password"
                icon={FiLock}
                placeholder={t('signup.password')}
                register={register}
                error={errors.password?.message}
              />
              <Input
                name="address"
                icon={FiMapPin}
                placeholder={t('signup.address')}
                register={register}
                error={errors.address?.message}
              />
              <Input
                type="phone"
                name="phone"
                icon={FiSmartphone}
                placeholder="+55 (11) 99999-9999"
                register={register}
                error={errors.phone?.message}
              />

              {userRole === 'Patient' ? (
                <>
                  <Input
                    name="RG"
                    icon={FiShield}
                    placeholder={t('signup.rg')}
                    register={register}
                    error={errors.RG?.message}
                  />

                  <Input
                    name="CPF"
                    icon={FiShield}
                    placeholder={t('signup.cpf')}
                    register={register}
                    error={errors.CPF?.message}
                  />
                </>
              ) : (
                <>
                  <Input
                    name="CRM"
                    icon={FiActivity}
                    placeholder={t('signup.crm')}
                    register={register}
                    error={errors.CRM?.message}
                  />
                  <CustomSelect
                    control={control}
                    name="specialty_id"
                    icon={FiActivity}
                    placeholder={t('signup.specialty')}
                    register={register}
                    options={specialties}
                    error={errors.specialty_id?.message}
                  />
                </>
              )}

              <strong>{t('signup.birth_date')}:</strong>
              <Input
                type="date"
                name="birthday"
                register={register}
                error={errors.birthday?.message}
              />

              <strong>{t('signup.gender')} </strong>
              <Gender>
                <label htmlFor="gender">
                  <input
                    type="radio"
                    value="m"
                    {...register('gender')}
                    checked
                  />
                  {t('signup.male')}
                </label>
                <label htmlFor="female">
                  <input type="radio" value="f" {...register('gender')} />
                  {t('signup.female')}
                </label>
              </Gender>
            </Scroll>
            <Button type="submit">{t('signup.sign_in')}</Button>

            <Otherwise>
              <Link to="/">
                <FiArrowLeft />
                {t('signup.log_in')}
              </Link>
            </Otherwise>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
