import AppHeader from "../../components/app-header/app-header";
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Form} from "../../components/form/form";
import Fieldset from "../../components/fieldset/fieldset";
import {ProfileLayout} from "../../components/profile-layout/profile-layout";
import {ProfileNavigation} from "../../components/profile-navigation/profile-navigation";

export function Profile() {
    return (<>
        <AppHeader/>
        <ProfileLayout>
            <ProfileNavigation/>
            <Form extraClass="ml-15">
                <Fieldset>
                    <Input extraClass="mb-6"
                           placeholder="Имя"
                           value=""
                           icon="EditIcon"
                           onChange={(e) => {
                           }}
                    />
                    <EmailInput extraClass="mb-6"
                                placeholder="Логин"
                                value=""
                                icon="EditIcon"
                                onChange={e => {
                                }}/>
                    <PasswordInput value=""
                                   icon="EditIcon"
                                   onChange={e => {
                                   }}/>
                </Fieldset>
            </Form>
        </ProfileLayout>


    </>)
}
