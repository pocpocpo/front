import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import * as yup from 'yup';

import { ValidationError } from 'yup';
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
  Otherwise,
} from './styles';

import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { t } = useTranslation(['translations']);

  const [userRole, setUserRole] = useState<'Patient' | 'Doctor'>('Patient');

  const { signIn, user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit: SubmitHandler<SignInFormData> = useCallback(
    async (data: SignInFormData) => {
      try {
        const schema = yup.object().shape({
          email: yup
            .string()
            .required(t('signin.email_required'))
            .email(t('signin.enter_a_valid_email_address')),
          password: yup.string().required(t('signin.password_required')),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          role: userRole,
          email: data.email,
          password: data.password,
        });

        navigate('/');
      } catch (error: ValidationError | any) {
        try {
          getValidationErrors(error, setError);
        } catch (err: any) {
          console.error(
            '401 Unauthorized: Ocorreu um erro ao fazer login, cheque as credenciais.',
          );
        }

        addToast({
          type: 'error',
          title: t('signin.authentication_error'),
          description: t(
            'signin.authentication_error_your_credentials_are_incorrect',
          ),
        });
      }
    },
    [signIn, addToast, userRole],
  );

  const handleSwitchRole = useCallback((event) => {
    const role = event.target.checked ? 'Doctor' : 'Patient';
    setUserRole(role);
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <Container>
      <LanguageSelector />
      <Content>
        <AnimationContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>{t('signin.select_your_profile')}</p>
              <SwitchButton onChange={handleSwitchRole} register={register} />
            </div>

            <h1>
              {userRole === 'Doctor'
                ? t('signin.doctors_portal')
                : t('signin.patient_portal')}
            </h1>
            <strong>{t('signin.enter_your_email')}</strong>

            <Input
              name="email"
              icon={FiMail}
              placeholder={t('signin.email')}
              register={register}
              error={errors.email?.message}
            />
            <Input
              type="password"
              name="password"
              icon={FiLock}
              placeholder={t('signin.password')}
              register={register}
              error={errors.password?.message}
            />

            <Button type="submit">{t('signin.login')}</Button>

            <Otherwise>
              <Link to="/forgot-password">
                {t('signin.forgot_your_password')}
              </Link>
              <Link to="/signup">
                <FiLogIn />
                {t('signin.signup')}
              </Link>
            </Otherwise>
          </Form>
        </AnimationContainer>
      </Content>

      <Background role={userRole} />
    </Container>
  );
};

export default SignIn;
