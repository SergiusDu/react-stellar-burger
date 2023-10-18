import AppHeader from "../../components/app-header/app-header";
import {FormLayout} from "../../components/form-layout/form-layout";
import {Form} from "../../components/form/form";
import Fieldset from "../../components/fieldset/fieldset";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {FormNavigation} from "../../components/form-navigation/form-navigation";
import {FormNavigationLink} from "../../components/form-navigation-link/form-navigation-link";
import React from "react";

export function ForgotPassword() {
    return (<>
        <AppHeader/>
        <FormLayout>
            <Form onSubmit={}>
                <Fieldset legend="Вход">
                    <EmailInput extraClass={`${!!emailInputErrorMessage ? null : 'mb-6'} mt-6`}
                                value={emailInputValue}
                                onChange={e => {
                                    dispatch(setLoginEmailInputValue(e.target.value));
                                    dispatch(setLoginEmailInputError(e.target.validationMessage));
                                }}
                                minLength={6}
                                error={!!emailInputErrorMessage}
                                errorText={emailInputErrorMessage}
                                autoComplete="email"
                                name="email"
                                required
                    />
                    <Button htmlType="submit">Войти</Button>
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
