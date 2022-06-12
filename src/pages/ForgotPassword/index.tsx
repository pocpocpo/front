import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiMail, FiLogIn } from 'react-icons/fi';
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

import { useToast } from '../../hooks/Toast';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation(['translations']);

  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<'Patient' | 'Doctor'>('Patient');

  const { addToast } = useToast();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);

        const schema = yup.object().shape({
          email: yup
            .string()
            .required(t('forgotpassword.email_required'))
            .email(t('forgotpassword.enter_a_valid_email')),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          role: userRole,
          email: data.email,
        });

        addToast({
          type: 'success',
          title: t('forgotpassword.recovery_email_sent'),
          description: t('forgotpassword.check_your_email_inbox'),
        });
      } catch (error: ValidationError | any) {
        getValidationErrors(error, setError);

        addToast({
          type: 'error',
          title: t('forgotpassword.something_went_wrong_in_password_recovery'),
          description: t('forgotpassword.try_again'),
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, userRole],
  );

  const handleSwitchRole = useCallback((event) => {
    const role = event.target.checked ? 'Doctor' : 'Patient';
    setUserRole(role);
  }, []);

  return (
    <Container>
      <LanguageSelector />
      <Content>
        <AnimationContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>{t('forgotpassword.select_your_profile')}</p>
              <SwitchButton onChange={handleSwitchRole} register={register} />
            </div>

            <h1>
              {t('forgotpassword.password_recovery')}:{' '}
              {userRole === 'Doctor'
                ? t('forgotpassword.doctor')
                : t('forgotpassword.patient')}
            </h1>
            <strong>{t('forgotpassword.enter_your_email')}.</strong>

            <Input
              name="email"
              icon={FiMail}
              placeholder={t('forgotpassword.email')}
              register={register}
              error={errors.email?.message}
            />

            <Button loading={loading} type="submit">
              {t('forgotpassword.recover_password')}
            </Button>

            <Otherwise>
              <Link to="/">
                <FiLogIn />
                {t('forgotpassword.log_in')}
              </Link>
            </Otherwise>
          </Form>
        </AnimationContainer>
      </Content>

      <Background role={userRole} />
    </Container>
  );
};

export default ForgotPassword;
