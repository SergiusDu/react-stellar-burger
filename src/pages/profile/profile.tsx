import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Form} from '../../components/form/form';
import Fieldset from '../../components/fieldset/fieldset';
import {ProfileLayout} from '../../components/profile-layout/profile-layout';
import {ProfileNavigation} from '../../components/profile-navigation/profile-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {
    changeUserData,
    getUserData,
    selectProfileLogin,
    selectProfileLoginInputError,
    selectProfileName,
    selectProfileNameInputError,
    selectProfilePassword,
    selectProfilePasswordInputError,
    setLogin,
    setLoginInputError,
    setNameInputError,
    setPassword,
    setPasswordInputError,
    setProfileName, submitButtonAvailability,
} from '../../services/slices/profile-slice';
import {handleInputWithRedux} from '../../utils/forms-methods';
import React, {useEffect} from 'react';
import {ProfileFormButtonLayout} from '../../components/profile-form-button-layout/profile-form-button-layout';
import {refreshTokensIfNeeded} from '../../utils/api';
import {AppDispatch} from '../../services/store/store';

export const Profile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const nameInputValue = useSelector(selectProfileName);
    const nameInputError = useSelector(selectProfileNameInputError);
    const loginInputValue = useSelector(selectProfileLogin);
    const loginInputError = useSelector(selectProfileLoginInputError);
    const passwordInputValue = useSelector(selectProfilePassword);
    const passwordInputError = useSelector(selectProfilePasswordInputError);
    const isSubmitButtonAvailable = useSelector(submitButtonAvailability);
    useEffect(() => {
        refreshTokensIfNeeded(dispatch);
        dispatch(getUserData());
    }, [dispatch]);

    function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const userData = {
            name: nameInputValue, email: loginInputValue, password: passwordInputValue,
        };
        refreshTokensIfNeeded(dispatch);
        dispatch(changeUserData(userData));
    }

    function handleReset(e: React.FormEvent) {
        e.preventDefault();
        dispatch(getUserData());
    }
    return (<ProfileLayout >
        <ProfileNavigation />
        <Form
            name="userDataForm"
            extraClass="ml-15"
            onSubmit={handleProfileSubmit}
        >
            <Fieldset name="UserDataFieldSet">
                <Input
                    name="Name"
                    autoComplete="name"
                    extraClass={`${!!nameInputError ? '' : 'mb-6'}`}
                    placeholder="Имя"
                    value={nameInputValue}
                    icon="EditIcon"
                    error={!!nameInputError}
                    errorText={nameInputError}
                    onChange={(e) => {
                        handleInputWithRedux(e, dispatch, setProfileName, setNameInputError);
                    }}
                />
                <EmailInput
                    name="login"
                    autoComplete="email"
                    extraClass={`${!!loginInputError ? '' : 'mb-6'}`}
                    placeholder="Логин"
                    value={loginInputValue}
                  // @ts-ignore
                    icon="EditIcon"
                    error={!!loginInputError}
                    errorText={loginInputError}
                    onChange={(e) => {
                        handleInputWithRedux(e, dispatch, setLogin, setLoginInputError);
                    }}
                />
                <PasswordInput
                    name="password"
                    extraClass={`${!!passwordInputError ? '' : 'mb-6'}`}
                    value={passwordInputValue}
                    icon="EditIcon"
                  // @ts-ignore
                    error={!!passwordInputError}
                    errorText={passwordInputError}
                    placeholder="Пароль"
                    autoComplete="new-password"
                    onChange={e => {
                        handleInputWithRedux(e, dispatch, setPassword, setPasswordInputError);
                    }}
                />
            </Fieldset >
            <ProfileFormButtonLayout >
                <Button
                    type="secondary"
                    htmlType="reset"
                    onClick={handleReset}
                >Отмена</Button >
                <Button disabled={!isSubmitButtonAvailable} htmlType="submit">Сохранить</Button >
            </ProfileFormButtonLayout >
        </Form >
    </ProfileLayout >);
};
