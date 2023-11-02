import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../../pages/home/home';
import styles from '../app/app.module.css';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import {ForgotPassword} from '../../pages/forgot-password/forgot-password';
import {ResetPassword} from '../../pages/reset-password/reset-password';
import {Profile} from '../../pages/profile/profile';
import {Ingredient} from '../../pages/ingredient/ingredient';
import ProtectedRoute from '../protected-route/protected-route';
import {useDispatch, useSelector} from 'react-redux';
import {resetPasswordPageAvailability} from '../../services/slices/reset-password-slice';
import {profilePageAvailability, setProfilePageAvailable} from '../../services/slices/profile-slice';
import {
    FORGOT_PASSWORD_PAGE_PATH,
    INGREDIENT_BY_ID_PAGE_PATH,
    LOGIN_PAGE_PATH,
    MAIN_PAGE_PATH,
    PROFILE_PAGE_PATH,
    REGISTER_PAGE_PATH,
    RESET_PASSWORD_PAGE_PATH,
} from '../../utils/constants';
import {refreshTokensIfNeeded} from '../../utils/api';
import {selectIsModalOpen} from '../../services/slices/ingredient-slice';

function App() {
    const resetPasswordAvailability = useSelector(resetPasswordPageAvailability);
    const profileAvailability = useSelector(profilePageAvailability);
    const dispatch = useDispatch();
    const isModalOpen = useSelector(selectIsModalOpen);
    useEffect(() => {
        dispatch(setProfilePageAvailable());
        refreshTokensIfNeeded(dispatch);
    }, [dispatch]);


    return (<div className={styles.app}>
        <Router basename={'/'}>
            <Switch >
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
                    render={({
                                 match,
                             }) => {
                        if (isModalOpen) {
                            return (<Home />);
                        } else {
                            return <Ingredient match={match} />;
                        }
                    }}
                />
                <Route
                    exact
                    component={Home}
                    path="/"
                />

            </Switch >
        </Router >
    </div >);
}

export default App;
