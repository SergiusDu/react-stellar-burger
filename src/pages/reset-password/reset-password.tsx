import {FormLayout} from '../../components/form-layout/form-layout';
import {Form} from '../../components/form/form';
import Fieldset from '../../components/fieldset/fieldset';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {FormNavigation} from '../../components/form-navigation/form-navigation';
import {
  FormNavigationLink,
} from '../../components/form-navigation-link/form-navigation-link';
import React from 'react';
import {
  resetPassword,
  selectResetPasswordNewPasswordErrorMessage,
  selectResetPasswordNewPasswordInput,
  selectResetPasswordTokenInput,
  selectResetPasswordTokenInputErrorMessage,
  serverResponseErrorMessage,
  setResetPasswordNewPasswordErrorMessage,
  setResetPasswordNewPasswordInput,
  setResetPasswordTokenInput,
  setTokenErrorMessage,
} from '../../services/slices/reset-password-slice';
import {
  IPasswordAndToken,
  PasswordString,
  TNullableToken,
} from '../../utils/types';
import {isNonEmptyString} from '../../utils/api';
import {useAppDispatch, useAppSelector} from '../../utils/hooks/reduxHooks';

export const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const newPasswordInputValue: PasswordString = useAppSelector(
    selectResetPasswordNewPasswordInput);
  const newPasswordInputErrorMessage = useAppSelector(
    selectResetPasswordNewPasswordErrorMessage);
  const tokenInputValue: TNullableToken = useAppSelector(
    selectResetPasswordTokenInput);
  const tokenErrorMessage = useAppSelector(
    selectResetPasswordTokenInputErrorMessage);
  const serverError = useAppSelector(serverResponseErrorMessage);

  async function handleResetPasswordSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    const newPasswordAndToken: IPasswordAndToken = {
      password: newPasswordInputValue,
      token: tokenInputValue,
    };
    dispatch(resetPassword(newPasswordAndToken));
  }

  return (
    <FormLayout >
      <Form onSubmit={handleResetPasswordSubmit}>
        <Fieldset legend="Восстановление пароля">
          <PasswordInput
            extraClass={`${newPasswordInputErrorMessage ? null : 'mb-6'} mt-6`}
            value={newPasswordInputValue}
            onChange={e => {
              dispatch(setResetPasswordNewPasswordInput(e.target.value));
              dispatch(setResetPasswordNewPasswordErrorMessage(
                e.target.validationMessage));
            }}
            placeholder="Введите новый пароль"
            minLength={6}
            // @ts-ignore Почему-то выводит ошибку, что поля Error нет, хотя
            // оно есть
            error={isNonEmptyString(newPasswordInputErrorMessage)}
            errorText={newPasswordInputErrorMessage}
            autoComplete="new-password"
            name="password"
            required
          />
          <Input
            extraClass={`${tokenErrorMessage ? null : 'mb-6'}`}
            placeholder="Введите код из письма"
            type="text"
            autoComplete="one-time-code"
            value={tokenInputValue ?? ''}
            error={!!tokenErrorMessage}
            errorText={tokenErrorMessage}
            onChange={(e) => {
              dispatch(setResetPasswordTokenInput(e.target.value));
              dispatch(setTokenErrorMessage(e.target.validationMessage));
            }}
            required
          />
          <Button htmlType="submit">Восстановить</Button >
        </Fieldset >
      </Form >
      {serverError &&
        <p className="mt-6 text text_color_error text_type_main-default">{serverError}</p >}
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

