import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiLock } from 'react-icons/fi';
import * as yup from 'yup';

import { ValidationError } from 'yup';
import { useTranslation } from 'react-i18next';
import { i18n } from '../../i18n';
import Button from '../../components/Button';
import Input from '../../components/Input';
import LanguageSelector from '../../components/LanguageSelector';

import {
  Container,
  Content,
  AnimationContainer,
  Background,
  Form,
} from './styles';

import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/Toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const { t } = useTranslation(['translations']);

  const [userRole, setUserRole] = useState<string>();

  const { addToast } = useToast();
  const { search } = useLocation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const onSubmit: SubmitHandler<ResetPasswordFormData> = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        const schema = yup.object().shape({
          password: yup.string().required(t('resetpassword.password_required')),
          password_confirmation: yup
            .string()
            .oneOf(
              [yup.ref('password'), null],
              t('resetpassword.password_does_not_match'),
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const params = new URLSearchParams(search);

        const { password, password_confirmation } = data;
        const token = params.get('token');
        const role = params.get('role');

        if (!token) {
          throw new Error();
        }

        if (!role) {
          throw new Error();
        }

        await api.post('/password/reset', {
          role,
          password,
          password_confirmation,
          token,
        });

        navigate('/');
      } catch (error: ValidationError | any) {
        getValidationErrors(error, setError);

        addToast({
          type: 'error',
          title: t('resetpassword.password_reset_error'),
          description: t('resetpassword.password_reset_error_please_try_again'),
        });
      }
    },
    [addToast, search, navigate],
  );

  return (
    <Container>
      <LanguageSelector />
      <Content>
        <AnimationContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>{t('resetpassword.reset_password')}</h1>

            <Input
              name="password"
              icon={FiLock}
              placeholder={t('resetpassword.new_password')}
              register={register}
              error={errors.password?.message}
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              placeholder={t('resetpassword.old_password')}
              register={register}
              error={errors.password?.message}
            />

            <Button type="submit">{t('resetpassword.change_password')}</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background role={userRole} />
    </Container>
  );
};

export default ResetPassword;
