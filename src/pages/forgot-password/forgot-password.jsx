import AppHeader from "../../components/app-header/app-header";
import {FormLayout} from "../../components/form-layout/form-layout";
import {Form} from "../../components/form/form";
import Fieldset from "../../components/fieldset/fieldset";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {FormNavigation} from "../../components/form-navigation/form-navigation";
import {FormNavigationLink} from "../../components/form-navigation-link/form-navigation-link";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectForgotPasswordEmailInput,
    selectForgotPasswordEmailInputError, sendResetPasswordEmail,
    setForgotPasswordEmailInput, setForgotPasswordEmailInputError
} from "../../services/slices/forgot-password-slice";
import {useHistory} from "react-router-dom";
import {setResetPasswordPageAvailability} from "../../services/slices/reset-password-slice";

export function ForgotPassword() {
    const dispatch = useDispatch();
    const history = useHistory();
    const emailInputValue = useSelector(selectForgotPasswordEmailInput);
    const emailInputError = useSelector(selectForgotPasswordEmailInputError);
    async function handleSubmit(e) {
        e.preventDefault();
        const userEmail = {
            email: emailInputValue
        };
        const response = await dispatch(sendResetPasswordEmail(userEmail));
        console.log(response.payload);
        if(response.payload.success) {
            dispatch(setResetPasswordPageAvailability(true));
            history.push('reset-password');
        } else {
            console.log(response.payload);
        }
    }
    return (<>
        <AppHeader/>
        <FormLayout>
            <Form onSubmit={handleSubmit}>
                <Fieldset legend="Восстановление пароля">
                    <EmailInput extraClass={`${!!emailInputError ? null : 'mb-6'} mt-6`}
                                value={emailInputValue}
                                onChange={e => {
                                    dispatch(setForgotPasswordEmailInput(e.target.value));
                                    dispatch(setForgotPasswordEmailInputError(e.target.validationMessage));
                                }}
                                placeholder="Укажите e-mail"
                                minLength={6}
                                error={!!emailInputError}
                                errorText={emailInputError}
                                autoComplete="email"
                                name="email"
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
