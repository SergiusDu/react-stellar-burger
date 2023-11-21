import React from 'react';
import styles from './login.module.css';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Form} from '../../components/form/form';
import {FormLayout} from '../../components/form-layout/form-layout';
import Fieldset from '../../components/fieldset/fieldset';
import {useHistory, useLocation} from 'react-router-dom';
import {FormNavigation} from '../../components/form-navigation/form-navigation';
import {
  FormNavigationLink,
} from '../../components/form-navigation-link/form-navigation-link';
import {
  authorizeUser,
  loginEmailInputErrorMessage,
  loginEmailInputValue,
  loginPasswordInputValue,
  setLoginEmailInputError,
  setLoginEmailInputValue,
  setLoginPasswordInputValue,
} from '../../services/slices/login-form-slice';
import {setProfilePageAvailable} from '../../services/slices/profile-slice';
import {useAppDispatch, useAppSelector} from '../../utils/hooks/reduxHooks';

const Login: React.FC = () => {
  const emailInputValue = useAppSelector(loginEmailInputValue);
  const emailInputErrorMessage = useAppSelector(loginEmailInputErrorMessage);
  const passwordInputValue = useAppSelector(loginPasswordInputValue);
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirectTo');
  const dispatch = useAppDispatch();

  async function loginSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const loginCredentials = {
      email: emailInputValue,
      password: passwordInputValue,
    };
    const response = await dispatch(authorizeUser(loginCredentials));
    if (response.payload.success) {
      dispatch(setProfilePageAvailable());
      if (redirectTo) {
        history.push(redirectTo);
      }
    }
  }


  return (
    <main className={styles.main_layout}>
      <FormLayout >
        <Form onSubmit={loginSubmitHandler}>
          <Fieldset legend="Вход">
            <EmailInput
              extraClass={`${emailInputErrorMessage ? null : 'mb-6'} mt-6`}
              value={emailInputValue}
              onChange={e => {
                dispatch(setLoginEmailInputValue(e.target.value));
                dispatch(setLoginEmailInputError(e.target.validationMessage));
              }}
              minLength={6}
              // @ts-ignore
              error={emailInputErrorMessage}
              errorText={emailInputErrorMessage}
              autoComplete="email"
              name="email"
              required
            />
            <PasswordInput
              extraClass="mb-6"
              value={passwordInputValue}
              onChange={e => {
                dispatch(setLoginPasswordInputValue(e.target.value));
              }}
              autoComplete="current-password"
              name="password"
              min={6}
              required
            />
            <Button htmlType="submit">Войти</Button >
          </Fieldset >
        </Form >
        <FormNavigation extraClass="mt-20">
          <FormNavigationLink
            text="Вы - новый пользователь?"
            link="/register"
            linkName="Зарегистрироваться"
          />
          <FormNavigationLink
            text="Забыли пароль?"
            link="/forgot-password"
            linkName="Восстановить пароль"
          />
        </FormNavigation >
      </FormLayout >
    </main >
  );
};

export default Login;
