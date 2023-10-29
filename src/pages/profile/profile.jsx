import AppHeader from "../../components/app-header/app-header";
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Form} from "../../components/form/form";
import Fieldset from "../../components/fieldset/fieldset";
import {ProfileLayout} from "../../components/profile-layout/profile-layout";
import {ProfileNavigation} from "../../components/profile-navigation/profile-navigation";
import {useDispatch, useSelector} from "react-redux";
import {
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
    setProfileName
} from "../../services/slices/profile-slice";
import {handleInputWithRedux} from "../../utils/forms-methods";
import {useEffect} from "react";

export function Profile() {
    const dispatch           = useDispatch();
    const nameInputValue     = useSelector(selectProfileName);
    const nameInputError     = useSelector(selectProfileNameInputError);
    const loginInputValue    = useSelector(selectProfileLogin);
    const loginInputError    = useSelector(selectProfileLoginInputError);
    const passwordInputValue = useSelector(selectProfilePassword);
    const passwordInputError = useSelector(selectProfilePasswordInputError);
    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);
    return (<>
        <AppHeader />
        <ProfileLayout >
            <ProfileNavigation />
            <Form extraClass="ml-15">
                <Fieldset >
                    <Input
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
                        extraClass={`${!!loginInputError ? '' : 'mb-6'}`}
                        placeholder="Логин"
                        value={loginInputValue}
                        icon="EditIcon"
                        error={!!loginInputError}
                        errorText={loginInputError}
                        onChange={(e) => {
                            handleInputWithRedux(e, dispatch, setLogin, setLoginInputError);
                        }}
                    />
                    <PasswordInput
                        extraClass={`${!!passwordInputError ? '' : 'mb-6'}`}
                        value={passwordInputValue}
                        icon="EditIcon"
                        error={!!passwordInputError}
                        errorText={passwordInputError}
                        placeholder="Пароль"
                        onChange={e => {
                            handleInputWithRedux(e, dispatch, setPassword, setPasswordInputError);
                        }}
                    />
                </Fieldset >
            </Form >
        </ProfileLayout >
    </>)
}
