import {FormLayout} from '../../components/form-layout/form-layout';
import {Form} from '../../components/form/form';
import Fieldset from '../../components/fieldset/fieldset';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {FormNavigation} from '../../components/form-navigation/form-navigation';
import {
  FormNavigationLink,
} from '../../components/form-navigation-link/form-navigation-link';
import React from 'react';
import {
  selectForgotPasswordEmailInput,
  selectForgotPasswordEmailInputError,
  sendResetPasswordEmail,
  setForgotPasswordEmailInput,
  setForgotPasswordEmailInputError,
} from '../../services/slices/forgot-password-slice';
import {useHistory} from 'react-router-dom';
import {
  setResetPasswordPageAvailability,
} from '../../services/slices/reset-password-slice';
import {RESET_PASSWORD_PAGE_PATH} from '../../utils/constants';
import {useAppDispatch, useAppSelector} from '../../utils/hooks/reduxHooks';

export const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const emailInputValue = useAppSelector(selectForgotPasswordEmailInput);
  const emailInputError = useAppSelector(selectForgotPasswordEmailInputError);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await dispatch(sendResetPasswordEmail(emailInputValue))
      .unwrap();
    if (response.success) {
      await dispatch(setResetPasswordPageAvailability(true));
      history.push(RESET_PASSWORD_PAGE_PATH);
    }
    else {
      console.log(response.payload);
    }
  }

  return (
    <FormLayout >
      <Form onSubmit={handleSubmit}>
        <Fieldset legend="Восстановление пароля">
          <EmailInput
            extraClass={`${emailInputError ? null : 'mb-6'} mt-6`}
            value={emailInputValue}
            onChange={e => {
              dispatch(setForgotPasswordEmailInput(e.target.value));
              dispatch(
                setForgotPasswordEmailInputError(e.target.validationMessage));
            }}
            placeholder="Укажите e-mail"
            minLength={6}
            // @ts-ignore
            error={emailInputError}
            errorText={emailInputError}
            autoComplete="email"
            name="email"
            required
          />
          <Button htmlType="submit">Восстановить</Button >
        </Fieldset >
      </Form >
      <FormNavigation extraClass="mt-20">
        <FormNavigationLink
          text="Вспомнили пароль?"
          link="/login"
          linkName="Войти"
        />
      </FormNavigation >
    </FormLayout >
  );
};
