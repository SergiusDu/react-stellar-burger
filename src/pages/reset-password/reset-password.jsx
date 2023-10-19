import AppHeader from "../../components/app-header/app-header";
import {FormLayout} from "../../components/form-layout/form-layout";
import {Form} from "../../components/form/form";
import Fieldset from "../../components/fieldset/fieldset";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {FormNavigation} from "../../components/form-navigation/form-navigation";
import {FormNavigationLink} from "../../components/form-navigation-link/form-navigation-link";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    resetPassword,
    selectResetPasswordNewPasswordErrorMessage,
    selectResetPasswordNewPasswordInput,
    selectResetPasswordTokenInput,
    selectResetPasswordTokenInputErrorMessage,
    setResetPasswordNewPasswordErrorMessage,
    setResetPasswordNewPasswordInput,
    setResetPasswordTokenInput,
    setTokenErrorMessage,
} from "../../services/slices/reset-password-slice";

export function ResetPassword() {
    const dispatch = useDispatch();
    const newPasswordInputValue = useSelector(selectResetPasswordNewPasswordInput);
    const newPasswordInputErrorMessage = useSelector(selectResetPasswordNewPasswordErrorMessage);
    const tokenInputValue = useSelector(selectResetPasswordTokenInput);
    const tokenErrorMessage = useSelector(selectResetPasswordTokenInputErrorMessage);
    return (<>
        <AppHeader/>
        <FormLayout>
            <Form onSubmit={async (e) => {
                e.preventDefault();
                const newPasswordAndToken = {
                    password: newPasswordInputValue,
                    token: tokenInputValue
                }
                const response = await dispatch(resetPassword(newPasswordAndToken));
                console.log(response);
                console.log(response.payload);
            }}>
                <Fieldset legend="Восстановление пароля">
                    <PasswordInput extraClass={`${!!newPasswordInputErrorMessage ? null : 'mb-6'} mt-6`}
                                   value={newPasswordInputValue}
                                   onChange={e => {
                                       dispatch(setResetPasswordNewPasswordInput(e.target.value));
                                       dispatch(setResetPasswordNewPasswordErrorMessage(e.target.validationMessage));
                                   }}
                                   placeholder="Введите новый пароль"
                                   minLength={6}
                                   error={!!newPasswordInputErrorMessage}
                                   errorText={newPasswordInputErrorMessage}
                                   autoComplete="new-password"
                                   name="password"
                                   required
                    />
                    <Input extraClass={`${!!tokenErrorMessage ? null : 'mb-6'}`}
                           placeholder="Введите код из письма"
                           type="text"
                           autoComplete="one-time-code"
                           value={tokenInputValue}
                           error={!!tokenErrorMessage}
                           errorText={tokenErrorMessage}
                           onChange={(e) => {
                               dispatch(setResetPasswordTokenInput(e.target.value))
                               dispatch(setTokenErrorMessage(e.target.validationMessage))
                           }}
                           required
                    />
                    <Button htmlType="submit">Восстановить</Button>
                </Fieldset>
            </Form>
            <FormNavigation extraClass="mt-20">
                <FormNavigationLink text="Вспомнили пароль?"
                                    link="/login"
                                    linkName="Войти"/>
            </FormNavigation>
        </FormLayout>
    </>)
}
