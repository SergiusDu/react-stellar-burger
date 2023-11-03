import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import ProtectedRoute from '../components/protected-route/protected-route';
import {
    FORGOT_PASSWORD_PAGE_PATH,
    INGREDIENT_BY_ID_PAGE_PATH,
    LOGIN_PAGE_PATH,
    MAIN_PAGE_PATH,
    PROFILE_PAGE_PATH,
    REGISTER_PAGE_PATH,
    RESET_PASSWORD_PAGE_PATH,
} from '../utils/constants';
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import {ForgotPassword} from '../pages/forgot-password/forgot-password';
import {Profile} from '../pages/profile/profile';
import {ResetPassword} from '../pages/reset-password/reset-password';
import Home from '../pages/home/home';
import {Ingredient} from '../pages/ingredient/ingredient';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetPasswordPageAvailability} from '../services/slices/reset-password-slice';
import {profilePageAvailability} from '../services/slices/profile-slice';
import {closeModal, resetSelectedIngredient, selectIsModalOpen} from '../services/slices/ingredient-slice';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';


export function ModalSwitch() {
    let location = useLocation();
    let background = location.state && location.state.background;
    const resetPasswordAvailability = useSelector(resetPasswordPageAvailability);
    const profileAvailability = useSelector(profilePageAvailability);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleCloseIngredientDetails = () => {
        dispatch(resetSelectedIngredient());
        dispatch(closeModal());
        history.push(MAIN_PAGE_PATH);
    };
    console.log('BACKGROUND: ', background,'\nLOCATION: ', location, '\nBACKGROUND || LOCATION: ', background || location);

    return (<>
            <Switch location={background || location}>
                <ProtectedRoute
                    path={LOGIN_PAGE_PATH}
                    component={Login}
                    isAuth={!profileAvailability}
                    failedRedirectPath={MAIN_PAGE_PATH}
                />
                <ProtectedRoute
                    path={REGISTER_PAGE_PATH}
                    component={Register}
                    isAuth={!profileAvailability}
                    failedRedirectPath={MAIN_PAGE_PATH}
                />
                <ProtectedRoute
                    path={FORGOT_PASSWORD_PAGE_PATH}
                    component={ForgotPassword}
                    isAuth={!profileAvailability}
                    failedRedirectPath={MAIN_PAGE_PATH}
                />
                <ProtectedRoute
                    path={PROFILE_PAGE_PATH}
                    component={Profile}
                    isAuth={profileAvailability}
                    failedRedirectPath={LOGIN_PAGE_PATH}
                />
                <ProtectedRoute
                    path={RESET_PASSWORD_PAGE_PATH}
                    component={ResetPassword}
                    isAuth={resetPasswordAvailability}
                    failedRedirectPath={FORGOT_PASSWORD_PAGE_PATH}
                />
                <Route
                    path={INGREDIENT_BY_ID_PAGE_PATH}
                    component={({
                                   match,
                               }) => {
                        return <Ingredient match={match} />;
                    }}
                />
                <Route
                    exact
                    component={Home}
                    path={MAIN_PAGE_PATH}
                />
            </Switch >
            {background && <Route
                path={INGREDIENT_BY_ID_PAGE_PATH}
                children={
                    <Modal
                        onClose={handleCloseIngredientDetails}
                        title={`Детали ингредиента`}
                    >
                        <IngredientDetails />
                    </Modal >
                }
            />}
        </>);
}
