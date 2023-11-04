import React from 'react';
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Form} from '../../components/form/form';
import Fieldset from '../../components/fieldset/fieldset';
import {FormLayout} from '../../components/form-layout/form-layout';
import {useDispatch, useSelector} from 'react-redux';
import {
    isFormBlocked,
    registerUser,
    responseErrorMessage,
    selectEmailInputErrorMessage,
    selectEmailInputValue,
    selectNameInputValue,
    selectPasswordInputValue,
    setEmailInputErrorMessage,
    setEmailInputValue,
    setNameInputValue,
    setPasswordInputValue,
    setResponseErrorMessage,
} from '../../services/slices/registration-form-slice';
import {useHistory} from 'react-router-dom';
import {FormNavigation} from '../../components/form-navigation/form-navigation';
import {FormNavigationLink} from '../../components/form-navigation-link/form-navigation-link';

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const emailInputValue = useSelector(selectEmailInputValue);
    const passwordInputValue = useSelector(selectPasswordInputValue);
    const emailInputErrorMessage = useSelector(selectEmailInputErrorMessage);
    const nameInputValue = useSelector(selectNameInputValue);
    const serverResponseErrorMessage = useSelector(responseErrorMessage);
    const formStatus = useSelector(isFormBlocked);
    const history = useHistory();

    async function handleRegistrationFormSubmit(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        dispatch(setResponseErrorMessage(false));
        const userData = {
            name: nameInputValue, password: passwordInputValue, email: emailInputValue,
        };
        // @ts-ignore
        const response = await dispatch(registerUser(userData));
        // @ts-ignore
        const data = response.payload;
        if (data.success) {
            history.push('/');
        }
    }

    return (<FormLayout >
            <Form
                onSubmit={handleRegistrationFormSubmit}
            >
                <Fieldset
                    legend="Регистрация"
                    disabled={formStatus}
                >
                    {/*TODO - Доделать вывод ошибки имени*/}
                    <Input
                        extraClass="mt-6 mb-6"
                        placeholder="Имя"
                        value={nameInputValue}
                        onChange={(e) => {
                            dispatch(setNameInputValue(e.target.value));
                        }}
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                    />
                    <EmailInput
                        extraClass={`${!!emailInputErrorMessage ? null : 'mb-6'}`}
                        value={emailInputValue}
                        name="email"
                        autoComplete="email"
                        onChange={(e) => {
                            dispatch(setEmailInputValue(e.target.value));
                            dispatch(setEmailInputErrorMessage(e.target.validationMessage));
                        }}
                        // @ts-ignore
                        error={!!emailInputErrorMessage}
                        errorText={emailInputErrorMessage}
                        required
                    />
                    <PasswordInput
                        extraClass="mb-6"
                        value={passwordInputValue}
                        name="password"
                        autoComplete="new-password"
                        onChange={(e) => {
                            const value = e.target.value;
                            dispatch(setPasswordInputValue(value));
                        }}
                        min={6}
                        required
                    />
                    <Button
                        htmlType="submit"
                        disabled={formStatus}
                    >Зарегистрироваться</Button >
                    {serverResponseErrorMessage ?
                        <p className="text text_type_main-default text_color_error mt-6">{serverResponseErrorMessage}</p > : null}
                </Fieldset >
            </Form >
            <FormNavigation extraClass="mt-20">
                <FormNavigationLink
                    text="Уже зарегистрированы?"
                    link="/login"
                    linkName="Войти"
                />
            </FormNavigation >
        </FormLayout >);
};

export default Register;