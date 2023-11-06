import {FormLayout} from '../../components/form-layout/form-layout';
import {Form} from '../../components/form/form';
import Fieldset from '../../components/fieldset/fieldset';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {FormNavigation} from '../../components/form-navigation/form-navigation';
import {FormNavigationLink} from '../../components/form-navigation-link/form-navigation-link';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    resetPassword,
    selectResetPasswordNewPasswordErrorMessage,
    selectResetPasswordNewPasswordInput,
    selectResetPasswordTokenInput,
    selectResetPasswordTokenInputErrorMessage,
    serverResponseErrorMessage,
    setResetPasswordNewPasswordErrorMessage,
    setResetPasswordNewPasswordInput,
    setResetPasswordPageAvailability,
    setResetPasswordTokenInput,
    setServerResponseErrorMessage,
    setTokenErrorMessage,
} from '../../services/slices/reset-password-slice';

export const ResetPassword: React.FC = () => {
    const dispatch = useDispatch();
    const newPasswordInputValue = useSelector(selectResetPasswordNewPasswordInput);
    const newPasswordInputErrorMessage = useSelector(selectResetPasswordNewPasswordErrorMessage);
    const tokenInputValue = useSelector(selectResetPasswordTokenInput);
    const tokenErrorMessage = useSelector(selectResetPasswordTokenInputErrorMessage);
    const serverError = useSelector(serverResponseErrorMessage);

    async function handleResetPasswordSubmit(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        const newPasswordAndToken = {
            password: newPasswordInputValue, token: tokenInputValue,
        };
        // @ts-ignore
        const response = await dispatch(resetPassword(newPasswordAndToken));
        // @ts-ignore
        if (response.payload.success) {
            dispatch(setServerResponseErrorMessage(''));
            dispatch(setResetPasswordPageAvailability(false));
        } else {
            // @ts-ignore
            dispatch(setServerResponseErrorMessage(response.payload.message));
        }
    }


    return (<FormLayout >
        <Form onSubmit={handleResetPasswordSubmit}>
            <Fieldset legend="Восстановление пароля">
                <PasswordInput
                    extraClass={`${newPasswordInputErrorMessage ? null : 'mb-6'} mt-6`}
                    value={newPasswordInputValue}
                    onChange={e => {
                        dispatch(setResetPasswordNewPasswordInput(e.target.value));
                        dispatch(setResetPasswordNewPasswordErrorMessage(e.target.validationMessage));
                    }}
                    placeholder="Введите новый пароль"
                    minLength={6}
                    // @ts-ignore
                    error={!!newPasswordInputErrorMessage}
                    errorText={newPasswordInputErrorMessage}
                    autoComplete="new-password"
                    name="password"
                    required
                />
                <Input
                    extraClass={`${!!tokenErrorMessage ? null : 'mb-6'}`}
                    placeholder="Введите код из письма"
                    type="text"
                    autoComplete="one-time-code"
                    value={tokenInputValue}
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
        {serverError && <p className="mt-6 text text_color_error text_type_main-default">{serverError}</p >}
        <FormNavigation extraClass="mt-20">
            <FormNavigationLink
                text="Вспомнили пароль?"
                link="/login"
                linkName="Войти"
            />
        </FormNavigation >
    </FormLayout >);
};